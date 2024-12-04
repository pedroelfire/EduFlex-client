import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';
import { hasTokenGuard } from './guards/has-token.guard';
import { HomeLandingComponent } from './home/home-landing/home-landing.component';

export const routes: Routes = [
  {
    path: '', // Rutas con overlay
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
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups-routing.module').then(
            (m) => m.GroupsRoutingModule
          ),
      },
      {
        path: '', // Ruta inicial para la landing page
        component: HomeLandingComponent,
      },
    ],
  },
  {
    path: 'auth', // Ruta de autenticación sin overlay
    loadChildren: () =>
      import('./users/users-routing.module').then((m) => m.UsersRoutingModule),
  },
];
