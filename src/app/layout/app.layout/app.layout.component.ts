import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbarComponent } from "../app.topbar/app.topbar.component";

@Component({
  selector: 'app-app.layout',
  standalone: true,
  imports: [RouterOutlet, AppTopbarComponent],
  templateUrl: './app.layout.component.html',
  styleUrl: './app.layout.component.scss'
})
export class AppLayoutComponent {

}
