import { Component, NgZone } from '@angular/core';
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

  listOne = [];

  uid: string;
  detailRef: AngularFireObject<any>;
  details: Observable<any>;

  imageUrl: any;
  category:any;
  brand:any;
  color:AngularFireObject<any>;;
  price:any;
  tag:any;
  location:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: AngularFireDatabase, private zone: NgZone) {
    this.uid = firebase.auth().currentUser.uid;
    this.detailRef = this.database.object(`users/${this.uid}/lemari_category`);
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

      this.listOne = [
        {
          name: 'Red Blouse',
          image: '../assets/imgs/card/example.png'
        },
        {
          name: this.brand,
          image: this.imageUrl
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
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePage');
  }

  openThis() {
    this.openModal('ItemmodalPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  openGallery(){
    this.navCtrl.push('WardrobePage');
  }

}
