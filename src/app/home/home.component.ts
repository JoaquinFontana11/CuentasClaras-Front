import { Component, OnInit } from '@angular/core';
import { SectionMoneyComponent } from '../section-money/section-money.component';
import { SectionGroupsComponent } from '../section-groups/section-groups.component';
import { ApiService } from '../service/api.service';
import { SectionPaymentsComponent } from '../section-payments/section-payments.component';

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
    <hr class="border-2 my-5" />
    <div>
      <h2>Usuarios 🧔</h2>
      <ul>
        @for (item of usuarios; track item.id) {
        <li>{{ item.userName }}</li>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.apiService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
