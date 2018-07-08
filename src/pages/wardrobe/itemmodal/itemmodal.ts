import { TabsPage } from './../../tabs/tabs';
import { WardrobePage } from './../wardrobe';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";

/**
 * Generated class for the ItemmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itemmodal',
  templateUrl: 'itemmodal.html',
})
export class ItemmodalPage {

  uid: string;
  detailRef:  AngularFireObject<any>;
  details: Observable<any>;

  newPostKey: any;

  imageUrl: any;
  category:any;
  brand:any;
  color:AngularFireObject<any>;
  price:any;
  tag:any;
  location:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private database: AngularFireDatabase, private zone: NgZone, private alert: AlertController) {
    this.uid = firebase.auth().currentUser.uid;
    this.category = this.navParams.get('category');
    this.newPostKey = this.navParams.get('id');

    this.detailRef = this.database.object(`users/${this.uid}/lemari_category/${this.category}/${this.newPostKey}`);
    this.details = this.detailRef.valueChanges();
    this.getImage();
  }

  getImage(){
     this.details.subscribe(response => {
        console.log(response);
        this.zone.run(() => {
          this.imageUrl = response.image_url;
        });
        this.brand = response.brand;
        this.price = response.price;  

        console.log(this.price);
    });
  }
  
  editDetail(){
    const alertItem =  this.alert.create({
      title: 'Edit Image Detail',
      inputs: [
        {
          name: 'brand',
          placeholder: 'Brand'
        },
        {
          name: 'price',
          placeholder: 'Price'
        }
      ],
      buttons: [
        {
          text: 'Okay',
          handler: data => {
            console.log(data);
            this.detailRef.update(data);
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

  removeDetail(){
    const alertItem =  this.alert.create({
      title: 'Deleted!',
      subTitle:  "Your Image and image's detail have be deleted!",
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.push(TabsPage);
            this.detailRef.remove();
          }
        }
      ]
    });
    alertItem.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemmodalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  closeModal() {
    this.navCtrl.pop();
}


}
