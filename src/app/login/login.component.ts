import { UserServiceService } from './../services/user-service.service';
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  private  notifier: NotifierService;

  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserServiceService,
    notifierService: NotifierService
 
  ) {this.notifier = notifierService;}

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
      .then((authenticatedUserData) => {
        
        this.userservice.getUser(authenticatedUserData.user.uid).subscribe(user=>{
          
          localStorage.setItem("logged_in_user",JSON.stringify(user.data()));
           this.notifier.notify( 'success', "Hi ! Welcome"  );
           this.router.navigate(["home"]);
        });

      })
      .catch(error => {
       //console.log('error', error)
       // alert(error.message);
       this.notifier.notify( 'error', "There is no user record corresponding to this identifier !" );
         
      
      });
  };
}
