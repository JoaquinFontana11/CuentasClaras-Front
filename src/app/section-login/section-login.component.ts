import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <section>
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0"
      >
        <div class="w-fullrounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight">
              Ingresar a Cuentas Claras
            </h1>
            <form class="space-y-4 md:space-y-6" (submit)="onLogin()">
              <div>
                <label for="username" class="block mb-2 text-sm font-medium"
                  >Username</label
                >
                <input
                  type="username"
                  name="username"
                  id="username"
                  [(ngModel)]="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="usuario123"
                  required=""
                />
                <div *ngIf="!username" class="alert font-medium text-red-600">
                  username requerido
                </div>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  [(ngModel)]="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />

                <div *ngIf="!password" class="alert font-medium text-red-600">
                  password requerido
                </div>
              </div>
              <button
                type="submit"
                class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Iniciar Sesion
              </button>
              <a
                href="/register"
                class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >Registrarse</a
              >
              <div *ngIf="errors" class="alert font-medium text-red-600">
                {{ errors }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class SectionLoginComponent {
  username: string = '';
  password: string = '';
  errors: String = '';

  ngOnInit(): void {}
  constructor(
    private api: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  setPayments(res: number) {
    this.api.getUser(res).subscribe((user) => {
      user.payments.forEach((payment: any) => {
        if (payment.expense.recurrent) {
          let date;
          let rec = false;
          switch (payment.expense.recurrency) {
            case 'semanal':
              date = new Date(payment.expense.date);
              if (date.getTime() < Date.now() - 604800016.56) rec = true;
              break;
            case 'mensual':
              date = new Date(payment.expense.date);
              if (date.getTime() < Date.now() - 2629800000) rec = true;
              break;
            case 'anual':
              date = new Date(payment.expense.date);
              if (date.getTime() < Date.now() - 31557600000) rec = true;
              break;
          }
          if (rec) {
            const body = {
              user: res,
              expense: payment.expense.id,
              amount: payment.amount,
            };
            this.api.setPayment(body).subscribe();
          }
        }
      });
    });
  }

  onLogin() {
    this.api.login(this.username, this.password).subscribe({
      next: async (res: any) => {
        await this.cookieService.set('userId', res);
        this.setPayments(res);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.errors = err.error.message;
      },
    });
  }
}
