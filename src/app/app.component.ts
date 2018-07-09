import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';
// import { TemplateBindingParseResult } from '@angular/compiler';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TabsPage;
  loader: any;
  userFBRef: AngularFireObject<any>;
  userFB: Observable<any>;
  uid: string;


  constructor(
    platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private database: AngularFireDatabase,
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


      this.auth.authState.subscribe(auth => {
        if (!auth) {
          this.storage.get('introShown').then((result) => {
            if (result) {
              this.nav.setRoot(LoginPage)
              // this.rootPage = 'LoginPage';
            } else {
              // this.rootPage = 'IntroPage';
              this.nav.setRoot(IntroPage)
              this.storage.set('introShown', true);
            }
            // this.loader.dismiss();
          });
          // this.nav.setRoot(LoginPage)
          // this.rootPage = LoginPage;
          // this.openModal('SignupModalPage');
        } else {
          this.nav.setRoot(TabsPage)
          this.uid = firebase.auth().currentUser.uid;
          this.userFBRef = this.database.object(`users/${this.uid}`);
          this.userFB = this.userFBRef.valueChanges();
          
        }
      })

  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Tidying up..."
    });

    this.loader.present();
  }
}
