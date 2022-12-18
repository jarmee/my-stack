import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutComponent } from "./layout.component";

const CssSelectors = {
  ToggleNavigationButton: By.css('[data-test-id="navigtationButton"]'),
  Sidebar: By.css('[data-test-id="sidebar"]'),
};

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
