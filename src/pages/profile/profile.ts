import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {


  user = {
    name: 'Uvuwewe Osas',
    profileImage: '',
    coverImage: '../assets/imgs/card/emerald.jpg',
    occupation: 'Specialist',
    location: 'Mont Kiara, MY',
    items: 500,
    value: 'RM6990',
    subs: 'Diamond'

  };

  languages = ['English', 'Bahasa', '中文'];
  customLoc = ['Wardrobe', 'Chestdrawer', 'Headboard', 'Laundry'];

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello ProfileThree Page');
  }

  openSubs(){
    this.navCtrl.push('SubscribePage');
  }

  openSum(){
    this.navCtrl.push('SubsmaryPage');
  }


}