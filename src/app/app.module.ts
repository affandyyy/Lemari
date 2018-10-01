import { ShufflePage } from './../pages/shuffle/shuffle';
import { SubscribePage } from './../pages/subscribe/subscribe';
import { PaymentPage } from './../pages/payment/payment';
import { WardrobePage } from './../pages/wardrobe/wardrobe';
import { ItemmodalPage } from './../pages/wardrobe/itemmodal/itemmodal';
import { FormPage } from './../pages/camera/form/form';
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
import { Braintree } from '@ionic-native/braintree';


//After Facebook
import { Facebook } from '@ionic-native/facebook'; //facebook connection
import firebase from 'firebase/app'; //firebase connection
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule, AngularFireDatabase} from "angularfire2/database";
import {FIREBASE_CREDENTIALS} from "./firebase.credentials";
import {AngularFireAuthModule} from "angularfire2/auth";

import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from '../pages/login/login.module';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SubsmaryPage } from '../pages/profile/subsmary/subsmary';
import { SubsuccessPage } from '../pages/subscribe/subsuccess/subsuccess';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//initial between firebase and Lemari App
firebase.initializeApp(FIREBASE_CREDENTIALS)

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    ProfilePage,
    HomePage,
    TabsPage,
    EditPage,
    FormPage,
    WardrobePage,
    ItemmodalPage,
    SubscribePage,
    SubsmaryPage,
    SubsuccessPage,
    PaymentPage,
    ShufflePage
    // IntroPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    LoginPageModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    ProfilePage,
    HomePage,
    TabsPage,
    EditPage,
    FormPage,
    LoginPage,
    WardrobePage,
    ItemmodalPage,
    SubscribePage,
    SubsmaryPage,
    SubsuccessPage,
    PaymentPage,
    ShufflePage
    // IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Crop,
    Camera,
    Braintree,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
