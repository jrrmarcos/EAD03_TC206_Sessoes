import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  }

  baseUrl = "https://tiagoifsp.ddns.net/mensagens/jwt/user.php"

  addUser(user: User): Observable<any> {
    let body = new HttpParams();
    body = body.set('nome', user.username);
    body = body.set('login', user.email);
    body = body.set('senha', user.password);
    return this.http.put(this.baseUrl, body, { observe: "response" })
  }

  loginUser(user: User): Observable<any> {
    let body = new HttpParams();
    body = body.set('login', user.email);
    body = body.set('senha', user.password);
    return this.http.post(this.baseUrl, body, { observe: "response" });
  }
}
