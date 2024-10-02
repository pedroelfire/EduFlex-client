import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'spreed', loadChildren: () => import('./spreed/spreed-routing.module').then(m => m.SpreedRoutingModule) },
    { path: 'user', loadChildren: () => import('./users/users-routing.module').then(m => m.UsersRoutingModule) },
];
