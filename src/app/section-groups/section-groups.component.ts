import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-section-groups',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col items-center w-full my-5 relative gap-5">
      <h1 class="text-4xl font-bold mb-3">Mis Grupos</h1>
      <div class="flex gap-5">
        @for (item of items; track item.id) {
        <a
          href="/grupos/detalle/{{ item.id }}"
          class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-10 py-5 text-center text-xl"
        >
          {{ item.name }}
        </a>
        }
      </div>
      @if (items.length > 4){
      <div
        class="absolute right-0 top-24 m-5 text-lg hover:text-indigo-600 transform hover:-translate-y-2 duration-500"
      >
        <a class="flex flex-row items-center gap-1" href="/grupos"
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
export class SectionGroupsComponent implements OnInit {

  valorCookie: string = '';
  items: any[] = []

  constructor(private cookieService: CookieService, private apiService: ApiService) { }
  ngOnInit(): void {
    this.valorCookie = this.cookieService.get("userId")
    this.apiService.getUsuario(this.valorCookie).subscribe({
      next: async (res) => {
        this.items = res.groups;
      }, error: (err) => {
      }
    })

  }
}
