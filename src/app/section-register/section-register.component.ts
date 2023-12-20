import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-section-register',
  standalone: true,
  imports: [FormsModule,NgIf],
  template: `
  <section class="bg-gray-50">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-fullrounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 "
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight"
            >
              Registrate en Cuentas Claras
            </h1>
            <form class="space-y-4 md:space-y-6" (submit)="onRegister()">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium"
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
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium"
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
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium"
                  >Nombre</label
                >
                <input
                  type="name"
                  name="name"
                  id="name"
                  [(ngModel)]="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre"
                  required=""
                />
              </div>
              <div>
                <label
                  for="lastName"
                  class="block mb-2 text-sm font-medium"
                  >Apellido</label
                >
                <input
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  [(ngModel)]="lastName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Apellido"
                  required=""
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  [(ngModel)]="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
              <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign in</button>
              <div *ngIf="errors" class="alert font-medium text-red-600">
                {{errors}}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class SectionRegisterComponent {
  

  username: string ='';
  password: string ='';
  name: string ='';
  lastName: string ='';
  email: string ='';
  errors: string ='';

  ngOnInit(): void {}
  constructor(private api: ApiService, private cookieService: CookieService, private router: Router, private validators: Validators) {}

  onRegister(){
    

    this.api.register(this.username,this.name,this.lastName,this.email,this.password).subscribe({
      next:(res) =>{
        console.log("registro exitoso");
        this.router.navigate(["/login"])
      }, error: (err) =>{
        this.errors = err.error.message;
      }
    })
  }

  

}
