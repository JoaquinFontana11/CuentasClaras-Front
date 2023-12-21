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
  `,
  styles: ``,
})
export class HomeComponent {}
