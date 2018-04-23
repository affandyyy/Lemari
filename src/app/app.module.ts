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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Facebook } from '@ionic-native/facebook'; //facebook connection
import firebase from 'firebase/app'; //firebase connection
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule, AngularFireDatabase} from "angularfire2/database";
import {FIREBASE_CREDENTIALS} from "./firebase.credentials";
import {AngularFireAuthModule} from "angularfire2/auth";


//initial between firebase and Lemari App
firebase.initializeApp({
  apiKey: "AIzaSyDuBnf27h5uM6FUP6oMujO3IDJGB1h276I",
  authDomain: "lemari-2.firebaseapp.com",
  databaseURL: "https://lemari-2.firebaseio.com",
  projectId: "lemari-2",

  storageBucket: "lemari-2.appspot.com",
  messagingSenderId: "296224199871"
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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Facebook
  ]
})
export class AppModule { }
