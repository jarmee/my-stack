import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'stacks',
    pathMatch: 'full',
  },
  {
    path: 'stacks',
    loadChildren: () =>
      import('@my-stack/feature-stacks').then((m) => m.ROUTES),
  },
];
