import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnsListComponent } from './alumns-list/alumns-list.component';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  { path: 'list', component: AlumnsListComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MessageService]
})
export class AlumnsRoutingModule { }
