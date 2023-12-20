import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-section-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Ingresar a Cuentas Claras
            </h1>
            <form class="space-y-4 md:space-y-6" action="">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Username</label
                >
                <input
                  type="username"
                  name="username"
                  id="username"
                  [(ngModel)]="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="usuario123"
                  required=""
                />
                <div *ngIf="username.errors?.['required']" class="alert">
                  username requerido
                </div>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  [(ngModel)]="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button (click)="onLogin()">Sign in</button>
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

  result: any;

  ngOnInit(): void {}
  constructor(private api: ApiService, private cookieService: CookieService) {}

  onLogin() {
    this.api
      .login(this.username, this.password)
      .subscribe((res: Observable<any>) => {
        this.result = res;
        if (res) {
          this.cookieService.set('userId', this.result);
        } else {
        }
      });
  }
}
