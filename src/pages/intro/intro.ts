import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StatusBar } from '@ionic-native/status-bar';


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
      title: 'Your wardrobe, digitalized',
      imageUrl: './assets/imgs/slide/slide-1.jpg',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'For the fashionist',
      imageUrl: './assets/imgs/slide/slide-2.jpg',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'Solution for clutter clothes',
      imageUrl: './assets/imgs/slide/slide-3.jpg',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'All store in one apps',
      imageUrl: './assets/imgs/slide/slide-4.jpg',
      description: 'Take a look at our amazing options',
    }
  ];

  constructor(private navCtrl: NavController, public navParams: NavParams, private statusBar: StatusBar) {
    
  }

  ionViewDidLoad() {
    
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
