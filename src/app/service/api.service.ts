import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { writeFileSync } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/users/findAll`);
  }

  public getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/users/find/${id}`);
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/login', {
      userName: username,
      password: password,
    });
  }

  public getCategories(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/category/findAll`);
  }

  public getGroupByName(name: String): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/group/findByName/${name}`);
  }

  public getGroupByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/group/find/${id}`);
  }

  public getExpenses(user_id: number): Observable<any> {
    return this.http.get<any>(this.urlApi + '/expenses/findByUser/' + user_id);
  }

  public getExpense(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/expenses/find/${id}`);
  }

  public setExpense(body: any): Observable<any> {
    console.log(body);
    return this.http.post<any>('http://localhost:8080/expenses/save', body);
  }

  public editExpense(body: any): Observable<any> {
    console.log(body);
    return this.http.post<any>('http://localhost:8080/expenses/edit', body);
  }
}
