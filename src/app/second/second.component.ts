import { UserServiceService } from "./../services/user-service.service";
import { User } from "./../models/user.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import Swal from "sweetalert2";

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
  private notifier: NotifierService;

  constructor(
    private userService: UserServiceService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

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
    this.name = null;
    this.email = null;
    this.phone = null;
    this.password = null;
    this.userType = null;
  }

  RemoveRecord(rowID) {
    Swal.fire({
      title: "<p style='color: white'>Are you sure to Remove User Record ?</p> ",
      text: "You will not be able to recover this record!",
      type: "warning",
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      background: "rgba(43, 165, 137, 0.90)",
      backdrop: `
      rgba(52, 73, 94,0.75)
        center left
        no-repeat
      `
    }).then(result => {
      if (result.value) {
        this.userService.deleteUser(rowID);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
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
