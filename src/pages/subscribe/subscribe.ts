import { AngularFireDatabase } from 'angularfire2/database';
import { PaymentPage } from './../payment/payment';
import { Braintree, ApplePayOptions, PaymentUIOptions, PaymentUIResult } from '@ionic-native/braintree';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SubsuccessPage } from './subsuccess/subsuccess';


/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html',
})
export class SubscribePage {

  cards = [
    {
      id:'1',
      imageUrl: 'assets/imgs/card/emerald.png',
      title: 'Emerald 20',
      subtitle: 'Free'
    },
    {
      id:'2',
      imageUrl: 'assets/imgs/card/sapp.jpg',
      title: 'Sapphire 100',
      subtitle: 'RM30'
    },
    {
      id:'3',
      imageUrl: 'assets/imgs/card/ruby.jpg',
      title: 'Ruby 300',
      subtitle: 'RM50'
    },
    {
      id:'4',
      imageUrl: 'assets/imgs/card/diamond.jpg',
      title: 'Diamond ∞',
      subtitle: 'RM88'
    }];

    uid:any;
    subscribeRef:any;

    subscribeId:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alert: AlertController, 
    public modalCtrl: ModalController,
    private database: AngularFireDatabase) {
  }

  subscribePayment(subscribeId) {
    const alertItem =  this.alert.create({
      title: 'Upgrade!',
      subTitle:  "Your have to make a payment to upgrade the storage!",
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.openModal(PaymentPage, subscribeId);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alertItem.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
  }
  

  openModal(pageName,subscribeId) {
    this.modalCtrl.create(pageName, {subscribeId}, { cssClass: 'inset-modal' })
      .present();
  }

}
