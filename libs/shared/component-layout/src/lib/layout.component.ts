import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'my-stack-layout',
  standalone: true,
  imports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input()
  title = '';

  toggleSidebarNavigation = false;

  get isSidebarNavigationOpen(): boolean {
    return this.toggleSidebarNavigation;
  }

  onToggleNavigation() {
    this.toggleSidebarNavigation = !this.toggleSidebarNavigation;
  }
}
