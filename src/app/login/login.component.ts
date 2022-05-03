import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

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
          console.log("Logado")
          sessionStorage.setItem('user', res.user)
          sessionStorage.setItem('token', res.token)
          console.log(res.body.token)
          this.router.navigate(['/messages'])
        } else {
          console.log("Não logado")
          alert('Não foi possível efetuar o login!')
        }
      })
    } else {
      alert('Dados ausentes, preencha todos os campos')
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
        } else {
          console.log("Não cadastrado")
          alert('Não foi possível efetuar o cadastro!')
        }
      })
    } else {
      alert('Dados ausentes, preencha todos os campos!')
    }
  }

  cancelar() {
    this.router.navigate(['/login'])
  }
}
