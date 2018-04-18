import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CameraPage } from '../pages/camera/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAb_L8fcd0NqkCM210vP2tuMvSOvi77P0o",
  authDomain: "lemari-1.firebaseapp.com",
  databaseURL: "https://lemari-1.firebaseio.com",
  projectId: "lemari-1",
  storageBucket: "lemari-1.appspot.com",
  messagingSenderId: "901133329281"
});

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook
  ]
})
export class AppModule { }
