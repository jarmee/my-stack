import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiModule, StacksService } from '@my-stack/shared/api-my-stack';
import { of } from 'rxjs';

import { StacksOverviewComponent } from './stacks-overview.component';

describe('StacksOverviewComponent', () => {
  let fixture: ComponentFixture<StacksOverviewComponent>;
  let component: StacksOverviewComponent;
  let service: StacksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksOverviewComponent, RouterTestingModule],
      providers: [provideHttpClient(), importProvidersFrom(ApiModule)],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(StacksService);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
