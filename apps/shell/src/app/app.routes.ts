import { Routes } from '@angular/router';
import { AiConsoleComponent } from '@flight-demo/shared/ai';
import { HomeComponent } from '@flight-demo/shared/core';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AiConsoleComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
