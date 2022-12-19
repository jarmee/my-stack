import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Stack } from '@my-stack/shared/api-my-stack';

@Component({
  selector: 'mys-stack',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="flex flex-col items-center justify-items-center cursor-pointer">
      <mat-card class="h-[144px] w-[144px]"></mat-card>
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
}
