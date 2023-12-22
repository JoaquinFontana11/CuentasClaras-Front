import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-expenses-new',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <section class="flex flex-row justify-center gap-2 w-full mx-1">
      <div class="w-5/6 bg-slate-200 rounded-lg shadow-lg p-6">
        <form
          [formGroup]="expense"
          (ngSubmit)="submit()"
          class="flex flex-col items-center"
        >
          <div class="flex flex-row gap-2 mb-5">
            <label for="amount">Tipo de Gasto</label>
            <select name="type" id="type" formControlName="type">
              <option value="group">Grupo</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          @if (expense.value.type) {

          <div class="flex flex-row gap-5 w-full">
            @if (expense.value.type === "group") {
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="groupOwner">Grupo</label>
              <select
                class="w-20"
                name="groupOwner"
                id="groupOwner"
                formControlName="groupOwner"
              >
                @for (group of user.groups; track group.name) {
                <option value="{{ group.id }}">
                  {{ group.name }}
                </option>
                }
              </select>
            </div>
            } @else {
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="userOwner">Usuario</label>
              <select
                class="w-20"
                name="userOwner"
                id="uerOwner"
                formControlName="userOwner"
              >
                <option value="{{ user.id }}">
                  {{ user.userName }}
                </option>
              </select>
            </div>
            }
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="amount">Precio</label>
              <input
                class="w-16"
                type="number"
                id="amount"
                name="amount"
                formControlName="amount"
              />
            </div>
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="img">Imagen</label>
              <input
                class="w-32"
                type="text"
                id="img"
                name="img"
                formControlName="img"
              />
            </div>
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="category">Categoria</label>
              <select
                class="w-20"
                name="categroy"
                id="category"
                formControlName="category"
              >
                @for (category of categories; track category.name) {
                <option value="{{ category.name }}">
                  {{ category.name }}
                </option>
                }
              </select>
            </div>
          </div>
          @if(expense.value.type === "group") {
          <div class="flex flex-row gap-8 items-start w-full">
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="divison"
                >Tipo de Division</label
              >
              <select
                class="w-32 h-6"
                name="division"
                id="divison"
                formControlName="division"
              >
                <option value="Equals %">Equitativo %</option>
                <option value="Equals amount">Equitativo Monto</option>
                <option value="Manual %">Manual %</option>
                <option value="Manual amount">Manual Monto</option>
              </select>
            </div>
            @switch (expense.value.division) { @case ("Equals %") {
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="eq-percentaje"
                >Porcentaje</label
              >
              <input
                class="w-20"
                type="number"
                id="eq-percentaje"
                name="eq-percentaje"
                formControlName="eq-percentaje"
              />
            </div>
            } @case ("Equals amount") {
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="eq-amount">Monto</label>
              <input
                class="w-20"
                type="number"
                id="eq-amount"
                name="eq-amount"
                formControlName="eq-amount"
              />
            </div>
            } @case ("Manual %") {
            <form
              class="flex flex-row gap-2 justify-center"
              [formGroup]="manPercentaje"
              (ngSubmit)="addManPercentaje()"
            >
              <label class="font-semibold" for="memeber">Miembro</label>
              <select
                class="w-24"
                name="member"
                id="member"
                formControlName="member"
              >
                @for (member of group.members; track $index) {
                <option value="{{ member.id_user }}">
                  {{ member.userName }}
                </option>
                }
              </select>
              <label class="font-semibold" for="percentaje">Monto</label>
              <input
                class="w-16"
                type="number"
                id="percentaje"
                name="percentaje"
                formControlName="percentaje"
              />
              <input
                class="border-1 border-green-400 bg-green-600 hover:bg-green-500 rounded-full w-6 h-6 flex justify-center shadow-lg"
                type="submit"
                value="+"
              />
              <span
                >Añadidos: {{ this.expense.value.manPercentaje?.length }}</span
              >
            </form>
            } @case ("Manual amount") {
            <form
              class="flex flex-row gap-2 mb-5"
              [formGroup]="manAmount"
              (ngSubmit)="addManAmount()"
            >
              <label class="font-semibold" for="member">Miembro</label>
              <select
                class="w-24"
                name="member"
                id="member"
                formControlName="member"
              >
                @for (member of group.members; track $index) {
                <option value="{{ member.id_user }}">
                  {{ member.userName }}
                </option>
                }
              </select>

              <label class="font-semibold" for="amount">Monto</label>
              <input
                class="w-16"
                type="number"
                id="amount"
                name="amount"
                formControlName="amount"
              />
              <input
                class="border-1 border-green-400 bg-green-600 hover:bg-green-500 rounded-full w-6 h-6 flex justify-center shadow-lg"
                type="submit"
                value="+"
              />
              <span>Añadidos: {{ this.expense.value.manAmount?.length }}</span>
            </form>
            }}
          </div>
          } @else {
          <div class="flex flex-row gap-2 mb-5">
            <div class="flex flex-row gap-2 items-center">
              <label class="font-semibold" for="user">Usuario</label>
              <select
                class="w-28"
                name="onlyUser"
                id="onlyUser"
                formControlName="onlyUser"
              >
                @for (user of allUsers; track user.id) {
                <option value="{{ user.id }}">
                  {{ user.userName }}
                </option>
                }
              </select>
            </div>
            <div class="flex flex-row gap-2 mb-2">
              <label class="font-semibold" for="user-amount">Monto</label>
              <input
                class="w-16"
                type="number"
                id="user-amount"
                name="user-amount"
                formControlName="user-amount"
              />
            </div>
          </div>
          } @if (expense.value.type === "group") {

          <form
            class="flex flex-row gap-5 items-center mb-5"
            [formGroup]="amountUsers"
            (ngSubmit)="addAmountUser()"
          >
            <div class="flex flex-row gap-2 items-center">
              <label class="font-semibold" for="user">Usuario que aporto</label>
              <select class="w-28" name="user" id="user" formControlName="user">
                @for (member of group.members; track member.id_user) {
                <option value="{{ member.id_user }}">
                  {{ member.userName }}
                </option>
                }
              </select>
            </div>
            <div class="flex flex-row gap-5 items-center">
              <label class="font-semibold" for="amount">Monto</label>
              <input
                class="w-16"
                type="number"
                id="amount"
                name="amount"
                formControlName="amount"
              />
              <input
                class="border-1 border-green-400 bg-green-600 hover:bg-green-500 rounded-full w-6 h-6 flex justify-center shadow-lg"
                type="submit"
                value="+"
              />
              <span
                >Añadidos: {{ this.expense.value.amountUsers?.length }}</span
              >
            </div>
          </form>
          } @else {
          <div class="flex flex-row gap-2 mb-5">
            <label class="font-semibold" for="my-amount">Lo aportado</label>
            <input
              class="w-16"
              type="number"
              id="my-amount"
              name="my-amount"
              formControlName="my-amount"
            />
          </div>
          }

          <div class="flex flex-row gap-5 w-full mb-5">
            <div class="flex flex-row gap-2">
              <label class="font-semibold" for="recurent">Recurrente</label>
              <select
                class="w-12"
                name="recurrent"
                id="recurrent"
                formControlName="recurrent"
              >
                <option value="{{ true }}">Si</option>
                <option value="{{ false }}">No</option>
              </select>
            </div>
            @if(expense.value.recurrent) {
            <div class="flex flex-row gap-2">
              <label class="font-semibold" for="recurrency">Lapso</label>
              <select
                class="w-24"
                name="recurrency"
                id="recurrency"
                formControlName="recurrency"
              >
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            <div class="flex flex-row gap-2">
              <label class="font-semibold" for="cantRecurrencia"
                >Veces que se repite</label
              >
              <input
                class="w-16"
                type="number"
                id="cantRecurrency"
                name="cantRecurrency"
                formControlName="cantRecurrency"
              />
            </div>
            }
          </div>
          }
          <input
            class="border-1 border-green-400 bg-green-600 hover:bg-green-500 rounded-md py-2 px-5 flex justify-center shadow-lg text-white"
            type="submit"
            value="Enviar"
          />
        </form>
      </div>
    </section>
  `,
  styles: ``,
})
export class ExpensesNewComponent implements OnInit {
  expense = new FormGroup({
    type: new FormControl(null, Validators.required),
    amount: new FormControl(0, Validators.required),
    img: new FormControl(null, Validators.required),
    recurrent: new FormControl(false, Validators.required),
    recurrency: new FormControl(),
    cantRecurrency: new FormControl(),
    category: new FormControl(null, Validators.required),
    groupOwner: new FormControl(),
    userOwner: new FormControl(),

    division: new FormControl(),
    'eq-percentaje': new FormControl(),
    'eq-amount': new FormControl(),
    manPercentaje: new FormControl<{ member_id: number; percentaje: number }[]>(
      []
    ),
    manAmount: new FormControl<{ member_id: number; amount: number }[]>([]),

    onlyUser: new FormControl(),
    'user-amount': new FormControl(),
    'my-amount': new FormControl(),
    amountUsers: new FormControl<{ user_id: number; amount: number }[]>([]),
  });

  manPercentaje = new FormGroup({
    member: new FormControl(null, Validators.required),
    percentaje: new FormControl(null, Validators.required),
  });

  manAmount = new FormGroup({
    member: new FormControl(null, Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  amountUsers = new FormGroup({
    user: new FormControl(null, Validators.required),
    amount: new FormControl(0, Validators.required),
  });

  categories: any[] = [];
  user = { id: 0, userName: '', groups: [{ id: 0, name: '' }] };
  allUsers: any[] = [];
  group = { members: [{ id_user: 0, userName: '' }] };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCategories().subscribe((categories) => {
      categories.forEach((cat: any) => {
        if (!cat.group) this.categories.push(cat);
      });
    });

    this.apiService.getUser(5).subscribe((user) => {
      this.user = user;
    });

    this.apiService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
    });

    this.expense.get('groupOwner')?.valueChanges.subscribe((value: any) => {
      this.apiService.getGroupByID(value).subscribe((group) => {
        this.group = group;
      });
    });

    this.expense.get('recurrent')?.valueChanges.subscribe((value: any) => {
      let bool = false;
      if (value === 'true') bool = true;
      this.expense.get('recurrent')?.setValue(bool, { emitEvent: false });
    });
  }

  addManPercentaje() {
    console.log(this.manPercentaje);
    const obj = {
      member_id: this.manPercentaje.value.member!,
      percentaje: this.manPercentaje.value.percentaje!,
    };
    this.expense.value['manPercentaje']?.push(obj);
    console.log(this.expense.value['manPercentaje']);
  }

  addManAmount() {
    console.log(this.manAmount);
    const obj = {
      member_id: this.manAmount.value.member!,
      amount: this.manAmount.value.amount!,
    };
    this.expense.value['manAmount']?.push(obj);
    console.log(this.expense.value['manAmount']);
  }

  addAmountUser() {
    console.log(this.amountUsers.value);
    console.log(this.group.members);
    const obj = {
      user_id: this.amountUsers.value.user!,
      amount: this.amountUsers.value.amount!,
    };

    this.expense.value['amountUsers']?.push(obj);
    console.log(this.expense.value['amountUsers']);
  }

  setDivisions(divisionType: string, amount: number) {
    const divisions: any[] = [];
    console.log(divisionType, amount);
    switch (divisionType) {
      case 'Equals %': {
        this.group.members.forEach((member) => {
          const div = {
            amount: (this.expense.value['eq-percentaje']! / 100) * amount,
            userOwner: {
              id: member.id_user,
            },
          };
          divisions.push(div);
        });
        break;
      }
      case 'Equals amount': {
        this.group.members.forEach((member) => {
          const div = {
            amount: this.expense.value['eq-amount']!,
            userOwner: {
              id: member.id_user,
            },
          };
          divisions.push(div);
        });
        break;
      }
      case 'Manual %': {
        this.expense.value['manPercentaje']?.forEach((percentaje) => {
          const div = {
            amount: (percentaje.percentaje! / 100) * amount,
            userOwner: {
              id: percentaje.member_id,
            },
          };
          divisions.push(div);
        });
        break;
      }
      case 'Manual amount': {
        this.expense.value['manAmount']?.forEach((amount) => {
          const div = {
            amount: amount.amount,
            userOwner: {
              id: amount.member_id,
            },
          };
          divisions.push(div);
        });
        break;
      }
    }
    return divisions;
  }

  submit() {
    let realAmount = this.expense.value.amount!;
    const body: {
      type: string;
      amount: number;
      img: string;
      divisions: any[];
      recurrent: boolean;
      recurrency: string;
      cantRecurrency: number;
      category: { name: string };
      amountUsers: any[];
      userOwner?: { id: number };
      groupOwner?: { id: number };
    } = {
      amount: this.expense.value.amount!,
      img: this.expense.value.img!,
      type: this.expense.value.type!,
      category: { name: this.expense.value.category! },
      amountUsers: [],
      divisions: [],
      recurrent: false,
      recurrency: '',
      cantRecurrency: 0,
    };

    if (this.expense.value.recurrent) {
      body.recurrent = this.expense.value.recurrent;
      body.recurrency = this.expense.value.recurrency!;
      body.cantRecurrency = this.expense.value.cantRecurrency!;
    }
    if (this.expense.value.userOwner) {
      body.userOwner = { id: this.expense.value.userOwner! };
    } else {
      body.groupOwner = { id: this.expense.value.groupOwner! };
    }

    if (this.expense.value.type! === 'group') {
      this.expense.value['amountUsers']?.forEach((amount) => {
        realAmount -= amount.amount;
        const newAmount = {
          amount: amount.amount,

          userOwner: { id: amount.user_id },
        };
        body.amountUsers.push(newAmount);
      });

      body.divisions = this.setDivisions(
        this.expense.value.division!,
        realAmount
      );
    } else {
      const newAmount = {
        amount: this.expense.value['my-amount'],

        userOwner: { id: this.expense.value.userOwner },
      };
      body.amountUsers.push(newAmount);
      const div = {
        amount: this.expense.value['user-amount'],
        userOwner: {
          id: this.expense.value.onlyUser,
        },
      };
      body.divisions.push(div);
    }

    console.log(this.expense.value);
    console.log(body);

    this.apiService.setExpense(body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
