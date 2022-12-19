import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Stack } from '@my-stack/shared/api-my-stack';

@Component({
  selector: 'my-stack-stack',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackComponent {
  @Input()
  stack: Stack | null = null;
}
