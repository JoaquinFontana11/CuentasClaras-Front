import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [],
  template: ` 
      <div>
      <h1>Detalles del grupo {{ id }}</h1>
      <h2>{{ grupo?.name }}</h2>
      <h2>{{ grupo?.category.name }}</h2>
      <h2>{{ grupo?.category.icon }}</h2>
      <h2>Miembros del grupo 🧔</h2>
      <ul>
        @for (item of grupo.members; track item.id_user) {
        <li>{{ item.userName }}</li>
        }
      </ul>      
    </div>
  
  
  `,
  styles: ``,
})


export class GroupDetailComponent {
  private routeSub: Subscription = new Subscription();
  grupo: any;
  id!:number;
  constructor(private route: ActivatedRoute , private api: ApiService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) 
      console.log(params['id']) 
      this.id=params['id'];
    });
    this.obtenerDetalle();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  obtenerDetalle() {
    this.api.groupDetail(this.id).subscribe((detalle) => {
      console.log("DETALLE"+ detalle);
      this.grupo = detalle;
    });
    console.log("DETALLE"+ this.grupo);
  }

}
