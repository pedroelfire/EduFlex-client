import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Alumn } from '../../alumns/alumns.model';
import { EditorModule } from 'primeng/editor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AlumnsService } from '../../alumns/alumns.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-obvservations',
  standalone: true,
  imports: [DialogModule, EditorModule, FormsModule, ButtonModule, CommonModule],
  templateUrl: './obvservations.component.html',
  styleUrl: './obvservations.component.scss'
})
export class ObvservationsComponent {
  displayDialog:boolean = false
  @Input() alumn: any | Alumn
  @Input() selfSave:boolean =  false
  @Output() alumnChange = new EventEmitter<Alumn>()
  
  constructor(
    private alumnsService: AlumnsService,
    private messageService: MessageService
  ){}

  saveObservations(){
    this.alumnsService.updateAlumns(this.alumn).subscribe({
      next:()=>{
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Observaciones registrtadas correctamente', life: 3000});
        this.displayDialog = false
      }
    })
  }

}
