import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../services/user-service.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  users: any;

  constructor(private userservice: UserServiceService) {}

  ngOnInit() {
    
  }

  UpdateRecord(recordRow) {
    let record = {};
    record["name"] = recordRow.EditName;
    record["email"] = recordRow.EditEmail;
    record["password"] = recordRow.EditPassword;
    record["Phone"] = recordRow.EditPhone;
    this.userservice.updateUser(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
