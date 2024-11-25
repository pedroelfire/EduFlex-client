import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Group } from '../../groups/groups.model';
import { AlumnsService } from '../../alumns/alumns.service';
import { GroupsService } from '../../groups/groups.service';
import { Alumn } from '../../alumns/alumns.model';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ObvservationsComponent } from "../obvservations/obvservations.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-manage-alumns-group-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule, TableModule, ButtonModule, ObvservationsComponent, ConfirmDialogModule, ToastModule],
  providers: [MessageService,ConfirmationService],
  templateUrl: './manage-alumns-group-dialog.component.html',
  styleUrl: './manage-alumns-group-dialog.component.scss'
})
export class ManageAlumnsGroupDialogComponent {
  alumnsInGroup: Alumn[] = []
  alumnsNotInGroup: Alumn[] = []
  lastEvent: TableLazyLoadEvent = {}
  @Input() showDialog: boolean = false
  @Input() selectedGroupId: Group['group_id'] = 0
  @Output() showDialogChange = new EventEmitter<boolean>();

  constructor(
    private alumnsService: AlumnsService,
    private confirmationService: ConfirmationService,
    private groupsService: GroupsService,
    private messageService: MessageService
  ) { }
  loadTable(event:TableLazyLoadEvent){
    this.lastEvent = event
    this.groupsService.alumnsInGroup(this.selectedGroupId).subscribe({
      next: (response) => {
        console.log(response)
        this.alumnsInGroup = response;
      },
      error: (err) => console.error("Error fetching alumns:", err)
    });
  }

  deleteAlumnFormGroup(id:Alumn['alumn_id']) {
    this.confirmationService.confirm({
        message: 'Estas seguro de eliminar a los alumnos seleccionados?',
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.groupsService.deleteAlumnFromGroup(id, this.selectedGroupId).subscribe({
            next: ()=>{
              this.messageService.add({severity:'success', summary: 'Exito', detail: 'Alumno eliminado del grupo', life: 3000});
              this.loadTable(this.lastEvent)
            }
          })
        }
    });
}
}
