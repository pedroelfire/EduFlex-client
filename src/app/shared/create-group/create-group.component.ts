import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AlumnsService } from '../../alumns/alumns.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Alumn, CreateAlumn } from '../../alumns/alumns.model';
import { CommonModule } from '@angular/common';
import { GroupsService } from '../../groups/groups.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { SearchAlumnsComponent } from "../search-alumns/search-alumns.component";
import { CreateAlumnComponent } from "../create-alumn/create-alumn.component";
import { DropdownModule } from 'primeng/dropdown';
import { createCriteria, Criteria } from '../../criteria/criteria.model';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ToastModule, DropdownModule,
    ReactiveFormsModule, TableModule, CommonModule, InputNumberModule, InputTextModule, ReactiveFormsModule, SearchAlumnsComponent, FormsModule, CreateAlumnComponent],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  @Output() successOnCreation = new EventEmitter<boolean>();
  groupForm: FormGroup;
  alumnList: CreateAlumn[] = [];
  idsAddedAlumns: Alumn['alumn_id'][] = []
  showCreateAlumnDialog: boolean = false;
  currentStep: number = 0;

  newCriterionName: string = '';
  newCriterionValue: number = 0;

  steps: { title: string; content: string }[] = [
    { title: 'Datos del Grupo', content: 'Ingresa el nombre y grado del grupo.' },
    { title: 'Alumnos', content: 'Asigna los alumnos al grupo.' },
    { title: 'Define un criterio', content: 'Define el criterio de evauacion para los alumnos. La suma de el valor los criterios tiene que ser de 100' },
    { title: 'Confirmación', content: 'Revisa y confirma la creación del grupo.' },
  ];

  constructor(
    private groupsService: GroupsService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.groupForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      grade: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      alumns: this.fb.array([]),
      criteria: this.fb.array([])
    });

  }

  goToNextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  onSubmit(){
    this.groupsService.insertGroup(this.groupForm.value).subscribe({
      next: (response)=>{
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Grupo creado exitosamente', life: 3000});
        this.showCreateAlumnDialog = false
        this.successOnCreation.emit(true)
        this.groupForm.reset()
      }
    })
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getTransform(): string {
    return `translateX(-${(100 / this.steps.length) * this.currentStep}%)`;
  }

  getCriteriaSum(): number {
    const criteriaArray = this.groupForm.get('criteria') as FormArray;
    return criteriaArray.controls.reduce((sum, control) => sum + Number(control.value.value || 0), 0);
  }

  addAlumn(alumn: Alumn) {
    const alumnsArray = this.groupForm.get('alumns') as FormArray;
    alumnsArray.push(
      this.fb.group({
        alumn_id: new FormControl(alumn.alumn_id, [Validators.required]),
        names: new FormControl(alumn.names, [Validators.required]),
        last_names: new FormControl(alumn.last_names, [Validators.required])

      })
    );
    this.idsAddedAlumns = [...this.idsAddedAlumns, alumn.alumn_id];
  }

  addCriterion(criteria: createCriteria) {
    const criteriaArray = this.groupForm.get('criteria') as FormArray;
    criteriaArray.push(
      this.fb.group({
        name: new FormControl(criteria.name, [Validators.required]),
        value: new FormControl(criteria.value, [Validators.required])
      })
    );
    this.newCriterionName = ''
    this.newCriterionValue = 0
  }

  removeAlumn(index: number) {
    const alumnsArray = this.groupForm.get('alumns') as FormArray;
    const alumnId = alumnsArray.at(index).get('alumn_id')!.value;
    alumnsArray.removeAt(index);
    this.idsAddedAlumns = this.idsAddedAlumns.filter(id => id !== alumnId);
  }

  removeCriterion(index: number) {
    const criteriaArray = this.groupForm.get('criteria') as FormArray;
    criteriaArray.removeAt(index);
  }

  get alumns(): FormArray {
    return this.groupForm.get('alumns') as FormArray;
  }

  get criteria(): FormArray {
    return this.groupForm.get('criteria') as FormArray;
  }


  getAlumnsAsArray(): any[] {
    return this.alumns.value;
  }

  getCriteriaAsArray(): any[] {
    return this.criteria.value;
  }

}
