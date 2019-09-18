import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private afa: AngularFireAuth, private router: Router) {}

  ngOnInit() {}

  loginUser = () => {
    console.log("clicked");
    // this.afa.auth.signInWithEmailAndPassword();
    this.router.navigate(["home"]);
  };
}
