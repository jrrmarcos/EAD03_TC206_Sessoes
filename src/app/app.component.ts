import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EAD03-Sessoes';

  isNotLogged() {
    if (sessionStorage.getItem('user') != null) {
      return false
    } else {
      return true
    }
  }

}
