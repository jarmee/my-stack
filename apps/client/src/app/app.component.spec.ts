import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

const CssSelectors = {
  ToggleNavigationButton: By.css('[data-test-id="navigtationButton"]'),
  Sidebar: By.css('[data-test-id="sidebar"]'),
};

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("onToggleNavigation", () => {
    it("should open the navigation", () => {
      component.toggleSidebarNavigation = false;

      fixture.debugElement
        .query(CssSelectors.ToggleNavigationButton)
        .triggerEventHandler("click", {});
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(CssSelectors.Sidebar).componentInstance
          .opened
      ).toBe(true);
    });

    it("should close the navigation", () => {
      component.toggleSidebarNavigation = true;

      fixture.debugElement
        .query(CssSelectors.ToggleNavigationButton)
        .triggerEventHandler("click", {});
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(CssSelectors.Sidebar).componentInstance
          .opened
      ).toBe(false);
    });
  });
});
