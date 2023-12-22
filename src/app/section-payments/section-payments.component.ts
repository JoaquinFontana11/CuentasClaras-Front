import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-section-payments',
  standalone: true,
  imports: [],
  template: `
    <section class="w-full m-auto relative">
      <div
        class="flex flex-col items-center justify-center w-full m-auto gap-5"
      >
        <h1 class="text-4xl font-bold mb-3">Pagos Pendientes</h1>
        <table class="w-2/3 text-lg text-left text-gray-500">
          <thead class="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Grupo/Usuario</th>
              <th scope="col" class="px-6 py-3">Categoria
              <th scope="col" class="px-6 py-3">Fecha</th>
              <th scope="col" class="px-6 py-3">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            @for (item of items; track item.id) {
            <tr class="bg-white border-b hover:bg-gray-50">
              @if (item.expense.groupOwner){
                <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{item.expense.groupOwner.name}}
              </th>
              } @else{
                <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{item.expense.userOwner.name}}
              </th>
              }
              
              <td class ="px-6 py-4">
                {{item.expense.category.name}}
              </td>
              <td class="px-6 py-4">
                {{ item.date.toLocaleString('en-GB').split(',')[0] }}
              </td>
              <td class="px-6 py-4">{{ item.amount }}</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
      @if (items.length > 5){
      <div
        class="absolute right-0 top-80 m-5 text-lg hover:text-indigo-600 transform hover:-translate-y-2 duration-500"
      >
        <a class="flex flex-row items-center gap-1" href="/pagos"
          >Ver mas
          <span class="inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              data-slot="icon"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </a>
      </div>
    }
    </section>
  `,
  styles: ``,
})
export class SectionPaymentsComponent implements OnInit {

  valorCookie: string = '';
  items: any[] = []
  owner: string = ''

  constructor(private cookieService: CookieService, private apiService: ApiService) { }
  ngOnInit(): void {
    this.valorCookie = this.cookieService.get("userId")
    this.apiService.getUsuario(this.valorCookie).subscribe({
      next: (res) => {
        this.items = res.payments;
      }, error: (err) => {
      }
    })
  }



  dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
}
