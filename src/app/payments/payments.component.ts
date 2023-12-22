import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [],
  template: `
    <section class="w-full m-auto relative">
      <div
        class="flex flex-col items-center justify-center w-full m-auto gap-5"
      >
        <h1 class="text-4xl font-bold mb-3">Pagos Pendientes</h1>
        <table class="w-2/3 text-lg text-left text-gray-500">
          <thead class="text-lg text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Grupo/Usuario</th>
              <th scope="col" class="px-6 py-3">Fecha</th>
              <th scope="col" class="px-6 py-3">Cantidad</th>
              <th scope="col" class="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (item of items; track item.id) {
            <tr class="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ item.owner }}
              </th>
              <td class="px-6 py-4">
                {{ item.date.toLocaleString('en-GB').split(',')[0] }}
              </td>
              <td class="px-6 py-4">{{ item.amount }}</td>
              <td class="px-6 py-4">
                <button
                  class="p-2 border-1 border-green-300 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg hover:shadow-xl"
                >
                  Pagar
                </button>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: ``,
})
export class PaymentsComponent {
  items = [
    {
      id: 0,
      owner: 'Pepe',
      date: new Date(),
      amount: 10,
    },
    {
      id: 1,
      owner: 'Pepe',
      date: new Date(),
      amount: 10,
    },
    {
      id: 2,
      owner: 'Pepe',
      date: new Date(),
      amount: 10,
    },
    {
      id: 3,
      owner: 'Pepe',
      date: new Date(),
      amount: 10,
    },
  ];
}
