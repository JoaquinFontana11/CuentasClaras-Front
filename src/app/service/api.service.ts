import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>('http://localhost:8080/auth/login', {
      userName: username,
      password: password,
    });
  }

  public register(username: string, name: string, lastName:string,email:string,password:string ){
    return this.http.post<any>('http://localhost:8080/users/save',{
      userName:username,
      name:name,
      lastName:lastName,
      email:email,
      password:password,
      money:0
    })
  }
}
