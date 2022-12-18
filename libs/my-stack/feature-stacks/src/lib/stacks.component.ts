import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "my-stack-stacks",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./stacks.component.html",
  styleUrls: ["./stacks.component.scss"],
})
export class StacksComponent {}
