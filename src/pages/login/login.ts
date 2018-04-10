import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
//Pages


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public backgroundImage = "../assets/imgs/wall.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.navCtrl.push(TabsPage);
  }

  openModal(){
    this.openThis('TcModalPage');
  }

  openThis(pageName) {
    this.modal.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  

  

}
