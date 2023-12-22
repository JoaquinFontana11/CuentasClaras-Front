import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  template: `
    <section class="bg-gray-50 ">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 "
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl "
            >
              Crear grupo
            </h1>
            <form class="space-y-4 md:space-y-6" (ngSubmit)="crear()" #groupForm="ngForm">
    <!-- ... -->
    <div>
      <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 "><span class="text-red-500">(**)</span> Nombre</label>
      <input
        type="text"
        name="nombre"
        id="nombre"
        [(ngModel)]="nombre"
        #nombreInput="ngModel"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder="Nombre del grupo."
        required=""
      />
    </div>
    <div>
      <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 "><span class="text-red-500">(**)</span> Categoría</label>
      <select
        [(ngModel)]="cat"
        name="categoria"
        id="categoria"
        placeholder="Seleccione una categoría"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        required
      >
        <option value="">Seleccione una categoría</option>
        <option *ngFor="let categoria of categorias" [value]="categoria.name">{{ categoria.name }}</option>
      </select>
    </div>
    <button type="submit" [hidden]="groupForm.invalid" class="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 mt-auto">Crear</button>

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
