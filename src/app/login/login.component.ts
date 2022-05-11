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
      let login = this.loginForm.get('login').value;
      let senha = this.loginForm.get('senha').value;
      this.user = { username: null, email: login, password: senha }
      console.log("this.user", this.user)
      this.serviceUser.loginUser(this.user).subscribe(res => {
        if (res.status == 200) {
          sessionStorage.setItem('user', res.body.userName)
          sessionStorage.setItem('token', res.body.token)
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
      let nome = this.registroForm.get('name').value;
      let login = this.registroForm.get('login').value;
      let senha = this.registroForm.get('senha').value;
      this.user = { username: nome, email: login, password: senha }
      console.log("this.user", this.user)
      this.serviceUser.addUser(this.user).subscribe(res => {
        console.log(res.status)
        if ((res.status === "OK") || (res.status === 200)) {
          console.log("Cadastrado")
          sessionStorage.setItem('user', null)
          sessionStorage.setItem('token', null)
          this.closeRegistro()
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
