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
   let group= {
    nombre:nombre,
    category :{
      name:cat
    }
   }
   return this.http.post<any>('http://localhost:8080/group/save',group)
  }

}
