import { Component } from '@angular/core';

import { StacksOverviewComponent } from './overview/stacks-overview.component';

@Component({
  selector: 'mys-stacks',
  standalone: true,
  imports: [StacksOverviewComponent],
  template: `<mys-stacks-overview></mys-stacks-overview>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class StacksComponent {}
