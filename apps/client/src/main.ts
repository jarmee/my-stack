import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ApiModule, Configuration } from '@my-stack/shared/api-my-stack';
import { provideOAuthClient } from 'angular-oauth2-oidc';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { ROUTES } from './routes';

export function openApiConfigurationFactory() {
  return new Configuration({
    basePath: environment.apiUrl,
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true,
      },
    }),
    importProvidersFrom(ApiModule.forRoot(openApiConfigurationFactory)),
  ],
}).catch((err) => console.error(err));
