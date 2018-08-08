import { SubsmaryPage } from './subsmary/subsmary';
import { TranslateService } from '@ngx-translate/core';
import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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

  language:any;
  customLoc = ['Wardrobe', 'Chestdrawer', 'Headboard', 'Laundry'];

  topsRef:  AngularFireList<any>;
  tops: Observable<any>;
  bottomRef:  AngularFireList<any>;
  bottom: Observable<any>;
  shoesRef:  AngularFireList<any>;
  shoes: Observable<any>;
  accessoriesRef: AngularFireList<any>;
  accessories: Observable<any>;

  counter = 0;
  totalPrice = 0;
  loading: any;

  constructor(public loadingCtrl: LoadingController, 
              public navCtrl: NavController, 
              private database: AngularFireDatabase, 
              private zone: NgZone, 
              private alert: AlertController, 
              public translate:TranslateService) {
    this.uid = firebase.auth().currentUser.uid;
    this.userFBRef = this.database.object(`users/${this.uid}`);
    this.userFB = this.userFBRef.valueChanges();

    this.defaultLanguage();

    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading',
      duration: 3000
    });
    
    this.loading.present();
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

    //Accessories Data
    this.accessoriesRef = this.database.list(`users/${this.uid}/lemari_category/accessories/`);
    this.accessories = this.accessoriesRef.valueChanges();

    this.calc();
   }

   defaultLanguage(){
    this.userFB.subscribe(response => {
      console.log(response);
      this.language = response.language;
      this.translate.setDefaultLang(response.language);
      this.translate.use(response.language);
    });
   }

   switchLanguage() {
    this.database.object(`users/${this.uid}`).update({
      language:this.language
    })
    this.userFB.subscribe(response => {
      console.log(response);
      this.translate.use(response.language);
    });
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
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    //Bottom Value
    this.bottom.subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    //Shoes Value
    this.shoes.subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    //Accessories Value
    this.accessories.subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
  }

  calculateSum(value,price) {
    this.counter = parseInt(value);
    this.totalPrice = this.totalPrice + parseInt(price);

    this.user = [
      {
        items: this.counter,
        value: this.totalPrice,
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
    this.navCtrl.push(SubsmaryPage);
  }

  logOut(){
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Signing you out',
      duration: 2000
    });
    
    this.loading.present();
    firebase.auth().signOut();
  }


}