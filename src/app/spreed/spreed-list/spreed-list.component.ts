import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { GroupsService } from '../../groups/groups.service';
import { Group } from '../../groups/groups.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spreed-list',
  standalone: true,
  imports: [TableModule, CardModule, CommonModule, ButtonModule ],
  templateUrl: './spreed-list.component.html',
  styleUrls: ['./spreed-list.component.scss'],
})
export class SpreedListComponent {

  groups: Group[] = []
  
  constructor(
    private groupsService: GroupsService,
    private router: Router
  ){
    this.groupsService.getGroups().subscribe({
      next: (response)=>{
        this.groups = response
      }
    })
  }

  goToDetail(id: number): void {
    this.router.navigate([`/spreed/${id}`]); // Redirige a la ruta dinámica con el ID
  }
}
