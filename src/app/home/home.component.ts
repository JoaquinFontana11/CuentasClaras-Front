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
    @if (this.cookieService.get("userId")){
    <app-section-money />
    <hr class="border-2 my-5" />
    <app-section-groups />
    <hr class="border-2 my-5" />
    <app-section-payments />
    } @else {
      <section class="w-full flex flex-col gap-2">
        <p class="font-bold text-xl">Bienvenido a Cuentas Claras</p>
        <p class="font-semibold text-xl">Para acceder a todas las funcionalidades, por favor Inicia Sesion!</p>
      </section>
    }
  `,
  styles: ``,
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private apiService: ApiService, public cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(!this.cookieService.get("userId")){
      this.router.navigate(["/login"]);
    }
  }

}
