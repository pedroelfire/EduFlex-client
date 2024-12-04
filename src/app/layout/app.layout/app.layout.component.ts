import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppTopbarComponent } from "../app.topbar/app.topbar.component";
import { AppLandingTopbarComponent } from "../app.landing-topbar/app.landing-topbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app.layout',
  standalone: true,
  imports: [RouterOutlet, AppTopbarComponent, AppLandingTopbarComponent, CommonModule],
  templateUrl: './app.layout.component.html',
  styleUrl: './app.layout.component.scss'
})
export class AppLayoutComponent {
  constructor(public router: Router){}
}
