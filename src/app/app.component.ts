import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';

import { EditPage } from '../pages/camera/edit/edit';


import { AngularFireAuth } from 'angularfire2/auth';


import * as firebase from 'firebase';
import { TemplateBindingParseResult } from '@angular/compiler';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  loader: any;


  constructor(
    platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AngularFireAuth,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.presentLoading();

    platform.ready().then(() => {
      this.storage.get('introShown').then((result) => {
        if(result){
          this.rootPage = 'LoginPage';
        } else {
          this.rootPage = 'IntroPage';
          this.storage.set('introShown', true);
          
        }

        this.loader.dismiss();

        });

      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      // this.statusBar.backgroundColorByHexString("#DE4E47");
      this.statusBar.styleLightContent();
      this.splashScreen.hide();


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

  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Tidying up..."
    });

    this.loader.present();
  }
}
