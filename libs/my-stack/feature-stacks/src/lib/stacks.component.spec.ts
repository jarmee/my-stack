import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiModule, StacksService } from '@my-stack/shared/api-my-stack';
import { of } from 'rxjs';

import { StacksComponent } from './stacks.component';

describe('StacksComponent', () => {
  let component: StacksComponent;
  let fixture: ComponentFixture<StacksComponent>;
  let service: StacksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StacksComponent],
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
    fixture = TestBed.createComponent(StacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
