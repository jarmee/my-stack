import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ApiModule } from '@my-stack/shared/api-my-stack';
import { skip } from 'rxjs';

import { StacksStore } from './stacks.store';

const GET_ALL_STACKS_URL = 'http://localhost/api/stacks';
const DELETE_STACK_URL = (id: number) => `http://localhost/api/stacks/${id}`;

describe('StacksStore', () => {
  let store: StacksStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(ApiModule),
      ],
    });

    store = TestBed.inject(StacksStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  describe('loadAll', () => {
    it('should get all stacks from the api and add all to the state', fakeAsync(
      inject(
        [HttpTestingController],
        (httpTestingController: HttpTestingController) => {
          const expected = [
            {
              id: 0,
              title: 'asd',
            },
          ];

          store.stacks$.pipe(skip(1)).subscribe((stacks) => {
            expect(stacks).toEqual(expected);
          });

          store.loadAll();

          const request = httpTestingController.expectOne(GET_ALL_STACKS_URL);
          expect(request.request.method).toBe('GET');
          request.flush(expected);
          tick(50);
        }
      )
    ));
  });

  describe('remove', () => {
    it('should xxx', fakeAsync(
      inject(
        [HttpTestingController],
        (httpTestingController: HttpTestingController) => {
          const stackToDelete = {
            id: 0,
            title: 'asd',
            technologies: [],
          };
          store.setState({
            stacks: [stackToDelete],
          });
          store.stacks$.pipe(skip(1)).subscribe((stacks) => {
            expect(stacks).toEqual([]);
          });

          store.remove(stackToDelete);

          const request = httpTestingController.expectOne(
            DELETE_STACK_URL(stackToDelete.id)
          );
          expect(request.request.method).toBe('DELETE');
          request.flush(null);
          tick(50);
        }
      )
    ));
  });
});
