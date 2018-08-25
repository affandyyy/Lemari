import {
  ApplePayOptions,
  PaymentUIOptions,
  Braintree,
  PaymentUIResult
} from "@ionic-native/braintree";
import { SubsuccessPage } from "./../subscribe/subsuccess/subsuccess";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-payment",
  templateUrl: "payment.html"
})
export class PaymentPage {
  subscribeId: any;
  my_token;

  token: Observable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public braintree: Braintree,
    private http: HttpClient,
    private alert: AlertController
  ) {
    this.subscribeId = this.navParams.get("subscribeId");

    this.token = this.http.get(
      "https://us-central1-gh-hendi.cloudfunctions.net/api/payment/client_token"
    );

    this.token.subscribe(x => {
      this.my_token = x.token;

      const paymentOptions: PaymentUIOptions = {
        amount: this.subscribeId,
        primaryDescription:
          "Your product or service (per /item, /month, /week, etc)"
      };

      this.braintree
        .initialize(this.my_token)
        .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
        .then((result: PaymentUIResult) => {
          if (result.userCancelled) {
            console.log("User cancelled payment dialog.");
          } else {
            this.http.post(`https://us-central1-gh-hendi.cloudfunctions.net/api/payment/checkout/${this.subscribeId}`, {nonce: result.nonce}).toPromise().then(x => {
              this.subscribePayment()
            })
            // let a = this.alert.create({
            //   title: result.nonce
            // });

            // a.present();
          }
        })
        .catch((error: string) => {
          let alt = this.alert.create({
            title: error
          })

          alt.present();
        });
    });
  }

  subscribePayment() {
    // let subscribeId = this.subscribeId;
    this.navCtrl.push(SubsuccessPage, {subscribeId: this.subscribeId});
  }

  paymentMethod() {
    // Your Braintree `Tokenization Key` from the Braintree dashboard.
    // Alternatively you can also generate this token server-side
    // using a client ID in order to allow users to use stored payment methods.
    // See the [Braintree Client Token documentation](https://developers.braintreepayments.com/reference/request/client-token/generate/node#customer_id) for details.
    // const BRAINTREE_TOKEN = 'txb6msdqr4v4bhqd';
    // NOTE: Do not provide this unless you have configured your Apple Developer account
    // as well as your Braintree merchant account, otherwise the Braintree module will fail.
    // const appleOptions: ApplePayOptions = {
    //   merchantId: 'sv9gs7mh748w58jj',
    //   currency: 'USD',
    //   country: 'US'
    // };
    // const paymentOptions: PaymentUIOptions = {
    //   amount: '14.99',
    //   primaryDescription: 'Your product or service (per /item, /month, /week, etc)',
    // };
    // this.braintree.initialize(BRAINTREE_TOKEN)
    //   .then(() => this.braintree.setupApplePay(appleOptions))
    //   .then(() => this.braintree.presentDropInPaymentUI(paymentOptions))
    //   .then((result: PaymentUIResult) => {
    //     if (result.userCancelled) {
    //       console.log("User cancelled payment dialog.");
    //     } else {
    //       console.log("User successfully completed payment!");
    //       console.log("Payment Nonce: " + result.nonce);
    //       console.log("Payment Result.", result);
    //     }
    //   })
    //   .catch((error: string) => console.error(error));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PaymentPage");
  }
}