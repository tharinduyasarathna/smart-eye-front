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

  createUser(record){
    return this.firestore.collection('users').add(record);
  }

  updateUser(recordID,record){
    
    this.firestore.doc('users/'+recordID).update(record);
  }

  deleteUser(record_id){
    this.firestore.doc('users/'+record_id).delete();
  }
}
