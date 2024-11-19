import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';
import { hasTokenGuard } from './guards/has-token.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [hasTokenGuard],
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
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups-routing.module').then(
            (m) => m.AlumnsRoutingModule
          )
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./users/users-routing.module').then((m) => m.UsersRoutingModule),
  },
];
