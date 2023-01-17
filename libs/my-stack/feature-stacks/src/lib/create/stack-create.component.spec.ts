import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { faker } from '@faker-js/faker';
import { ApiModule, CreateStackDto } from '@my-stack/shared/api-my-stack';

import { StacksStore } from '../+state/stacks.store';
import { StackCreateComponent } from './stack-create.component';

const CSS_SELECTORS = {
  TITLE_FORM_FIELD: By.css('[data-test-id="title-form-field"]'),
  FORM: By.css('form'),
};

function setTitleFormFieldFactory(
  fixture: ComponentFixture<StackCreateComponent>
) {
  return (value: string) => {
    fixture.componentInstance.formGroup.get('title')?.setValue(value);
    fixture.detectChanges();
  };
}

function submitFormFactory(fixture: ComponentFixture<StackCreateComponent>) {
  const submitFormElement = fixture.debugElement.query(CSS_SELECTORS.FORM);

  return () => {
    submitFormElement.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
  };
}

describe('StackCreateComponent', () => {
  let component: StackCreateComponent;
  let fixture: ComponentFixture<StackCreateComponent>;
  let router: Router;
  let store: StacksStore;
  let setTitleFormField: (value: string) => void;
  let submitForm: () => void;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StackCreateComponent,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [provideHttpClient(), importProvidersFrom(ApiModule)],
    }).compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(StacksStore);

    fixture = TestBed.createComponent(StackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    setTitleFormField = setTitleFormFieldFactory(fixture);
    submitForm = submitFormFactory(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('form', () => {
    beforeEach(() => {
      jest.spyOn(store, 'add');
      router.navigate = jest.fn();
    });

    it('should do nothing when the user clicks the submit button and the form is invalid', () => {
      submitForm();

      expect(store.add).not.toHaveBeenCalled();
    });

    it('should create a new stack when the user clicks the submit button and the form is valid', () => {
      const expected: CreateStackDto = {
        title: faker.random.words(),
      };

      setTitleFormField(expected.title);
      submitForm();

      expect(store.add).toHaveBeenCalledWith(expected);
    });
  });
});
