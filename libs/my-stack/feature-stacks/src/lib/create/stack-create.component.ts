import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CreateStackDto, StacksService } from '@my-stack/shared/api-my-stack';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  template: `<div class="px-4">
    <div class="flex items-end">
      <button mat-button routerLink="/" class="mb-3">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <h3>Create Stack</h3>
    </div>
    <mat-divider></mat-divider>
    <div class="flex justify-center">
      <form
        class="flex flex-col container"
        novalidate
        [formGroup]="formGroup"
        (ngSubmit)="onSubmit(formGroup.valid, formGroup.value)"
      >
        <mat-form-field appearance="fill" class="mt-8">
          <mat-label>Title</mat-label>
          <input
            data-test-id="title-form-field"
            matInput
            formControlName="title"
          />
        </mat-form-field>
        <button
          class="mt-3"
          data-test-id="submit-button"
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="formGroup.invalid"
        >
          Create
        </button>
      </form>
    </div>
  </div>`,
  styles: [],
})
export class StackCreateComponent {
  formGroup: FormGroup;

  constructor(
    private _service: StacksService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.formGroup = this._formBuilder.group({
      title: ['', Validators.required],
    });
  }

  async onSubmit(isValid: boolean, stack: CreateStackDto) {
    if (isValid) {
      await firstValueFrom(this._service.createStack(stack));
      this._router.navigate(['/']);
    }
  }
}
