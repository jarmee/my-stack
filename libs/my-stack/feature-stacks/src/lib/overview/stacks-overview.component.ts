import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Stack, StacksService } from '@my-stack/shared/api-my-stack';
import { Observable } from 'rxjs';

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
    <div class="px-4">
      <div class="flex justify-between items-end">
        <h3>Stacks</h3>
        <button mat-button routerLink="create" class="mb-3">
          <mat-icon>add</mat-icon>Create
        </button>
      </div>
      <mat-divider></mat-divider>
      <div
        class="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mt-3 h-100"
      >
        <mys-stack
          *ngFor="let stack of stacks$ | async; trackBy: trackById"
          [stack]="stack"
        >
        </mys-stack>
      </div>
    </div>
  `,
  styles: [],
})
export class StacksOverviewComponent {
  stacks$: Observable<Array<Stack>> = this._service.getAllStacks();

  constructor(private _service: StacksService) {}

  trackById(index: number, stack: Stack) {
    return stack.id;
  }
}
