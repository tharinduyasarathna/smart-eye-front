import { AuthService } from "./../services/auth/auth.service";
import { UserServiceService } from "./../services/user-service.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  currentUser;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("logged_in_user")).name;
  }
  logout() {
    if(confirm("Are you sure to Logout ? ")) {
      this.authService.logout();
      localStorage.clear();
    }
    
    // this.router.navigate(["login"]);
  }
}
