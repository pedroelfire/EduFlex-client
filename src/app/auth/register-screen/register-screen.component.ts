import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../auth.service';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { LocalService } from '../../shared/storage.service';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ToastModule, CardModule, ReactiveFormsModule,],
  providers: [MessageService],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.scss'
})
export class RegisterScreenComponent {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private localStorage: LocalService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.authService.regisrter(this.registerForm.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Cuenta creada con exito',
        })
        setTimeout(() => {
          this.router.navigate(["auth/login"]);
        }, 2000); 
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Ocurrio un error al intentar crear la cuenta"
        });
      },
    })
  }

}
