import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    toast.showToast('يجب تسجيل الدخول أولاً', 'error');
    return false;
  }
  return true;
};
