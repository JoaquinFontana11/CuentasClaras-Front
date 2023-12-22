import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-section-money',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col items-center w-full gap-5">
      <h1 class="text-4xl font-bold mb-3">Saldo Total</h1>
      <div
        class="flex flex-row gap-3 items-center bg-slate-200 pr-4 rounded-md"
      >
        <div
          class=" flex justify-center px-32 py-10 w-32 m-auto border-r-2 border-slate-400"
        >
          @if (hidden) {
          <span class="text-2xl">????</span>
          } @else {
          <span class="text-2xl">{{totalAPagar}}</span>
          }
        </div>
        <div class="mt-2">
          <button (click)="changeVisibility()">
            @if (hidden) {
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
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
            } @else {
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            }
          </button>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class SectionMoneyComponent implements OnInit {
  hidden = false;
  totalAPagar: number = 0;
  payments: any[] = [];

  constructor(private cookieService: CookieService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsuario(this.cookieService.get("userId")).subscribe({
      next: async (res) => {
        this.totalAPagar = res.money

      }, error: (err) => {

      }
    })
  }

  changeVisibility() {
    this.hidden = !this.hidden;
  }
}
