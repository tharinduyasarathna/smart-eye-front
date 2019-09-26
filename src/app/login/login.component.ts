import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;

  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]
      ],
      userPassword: ["", Validators.required]
    });
  }

  loginUser = () => {
    const userEmail = this.loginForm.controls["userEmail"].value;
    const userPassword = this.loginForm.controls["userPassword"].value;
    console.log("clicked");
    this.afa.auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        this.router.navigate(["home"]);
      })
      .catch(error => {
        console.log("error :", error, error.message);
        alert(error.message);
      });
  };
}
