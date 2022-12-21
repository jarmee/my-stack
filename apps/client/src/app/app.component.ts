import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@my-stack/shared/component-layout';
import {
  BUILD_DATE,
  GIT_BRANCH,
  GIT_COMMIT_HASH,
} from '@my-stack/shared/util-build-info';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: 'mys-root',
  template: `
    <mys-layout [title]="title" [buildInfo]="buildInfo">
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

  buildInfo = `${GIT_BRANCH}@${GIT_COMMIT_HASH} / ${BUILD_DATE}`;
}
