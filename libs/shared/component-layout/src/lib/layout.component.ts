import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'mys-layout',
  standalone: true,
  imports: [MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <div class="container mx-auto flex items-center">
        <button
          mat-icon-button
          data-test-id="navigtationButton"
          aria-label="Open Navigation"
          (click)="onToggleNavigation()"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span class="mr-4">{{ title }}</span>
      </div>
    </mat-toolbar>
    <main>
      <mat-drawer-container>
        <mat-drawer
          data-test-id="sidebar"
          mode="over"
          autoFocus="false"
          [opened]="isSidebarNavigationOpen"
        ></mat-drawer>
        <mat-drawer-content class="container mx-auto pt-3">
          <ng-content></ng-content>
        </mat-drawer-content>
      </mat-drawer-container>
    </main>
    <footer class="w-100 text-center">
      <small class="text-stone-600">{{ buildInfo }}</small>
    </footer>
  `,
  styles: [
    `
      main,
      mat-drawer-container {
        height: inherit;
      }
    `,
    `
      mat-drawer {
        width: 248px;
      }
    `,
  ],
})
export class LayoutComponent {
  @Input()
  title = '';

  @Input()
  buildInfo = '';

  toggleSidebarNavigation = false;

  get isSidebarNavigationOpen(): boolean {
    return this.toggleSidebarNavigation;
  }

  onToggleNavigation() {
    this.toggleSidebarNavigation = !this.toggleSidebarNavigation;
  }
}
