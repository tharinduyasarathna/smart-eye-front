import { Component, OnInit } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private afa: AngularFireAuthModule) {}

  ngOnInit() {}
}
