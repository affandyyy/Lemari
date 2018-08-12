import { SubsmaryPage } from './subsmary/subsmary';
import { TranslateService } from '@ngx-translate/core';
import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";
import { LoginPage } from '../login/login';

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

  blouse:  AngularFireList<any>;
  sweater:  AngularFireList<any>;
  tank:  AngularFireList<any>;
  shirt:  AngularFireList<any>;
  cardigan:  AngularFireList<any>;
  tshirt:  AngularFireList<any>;

  pants:  AngularFireList<any>;
  jeans:  AngularFireList<any>;
  shorts:  AngularFireList<any>;
  skirts:  AngularFireList<any>;
  sweatpant:  AngularFireList<any>;

  sneakers:  AngularFireList<any>;
  sandals:  AngularFireList<any>;
  flats:  AngularFireList<any>;
  sports:  AngularFireList<any>;
  slippers:  AngularFireList<any>;
  boots:  AngularFireList<any>;
  
  cap:  AngularFireList<any>;
  sunglasses:  AngularFireList<any>;
  tie:  AngularFireList<any>;
  bowtie:  AngularFireList<any>;
  scarf:  AngularFireList<any>;

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
    this.userFBFunc();

    this.defaultLanguage();

    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading',
      duration: 3000
    });
    
    this.loading.present();

    //Tops Data
    this.blouse = this.database.list(`users/${this.uid}/lemari_category/tops/blouse/`);
    this.sweater = this.database.list(`users/${this.uid}/lemari_category/tops/sweater/`);
    this.tank = this.database.list(`users/${this.uid}/lemari_category/tops/tank/`);
    this.shirt = this.database.list(`users/${this.uid}/lemari_category/tops/shirt/`);
    this.cardigan = this.database.list(`users/${this.uid}/lemari_category/tops/cardigan/`);
    this.tshirt = this.database.list(`users/${this.uid}/lemari_category/tops/tshirt/`);

    //Bottoms Data
    this.pants = this.database.list(`users/${this.uid}/lemari_category/bottom/pants/`);
    this.jeans = this.database.list(`users/${this.uid}/lemari_category/bottom/jeans/`);
    this.shorts = this.database.list(`users/${this.uid}/lemari_category/bottom/shorts/`);
    this.skirts = this.database.list(`users/${this.uid}/lemari_category/bottom/skirts/`);
    this.sweatpant = this.database.list(`users/${this.uid}/lemari_category/bottom/sweatpant/`);

    //Shoes Data
    this.sneakers = this.database.list(`users/${this.uid}/lemari_category/shoes/sneakers/`);
    this.sandals = this.database.list(`users/${this.uid}/lemari_category/shoes/sandals/`);
    this.flats = this.database.list(`users/${this.uid}/lemari_category/shoes/flats/`);
    this.sports = this.database.list(`users/${this.uid}/lemari_category/shoes/sports/`);
    this.slippers = this.database.list(`users/${this.uid}/lemari_category/shoes/slippers/`);
    this.boots = this.database.list(`users/${this.uid}/lemari_category/shoes/boots/`);

    //Accessories Data
    this.cap = this.database.list(`users/${this.uid}/lemari_category/accessories/cap/`);
    this.sunglasses = this.database.list(`users/${this.uid}/lemari_category/accessories/sunglasses/`);
    this.tie = this.database.list(`users/${this.uid}/lemari_category/accessories/tie/`);
    this.bowtie = this.database.list(`users/${this.uid}/lemari_category/accessories/bowtie/`);
    this.scarf = this.database.list(`users/${this.uid}/lemari_category/accessories/scarf/`);

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
    this.blouse.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.sweater.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.tank.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.shirt.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.cardigan.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.tshirt.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    
    //Bottom Value
    this.pants.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.jeans.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.shorts.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.skirts.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.sweatpant.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });

    //Shoes Value
    this.sneakers.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.sandals.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.flats.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.sports.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.slippers.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.boots.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });

    //Accessories Value
    this.cap.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.sunglasses.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.tie.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.bowtie.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counter++;
        this.calculateSum(this.counter,item.price);
      });
    });
    this.scarf.valueChanges().subscribe(response => {
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
    this.navCtrl.setRoot(LoginPage);
  }


}