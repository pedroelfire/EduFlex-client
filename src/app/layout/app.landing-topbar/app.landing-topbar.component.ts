import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { OverlayModule } from 'primeng/overlay';
import { LocalService } from '../../shared/storage.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-landing-topbar',
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, CommonModule, InputTextModule, OverlayPanelModule, ButtonModule],
    templateUrl: './app.landing-topbar.component.html',
    styleUrl: './app.landing-topbar.component.scss'
})
export class AppLandingTopbarComponent {

    constructor(
        private localService: LocalService,
         private router: Router
    ){}

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Calificar',
                icon: 'pi pi-envelope',
                routerLink: ["spreed"]
            },

            {
                label: 'Alumnos',
                icon: 'pi pi-users',
                routerLink: ['alumns/list']
            },
            {
                label: 'Grupos',
                icon: 'pi pi-building',
                routerLink: ['groups/list']
            },

        ]
    }
}

