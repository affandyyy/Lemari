import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  listOne = [
    {
      image: '../assets/imgs/card/example.png',
      desc: 'Tops',
      quan: '200',
      value: 'RM1290'
    },
    {
      image: '../assets/imgs/card/bottom.jpg',
      desc: 'Bottoms',
      quan: '50',
      value: 'RM1590'
    },
    {
      image: '../assets/imgs/card/acc.jpg',
      desc: 'Accessories',
      quan: '100',
      value: 'RM2590'
    },
    {
      image: '../assets/imgs/card/shoes.jpg',
      desc: 'Shoes',
      quan: '50',
      value: 'RM2590'
    },
  ];



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsmaryPage');
  }

}
