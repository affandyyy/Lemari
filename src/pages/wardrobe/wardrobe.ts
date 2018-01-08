import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      image: '../assets/imgs/example.png'
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardrobePage');
  }

}
