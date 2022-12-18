import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "my-stack-layout",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {}
