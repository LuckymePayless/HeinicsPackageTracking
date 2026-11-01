import type { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guards';
import { noAuthGuard } from './guards/no-auth.guards';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [noAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then((m) => m.SignupPage),
    canActivate: [noAuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
];
