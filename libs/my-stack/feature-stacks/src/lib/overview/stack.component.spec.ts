import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StackComponent } from './stack.component';

const CSS_SELECTORS = {
  DELETE_BUTTON: By.css('[data-test-id="delete-button"]'),
};

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StackComponent);
    component = fixture.componentInstance;
    component.stack = {
      id: 0,
      title: 'test-0',
      technologies: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('delete stack', () => {
    it('should emit a delete event for the stack when the user clicks the delete button', () => {
      component.delete.emit = jest.fn();

      fixture.debugElement
        .query(CSS_SELECTORS.DELETE_BUTTON)
        .triggerEventHandler('click');

      expect(component.delete.emit).toHaveBeenCalledWith(component.stack);
    });
  });
});
