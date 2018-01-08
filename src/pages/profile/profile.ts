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
    coverImage: '',
    occupation: 'Specialist',
    location: 'Mont Kiara, MY',
    items: 500,
    value: 'RM990',
    subs: 'Diamond'

  };

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello ProfileThree Page');
  }


}