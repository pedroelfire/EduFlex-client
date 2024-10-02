import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-spreed-list',
  standalone: true,
  imports: [TableModule, InputTextModule, FormsModule, NgFor, NgClass, MessagesModule, TagModule, DialogModule, ButtonModule, EditorModule],
  templateUrl: './spreed-list.component.html',
  styleUrls: ['./spreed-list.component.scss'],
})
export class SpreedListComponent {
  students = [
    {
      nombres: 'Juan',
      apellidos: 'Pérez',
      observaciones: 'Juan ha mostrado un excelente progreso en las últimas semanas, participando activamente en clase y entregando todas las tareas puntualmente. Sin embargo, necesita mejorar en la precisión de sus respuestas en los exámenes, ya que ha perdido puntos por errores de cálculo. Recomiendo que refuerce su estudio en matemáticas y dedique más tiempo a la revisión antes de entregar sus exámenes. Su actitud en clase es positiva, y con un poco más de esfuerzo, estoy seguro de que logrará una calificación aún mejor.', // Campo para observaciones
      criterios: [
        { nombre: 'Trabajo en clase', calificacion: 80, porcentaje: 50 }, // Valores predeterminados
        { nombre: 'Examen', calificacion: 80, porcentaje: 50 }
      ]
    },
    {
      nombres: 'María',
      apellidos: 'López',
      criterios: [
        { nombre: 'Trabajo en clase', calificacion: 80, porcentaje: 50 },
        { nombre: 'Examen', calificacion: 80, porcentaje: 50 }
      ]
    },
    {
      nombres: 'Carlos',
      apellidos: 'Ramírez',
      criterios: [
        { nombre: 'Trabajo en clase', calificacion: 80, porcentaje: 50 },
        { nombre: 'Examen', calificacion: 80, porcentaje: 50 }
      ]
    },
  ];

  percentageWarning: boolean = false; // Estado de advertencia
  displayDialog: boolean = false; // Control para mostrar el diálogo
  selectedStudent: any; // Alumno seleccionado para mostrar en el diálogo

  showDetails(student: any) {
    this.selectedStudent = student; // Asigna el estudiante seleccionado
    this.displayDialog = true; // Abre el diálogo
  }

  onDialogHide() {
    this.selectedStudent = null; // Resetea el estudiante seleccionado al cerrar el diálogo
  }

  getCriteriosHeaders() {
    const criterios = this.students[0]?.criterios || [];
    return criterios.map(criterio => criterio.nombre);
  }

  validatePorcentajes(student: any) {
    const totalPercentage = student.criterios.reduce((sum: number, criterio: any) => sum + (criterio.porcentaje || 0), 0);
    this.percentageWarning = totalPercentage !== 100;
  }

  getCalificacionActual(student: any): number {
    const totalCalificacion = student.criterios.reduce((sum: number, criterio: any) => {
      return sum + (criterio.calificacion || 0) * (criterio.porcentaje || 0) / 100;
    }, 0);

    return totalCalificacion; // Devuelve la calificación actual total
  }

  getSeverity(calificacion: number): string {
    if (calificacion >= 70) {
      return 'success'; // Verde
    } else if (calificacion >= 40) {
      return 'warning'; // Amarillo
    } else {
      return 'danger'; // Rojo
    }
  }

}
