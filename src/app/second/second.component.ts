import { UserServiceService } from './../services/user-service.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  users:any;
  id: string;
  name:string;
  email:string;
  phone:string;
  password:string;
  userType:string;
  image:string;

  constructor(private userService:UserServiceService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
 
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['Name'],
          email: e.payload.doc.data()['Email'],
          // password: e.payload.doc.data()['Password'],
          phone: e.payload.doc.data()['Phone'],
          userType: e.payload.doc.data()['Role'],
        };
      })
      console.log(this.users);
 
    });
    
  }
  
  CreateRecord() {
    let record = {};
    record['Name'] = this.name;
    record['Email'] = this.email;
    // record['Password'] = this.password;
    record['Phone'] = this.phone;
    record['Role'] = this.userType;
    this.userService.createUser(record).then(resp => {
      this. name= "";
      this.email = "";
      // this.password = "";
      this.phone = "";
      this.userType = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.userService.deleteUser(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditEmail = record.Email;
    // record.EditPassword = record.Password;
    record.EditRole = record.Role;
    record.EditPhone = record.Phone;

  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Email'] = recordRow.EditEmail;
    // record['Password'] = recordRow.EditPassword;
    record['Role'] = recordRow.EditRole;
    record['Phone'] = recordRow.EditPhone;
    this.userService.updateUser(recordRow.id, record);
    recordRow.isEdit = false;
  }

  // create(user:User){
  //   this.userService.createUser(user);
  // }
  // upadte(user:User){
  //   this.userService.updateUser(user);
  // }
  // delete(id:string){
  //   this.userService.deleteUser(id);
  // }
}
