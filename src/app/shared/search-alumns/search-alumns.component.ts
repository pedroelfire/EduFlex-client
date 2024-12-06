import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { Alumn } from '../../alumns/alumns.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AlumnsService } from '../../alumns/alumns.service';

@Component({
  selector: 'app-search-alumns',
  standalone: true,
  imports: [AutoCompleteModule, CommonModule, FormsModule],
  templateUrl: './search-alumns.component.html',
  styleUrl: './search-alumns.component.scss'
})
export class SearchAlumnsComponent {
  @Output() selectedAlumn = new EventEmitter<Alumn>()
  @Input() clearAfterSelect: boolean = false
  @Input() exclutions: Alumn['alumn_id'][] = []
  @Output() exclutionsChange = new EventEmitter<number[]>();

  alumn: Alumn | null = null
  suggestedAlumns: Alumn[] = []

  constructor(
    private alumnsService: AlumnsService
  ) {

  }

  filterAlumn(input: AutoCompleteCompleteEvent) {
    this.getSuggestedAlumns(input.query)
  }

  getSuggestedAlumns(name: string = '') {
    this.alumnsService.suggestedAlumns(name, this.exclutions).subscribe({
      next: (response) => {
        this.suggestedAlumns = response
      }
    })
  }

  onAlumnSelected(event: any) {
    this.selectedAlumn.emit(event.value);

    if (this.clearAfterSelect) {
      this.alumn = null;
    }
  }
}
