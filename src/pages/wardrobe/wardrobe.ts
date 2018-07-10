import { ItemmodalPage } from './itemmodal/itemmodal';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the WardrobePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wardrobe',
  templateUrl: 'wardrobe.html',
})
export class WardrobePage {

  listOne = [
        {
          name: 'Red Blouse',
          image: '../assets/imgs/card/example.png'
        },
        {
          title: '2',
        },
        {
          title: '3',
        },
        {
          title: '4',
        },
        {
          title: '5',
        },
        {
          title: '6',
        },
        {
          title: '7',
        },
        {
          title: '8',
        },
        {
          title: '9',
        },
        {
          title: '10',
        },
        {
          title: '11',
        },
        {
          title: '12',
        },
      ];

  uid: string;
  newPostKey: string;
  detailRef: AngularFireList<any>;
  details: Observable<any>;

  image_url: any;
  category:any;
  brand:any;
  color:AngularFireObject<any>;
  price:any;
  tag:any;
  location:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: AngularFireDatabase) {
    this.uid = firebase.auth().currentUser.uid;

    //get category
    this.category = this.navParams.get('category');
    console.log("Category : " + this.category);

    this.detailRef = this.database.list(`users/${this.uid}/lemari_category/${this.category}`);
    this.details = this.detailRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePage');
  }

  openThis(category, id, brand, price) {
    this.openModal(ItemmodalPage,category,id,brand,price);
  }

  openModal(pageName, category, id, brand, price) {
    this.modalCtrl.create(pageName, {category,id,brand,price}, { cssClass: 'inset-modal' })
                  .present();
  }

  openGallery(){
    this.navCtrl.push('WardrobePage');
  }

}
