import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/login.model';
import { StorageService } from '../../../../shared/services/storage.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  isLoading = signal(false);

  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private storageService = inject(StorageService);
  loginForm = new FormGroup({
    identifier: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading.set(true);
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (res: LoginResponse) => {
        this.isLoading.set(false);
        this.toastService.showToast('تم تسجيل الدخول بنجاح', 'success');
        // this.router.navigateByUrl('/home');
        console.log(res.token);
        this.storageService.set('token', res.token);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
