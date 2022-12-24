import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@my-stack/shared/component-layout';
import {
  BUILD_DATE,
  GIT_BRANCH,
  GIT_COMMIT_HASH,
} from '@my-stack/shared/util-build-info';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: 'mys-root',
  template: `
    <mys-layout
      data-test-id="layout"
      [title]="title"
      [buildInfo]="buildInfo"
      (logout)="onLogout()"
    >
      <router-outlet></router-outlet>
    </mys-layout>
  `,
  styles: [
    `
      mys-layout {
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

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(environment.auth);
    this.oauthService.loadDiscoveryDocumentAndLogin();

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());
  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  onLogout() {
    this.oauthService.logOut();
  }
}
