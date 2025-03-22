import { Routes } from '@angular/router';
import { guestGuard } from './core/auth/guards/guest.guard';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'الصفحة الرئيسية',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [guestGuard],
  },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import(
        './features/leaderboard/pages/leaderboard/leaderboard.component'
      ).then((c) => c.LeaderboardComponent),
  },
];
