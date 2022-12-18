import { Routes } from "@angular/router";

export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "stacks",
    pathMatch: "full",
  },
  {
    path: "stacks",
    loadComponent: () =>
      import("@my-stack/feature-stacks").then((c) => c.StacksComponent),
  },
];
