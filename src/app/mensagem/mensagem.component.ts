import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensagem } from '../mensagem.model';
import { MensagemService } from '../mensagem.service';
import { User } from '../user.model';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  mensagens!: Mensagem[]
  mensagem!: Mensagem
  user!: User

  formMensagem = new FormGroup({
    mensagem: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
    private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.mensagemService.getAllMessages().subscribe(mensagens => {
      this.mensagens = mensagens
    })
  }

  deslogar() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  addMensagem() {
    if (this.formMensagem.valid) {
      this.mensagem = this.formMensagem.value;
      console.log(this.mensagem)
      this.mensagemService.addMessage(this.mensagem).subscribe(res => {
        console.log(res)
        if (res.stauts === "OK") {
          this.router.navigate(['/messages']);
        } else {
          alert('Não foi possível efetuar o cadastro da mensagem')
        }
      })
    } else {
      alert('Dados ausentes! - Preencha todos os campos')
    }
  }

}
