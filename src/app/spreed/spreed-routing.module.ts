import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpreedListComponent } from './spreed-list/spreed-list.component';
import { SpreedNewComponent } from './spreed-new/spreed-new.component';
import { SpreedDetailComponent } from './spreed-detail/spreed-detail.component';

const routes: Routes = [
  { path: '', component: SpreedListComponent },  // Ruta para la lista de productos
  { path: 'nuevo', component: SpreedNewComponent },  // Ruta para la lista de productos
  { path: ':id', component: SpreedDetailComponent }, // Ruta para los detalles del producto

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpreedRoutingModule { }
