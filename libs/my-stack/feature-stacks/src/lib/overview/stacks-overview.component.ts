import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { Stack } from "@my-stack/shared/api-my-stack";
import { Observable, of } from "rxjs";

import { StackComponent } from "./stack.component";

@Component({
  selector: "my-stack-stacks-overview",
  standalone: true,
  imports: [CommonModule, StackComponent, MatDividerModule],
  templateUrl: "./stacks-overview.component.html",
  styleUrls: ["./stacks-overview.component.scss"],
})
export class StacksOverviewComponent {
  stacks$: Observable<Array<Stack>> = of([
    {
      id: 0,
      title: "test-0",
      technologies: [],
    },
    {
      id: 1,
      title: "test-1",
      technologies: [],
    },
    {
      id: 2,
      title: "test-2",
      technologies: [],
    },
    {
      id: 3,
      title: "test-3",
      technologies: [],
    },
    {
      id: 4,
      title: "test-4",
      technologies: [],
    },
    {
      id: 5,
      title: "test-5",
      technologies: [],
    },
    {
      id: 6,
      title: "test-6",
      technologies: [],
    },
    {
      id: 7,
      title: "test-7",
      technologies: [],
    },
    {
      id: 8,
      title: "test-8",
      technologies: [],
    },
    {
      id: 9,
      title: "test-9",
      technologies: [],
    },
  ]);

  trackById(index: number, stack: Stack) {
    return stack.id;
  }
}
