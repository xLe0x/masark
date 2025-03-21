import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const toast = inject(ToastService);
  const userService = inject(UserService);
  if (!userService.isLoggedIn()) {
    toast.showToast('يجب تسجيل الدخول أولاً', 'error');
    router.navigateByUrl('/auth/login');
    return false;
  }
  return true;
};
