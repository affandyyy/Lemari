import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CameraPage } from '../pages/camera/camera';
import { EditPage } from '../pages/camera/edit/edit';
// import { IntroPage } from '../pages/intro/intro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

//After Facebook
import { Facebook } from '@ionic-native/facebook'; //facebook connection
import firebase from 'firebase/app'; //firebase connection
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule, AngularFireDatabase} from "angularfire2/database";
import {FIREBASE_CREDENTIALS} from "./firebase.credentials";
import {AngularFireAuthModule} from "angularfire2/auth";

import { IonicStorageModule } from '@ionic/storage';



//initial between firebase and Lemari App
firebase.initializeApp(FIREBASE_CREDENTIALS)


@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    ProfilePage,
    HomePage,
    TabsPage,
    EditPage
    // IntroPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    EditPage
    // IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Crop,
    Camera,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
