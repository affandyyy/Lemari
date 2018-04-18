import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {fb} from "../../models/user-fb/user-fb.interface";
import {Facebook} from "@ionic-native/facebook";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userData = {} as fb;

  user = {
    name: 'Uvuwewe Osas',
    profileImage: '',
    coverImage: './src/assets/imgs/card/emerald.jpg',
    occupation: 'Specialist',
    location: 'Mont Kiara, MY',
    items: 500,
    value: 'RM6990',
    subs: 'Diamond'

  };

  languages = ['English', 'Bahasa', '中文'];
  customLoc = ['Wardrobe', 'Chestdrawer', 'Headboard', 'Laundry'];

  constructor(public navCtrl: NavController, private facebook: Facebook) { }

  ionViewDidLoad() {
    this.facebook.api('me?fields=id,name,email,first_name,hometown,picture.width(100).height(100).as(picture_large)', []).then(profile => {
    this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'], location: profile['hometown']}
    });
  }

  openSubs(){
    this.navCtrl.push('SubscribePage');
  }

  openSum(){
    this.navCtrl.push('SubsmaryPage');
  }


}
