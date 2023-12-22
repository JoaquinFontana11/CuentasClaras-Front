import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlApi = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/users/findAll');
  }

  public getUsuario(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/find/` + id);
  }

  public login(username: string, password: string): Observable<HttpResponse<any>> {
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

  public updateGroup(id:number,name:string,catName:string):Observable<any>{
    return this.http.post<any>('http://localhost:8080/group/edit',{
      id:id,
      name: name,
      categoryName: catName
      
    })
  }

  public getUserByEmail(email:string):Observable<any>{
    return this.http.get<any>('http://localhost:8080/users/findByEmail/'+email);
  }

  public sendInvitation(nombreGrupo:string,userId:string,groupId:string):Observable<any>{
    return this.http.post<any>('http://localhost:8080/group/addMember/'+groupId,{
      isGroup:true,
      inviteName:nombreGrupo,
      userId:userId
    });
  }

  public getExpenses(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/expenses/finByUser/` + id);
  }

  public acceptInvitation(id: string) {
    return this.http.post<any>(this.urlApi + "/invitation/accept/" + id, {});
  }

  public rejectInvitation(id: string) {
    return this.http.delete<any>(this.urlApi + "/invitation/reject/" + id, {});
  }

  public register(username: string, name: string, lastName: string, email: string, password: string) {
    return this.http.post<any>('http://localhost:8080/users/save', {
      userName: username,
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      money: 0
    })
  }
}
