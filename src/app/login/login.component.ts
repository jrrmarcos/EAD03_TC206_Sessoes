import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { toast } from 'bulma-toast'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User
  showRegistro: boolean = true;

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  })

  registroForm = new FormGroup({
    name: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
    private serviceUser: UserService) { }

  ngOnInit(): void {
  }

  openRegistro() {
    this.showRegistro = false;
  }

  closeRegistro() {
    this.showRegistro = true;
  }

  login() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value
      console.log("this.user", this.user)
      this.serviceUser.loginUser(this.user).subscribe(res => {
        if (res.status == 200) {
          sessionStorage.setItem('user', res.user)
          sessionStorage.setItem('token', res.token)
          console.log("Session storage token", `${localStorage.getItem('token')}`)
          console.log("Token body: ", res.body.token)
          if (res.body.token != null) {
            toast({ message: 'Login realizado!', type: 'is-success' })
            this.router.navigate(['/messages'])
          } else {
            toast({ message: 'Login ou senha inválidos!', type: 'is-danger' })
            this.router.navigate(['/login'])
          }
        } else {
          toast({ message: 'Não foi possível realizar o login!', type: 'is-danger' })
          this.router.navigate(['/login'])
        }
      })
    } else {
      toast({ message: 'Dados ausentes, preencha todos os campos!', type: 'is-danger' })
    }
  }

  registro() {
    if (this.registroForm.valid) {
      this.user = this.registroForm.value
      console.log("this.user", this.user)
      this.serviceUser.addUser(this.user).subscribe(res => {
        console.log(res.status)
        if (res.status == "OK") {
          console.log("Cadastrado")
          sessionStorage.setItem('user', res.user)
          this.router.navigate(['/messages'])
          toast({ message: 'Cadastro realizado!', type: 'is-success' })
        } else {
          toast({ message: 'Erro ao cadastrar!', type: 'is-danger' })
        }
      })
    } else {
      toast({ message: 'Dados ausentes, preencha todos os campos!', type: 'is-danger' })
    }
  }

  cancelar() {
    toast({ message: 'Operação cancelada!', type: 'is-danger' })
    this.router.navigate(['/login'])
  }
}
