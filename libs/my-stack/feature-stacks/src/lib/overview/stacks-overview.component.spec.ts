import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StacksOverviewComponent } from './stacks-overview.component';

describe('StacksOverviewComponent', () => {
  let fixture: ComponentFixture<StacksOverviewComponent>;
  let component: StacksOverviewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StacksOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
