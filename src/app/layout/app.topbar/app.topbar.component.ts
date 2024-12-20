import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { LocalService } from '../../shared/storage.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [MenubarModule, BadgeModule, NgClass, AvatarModule, CommonModule, InputTextModule, OverlayPanelModule, ButtonModule],
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss'
})
export class AppTopbarComponent {

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

      logout(overlayPanel: any) {
        this.localService.clearData();
        overlayPanel.hide();
        this.router.navigate(['/auth/login']);
      }
}

