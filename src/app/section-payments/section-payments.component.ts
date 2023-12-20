import { Component } from '@angular/core';

@Component({
  selector: 'app-section-payments',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col items-center w-full">
      <table>
        <thead>
          <tr>
            <th>Grupo/Usuario</th>
            <th>Fecha</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items; track item.id) {
          <tr>
            <th>{{ item.owner }}</th>
            <th>
              {{ item.date.toLocaleString('en-GB').split(',')[0] }}
            </th>
            <th>{{ item.amount }}</th>
          </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: ``,
})
export class SectionPaymentsComponent {
  dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
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
