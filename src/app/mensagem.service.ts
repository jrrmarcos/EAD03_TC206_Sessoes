import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from './mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`})
  }

  baseUrl = "https://tiagoifsp.ddns.net/mensagens/jwt/msg.php"

  addMessage(mensagem: string): Observable<any> {
    let body = new HttpParams();
    body = body.set('texto', mensagem);
    return this.http.put<Mensagem>(this.baseUrl, body, this.httpOptions)
  }

  getAllMessages(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(this.baseUrl, this.httpOptions)
  }
}
