import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./overview/stacks-overview.component').then(
        (c) => c.StacksOverviewComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/stack-create.component').then(
        (c) => c.StackCreateComponent
      ),
  },
];
