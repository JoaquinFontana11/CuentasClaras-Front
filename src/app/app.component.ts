import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `<app-navbar /> <router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {

  constructor(private cookieService: CookieService, private router:Router){}
  /*
  ngOnInit(): void{
    if (this.cookieService.get("userId")){
      this.router.navigate(["/"])
    }else{
      this.router.navigate(["/login"])
    }
  }*/
  title = 'CuentasClaras';
}
