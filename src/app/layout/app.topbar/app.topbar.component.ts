import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterOutlet, MenubarModule, BadgeModule, NgClass, AvatarModule, CommonModule, InputTextModule],
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss'
})
export class AppTopbarComponent {

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home'
            },
            {
                label: 'Alumnos',
                icon: 'pi pi-user',
                routerLink: ['alumns/list']
            },
            {
                label: 'Grupos',
                icon: 'pi pi-search',
                routerLink: ['groups/list']
            },
            {
                label: 'Calificar',
                icon: 'pi pi-envelope',
                routerLink: ["spreed"]
            }
        ]
    }
}

