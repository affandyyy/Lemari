import { TabsPage } from './../../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import firebase from 'firebase';
import {AlertController} from "ionic-angular";

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  listOne = [
    {
      title: '1',
      image: './assets/imgs/card/example.png',
    },
    {
      title: '2',
      image: './assets/imgs/card/sweat.jpg',
    },
    {
      title: '3',
      image: './assets/imgs/card/tank.jpeg',
    },
    {
      title: '4',
      
      image: './assets/imgs/card/tee.jpg',
    },
    {
      title: '5',
      image: './assets/imgs/card/cardigan.jpeg',
    },
    {
      title: '6',
      image: './assets/imgs/card/shirt.jpg',
    }
  ];
  
  img: any;
  mypicref:any;

  category:any;
  brand:any;
  color:AngularFireObject<any>;;
  price:any;
  tag:any;
  location:any;
  
  uid: string;
  newPostKey: string;
  detailRef: AngularFireObject<any>;
  details: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private alert: AlertController) {
    //init data
    this.uid = firebase.auth().currentUser.uid;
    this.newPostKey = firebase.database().ref().child(`users/${this.uid}/lemari_category`).push().key;
    
    //get Image from Edit Page
    this.img = this.navParams.get('uploadImage');
    this.mypicref=firebase.storage().ref('/');
    // console.log("Form Page image: " +this.img);
  }

  saveDetail() {
    this.mypicref.child(`users/${this.uid}/${this.category}/${this.newPostKey}`).child('image.jpeg')
    .putString(this.img, firebase.storage.StringFormat.DATA_URL)
    .then(savepic=>{
      this.img=savepic.downloadURL;

      let imageUrl = savepic.downloadURL;
      this.database.object(`users/${this.uid}/lemari_category/${this.category}/${this.newPostKey}`).set({
        id: this.newPostKey,
        category:this.category,
        image_url:imageUrl,
        brand:this.brand,
        color:this.color,
        price:this.price,
        tag:this.tag,
        location:this.location
      })
    })
  }
  
  // imageUid() {
  //   var d = new Date().getTime();
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
  //     var r = (d + Math.random() * 16) % 16 | 0;
  //     d = Math.floor(d / 16);
  //     return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }

  alertImage() {
    const alertItem =  this.alert.create({
      title: 'Saved!',
      subTitle:  "Your Image and image's detail be saved!",
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    });
    alertItem.present();
  }
 
  goPost(){
    this.saveDetail();
    this.alertImage();
  }
}
