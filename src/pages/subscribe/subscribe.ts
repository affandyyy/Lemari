import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      imageUrl: 'assets/imgs/card/emerald.jpg',
      title: 'Emerald 20',
      subtitle: 'Free'
    },
    {
      imageUrl: 'assets/imgs/card/sapp.jpg',
      title: 'Sapphire 100',
      subtitle: 'RM30'
    },
    {
      imageUrl: 'assets/imgs/card/ruby.jpg',
      title: 'Ruby 300',
      subtitle: 'RM50'
    },
    {
      imageUrl: 'assets/imgs/card/diamond.jpg',
      title: 'Diamond ∞',
      subtitle: 'RM88'
    }];

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
  }

}
