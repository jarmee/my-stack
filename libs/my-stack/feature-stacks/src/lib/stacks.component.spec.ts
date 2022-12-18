import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StacksComponent } from "./stacks.component";

describe("StacksComponent", () => {
  let component: StacksComponent;
  let fixture: ComponentFixture<StacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });
});
