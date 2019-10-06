import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../services/user-service.service";
import { AngularFireList, AngularFireObject } from "@angular/fire/database";
import { User } from "../models/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: any;
  currentUser: any;
  currentPhone: any;
  currentEmail: any;
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  currentId: any;


  constructor(private userservice: UserServiceService,private afa:AngularFireAuth) {}

  ngOnInit() {
    this.currentId = JSON.parse(localStorage.getItem("logged_in_user")).id;
     this.currentUser = JSON.parse(localStorage.getItem("logged_in_user")).name;
     this.currentEmail = JSON.parse(localStorage.getItem("logged_in_user")).email;
     this.currentPhone = JSON.parse(localStorage.getItem("logged_in_user")).phone;
     this.user = JSON.parse(localStorage.getItem("logged_in_user"));
    
  }

  // UpdateUser(id, user: User) {
  //   this.userRef.update({
  //    name: user.name,
  //    email:user.email,
  //    phone:user.phone,
  //    password:user.password
  //   })
  //   .catch(error => {
  //    console.log('error', error);
  //   })
  // }

  UpdateRecord() {
    const {uid} = this.afa.auth.currentUser
    console.log('uid', uid)
    let record = {};
    record['name'] = this.currentUser;
    record['email'] = this.currentEmail;
    record['phone'] = this.currentPhone;
    console.log('record', record)
    this.userservice.updateUser(uid, record);
    localStorage.clear();
    localStorage.setItem("logged_in_user",JSON.stringify(record));
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
}
}
