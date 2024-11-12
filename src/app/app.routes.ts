import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'spreed',
        loadChildren: () =>
          import('./spreed/spreed-routing.module').then(
            (m) => m.SpreedRoutingModule
          ),
      },
      {
        path: 'alumns',
        loadChildren: () =>
          import('./alumns/alumns-routing.module').then(
            (m) => m.AlumnsRoutingModule
          )
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./users/users-routing.module').then((m) => m.UsersRoutingModule),
  },
];
