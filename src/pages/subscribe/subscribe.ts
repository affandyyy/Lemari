import { Braintree, ApplePayOptions, PaymentUIOptions, PaymentUIResult } from '@ionic-native/braintree';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    subscribeId:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public braintree:Braintree) {
  }

  subscribePayment(subscribeId) {
    const alertItem =  this.alert.create({
      title: 'Upgrade!',
      subTitle:  "Your have to make a payment to upgrade the storage!",
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.push(SubsuccessPage, {subscribeId});
            // this.paymentMethod();
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

  paymentMethod(){
    // Your Braintree `Tokenization Key` from the Braintree dashboard.
    // Alternatively you can also generate this token server-side
    // using a client ID in order to allow users to use stored payment methods.
    // See the [Braintree Client Token documentation](https://developers.braintreepayments.com/reference/request/client-token/generate/node#customer_id) for details.
    const BRAINTREE_TOKEN = 'txb6msdqr4v4bhqd';

    // NOTE: Do not provide this unless you have configured your Apple Developer account
    // as well as your Braintree merchant account, otherwise the Braintree module will fail.
    const appleOptions: ApplePayOptions = {
      merchantId: 'sv9gs7mh748w58jj',
      currency: 'USD',
      country: 'US'
    };

    const paymentOptions: PaymentUIOptions = {
      amount: '14.99',
      primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
    };

    this.braintree.initialize(BRAINTREE_TOKEN)
      .then(() => this.braintree.setupApplePay(appleOptions))
      .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
      .then((result: PaymentUIResult) => {
        if (result.userCancelled) {
          console.log("User cancelled payment dialog.");
        } else {
          console.log("User successfully completed payment!");
          console.log("Payment Nonce: " + result.nonce);
          console.log("Payment Result.", result);
        }
      })
      .catch((error: string) => console.error(error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
  }

}
