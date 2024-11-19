import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AlumnsService } from '../../alumns/alumns.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CreateAlumn } from '../../alumns/alumns.model';
import { CommonModule } from '@angular/common';
import { GroupsService } from '../../groups/groups.service';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ToastModule, ReactiveFormsModule, TableModule, CommonModule, InputNumberModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  @Output() successOnCreation = new EventEmitter<boolean>();
  groupForm: FormGroup;
  alumnList: CreateAlumn[] = [];
  showCreateAlumnDialog: boolean = false;

  currentStep: number = 0; // Inicia en el paso 1 (índice 0)

  steps: { title: string; content: string }[] = [
    { title: 'Paso 1: Datos del Grupo', content: 'Ingresa el nombre y grado del grupo.' },
    { title: 'Paso 2: Alumnos', content: 'Asigna los alumnos al grupo.' },
    { title: 'Paso 3: Define un criterio', content: 'Define el criterio de evauacion para los alumnos.' },
    { title: 'Paso 4: Confirmación', content: 'Revisa y confirma la creación del grupo.' },
  ];

  constructor(
    private groupsService: GroupsService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.groupForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      grade: new FormControl(0, [Validators.required, Validators.maxLength(2)])
    });
  }

  onSubmit() {
    this.groupsService.insertGroup(this.groupForm.value).subscribe({
      next: (response) => {
        this.messageService.add({});
        console.log(response);
      }
    });
  }

  goToNextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getTransform(): string {
    return `translateX(-${(100 / this.steps.length) * this.currentStep}%)`;
  }
}
