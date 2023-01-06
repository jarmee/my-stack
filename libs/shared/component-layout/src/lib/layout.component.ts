import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'mys-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    NgIf,
  ],
  template: `
    <mat-toolbar color="primary">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center">
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
        <div class="flex items-center">
          <small>{{ userName }}</small>
          <button
            mat-icon-button
            data-test-id="logoutButton"
            aria-label="Logout User"
            (click)="onLogout()"
          >
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>
    <mat-drawer-container>
      <mat-drawer
        data-test-id="sidebar"
        mode="over"
        autoFocus="false"
        [opened]="isSidebarNavigationOpen"
        class="flex"
      >
      </mat-drawer>
      <mat-drawer-content class="container mx-auto pt-3">
        <main>
          <ng-content></ng-content>
        </main>
        <footer class="w-100 text-center">
          <small class="text-stone-600">{{ buildInfo }}</small>
        </footer>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `
      mat-drawer-container {
        height: calc(100vh - 64px);
      }
    `,
    `
      @media (max-width: 599px) {
        mat-drawer-container {
          height: calc(100vh - 56px);
        }
      }
    `,
    `
      mat-drawer {
        width: 248px;
      }
    `,
    `
      @media (max-width: 599px) {
        mat-drawer {
          width: 100%;
        }
      }
    `,
  ],
})
export class LayoutComponent {
  @Input()
  title = '';

  @Input()
  buildInfo = '';

  @Input()
  userName: string | null = '';

  @Output()
  logout = new EventEmitter<void>();

  toggleSidebarNavigation = false;

  get isSidebarNavigationOpen(): boolean {
    return this.toggleSidebarNavigation;
  }

  onToggleNavigation() {
    this.toggleSidebarNavigation = !this.toggleSidebarNavigation;
  }

  onLogout() {
    this.logout.emit();
  }
}
