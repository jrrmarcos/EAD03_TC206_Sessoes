import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  }

  baseUrl = "https://tiagoifsp.ddns.net/mensagens/jwt/user.php"

  addUser(user: any): Observable<any> {
    let body = new HttpParams();
    body = body.set('nome', user.nome);
    body = body.set('login', user.login);
    body = body.set('senha', user.senha);
    return this.http.put(this.baseUrl, body, { observe: "body" })
  }

  loginUser(user: any): Observable<any> {
    let body = new HttpParams();
    body = body.set('login', user.login);
    body = body.set('senha', user.senha);
    return this.http.post(this.baseUrl, body, { observe: "response" });
  }
}
