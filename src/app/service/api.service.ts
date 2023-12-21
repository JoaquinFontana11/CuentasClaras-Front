import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getUsuarios(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/users/findAll');
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/login', {
      userName: username,
      password: password,
    });
  }

  public getCategories():Observable<any>{
    return this.http.get<any>(this.urlApi+'/category/findAll')
  }

  public saveGroup(nombre:string,cat:string):Observable<any>{
   console.log(nombre);
   console.log(cat);
   return this.http.post<any>('http://localhost:8080/group/save',{
    name: nombre,
    category:{
      name: cat
    }
  })
  }

  public groupDetail(id:number):Observable<any>{
    let grupo=this.http.get<any>('http://localhost:8080/group/findById/'+id);
    console.log("IMPRIMO EN LA APIIIIIIIII")
    console.log(JSON.stringify(grupo,null,3))

    return this.http.get<any>('http://localhost:8080/group/findById/'+id);
  }

  public groupExpenses(id:number):Observable<any>{
    return this.http.get<any>('http://localhost:8080/expenses/findByGroup/'+id);
  }

}
