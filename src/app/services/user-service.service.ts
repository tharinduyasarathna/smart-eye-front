import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private firestore: AngularFirestore) { }
 

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: User) {
    const { email, password, userType, phone, name } = user;
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
      .then(data => console.log("Success"));
    // return this.firestore.collection("users").add(record);
  }

  updateUser(recordID,record){
    
    this.firestore.doc('users/'+recordID).update(record);
  }

  deleteUser(record_id){
    this.firestore.doc('users/'+record_id).delete();
  }
}
