import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-grupo',
  standalone: true,
  imports: [TableModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './spreed-new.component.html',
  styleUrls: ['./spreed-new.component.scss'],
})
export class SpreedNewComponent {
  students: { nombre: string; apellido: string }[] = [];
  criteria: { nombre: string; porcentaje: number }[] = [];
  newStudentName: string = '';
  newStudentLastName: string = '';
  newCriterion: string = '';
  newCriterionPercentage: number | null = null;

  addStudent() {
    if (this.newStudentName && this.newStudentLastName) {
      this.students.push({ nombre: this.newStudentName, apellido: this.newStudentLastName });
      this.newStudentName = '';
      this.newStudentLastName = '';
    }
  }

  removeStudent(student: { nombre: string; apellido: string }) {
    this.students = this.students.filter(s => s !== student);
  }

  addCriterion() {
    if (this.newCriterion && this.newCriterionPercentage !== null) {
      this.criteria.push({ nombre: this.newCriterion, porcentaje: this.newCriterionPercentage });
      this.newCriterion = '';
      this.newCriterionPercentage = null;
    }
  }

  removeCriterion(criterion: { nombre: string; porcentaje: number }) {
    this.criteria = this.criteria.filter(c => c !== criterion);
  }

  createGroup() {
    // Lógica para crear el grupo con los alumnos y criterios
    console.log('Grupo creado con los siguientes alumnos:', this.students);
    console.log('Criterios de evaluación:', this.criteria);
  }
}
