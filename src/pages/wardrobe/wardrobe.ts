import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
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
