import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateAlumnComponent } from "../../shared/create-alumn/create-alumn.component";
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GroupsService } from '../groups.service';
import { Group } from '../groups.model';
import { CreateGroupComponent } from "../../shared/create-group/create-group.component";
import { TagModule } from 'primeng/tag';
import { ManageAlumnsGroupDialogComponent } from "../../shared/manage-alumns-group-dialog/manage-alumns-group-dialog.component";
@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule,
    CommonModule, FormsModule, ReactiveFormsModule, FileUploadModule, 
    ConfirmDialogModule, CreateGroupComponent, TagModule, ManageAlumnsGroupDialogComponent],
  providers: [MessageService,ConfirmationService],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss'
})
export class GroupsListComponent {

  lastTableEvent: TableLazyLoadEvent = {}
  groups: Group[] = []
  selectedGroups: Group[] = []
  selectedGroup: Group["group_id"] = 0
  showDeleteDialog: boolean = false
  showManageAlumnsDialog: boolean = false


  constructor(
    private groupsService: GroupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ){

  }


  loadTable(event: TableLazyLoadEvent) {
    this.lastTableEvent = event
    this.groupsService.getGroups().subscribe({
      next: (response) => {
        this.groups = response
      }
    })
  }

  deleteSelectedGroups() {
    this.confirmationService.confirm({
        message: 'Estas seguro de eliminar a los alumnos seleccionados?',
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.groups = this.groups.filter(val => !this.selectedGroups.includes(val));
            this.selectedGroups = [];
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Alumnos eliminados de manera satisfactoria', life: 3000});
        }
    });
}

}
