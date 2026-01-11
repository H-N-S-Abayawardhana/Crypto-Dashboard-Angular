import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'coins',
    loadComponent: () =>
      import('./components/coin-list/coin-list.component').then((m) => m.CoinListComponent)
  },
  {
    path: 'coin/:id',
    loadComponent: () =>
      import('./components/coin-detail/coin-detail.component').then((m) => m.CoinDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
