import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginState;
  
  constructor(private router:Router){
    this.loginState = JSON.parse(localStorage.getItem("logged_in_user")).name;
      if(this.loginState != null){
          this.router.navigate(['home/first']);
      }
  }
}
