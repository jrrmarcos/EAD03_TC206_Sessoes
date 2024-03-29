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
export class MensagemComponent implements OnInit {

  mensagens!: Mensagem[]
  user!: User
  formMensagem: FormGroup
  mensagem: Mensagem

  constructor(private router: Router,
    private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.initForm()
    let expiry = sessionStorage.getItem('expiry')
    console.log('expiração do token: ', expiry)
    if ((sessionStorage.getItem('token') != null) && (Number(expiry) > Date.now())) {
      console.log('expiração token: ', expiry)
      console.log('hora atual: ', Date.now())
      this.carregar()
    } else {
      sessionStorage.setItem('user', null)
      sessionStorage.setItem('token', null)
      toast({ message: 'Autenticação expirada! Identifique-se novamente', type: 'is-danger' })
      this.router.navigate(['/login'])
    }
  }

  initForm() {
    this.formMensagem = new FormGroup({
      msg: new FormControl('', Validators.required)
    })
  }

  carregar() {
    this.mensagemService.getAllMessages().subscribe(mensagens => {
      this.mensagens = mensagens
    })
  }

  deslogar() {
    sessionStorage.setItem('user', null);
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('expiry', null);
    toast({ message: 'Até a próxima!', type: 'is-success' })
    this.router.navigate(['/login']);
  }

  addMensagem() {
    if (this.formMensagem.valid) {
      this.mensagemService.addMessage(this.formMensagem.get('msg').value).subscribe(res => {
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
      toast({ message: 'O campo mensagem não pode estar vazio!', type: 'is-danger' })
    }
  }
}
