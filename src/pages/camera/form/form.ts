import { EditPage } from './../edit/edit';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';

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

  img: string = '';
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.img = this.navParams.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  goPost(){
    this.navCtrl.push(HomePage);
  }

}
