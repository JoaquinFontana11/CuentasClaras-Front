import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="flex flex-col w-full gap-5">
      <h1 class="text-4xl font-bold mb-3 self-center">Mis Grupos</h1>
      <div class="flex flex-col gap-1 mx-10">
        <label class="text-lg font-semibold">Nombre del Grupo</label>
        <input
          class="w-60 border border-black rounded-lg text-lg shadow-md"
          id="group_name"
          type="text"
          placeholder="Inserte nombre de grupo..."
          [(ngModel)]="groupName"
        />
      </div>
      <hr class="border-3 w-full" />
      <div class="grid grid-cols-4 m-10 gap-5">
        @for (group of groups; track group.id) { @if
        (group.name.toLocaleLowerCase().includes(groupName.toLowerCase())) {
        <a
          href="grupos/detalle/{{ group.id }}"
          class="flex items-center justify-center px-20 py-10 border-2 border-indigo-700 bg-slate-200 rounded-md hover:-translate-y-2 transform duration-300 hover:shadow-lg"
        >
          {{ group.name }}
        </a>
        } }
      </div>
    </section>
  `,
  styles: ``,
})
export class GroupsComponent {
  groups: any[] = [];

  groupName = '';

  constructor(private api: ApiService, private cookieService: CookieService) {}

  ngOnInit() {
    this.obtenerGrupos();
  }

  obtenerGrupos() {
    this.api
      .getUsuario(this.cookieService.get('userId'))
      .subscribe((usuario) => {
        this.groups = usuario.groups;
      });
  }

  redirect(groupId: number) {}
}
