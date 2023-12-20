import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav
      class="bg-white sticky z-20 w-full top-0 start-0 border-b border-gray-200 mb-10"
    >
      <div class="w-full flex flex-row items-center justify-between p-4">
        <a class="flex items-center " href="/">
          <img src="assets/img/billetera.png" class="h-8" alt="Logo" />
        </a>
        <div class="items-center gap-3 flex w-auto">
          <ul
            class="flex p-0 font-medium border-gray-100 rounded-lg flex-row mt-0 border-0 bg-white"
          >
            @for (menu of menus; track menu.name) { @if (menu.submenus.length
            !== 0) {
            <li>
              <button
                (click)="menu.dropdown = !menu.dropdown"
                class="flex flex-row items-center gap-1 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 p-0"
              >
                <span>{{ menu.name }}</span>
                @if(menu.dropdown) {
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                }
              </button>
            </li>

            @if (menu.dropdown) {
            <div
              class="bg-slate-100 shadow-lg flex flex-col gap-2 absolute m-10"
            >
              @for (submenu of menu.submenus; track submenu.name) {
              <li>
                <a
                  href="{{ submenu.href }}"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 p-0"
                  >{{ submenu.name }}</a
                >
              </li>
              }
            </div>
            } } @else {
            <li>
              <a
                href="{{ menu.href }}"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 p-0"
                >{{ menu.name }}</a
              >
            </li>
            } }
          </ul>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Cerrar Sesion
          </button>
          <a
            href="/login"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Iniciar Sesion
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {
  menus = [
    {
      name: 'Pagos',
      dropdown: false,
      submenus: [],
      href: '/pagos',
    },
    {
      name: 'Grupos',
      dropdown: false,
      submenus: [
        {
          name: 'Nuevo Grupo',
          href: '/grupos/nuevo',
        },
        {
          name: 'Mis Grupos',
          href: '/grupos',
        },
        {
          name: 'Invitaciones',
          href: '/grupos/invitaciones',
        },
      ],
      href: '',
    },
  ];
}
