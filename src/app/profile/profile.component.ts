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

  constructor(private userservice: UserServiceService) {}

  ngOnInit() {
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

  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.name;
    record['email'] = recordRow.email;
    record['phone'] = recordRow.phone;
    record['password'] = recordRow.password;
    this.userservice.updateUser(recordRow.id, record);
    recordRow.isEdit = false;
  }

  refresh(): void {
    window.location.reload();
}
}
