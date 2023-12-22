import { NgIf } from '@angular/common';
import { Component, OnInit, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  template: `
    <nav
      class="bg-white sticky z-20 w-full top-0 start-0 border-b border-gray-200 "
    >
      <div class="w-full flex flex-row items-center justify-between p-4">
        <div class="flex items-center">
          <a class=" " href="/">
            <img src="assets/img/billetera.png" class="h-8" alt="Logo" />
          </a>
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 m-4"
              (click)="toggleList()"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <div
              class="shadow-lg flex flex-col gap-2 absolute top-0 m-10 bg-gray-600 border-gray-700  rounded-lg"
            >
              <ul
                *ngIf="showList"
                class="flex p-0 font-medium rounded-lg flex-col mt-0 border-0 "
              >
                @for (invitation of invitations; track $index){
                @if(!invitation.state){
                <li>
                  <div class="w-full max-w-sm  border  shadow ">
                    <div class="flex flex-row gap-2 items-center pb-2 m-2">
                      <span class="mb-1 text-xl font-small  text-white">
                        {{ invitation.inviteName }}
                      </span>
                      <div class="items-center">
                        <svg
                          (click)="accept(invitation.id, $index)"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 bg-green-100 rounded-lg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <div>
                        <svg
                          (click)="reject(invitation.id, $index)"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 bg-red-100 rounded-lg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
                } }
              </ul>
            </div>
          </div>
        </div>
        <div class="items-center gap-3 flex w-auto">
          <div *ngIf="this.cookieService.get('userId')">
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
        </div>
        <div class="flex gap-3">
          <div *ngIf="this.cookieService.get('userId')">
            <button
              (click)="onCerrarSesion()"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Cerrar Sesion
            </button>
          </div>
          <div *ngIf="!this.cookieService.get('userId')">
            <a
              href="/login"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Iniciar Sesion
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent implements OnInit {
  existeCookie: boolean = false;
  showList: boolean = false;
  invitations: any[] = [];
  constructor(
    public cookieService: CookieService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getUsuario(this.cookieService.get('userId')).subscribe({
      next: (res) => {
        this.invitations = res.invitations;
      },
      error: (err) => {},
    });
  }

  toggleList() {
    this.showList = !this.showList;
  }

  accept(id: string, index: number) {
    this.apiService.acceptInvitation(id).subscribe();
    this.invitations.splice(index, 1);
  }

  reject(id: string, index: number) {
    this.apiService.rejectInvitation(id).subscribe();
    this.invitations.splice(index, 1);
  }

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

  onCerrarSesion() {
    this.cookieService.delete('userId');
    this.router.navigate(['/login']);
  }
}
