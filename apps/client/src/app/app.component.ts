import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  selector: "mystack-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "My Stack";

  toggleSidebarNavigation = false;

  get isSidebarNavigationOpen(): boolean {
    return this.toggleSidebarNavigation;
  }

  onToggleNavigation() {
    this.toggleSidebarNavigation = !this.toggleSidebarNavigation;
  }
}
