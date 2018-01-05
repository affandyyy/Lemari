import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


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