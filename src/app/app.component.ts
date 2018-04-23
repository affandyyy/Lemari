import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // var config = {
    //   apiKey: "AIzaSyAZjHL3BjtaVqj5SPqXuMV-z_9h9AGHlx4",
    //   authDomain: "gh-hendi.firebaseapp.com",
    //   databaseURL: "https://gh-hendi.firebaseio.com",
    //   projectId: "gh-hendi",
    //   storageBucket: "gh-hendi.appspot.com",
    //   messagingSenderId: "968697856347"
    // };

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
