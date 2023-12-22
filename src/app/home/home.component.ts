import { Component, OnInit } from '@angular/core';
import { SectionMoneyComponent } from '../section-money/section-money.component';
import { SectionGroupsComponent } from '../section-groups/section-groups.component';
import { ApiService } from '../service/api.service';
import { SectionPaymentsComponent } from '../section-payments/section-payments.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SectionMoneyComponent,
    SectionGroupsComponent,
    SectionPaymentsComponent,
  ],
  template: `
    <app-section-money />
    <hr class="border-2 my-5" />
    <app-section-groups />
    <hr class="border-2 my-5" />
    <app-section-payments />
  `,
  styles: ``,
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    if (!this.cookieService.get("userId")) {
      this.router.navigate(["/login"]);
    }
  }

  obtenerUsuarios() {
    this.apiService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
