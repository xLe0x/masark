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
          // console.log(err);
          toastService.showToast(err.msg, 'error');
        });
      }

      if (error.error) {
        toastService.showToast(error.message, 'error');
      }

      if (httpError.status === 0) {
        toastService.showToast(
          'يوجد مشكلة بالسيرفر .. الرجاء المحاولة لاحقا',
          'error'
        );
      }

      if (!navigator.onLine) {
        toastService.showToast(
          'لا يوجد اتصال بالإنترنت .. الرجاء التحقق من الاتصال',
          'error'
        );
      }

      return throwError(() => new Error(httpError.message || 'ERROR'));
    })
  );
};
