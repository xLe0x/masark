import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject(HotToastService);

  showToast(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' | 'loading' = 'info'
  ) {
    this.toastr[type](message);
  }

  showObserveToast<T>(messages: {
    loading?: string;
    success?: (data: T) => string;
    error?: (error: any) => string;
  }) {
    return this.toastr.observe<T>({
      loading: messages.loading || 'جاري التحميل...',
      success: messages.success || ((s) => `تم بنجاح: ${s}`),
      error: messages.error || ((e) => `حدث خطأ: ${e}`),
    });
  }
}
