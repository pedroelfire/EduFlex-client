import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SearchAlumnsComponent } from '../search-alumns/search-alumns.component';
import { TableModule } from 'primeng/table';
import { Alumn } from '../../alumns/alumns.model';
import { GroupsService } from '../../groups/groups.service';
import { Group, groupDetail } from '../../groups/groups.model';
import { MessageService } from 'primeng/api';
import { createCriteria } from '../../criteria/criteria.model';

@Component({
  selector: 'app-add-alumn-group',
  standalone: true,
  imports: [ButtonModule, CommonModule, DialogModule, SearchAlumnsComponent, TableModule],
  templateUrl: './add-alumn-group.component.html',
  styleUrl: './add-alumn-group.component.scss'
})

export class AddAlumnGroupComponent {
  @Input() groupId: Group['group_id'] = 0
  criterias: createCriteria[] = []
  showAddAlumnDialog: boolean = false
  alumns: Alumn[] = []
  idsAddedAlumns: Alumn['alumn_id'][] = []

  constructor(
    private groupsService: GroupsService,
    private messageService: MessageService
  ){
    //TODO: Esto se llama cuando se inicializa el componente,
    //no cuando se vuelve verdadero el showAddAlumnDialog
    this.groupsService.getGroupCriteria(this.groupId).subscribe({
      next: (response) => {
        this.criterias = response
      },
      error: (error) => {
        this.messageService.add({detail:error.error, severity:error})
      }
    })
  }

  removeAlumn(index: number) {
    const alumnId = this.alumns[index].alumn_id
    this.alumns.splice(index);
    this.idsAddedAlumns = this.idsAddedAlumns.filter(id => id !== alumnId);
  }


}
