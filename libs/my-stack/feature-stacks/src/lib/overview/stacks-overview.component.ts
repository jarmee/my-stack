import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Stack } from '@my-stack/shared/api-my-stack';

import { StacksStore } from '../+state/stacks.store';
import { StackComponent } from './stack.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    StackComponent,
    MatDividerModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <ng-container *ngIf="viewModel$ | async as vm">
      <div class="px-4">
        <div class="flex items-end justify-between">
          <h2>Stacks</h2>
          <button mat-button routerLink="create" class="mb-3">
            <mat-icon>add</mat-icon>Create
          </button>
        </div>
        <mat-divider></mat-divider>
        <div
          *ngIf="vm.hasData; else showNoData"
          class="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mt-3 h-100"
        >
          <mys-stack
            *ngFor="let stack of vm.stacks; trackBy: trackById"
            [stack]="stack"
            (delete)="onDelete($event)"
          >
          </mys-stack>
        </div>
        <ng-template #showNoData>
          <div
            data-test-id="no-data"
            class="flex flex-col items-center justify-center mt-3 h-[400px]"
          >
            <mat-icon class="info mb-6">info</mat-icon>
            <h1>No Stack Found</h1>
            <button
              mat-raised-button
              color="primary"
              class="mt-3"
              routerLink="create"
            >
              <mat-icon>add</mat-icon>Create
            </button>
          </div>
        </ng-template>
      </div>
    </ng-container>
  `,
  styles: [
    `
      mat-icon.info {
        transform: scale(2);
        opacity: 0.25;
      }
    `,
  ],
})
export class StacksOverviewComponent implements OnInit {
  readonly viewModel$ = this._store.viewModel$;

  constructor(private _store: StacksStore) {}

  ngOnInit(): void {
    this._store.loadAll();
  }

  onDelete(stack: Stack) {
    this._store.remove(stack);
  }

  trackById(index: number, stack: Stack) {
    return stack.id;
  }
}
