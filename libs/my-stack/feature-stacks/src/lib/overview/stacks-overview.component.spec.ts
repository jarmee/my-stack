import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { faker } from '@faker-js/faker';
import { ApiModule, Stack, StacksService } from '@my-stack/shared/api-my-stack';
import { of } from 'rxjs';

import { StacksStore } from '../+state/stacks.store';
import { StacksOverviewComponent } from './stacks-overview.component';

const CSS_SELECTORS = {
  STACK: By.css('mys-stack'),
};

describe('StacksOverviewComponent', () => {
  let fixture: ComponentFixture<StacksOverviewComponent>;
  let component: StacksOverviewComponent;
  let service: StacksService;
  let store: StacksStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksOverviewComponent, RouterTestingModule],
      providers: [provideHttpClient(), importProvidersFrom(ApiModule)],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(StacksService);
    store = TestBed.inject(StacksStore);
    service.getAllStacks = jest.fn().mockReturnValue(
      of([
        {
          id: 0,
          title: 'test-0',
          technologies: [],
        },
        {
          id: 1,
          title: 'test-1',
          technologies: [],
        },
        {
          id: 2,
          title: 'test-2',
          technologies: [],
        },
        {
          id: 3,
          title: 'test-3',
          technologies: [],
        },
        {
          id: 4,
          title: 'test-4',
          technologies: [],
        },
        {
          id: 5,
          title: 'test-5',
          technologies: [],
        },
        {
          id: 6,
          title: 'test-6',
          technologies: [],
        },
        {
          id: 7,
          title: 'test-7',
          technologies: [],
        },
        {
          id: 8,
          title: 'test-8',
          technologies: [],
        },
        {
          id: 9,
          title: 'test-9',
          technologies: [],
        },
      ])
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StacksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('delete', () => {
    it('should emit a delete event for the stack when the user clicks the delete button of a stack', () => {
      jest.spyOn(store, 'remove');
      const expected: Stack = {
        id: faker.datatype.number(),
        title: 'some-stack',
        technologies: [],
      };

      const stackElements = fixture.debugElement.queryAll(CSS_SELECTORS.STACK);
      const randomStackElement =
        stackElements[
          faker.datatype.number({ min: 0, max: stackElements.length - 1 })
        ];
      randomStackElement.triggerEventHandler('delete', expected);

      expect(store.remove).toHaveBeenCalledWith(expected);
    });
  });
});
