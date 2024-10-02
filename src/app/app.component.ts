import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, MenubarModule, CommonModule, AvatarModule, BadgeModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'edu-front';

  sidebarVisible: boolean = false;
  items: any[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Página Principal', icon: 'pi pi-fw pi-home', routerLink: '/user' },
      { label: 'Lista de Estudiantes', icon: 'pi pi-fw pi-users', routerLink: '/spreed' },
      { label: 'Nuevo Grupo', icon: 'pi pi-fw pi-plus', routerLink: '/spreed/nuevo' },
      { label: 'Configuraciones', icon: 'pi pi-fw pi-cog', routerLink: '/settings' }
    ];
  }
}
