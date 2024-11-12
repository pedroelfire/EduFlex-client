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

@Component({
  selector: 'app-create-alumn',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ToastModule, ReactiveFormsModule, TableModule, CommonModule],
  templateUrl: './create-alumn.component.html',
  styleUrl: './create-alumn.component.scss'
})
export class CreateAlumnComponent {

  @Output() successOnCreation = new EventEmitter<boolean>()
  alumnForm: FormGroup
  alumnList: CreateAlumn[] = [];
  showCreateAlumnDialog: boolean = false

  constructor(
    private alumnsService: AlumnsService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.alumnForm = this.fb.group({
      names: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      last_names: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  addAlumn() {
      const newAlumn: CreateAlumn = this.alumnForm.value;
      this.alumnList.push(newAlumn);
      this.alumnForm.reset();
  }

  removeAlumn(alumn: CreateAlumn) {
    this.alumnList = this.alumnList.filter(a => a !== alumn);
  }

  onSubmit() {
    if (this.alumnList.length > 0) {
      this.alumnsService.insertAlumns(this.alumnList).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alumnos guardados correctamente' });
          this.successOnCreation.emit(true);
          this.alumnList = []; 
          this.showCreateAlumnDialog = false; 
        },
        error: (error) => {
          console.error('Error al guardar los alumnos:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron guardar los alumnos' });
        }
      });
    }
  }
}