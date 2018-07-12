import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
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

  user;

  languages = ['English', 'Bahasa', '中文'];
  customLoc = ['Wardrobe', 'Chestdrawer', 'Headboard', 'Laundry'];

  topsRef:  AngularFireList<any>;
  tops: Observable<any>;
  bottomRef:  AngularFireList<any>;
  bottom: Observable<any>;
  shoesRef:  AngularFireList<any>;
  shoes: Observable<any>;

  counter = 0;

  constructor(public navCtrl: NavController, private database: AngularFireDatabase, private zone: NgZone, private alert: AlertController) {
    this.uid = firebase.auth().currentUser.uid;
    this.userFBRef = this.database.object(`users/${this.uid}`);
    this.userFB = this.userFBRef.valueChanges();
    this.userFBFunc();

    //Tops Data
    this.topsRef = this.database.list(`users/${this.uid}/lemari_category/tops/`);
    this.tops = this.topsRef.valueChanges();

    //Bottoms Data
    this.bottomRef = this.database.list(`users/${this.uid}/lemari_category/bottom/`);
    this.bottom = this.bottomRef.valueChanges();

    //Shoes Data
    this.shoesRef = this.database.list(`users/${this.uid}/lemari_category/shoes/`);
    this.shoes = this.shoesRef.valueChanges();

    this.calc();
   }

   userFBFunc() {
    this.userFB.subscribe(response => {
      console.log(response);
      this.zone.run(() => {
        this.imageUrl = response.profile_picture;
      });
    });
  }

  calc(){
    //Tops Value
    this.tops.subscribe(response => {
        this.calculateSum(response.length);
    });
    //Bottom Value
    this.bottom.subscribe(response => {
        this.calculateSum(response.length);
    });
    //Shoes Value
    this.shoes.subscribe(response => {
        this.calculateSum(response.length);
    });
  }

  calculateSum(value) {
    this.counter = this.counter + parseInt(value);
    console.log("Counter : " + this.counter);

    this.user = [
      {
        // name: 'Uvuwewe Osas',
        // profileImage: '',
        // coverImage: '../assets/imgs/card/tnc.jpg',
        // occupation: 'Specialist',
        // location: 'Mont Kiara, MY',
        items: this.counter,
        value: '0',
        subs: 'Basic'
      }
    ];
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