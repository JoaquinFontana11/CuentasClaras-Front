import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-expenses-new',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <section class="flex flex-col justify-center items-center w-full gap-5">
      <div class="w-5/6 bg-slate-200 rounded-lg shadow-lg p-10">
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
          @if (expense.value.type) { @if (expense.value.type === "group") {
          <div>
            <label for="groupOwner">Grupo</label>
            <select
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
          <div>
            <label for="userOwner">Usuario</label>
            <select name="userOwner" id="uerOwner" formControlName="userOwner">
              <option value="{{ user.id }}">
                {{ user.userName }}
              </option>
            </select>
          </div>
          }
          <div>
            <label for="amount">Precio</label>
            <input
              type="number"
              id="amount"
              name="amount"
              formControlName="amount"
            />
          </div>
          <div>
            <label for="img">Imagen</label>
            <input type="text" id="img" name="img" formControlName="img" />
          </div>
          <div>
            <label for="category">Categoria</label>
            <select name="categroy" id="category" formControlName="category">
              @for (category of categories; track category.name) {
              <option value="{{ category.name }}">
                {{ category.name }}
              </option>
              }
            </select>
          </div>

          @if(expense.value.type === "group" && expense.value.groupOwner ) {
          <div class="flex flex-row gap-2 mb-5">
            <div>
              <label for="divison">Tipo de Division</label>
              <select name="division" id="divison" formControlName="division">
                <option value="Equals %">Equitativo %</option>
                <option value="Equals amount">Equitativo Monto</option>
                <option value="Manual %">Manual %</option>
                <option value="Manual amount">Manual Monto</option>
              </select>
            </div>
            @switch (expense.value.division) { @case ("Equals %") {
            <div>
              <label for="eq-percentaje">Porcentaje</label>
              <input
                type="number"
                id="eq-percentaje"
                name="eq-percentaje"
                formControlName="eq-percentaje"
              />
            </div>
            } @case ("Equals amount") {
            <div>
              <label for="eq-amount">Monto</label>
              <input
                type="number"
                id="eq-amount"
                name="eq-amount"
                formControlName="eq-amount"
              />
            </div>
            } @case ("Manual %") {
            <div>
              <form [formGroup]="manPercentaje" (ngSubmit)="addManPercentaje()">
                <span>Miembro</span>
                <select name="member" id="member" formControlName="member">
                  @for (member of group.members; track $index) {
                  <option value="{{ member.id_user }}">
                    {{ member.userName }}
                  </option>
                  }
                </select>
                <label for="percentaje">Monto</label>
                <input
                  type="number"
                  id="percentaje"
                  name="percentaje"
                  formControlName="percentaje"
                />
                <input type="submit" value="+" />
              </form>
            </div>
            } @case ("Manual amount") {
            <div>
              <div>
                <form [formGroup]="manAmount" (ngSubmit)="addManAmount()">
                  <span>Miembro</span>
                  <select name="member" id="member" formControlName="member">
                    @for (member of group.members; track $index) {
                    <option value="{{ member.id_user }}">
                      {{ member.userName }}
                    </option>
                    }
                  </select>

                  <label for="amount">Monto</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    formControlName="amount"
                  />
                  <input type="submit" value="+" />
                </form>
              </div>
            </div>
            }}
          </div>
          } @else {
          <div>
            <label for="user-amount">Monto</label>
            <input
              type="number"
              id="user-amount"
              name="user-amount"
              formControlName="user-amount"
            />
          </div>
          } @if (expense.value.type === "group") {
          <div>
            <form [formGroup]="amountUsers" (ngSubmit)="addAmountUser()">
              <label>Usuario que aporto</label>
              <select name="user" id="user" formControlName="user">
                @for (member of group.members; track member.id_user) {
                <option value="{{ member.id_user }}">
                  {{ member.userName }}
                </option>
                }
              </select>
              <label for="amount">Monto</label>
              <input
                type="number"
                id="amount"
                name="amount"
                formControlName="amount"
              />
              <input type="submit" value="+" />
            </form>
          </div>
          } @else {
          <div>
            <label for="my-amount">Lo aportado</label>
            <input
              type="number"
              id="my-amount"
              name="my-amount"
              formControlName="my-amount"
            />
          </div>
          }

          <div>
            <label for="recurent">Recurrente</label>
            <select name="recurrent" id="recurrent" formControlName="recurrent">
              <option value="{{ true }}">Si</option>
              <option value="{{ false }}">No</option>
            </select>
          </div>
          @if(expense.value.recurrent) {
          <div>
            <label for="recurrency">Lapso</label>
            <select
              name="recurrency"
              id="recurrency"
              formControlName="recurrency"
            >
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
            </select>
          </div>
          <div>
            <label for="cantRecurrencia">Veces que se repite</label>
            <input
              type="number"
              id="cantRecurrency"
              name="cantRecurrency"
              formControlName="cantRecurrency"
            />
          </div>
          } }
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </section>
  `,
  styles: ``,
})
export class ExpensesNewComponent implements OnInit {
  expense = new FormGroup({
    type: new FormControl(null),
    amount: new FormControl(0),
    img: new FormControl(''),
    recurrent: new FormControl(false),
    recurrency: new FormControl(''),
    cantRecurrency: new FormControl(0),
    category: new FormControl(),
    groupOwner: new FormControl(null),
    userOwner: new FormControl(null),

    division: new FormControl(''),
    'eq-percentaje': new FormControl(),
    'eq-amount': new FormControl(),
    'man-percentaje': new FormControl<
      { member_id: number; percentaje: number }[]
    >([]),
    'man-amount': new FormControl<{ member_id: number; amount: number }[]>([]),

    'user-amount': new FormControl(0),
    'my-amount': new FormControl(0),
    'amount-users': new FormControl<{ user_id: number; amount: number }[]>([]),
  });

  manPercentaje = new FormGroup({
    member: new FormControl(),
    percentaje: new FormControl(),
  });

  manAmount = new FormGroup({
    member: new FormControl(0),
    amount: new FormControl(0),
  });

  amountUsers = new FormGroup({
    user: new FormControl(0),
    amount: new FormControl(0),
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
    this.expense.value['man-percentaje']?.push(obj);
    console.log(this.expense.value['man-percentaje']);
  }

  addManAmount() {
    console.log(this.manAmount);
    const obj = {
      member_id: this.manAmount.value.member!,
      amount: this.manAmount.value.amount!,
    };
    this.expense.value['man-amount']?.push(obj);
    console.log(this.expense.value['man-amount']);
  }

  addAmountUser() {
    console.log(this.amountUsers.value);
    console.log(this.group.members);
    const obj = {
      user_id: this.amountUsers.value.user!,
      amount: this.amountUsers.value.amount!,
    };

    this.expense.value['amount-users']?.push(obj);
    console.log(this.expense.value['amount-users']);
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
        this.expense.value['man-percentaje']?.forEach((percentaje) => {
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
        this.expense.value['man-amount']?.forEach((amount) => {
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

    this.expense.value['amount-users']?.forEach((amount) => {
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

    console.log(this.expense.value);
    console.log(body);

    this.apiService.setExpense(body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
