import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
              Crear grupo
            </h1>
            <form class="space-y-4 md:space-y-6" action="">
              <div>
                <label
                  for="nombre"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >nombre</label
                >
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  [(ngModel)]="nombre"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre del grupo."
                  required=""
                />
                <div *ngIf="nombre.errors?.['required']" class="alert">
                  Nombre del grupo requerido
                </div>
              </div>
              <div>
                <label
                  for="Categoria"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >categoria</label
                >
                <select placeholder="Seleccione una categoria"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required>
                @for (cat of categorias; track cat.name){   
                  <option value="cat.name">{{ cat.name }}

                  </option>
                }
                </select>
              </div>
              <button (click)="crear()">Crear</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class GroupNewComponent {
  nombre: string = '';
  cat: string = '';
  categorias :any[] = [];
  ngOnInit(): void {
    this.obtenerCategorias();
  }
  constructor(private api: ApiService) {}

  crear() {
    this.api
      .saveGroup(this.nombre,this.cat)
      .subscribe() 
  }

  obtenerCategorias() {
    this.api.getCategories().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

}
