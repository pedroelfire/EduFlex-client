import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalService } from '../../shared/storage.service';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ToastModule,  CardModule, ReactiveFormsModule, ],
  providers: [MessageService],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent {

  loginForm: FormGroup;
  
constructor(
  private authService: AuthService,
  private messageService: MessageService,
  private localStorage: LocalService,
  private router: Router
  )
  {
    this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
  }
  
  onSubmit() { 
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.localStorage.saveData("email", this.loginForm.get("email")!.value)
          this.localStorage.saveData("token", response.token)
          this.router.navigate(["/spreed"])
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary:
              'Error',
            detail:
              "Usuario o contraseña incorrectos"
          });
        },
      })
  }

}
