import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  uid: string;

  topsRef:  AngularFireList<any>;
  tops: Observable<any>;
  bottomRef:  AngularFireList<any>;
  bottom: Observable<any>;
  shoesRef:  AngularFireList<any>;
  shoes: Observable<any>;

  sumTopsQuantity = 0;
  sumBottomQuantity= 0;
  sumShoesQuantity= 0;

  sumTopsPrice = 0;
  sumBottomPrice = 0;
  sumShoesPrice = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
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

    this.calc();
  }

  calc(){
    //Tops Value
    this.tops.subscribe(response => {
      console.log(response);
      response.forEach(item => {
        // sum here
        this.sumTopsQuantity++;
        this.sumTopsPrice = this.sumTopsPrice + parseInt(item.price);

        this.detailTops = [
          {
            image: '../assets/imgs/card/example.png',
            desc: 'Tops',
            quan: this.sumTopsQuantity,
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
        this.sumBottomQuantity++
        this.sumBottomPrice = this.sumBottomPrice + parseInt(item.price);

        this.detailBottom = [
          {
            image: '../assets/imgs/card/bottom.jpg',
            desc: 'Bottoms',
            quan: this.sumBottomQuantity,
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
        this.sumShoesQuantity++
        this.sumShoesPrice = this.sumShoesPrice + parseInt(item.price);

        this.detailShoes = [
          {
            image: '../assets/imgs/card/acc.jpg',
            desc: 'Accessories',
            quan: this.sumShoesQuantity,
            value: 'RM ' + this.sumShoesPrice
          },
          {
            image: '../assets/imgs/card/shoes.jpg',
            desc: 'Shoes',
            quan: '50',
            value: 'RM2590'
          },
        ];
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsmaryPage');
  }

}
