import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Group } from '../../groups/groups.model';
import { AlumnsService } from '../../alumns/alumns.service';
import { GroupsService } from '../../groups/groups.service';
import { Alumn } from '../../alumns/alumns.model';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manage-alumns-group-dialog',
  standalone: true,
  imports: [DialogModule, CommonModule, TableModule, ButtonModule],
  templateUrl: './manage-alumns-group-dialog.component.html',
  styleUrl: './manage-alumns-group-dialog.component.scss'
})
export class ManageAlumnsGroupDialogComponent {
  alumnsInGroup: Alumn[] = []
  alumnsNotInGroup: Alumn[] = []
  @Input() showDialog: boolean = false
  @Input() selectedGroupId: Group['group_id'] = 0
  @Output() showDialogChange = new EventEmitter<boolean>();

  constructor(
    private alumnsService: AlumnsService,
    private groupsService: GroupsService
  ) { }
  loadTable(event:TableLazyLoadEvent){
    this.groupsService.alumnsInGroup(this.selectedGroupId).subscribe({
      next: (response) => {
        console.log(response)
        this.alumnsInGroup = response;
      },
      error: (err) => console.error("Error fetching alumns:", err)
    });
  }
}
