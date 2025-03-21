import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const apiErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error.errors) {
        error.errors.forEach((err: any) => {
          toastService.showToast(err.msg, 'error');
        });
      }

      // check if the user is offline
      if (httpError.status === 0) {
        toastService.showToast('تأكد من اتصالك بالإنترنت', 'error');
      }

      return throwError(() => new Error(httpError.message || 'ERROR'));
    })
  );
};
