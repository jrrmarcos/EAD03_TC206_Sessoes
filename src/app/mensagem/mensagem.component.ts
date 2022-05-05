import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensagem } from '../mensagem.model';
import { MensagemService } from '../mensagem.service';
import { User } from '../user.model';
import { toast } from 'bulma-toast'

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit, OnDestroy {

  mensagens!: Mensagem[]
  user!: User

  formMensagem = new FormGroup({
    mensagem: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
    private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.carregar()
  }

  ngOnDestroy(): void {
    this.mensagens = null 
  }

  carregar() {
    this.mensagemService.getAllMessages().subscribe(mensagens => {
      this.mensagens = mensagens
    })
  }

  deslogar() {
    //sessionStorage.setItem('user',null);
    //sessionStorage.setItem('token',null);
    sessionStorage.clear()
    console.log(this.mensagens)
    toast({ message: 'Até a próxima!', type: 'is-success' })
    this.router.navigate(['/login']);
  }

  addMensagem() {
    if (this.formMensagem.valid) {
      if (this.formMensagem.get('mensagem')) {
        this.mensagemService.addMessage(this.formMensagem.get('mensagem').value).subscribe(res => {
          if (res.status === "OK") {
            toast({ message: 'Mensagem cadastrada!', type: 'is-success' })
            this.carregar()
          } else if ((res.status === "Erro") && (res.msg == "Bearer incorreto")) {
            toast({ message: 'Autenticação expirada! Identifique-se novamente', type: 'is-danger' })
            this.router.navigate(['/login'])
          } else {
            toast({ message: 'Não foi possível cadastrar a mensagem!', type: 'is-danger' })
          }
        })
      } else {
        toast({ message: 'Dados ausentes, preencha todos os campos!', type: 'is-danger' })
      }
    }
  }

}
