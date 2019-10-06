import { UserServiceService } from "./../services/user-service.service";
import { User } from "./../models/user.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-second",
  templateUrl: "./second.component.html",
  styleUrls: ["./second.component.css"]
})
export class SecondComponent implements OnInit {
  users: any;
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: string;
  image: string;
  private  notifier: NotifierService;

  constructor(private userService: UserServiceService,notifierService: NotifierService){this.notifier = notifierService;}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()["name"],
          email: e.payload.doc.data()["email"],
          password: e.payload.doc.data()["password"],
          phone: e.payload.doc.data()["phone"],
          userType: e.payload.doc.data()["userType"]
        };
      });
      console.log(this.users);
    });
  }

  CreateRecord() {
    const record: User = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      userType: this.userType
    };

    this.userService.createUser(record);    
     this.name=null;
     this.email=null;
     this.phone=null;
     this.password=null;
     this.userType=null;
  }

  RemoveRecord(rowID) {
    if(confirm("Are you sure to Remove Record ? ")) {
    this.userService.deleteUser(rowID);
  }
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditEmail = record.Email;
    // record.EditPassword = record.Password;
    record.EditRole = record.Role;
    record.EditPhone = record.Phone;
  }
}
