import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "@my-stack/shared/component-layout";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: "mystack-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "My Stack";
}
