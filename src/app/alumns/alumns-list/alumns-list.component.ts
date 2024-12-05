import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CreateAlumnComponent } from "../../shared/create-alumn/create-alumn.component";
import { Alumn } from '../alumns.model';
import { AlumnsService } from '../alumns.service';
import { FileUploadModule } from 'primeng/fileupload';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ObvservationsComponent } from "../../shared/obvservations/obvservations.component";

@Component({
  selector: 'app-alumns-list',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule,
    CommonModule, FormsModule, ReactiveFormsModule, CreateAlumnComponent, FileUploadModule, ConfirmDialogModule, ObvservationsComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './alumns-list.component.html',
  styleUrl: './alumns-list.component.scss'
})
export class AlumnsListComponent {
  alumns: Alumn[] = []
  selectedAlumns: Alumn[] = []
  lastTableEvent: TableLazyLoadEvent = {}
  mostrarDialogoEliminar: boolean = false

  constructor(
    private alumnsService: AlumnsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  loadTable(event: TableLazyLoadEvent) {
    this.lastTableEvent = event
    this.alumnsService.getAlumn().subscribe({
      next: (response) => {
        this.alumns = response
      }
    })
  }

  deleteSelectedAlumns() {
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar a los alumnos seleccionados?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const alumnsToDelete = this.selectedAlumns.map(alumn => alumn.alumn_id)
        this.alumnsService.deleteAlumns(alumnsToDelete).subscribe({
          next: ()=>{
            this.alumns = this.alumns.filter(alumn => !alumnsToDelete.includes(alumn.alumn_id));
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Alumnos eliminados de manera satisfactoria', life: 3000 });
          },
          error: ()=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al eliminar los alumnos', life: 3000 });

          }
        }) 
      }
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.alumns);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "alumnos_registrados");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
