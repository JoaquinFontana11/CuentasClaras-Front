import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="flex flex-col w-full gap-5">
      <h1 class="text-4xl font-bold mb-3 self-center">Mis Gastos</h1>
      <hr class="border-3 w-full" />
      <div class="flex items-center justify-center">
        <table class="w-5/6 text-lg text-left text-gray-500">
          <thead class="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Monto</th>
              <th scope="col" class="px-6 py-3">Categoria</th>
              <th scope="col" class="px-6 py-3">Comprobante</th>
              <th scope="col" class="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (expense of expenses; track expense.id) {
            <tr class="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ expense.amount }}
              </th>
              <td class="px-6 py-4">
                {{ expense.category.name }}
              </td>
              <td class="max-w-32 px-6 py-4">
                <span>{{ expense.img }}</span>
              </td>
              <td class="px-6 py-4">
                <a
                  href="/gastos/editar/{{ expense.id }}"
                  class="text-white border border-green-700 bg-green-800 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg p-2 text-center"
                  >Editar</a
                >
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: ``,
})
export class ExpensesComponent implements OnInit {
  expenses: any[] = [];
  expenseName = '';

  constructor(private apiService: ApiService,private cookieService:CookieService ) {}

  ngOnInit(): void {
    this.getExpenses(this.cookieService.get("userId"));
  }

  getExpenses(user_id: any) {
    this.apiService.getExpenses(user_id).subscribe((expenses) => {
      this.expenses = expenses;
    });
    console.log(this.expenses);
  }
}
