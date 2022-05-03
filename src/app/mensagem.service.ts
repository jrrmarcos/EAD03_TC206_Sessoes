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
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NTE1OTk3OTYsImlzcyI6InRpYWdvaWZzcC5kZG5zLm5ldCIsIm5iZiI6MTY1MTU5OTc5NiwiZXhwIjoxNjUxNTk5OTE2LCJkYXRhIjp7ImlkIjoxMX19.Zp6dMICI9y3MZ-QKHwPNsCqnUDuOvD-2nFDPvVyckPYNKPzoSpQ790AQNdUkRwcl4JBdOkgG1w-EYxYBNqCttg`
    })
  }
  //${localStorage.getItem('token')}

  baseUrl = "https://tiagoifsp.ddns.net/mensagens/jwt/msg.php"

  addMessage(mensagem: Mensagem): Observable<any> {
    let body = new HttpParams();
    body = body.set('mensagem', mensagem.text);
    return this.http.put<Mensagem>(this.baseUrl, body, this.httpOptions)
  }

  getAllMessages(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(this.baseUrl, this.httpOptions)
  }
}
