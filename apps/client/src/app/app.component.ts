import { NxWelcomeComponent } from "./nx-welcome.component";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [NxWelcomeComponent],
  selector: "mystack-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "client";
}
