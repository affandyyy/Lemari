import {Component, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import {users} from "../../models/user-fb/user-fb.interface";
//import {Facebook} from "@ionic-native/facebook";
import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  //data take from interface in file models -> user-fb -> user-fb.interface.ts
  //userData: AngularFireObject<any>;
  userData: Observable<firebase.User>;
  displayName: string;
  email: string;
  photoURL: string;

  user = {
    name: 'Uvuwewe Osas',
    profileImage: '',
    coverImage: './src/assets/imgs/card/emerald.jpg',
    occupation: 'Specialist',
    location: 'Mont Kiara, MY',
    items: 500,
    value: 'RM6990',
    subs: 'Diamond'

  };

  userFBRef: AngularFireObject<any>;
  userFB: Observable<any>;
  uid: string;
  imageUrl: string

  languages = ['English', 'Bahasa', '中文'];
  customLoc = ['Wardrobe', 'Chestdrawer', 'Headboard', 'Laundry'];

  constructor(public navCtrl: NavController, private database: AngularFireDatabase, private zone: NgZone, private alert: AlertController) {

    this.uid = firebase.auth().currentUser.uid;
    this.userFBRef = this.database.object(`users/${this.uid}`);
    this.userFB = this.userFBRef.valueChanges();
    this.userFBFunc();

  }

  userFBFunc() {
    this.userFB.subscribe(response => {
      console.log(response);
      this.zone.run(() => {
        this.imageUrl = response.profile_picture;
      });
    });
  }

  editProfile(){

    const alertItem =  this.alert.create({
      title: 'Edit Profile',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }
      ],
      buttons: [
        {
          text: 'Okay',
          handler: data => {
            console.log(data);
            this.database.object(`users/${this.uid}`).update(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    alertItem.present();
  }

  openSubs(){
    this.navCtrl.push('SubscribePage');
  }

  openSum(){
    this.navCtrl.push('SubsmaryPage');
  }

  logOut(){
    firebase.auth().signOut();
  }


}
