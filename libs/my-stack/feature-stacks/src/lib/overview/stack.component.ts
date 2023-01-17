import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Stack } from '@my-stack/shared/api-my-stack';

@Component({
  selector: 'mys-stack',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-items-center cursor-pointer">
      <mat-card class="h-[144px] w-[144px]">
        <button
          data-test-id="delete-button"
          type="button"
          mat-icon-button
          (click)="onDelete(stack)"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card>
      <span class="mt-2">{{ stack?.title }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackComponent {
  @Input()
  stack: Stack | null = null;

  @Output()
  delete = new EventEmitter<Stack>();

  onDelete(stack: Stack | null) {
    if (stack) {
      this.delete.emit(stack);
    }
  }
}
