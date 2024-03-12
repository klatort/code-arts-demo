import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';	
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatListModule } from '@angular/material/list'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatIconModule,
    RouterOutlet, 
    SidenavComponent, 
    MatListModule,
    NavbarComponent, 
    MatSidenavModule,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'code-arts-demo';
  opened: string = 'opened';

  onOpenedChange(opened: any) {
    this.opened = opened;
    console.log('opened from app', opened);
  }
}
