import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { apiErrorsInterceptor } from './shared/interceptors/api-errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, apiErrorsInterceptor])
    ),
    provideHotToastConfig({
      position: 'top-right',
    }),
  ],
};
