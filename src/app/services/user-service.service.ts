import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {}

  getUsers() {
    return this.afs.collection("users").snapshotChanges();
  }

  getUser(uid) {
    // return this.afs.collection("users").get();
    return this.afs.collection("users").doc(uid).get();
  }



  
  createUser(user: User) {
    const { email, password } = user;
    this.afa.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log("data", data);
        const { uid } = this.afa.auth.currentUser;
        this.afs
          .collection("users")
          .doc(uid)
          .set(user);
      })
      .then(() => console.log("Success"));
    // return this.firestore.collection("users").add(record);
  }

  updateUser(recordID, record) {
    this.afs.doc("users/" + recordID).update(record);
  }

  deleteUser(record_id) {
    this.afs.doc("users/" + record_id).delete();
  }
}
