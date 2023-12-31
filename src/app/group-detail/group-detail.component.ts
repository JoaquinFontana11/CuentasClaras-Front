import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto my-8">
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-blue-950"
      >
        Detalles del grupo '{{ grupo.name }}'
        <a
          href="/grupos/editar/{{ id }}"
          class="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300 dark:hover:text-blue-900"
        >
          Editar
        </a>
      </h1>
      <h2
        class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black"
      >
        La categoria del grupo es '{{ grupo.category.name }}'
      </h2>
    </div>
    <h3>
      <div class="container mx-auto my-8">
        <button
          class="bg-blue-500 text-white p-2 rounded"
          (click)="toggleList()"
        >
          Enviar invitación
        </button>
        <div *ngIf="showList" class="inline-block relative">
          <div
            class="shadow-lg absolute top-0 left-0 mt-2 bg-gray-600 border-gray-700 rounded-lg p-4 z-20"
          >
            <form (submit)="sendInvitation()">
              <input
                type="email"
                id="inviteEmail"
                class="border rounded px-2 py-1 w-64"
                placeholder="Ingrese el correo electrónico"
                [(ngModel)]="inviteEmail"
                name="inviteEmail"
              />
              <input
                type="submit"
                value="Enviar"
                class="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              />
            </form>
          </div>
        </div>
      </div>
    </h3>
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
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">Nombre.</th>
              <th scope="col" class="px-6 py-3">Apellido.</th>
              <th scope="col" class="px-6 py-3">Username.</th>
            </tr>
          </thead>
          <tbody>
            @for (item of grupo.members; track item.id) {
            <tr class="bg-white border-b  ">
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
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4">Monto</th>
            <th scope="col" class="p-4">Comprobante</th>
            <th scope="col" class="p-4">Categoria del gasto</th>
          </tr>
        </thead>
        <tbody>
          @for (item of gastosGrupos; track item.id) {
          <tr class="bg-white border-b ">
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
  showList: boolean = false;
  inviteEmail: any;
  inviteUser: any;
  id!: number;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.obtenerDetalle();
    this.obtenerGastos();
  }

  obtenerDetalle() {
    this.api.groupDetail(this.id).subscribe((detalle) => {
      this.grupo = detalle;
    });
  }

  obtenerGastos() {
    this.api.groupExpenses(this.id).subscribe((gastos) => {
      this.gastosGrupos = gastos;
    });
  }

  toggleList() {
    this.showList = !this.showList;
  }

  sendInvitation() {
    this.api.getUserByEmail(this.inviteEmail).subscribe({
      next: async (res) => {
        this.inviteUser = res;
        this.api
          .sendInvitation(this.grupo.name, res.id, this.grupo.id)
          .subscribe((user) => {});
        this.showList = false;
      },
      error: (err) => {},
    });
  }
}
