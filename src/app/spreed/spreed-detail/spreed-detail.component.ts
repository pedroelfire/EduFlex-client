import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Alumn, AlumnCriteria } from '../../alumns/alumns.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from '../../groups/groups.service';
import { Group } from '../../groups/groups.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ObvservationsComponent } from "../../shared/obvservations/obvservations.component";
import { LoadingService } from '../../shared/loading.service';

@Component({
  selector: 'app-spreed-detail',
  standalone: true,
  imports: [TableModule, InputTextModule, FormsModule, NgClass, NgFor, MessagesModule, TagModule, DialogModule, ButtonModule, EditorModule, ToastModule, ObvservationsComponent],
  providers: [MessageService],
  templateUrl: './spreed-detail.component.html',
  styleUrls: ['./spreed-detail.component.scss'],
})
export class SpreedDetailComponent implements OnInit {
  alumns: AlumnCriteria[] = []
  group: Group | null = null
  globalFilterValue: string = '';
  percentageWarning: boolean = false;
  displayDialog: boolean = false;
  selectedStudent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupsService: GroupsService,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    this.groupsService.getGroupDetails(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe({
      next: (response) => {
        this.alumns = response.alumns
        this.group = response.group
      }
    })
  }

  ngOnInit() {

  }

  showDetails(student: any) {
    this.selectedStudent = student;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedStudent = null;
  }

  getCriteriosHeaders() {
    if (this.alumns.length > 0) {
      const criterios = this.alumns[0].criteria || [];
      console.log(criterios)
      return criterios.map(criterio => criterio.name);
    }
    return
  }

  validatePorcentajes(student: any) {
    const totalPercentage = student.criterios.reduce((sum: number, criterio: any) => sum + (criterio.porcentaje || 0), 0);
    this.percentageWarning = totalPercentage !== 100;
  }

  getCalificacionActual(student: any): number {
    const totalCalificacion = student.criteria.reduce((sum: number, criterio: any) => {
      return sum + (criterio.grade || 0) * (criterio.value || 0) / 100;
    }, 0);

    return totalCalificacion;
  }

  getSeverity(calificacion: number) {
    if (calificacion >= 70) {
      return 'success';
    } else if (calificacion >= 40) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  getSumaCriterios(student: any): number {
    return student.criteria.reduce((sum: number, criterio: any) => sum + criterio.value, 0);
  }

  isSumaCorrecta(student: any): boolean {
    return this.getSumaCriterios(student) === 100;
  }

  onSubmit() {
    this.groupsService.updateGroupDetails(this.alumns).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cambios guardados correctamente', life: 3000 });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'Ocurrió un error desconocido', life: 3000 });
      }
    })
  }
    isValid(): boolean {
    let isValid = true;

    for (const student of this.alumns) {
      const totalPercentage = student.criteria.reduce((sum, criterio) => sum + (criterio.value || 0), 0);
      if (totalPercentage !== 100) {
        isValid = false;
        this.percentageWarning = true; 
      } else {
        this.percentageWarning = false;
      }

      student.criteria.forEach(criterio => {
        if (criterio.grade! < 0 || criterio.grade! > 100 || criterio.value < 0 || criterio.value > 100) {
          isValid = false;
        }
      });
    }

    return isValid;
  }

  downloadGroupGrades() {
    this.groupsService.downloadAlumnsGrades(this.group!['group_id']).subscribe({
      next: (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      },
      error: (err) => {
        console.error('Error al obtener el PDF:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/spreed']);
  }


}
