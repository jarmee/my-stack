import { Injectable } from '@angular/core';
import {
  CreateStackDto,
  Stack,
  StacksService,
} from '@my-stack/shared/api-my-stack';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap } from 'rxjs';

interface StacksState {
  stacks: Stack[];
}

const initialState: StacksState = {
  stacks: [],
};

@Injectable({
  providedIn: 'root',
})
export class StacksStore extends ComponentStore<StacksState> {
  readonly stacks$: Observable<Stack[]> = this.select((state) => state.stacks);
  readonly hasData$: Observable<boolean> = this.select(
    (state) => state.stacks.length > 0
  );
  readonly viewModel$ = this.select({
    stacks: this.stacks$,
    hasData: this.hasData$,
  });

  constructor(private _service: StacksService) {
    super(initialState);
  }

  readonly add = this.effect<CreateStackDto>((stackToCreate$) =>
    stackToCreate$.pipe(
      switchMap((stackToCreate) =>
        this._service.createStack(stackToCreate).pipe(
          tapResponse(
            (stack) => this.addOne(stack),
            (error) => this.logError(error)
          )
        )
      )
    )
  );

  readonly loadAll = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this._service.getAllStacks().pipe(
          tapResponse(
            (stacks) => this.addAll(stacks),
            (error) => this.logError(error)
          )
        )
      )
    )
  );

  readonly remove = this.effect<Stack>((stackToDelete$) =>
    stackToDelete$.pipe(
      switchMap((stack) =>
        this._service.deleteStack(stack.id).pipe(
          tapResponse(
            () => this.removeOne(stack),
            (error) => this.logError(error)
          )
        )
      )
    )
  );

  private readonly addOne = this.updater((state, createdStack: Stack) => ({
    ...state,
    stacks: [...state.stacks, createdStack],
  }));

  private readonly removeOne = this.updater((state, stackToDelete: Stack) => ({
    ...state,
    stacks: [...state.stacks.filter((stack) => stack.id !== stackToDelete.id)],
  }));

  private readonly addAll = this.updater((state, stacks: Stack[]) => ({
    ...state,
    stacks,
  }));

  private logError(error: unknown) {
    console.error(error);
  }
}
