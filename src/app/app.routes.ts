import { Routes } from '@angular/router';
import { guestGuard } from './core/auth/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'الصفحة الرئيسية',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [guestGuard],
  },
];
