import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@my-stack/shared/component-layout';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: 'mys-root',
  template: `
    <mys-layout [title]="title">
      <router-outlet></router-outlet>
    </mys-layout>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
      }
    `,
    `
      mat-drawer-container {
        height: 100vh;
      }
    `,
    `
      mat-drawer {
        width: 248px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'My Stack';
}
