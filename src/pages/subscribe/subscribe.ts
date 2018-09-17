import firebase from "firebase";
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { PaymentPage } from './../payment/payment';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


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
      subtitle: 'Free',
      value: 0,
    },
    {
      id:'2',
      imageUrl: 'assets/imgs/card/sapp.jpg',
      title: 'Sapphire 100',
      subtitle: 'RM30',
      value: 30
    },
    {
      id:'3',
      imageUrl: 'assets/imgs/card/ruby.jpg',
      title: 'Ruby 300',
      subtitle: 'RM50',
      value: 50
    },
    {
      id:'4',
      imageUrl: 'assets/imgs/card/diamond.jpg',
      title: 'Diamond ∞',
      subtitle: 'RM88',
      value: 88
    }];

    uid:any;
    subscribeIdRef:AngularFireObject<any>;
    subscribeId:any;
    counter = 0;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alert: AlertController, 
    public modalCtrl: ModalController,
    private database:AngularFireDatabase) {
      this.subscribeID();
      this.counter = this.navParams.get("counter");
  }

  subscribeID(){
    this.uid = firebase.auth().currentUser.uid;
    this.subscribeIdRef = this.database.object(`users/${this.uid}/subscribeId/`);
  }

  subscribePayment(subscribeId) {
    this.subscribeIdRef.valueChanges().subscribe(response =>{
      if(response == subscribeId){
        const alertItem =  this.alert.create({
          title: 'Already Subscribe!',
          subTitle:  " You're already subscribe this package, storage left is " + this.counter + " at subscription package ",
          buttons: [
            {
              text: 'Okay',
              handler: () => {['Dismiss']}
            }
          ]
        });
        alertItem.present();
      }
      else{
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
    });
  }  

  openModal(pageName,subscribeId) {
    this.modalCtrl.create(pageName, {subscribeId}, { cssClass: 'inset-modal' })
      .present();
  }

}
