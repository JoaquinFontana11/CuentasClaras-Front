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
        <div class="flex items-center ">
          <img src="assets/img/billetera.png" class="h-8" alt="Logo" />
        </div>
        <div class="items-center gap-3 flex w-auto">
          <ul
            class="flex p-0 font-medium border-gray-100 rounded-lg flex-row mt-0 border-0 bg-white"
          >
            <li>
              <a
                href="/pagos"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 p-0"
                >Pagos</a
              >
            </li>
            <li>
              <a
                href="/grupos"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 p-0"
                >Grupos</a
              >
            </li>
            <li>
              <a
                href="/gastos"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 p-0"
                >Gastos</a
              >
            </li>
          </ul>
        </div>
        <div class="flex">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {}
