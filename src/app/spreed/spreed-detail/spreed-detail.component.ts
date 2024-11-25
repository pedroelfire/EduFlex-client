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
  globalFilterValue: string = '';  // El valor del filtro global
  percentageWarning: boolean = false;
  displayDialog: boolean = false;
  selectedStudent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupsService: GroupsService,
    private messageService: MessageService
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
    this.selectedStudent = student; // Asigna el estudiante seleccionado
    this.displayDialog = true; // Abre el diálogo
  }

  onDialogHide() {
    this.selectedStudent = null; // Resetea el estudiante seleccionado al cerrar el diálogo
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

    return totalCalificacion; // Devuelve la calificación actual total
  }

  getSeverity(calificacion: number) {
    if (calificacion >= 70) {
      return 'success'; // Verde
    } else if (calificacion >= 40) {
      return 'warning'; // Amarillo
    } else {
      return 'danger'; // Rojo
    }
  }

  // Función para verificar si la suma de los criterios de un alumno es 100
  getSumaCriterios(student: any): number {
    return student.criteria.reduce((sum: number, criterio: any) => sum + criterio.value, 0);
  }

  // Función para verificar si la suma es 100
  isSumaCorrecta(student: any): boolean {
    return this.getSumaCriterios(student) === 100;
  }

  onSubmit() {
    this.groupsService.updateGroupDetails(this.alumns).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cambios guardados correctamente', life: 3000 });
      },
      error: (error) => {
        console.log("ola")
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
        this.percentageWarning = true;  // Mostrar advertencia si no suma 100%
      } else {
        this.percentageWarning = false;
      }

      // Validar que los valores de calificación y porcentaje estén entre 0 y 100
      student.criteria.forEach(criterio => {
        if (criterio.grade! < 0 || criterio.grade! > 100 || criterio.value < 0 || criterio.value > 100) {
          isValid = false;
        }
      });
    }

    return isValid;
  }


  goBack() {
    this.router.navigate(['/spreed']);  // Aquí se redirige a la ruta principal (SpreedListComponent)
  }


}
