import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the SubsmaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subsmary',
  templateUrl: 'subsmary.html',
})
export class SubsmaryPage {

  detailTops;
  detailBottom;
  detailShoes;
  detailAccessories;

  uid: string;

  topsRef:  AngularFireList<any>;
  tops: Observable<any>;
  bottomRef:  AngularFireList<any>;
  bottom: Observable<any>;
  shoesRef:  AngularFireList<any>;
  shoes: Observable<any>;
  accessoriesRef: AngularFireList<any>;
  accessories: Observable<any>;

  sumTopsPrice = 0;
  sumBottomPrice = 0;
  sumShoesPrice = 0;
  sumAccessoriesPrice = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public translate:TranslateService) {
    this.uid = firebase.auth().currentUser.uid;

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

  calc(){
    //Tops Value
    this.tops.subscribe(response => {
      console.log(response);
      response.forEach(item => {
        // sum here
        this.sumTopsPrice = this.sumTopsPrice + parseInt(item.price);

        this.detailTops = [
          {
            image: 'assets/imgs/card/example.png',
            desc: 'Tops',
            quan: response.length,
            value: 'RM ' + this.sumTopsPrice
          }
        ];
      });
    });
    //Bottom Value
    this.bottom.subscribe(response => {
      console.log(response);
      response.forEach(item => {
        // sum here
        this.sumBottomPrice = this.sumBottomPrice + parseInt(item.price);

        this.detailBottom = [
          {
            image: 'assets/imgs/card/bottom.jpg',
            desc: 'Bottom',
            quan: response.length,
            value: 'RM ' + this.sumBottomPrice
          }
        ];
      });
    });
    //Shoes Value
    this.shoes.subscribe(response => {
      console.log(response);
      response.forEach(item => {
        // sum here
        this.sumShoesPrice = this.sumShoesPrice + parseInt(item.price);

        this.detailShoes = [
          {
            image: 'assets/imgs/card/shoes.jpg',
            desc: 'Shoes',
            quan: response.length,
            value: 'RM ' + this.sumShoesPrice
          },
        ];
      });
    });
    //Accessories Value
    this.accessories.subscribe(response => {
      console.log(response);
      response.forEach(item => {
        // sum here
        this.sumAccessoriesPrice = this.sumAccessoriesPrice + parseInt(item.price);

        this.detailAccessories = [
          {
            image: 'assets/imgs/card/acc.jpg',
            desc: 'Accessories',
            quan: response.length,
            value: 'RM ' + this.sumAccessoriesPrice
          }
        ];
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsmaryPage');
  }

}
