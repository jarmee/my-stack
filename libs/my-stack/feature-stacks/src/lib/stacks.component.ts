import { Component } from '@angular/core';

import { StacksOverviewComponent } from './overview/stacks-overview.component';

@Component({
  selector: 'mys-stacks',
  standalone: true,
  imports: [StacksOverviewComponent],
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.scss'],
})
export class StacksComponent {}
