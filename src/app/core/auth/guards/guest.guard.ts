import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { UserService } from '../services/user.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  const userService = inject(UserService);

  if (userService.isLoggedIn()) {
    toast.showToast('أنت بالفعل مسجل دخول!', 'error');
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
