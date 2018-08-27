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

  dress:  AngularFireList<any>;
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

  counterTop = 0;
  counterBottom = 0;
  counterShoes = 0;
  counterAccessories = 0;

  sumTopsPrice = 0;
  sumBottomPrice = 0;
  sumShoesPrice = 0;
  sumAccessoriesPrice = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, public translate:TranslateService) {
    this.uid = firebase.auth().currentUser.uid;

    //Tops Data
    this.dress = this.database.list(`users/${this.uid}/lemari_category/tops/dress/`);
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

  calc(){
    //Tops Value
    this.dress.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterTop++;
        this.calculateSumTop(this.counterTop,item.price);
      });
    });
    this.sweater.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterTop++;
        this.calculateSumTop(this.counterTop,item.price);
      });
    });
    this.tank.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterTop++;
        this.calculateSumTop(this.counterTop,item.price);
      });
    });
    this.shirt.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterTop++;
        this.calculateSumTop(this.counterTop,item.price);
      });
    });
    this.cardigan.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterTop++;
        this.calculateSumTop(this.counterTop,item.price);
      });
    });
    this.tshirt.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterTop++;
        this.calculateSumTop(this.counterTop,item.price);
      });
    });

    //Bottom Value
    this.pants.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterBottom++;
        this.calculateSumBottom(this.counterBottom,item.price);
      });
    });
    this.jeans.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterBottom++;
        this.calculateSumBottom(this.counterBottom,item.price);
      });
    });
    this.shorts.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterBottom++;
        this.calculateSumBottom(this.counterBottom,item.price);
      });
    });
    this.skirts.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterBottom++;
        this.calculateSumBottom(this.counterBottom,item.price);
      });
    });
    this.sweatpant.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterBottom++;
        this.calculateSumBottom(this.counterBottom,item.price);
      });
    });

    //Shoes Value
    this.sneakers.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterShoes++;
        this.calculateSumShoes(this.counterShoes,item.price);
      });
    });
    this.sandals.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterShoes++;
        this.calculateSumShoes(this.counterShoes,item.price);
      });
    });
    this.flats.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterShoes++;
        this.calculateSumShoes(this.counterShoes,item.price);
      });
    });
    this.sports.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterShoes++;
        this.calculateSumShoes(this.counterShoes,item.price);
      });
    });
    this.slippers.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterShoes++;
        this.calculateSumShoes(this.counterShoes,item.price);
      });
    });
    this.boots.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterShoes++;
        this.calculateSumShoes(this.counterShoes,item.price);
      });
    });

    //Accessories Value
    this.cap.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterAccessories++;
        this.calculateSumAccessories(this.counterAccessories,item.price);
      });
    });
    this.sunglasses.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterAccessories++;
        this.calculateSumAccessories(this.counterAccessories,item.price);
      });
    });
    this.tie.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterAccessories++;
        this.calculateSumAccessories(this.counterAccessories,item.price);
      });
    });
    this.bowtie.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterAccessories++;
        this.calculateSumAccessories(this.counterAccessories,item.price);
      });
    });
    this.scarf.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.counterAccessories++;
        this.calculateSumAccessories(this.counterAccessories,item.price);
      });
    });
  }

  calculateSumTop(value,price) {
    this.counterTop = parseInt(value);
    this.sumTopsPrice = this.sumTopsPrice + parseInt(price);

    this.detailTops = [
      {
        image: "assets/imgs/card/shirt.jpg",
        desc: 'Tops',
        quan: this.counterTop,
        value: 'RM ' + this.sumTopsPrice
      }
    ];
  }

  calculateSumBottom(value,price) {
    this.counterBottom = parseInt(value);
    this.sumBottomPrice = this.sumBottomPrice + parseInt(price);

    this.detailBottom = [
      {
        image: 'assets/imgs/card/bottom.jpg',
        desc: 'Bottom',
        quan: this.counterBottom,
        value: 'RM ' + this.sumBottomPrice
      }
    ];
  }

  calculateSumShoes(value,price) {
    this.counterShoes = parseInt(value);
    this.sumShoesPrice = this.sumShoesPrice + parseInt(price);

    this.detailShoes = [
      {
        image: 'assets/imgs/card/shoes.jpg',
        desc: 'Shoes',
        quan: this.counterShoes,
        value: 'RM ' + this.sumShoesPrice
      },
    ];
  }

  calculateSumAccessories(value,price) {
    this.counterAccessories = parseInt(value);
    this.sumAccessoriesPrice = this.sumAccessoriesPrice + parseInt(price);

    this.detailAccessories = [
      {
        image: 'assets/imgs/card/acc.jpg',
        desc: 'Accessories',
        quan: this.counterAccessories,
        value: 'RM ' + this.sumAccessoriesPrice
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsmaryPage');
  }

}
