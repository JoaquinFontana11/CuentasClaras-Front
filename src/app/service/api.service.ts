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
}
