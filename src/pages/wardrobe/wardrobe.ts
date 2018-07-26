import { ItemmodalPage } from './itemmodal/itemmodal';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { TranslateService } from '@ngx-translate/core';

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

 

  uid: string;
  newPostKey: string;
  detailRef: AngularFireList<any>;
  details: Observable<any>;

  image_url: any;
  category:any;
  subCategory:any;
  brand:any;
  color:AngularFireObject<any>;
  price:any;
  tag:any;
  location:any;

  counter:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: AngularFireDatabase, public translate:TranslateService) {
    this.uid = firebase.auth().currentUser.uid;

    //get category
    this.category = this.navParams.get('category');
    this.subCategory = this.navParams.get('subCategory');

    this.detailRef = this.database.list(`users/${this.uid}/lemari_category/${this.category}/${this.subCategory}`);
    this.details = this.detailRef.valueChanges();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WardrobePage');
  }

  openThis(category, subCategory, id, image_url, brand, price, color, tag, location) {
    this.openModal(ItemmodalPage,category,subCategory,id,image_url,brand,price, color, tag, location);
  }

  openModal(pageName, category, subCategory, id, image_url, brand, price, color, tag, location) {
    this.modalCtrl.create(pageName, {category,subCategory,id,image_url,brand,price, color, tag, location}, { cssClass: 'inset-modal' })
                  .present();
  }

  openGallery(){
    this.navCtrl.push('WardrobePage');
  }


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
  
}
