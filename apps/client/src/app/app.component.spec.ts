import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';

const CssSelectors = {
  Layout: By.css('[data-test-id="layout"]'),
};

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: OAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideOAuthClient()],
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(OAuthService);
    authService.getIdentityClaims = jest.fn().mockReturnValue({
      given_name: 'Simple User',
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.buildInfo = `develop@bec3dace-1c3f-490a-aedf-e6e7317a41ab / 2022-12-20T21:11:45.760Z`;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('onLogout', () => {
    it('should logout the user', () => {
      authService.logOut = jest.fn();
      fixture.debugElement
        .query(CssSelectors.Layout)
        .triggerEventHandler('logout', {});

      expect(authService.logOut).toHaveBeenCalled();
    });
  });
});
