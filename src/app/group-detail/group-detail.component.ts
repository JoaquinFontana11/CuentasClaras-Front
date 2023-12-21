import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="container mx-auto my-8">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-950"
      >
        Detalles del grupo '{{ grupo.name }}'<span
          class="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2"
          >{{ grupo?.category.icon }}</span
        >
      </h1>
    </div>
    <div class="relative overflow-x-auto">
      <div class="container mx-auto my-8">
        <table
          border="1"
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          style="width:80%"
        >
          <caption class="text-4xl font-bold text-gray-900 ">
            Miembros del grupo.
          </caption>
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Nombre.</th>
              <th scope="col" class="px-6 py-3">Apellido.</th>
              <th scope="col" class="px-6 py-3">Username.</th>
            </tr>
          </thead>
          <tbody>
            @for (item of grupo.members; track item.id) {
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700  "
            >
              <td class="w-4 p-4">>{{ item.name }}</td>
              <td class="w-4 p-4">>{{ item.lastName }}</td>
              <td class="w-4 p-4">>{{ item.userName }}</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
    <div class="container mx-auto my-8">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 content-end"
        style="width:80%"
      >
        <caption class="text-4xl font-bold text-gray-900 ">
          Historial de gastos del grupo.
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-blue-950 bg-blue-400 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4">>Monto</th>
            <th scope="col" class="p-4">>Comprobante</th>
            <th scope="col" class="p-4">>Categoria del gasto</th>
          </tr>
        </thead>
        <tbody>
          @for (item of gastosGrupos; track item.id) {
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
            <td class="w-4 p-4">>{{ item.amount }}</td>
            <td class="w-4 p-4">>{{ item.img }}</td>
            <td class="w-4 p-4">>{{ item.category.name }}</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class GroupDetailComponent {
  private routeSub: Subscription = new Subscription();
  grupo: any;
  gastosGrupos: any[] = [];
  categoria: any;
  id!: number;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params);
      console.log(params['id']);
      this.id = params['id'];
    });
    this.obtenerDetalle();
    this.obtenerGastos();
  }

  obtenerDetalle() {
    this.api.groupDetail(this.id).subscribe((detalle) => {
      console.log('DETALLE ENDPOINT' + detalle);
      this.grupo = detalle;
    });
    console.log('DETALLE' + this.grupo);
  }

  obtenerGastos() {
    this.api.groupExpenses(this.id).subscribe((gastos) => {
      console.log('GASTOS DEL GRUPO' + gastos);
      this.gastosGrupos = gastos;
    });
    console.log('gastos del grupo' + this.gastosGrupos);
    console.log();
  }
}
