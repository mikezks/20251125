import { Routes } from '@angular/router';
import { Nav } from './nav';
import { Detail } from './views/detail';
import { Overview } from './views/overview';

export const routes: Routes = [
  {
    path: '',
    component: Nav,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'detail/:id',
        component: Detail
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default routes;
