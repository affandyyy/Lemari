import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  userFBRef: AngularFireObject<any>;
  userFB: Observable<any>;
  uid: string;
  imageUrl: string


  user = {
    name: 'Uvuwewe Osas',
    profileImage: '',
    coverImage: './assets/imgs/card/wardrobebg.jpeg',
    occupation: 'Specialist',
    location: 'Mont Kiara, MY',
    items: 100,
    value: '700',
    subs: 'Emerald'

  };

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
            this.userFBRef.update(data);
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

  ionViewDidLoad() {
    console.log('Hello ProfileThree Page');
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