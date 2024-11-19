import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
  { path: 'list', component: GroupsListComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MessageService]
})
export class AlumnsRoutingModule { }
