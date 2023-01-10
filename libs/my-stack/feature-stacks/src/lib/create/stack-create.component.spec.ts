import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { faker } from '@faker-js/faker';
import {
  ApiModule,
  CreateStackDto,
  StacksService,
} from '@my-stack/shared/api-my-stack';
import { of } from 'rxjs';

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
  let service: StacksService;
  let router: Router;
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

    service = TestBed.inject(StacksService);
    router = TestBed.inject(Router);

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
      service.createStack = jest.fn().mockReturnValue(of(null));
      router.navigate = jest.fn();
    });

    it('should do nothing when the user clicks the submit button and the form is invalid', () => {
      submitForm();

      expect(service.createStack).not.toHaveBeenCalled();
    });
    it('should create a new stack when the user clicks the submit button and the form is valid', () => {
      const expected: CreateStackDto = {
        title: faker.random.words(),
      };

      setTitleFormField(expected.title);
      submitForm();

      expect(service.createStack).toHaveBeenCalledWith(expected);
    });
  });
});
