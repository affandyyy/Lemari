import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';

import { AngularFireAuth } from 'angularfire2/auth';


import * as firebase from 'firebase';
import { TemplateBindingParseResult } from '@angular/compiler';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth: AngularFireAuth,
  ) {

    



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      // this.auth.authState.subscribe(auth => {
      //   if(auth) {
      //     this.rootPage = HomePage;
      //     this.uid = firebase.auth().currentUser.uid;
      //     this.userFBRef = this.database.object(`users/${this.uid}`);
      //     this.userFB = this.userFBRef.valueChanges();
      //     this.userFBFunc();
      //   }else{
      //     this.rootPage = LoginPage;
      //     // this.openModal('SignupModalPage');
      //   }
      // })

    });
  }
}
