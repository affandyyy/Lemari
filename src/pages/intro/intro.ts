import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';


/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [
    {
      title: 'Dream\'s Adventure',
      imageUrl: 'assets/img/lists/wishlist-1.jpg',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'For the Weekend',
      imageUrl: 'assets/img/lists/wishlist-2.jpg',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'Family Time',
      imageUrl: 'assets/img/lists/wishlist-3.jpg',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'My Trip',
      imageUrl: 'assets/img/lists/wishlist-4.jpg',
      description: 'Take a look at our amazing options',
    }
  ];

  constructor(private navCtrl: NavController, public navParams: NavParams) {
  }


  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }

  goToApp() {
    this.navCtrl.setRoot(LoginPage);
  }

  skip() {
    this.navCtrl.setRoot(LoginPage);
  }

}
