import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expenses-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <section class="flex flex-row justify-center gap-2 w-full mx-1">
      <div class="w-5/6 bg-slate-200 rounded-lg shadow-lg p-6">
        <form
          [formGroup]="newExpense"
          (ngSubmit)="submit()"
          class="flex flex-col items-center"
        >
          <div class="flex flex-row gap-2 mb-5">
            <label for="amount">Tipo de Gasto</label>
            <input
              name="type"
              id="type"
              [value]="oldExpense.type"
              [disabled]="true"
            />
          </div>

          <div class="flex flex-row gap-5 w-full">
            @if (oldExpense.type === "group") {
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="groupOwner">Grupo</label>
              <input
                class="w-20"
                name="groupOwner"
                id="groupOwner"
                [value]="oldExpense.groupOwner.name"
                [disabled]="true"
              />
            </div>
            } @else {
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="userOwner">Usuario</label>
              <input
                class="w-20"
                name="userOwner"
                id="uerOwner"
                [value]="oldExpense.userOwner.userName"
                [disabled]="true"
              />
            </div>
            }
            <div class="flex flex-row gap-2 mb-5">
              <label class="font-semibold" for="amount">Precio</label>
              <input
                class="w-16"
                type="number"
                id="amount"
                name="amount"
                [value]="oldExpense.amount"
                [disabled]="true"
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
            @if(newExpense.value.recurrent) {
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
export class ExpensesEditComponent implements OnInit {
  oldExpense = {
    id: 0,
    img: '',
    type: '',
    userOwner: { userName: '' },
    groupOwner: { name: '' },
    amount: 0,
  };

  newExpense = new FormGroup({
    amount: new FormControl(0, Validators.required),
    img: new FormControl('', Validators.required),
    recurrent: new FormControl(false, Validators.required),
    recurrency: new FormControl(),
    cantRecurrency: new FormControl(),
    category: new FormControl('', Validators.required),
  });

  categories: any[] = [];
  user = { id: 0, userName: '', groups: [{ id: 0, name: '' }] };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let idUrl: any;
    this.route.paramMap.subscribe((params) => {
      idUrl = params.get('id');
    });

    this.apiService.getExpense(idUrl * 1).subscribe((expense) => {
      this.oldExpense = expense;
      console.log(expense);
      this.newExpense.get('amount')?.setValue(expense.amount);
      this.newExpense.get('img')?.setValue(expense.img);
      this.newExpense.get('category')?.setValue(expense.category.name);
      this.newExpense.get('recurrent')?.setValue(expense.recurent);
      this.newExpense.get('recurrency')?.setValue(expense.recurrency);
      this.newExpense.get('cantRecurrency')?.setValue(expense.cantRecurrency);
    });

    this.apiService.getCategories().subscribe((categories) => {
      categories.forEach((cat: any) => {
        if (!cat.group) this.categories.push(cat);
      });
    });

    this.apiService.getUser(5).subscribe((user) => {
      this.user = user;
    });

    this.newExpense.get('recurrent')?.valueChanges.subscribe((value: any) => {
      let bool = false;
      if (value === 'true') bool = true;
      this.newExpense.get('recurrent')?.setValue(bool, { emitEvent: false });
    });
  }

  submit() {
    const body: {
      id: number;
      img: string;
      categoryName: string;
      recurrent: boolean;
      recurrency: string;
      cantRecurrency: number;
    } = {
      id: this.oldExpense.id,
      img: this.newExpense.value.img!,
      categoryName: this.newExpense.value.category!,
      recurrent: false,
      recurrency: '',
      cantRecurrency: 0,
    };

    if (this.newExpense.value.recurrent) {
      body.recurrent = this.newExpense.value.recurrent;
      body.recurrency = this.newExpense.value.recurrency!;
      body.cantRecurrency = this.newExpense.value.cantRecurrency!;
    }

    this.apiService.editExpense(body).subscribe((res: any) => {
      console.log(res);
    });
  }
}
