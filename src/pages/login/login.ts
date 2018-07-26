import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Tab } from 'ionic-angular';


// import { CameraPage } from '../camera/camera';
//Pages

import firebase from 'firebase'; //firebase connection
import { Facebook } from "@ionic-native/facebook"; //facebook connection
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public backgroundImage = "./assets/imgs/tnc.jpg";
  loading: any;

  constructor(
    private alt: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modal: ModalController, 
    public loadingCtrl: LoadingController, 
    public facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // authentication to login facebook
  login(): Promise<any> {
    return this.facebook.login(['email', 'public_profile'])
      .then(response => {
        this.loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: 'Loading'
        });
        
        this.loading.present();
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            this.navCtrl.setRoot(TabsPage);
            this.loading.dismiss();
        })
      this.loading.dismiss();
      })
      .catch((error) => { this.createAlert("Sign in failed. Please try again") })
  }

  loginHome(){
    this.navCtrl.push(TabsPage);
  }

  createAlert(err) {
    let alert = this.alt.create({
      title: 'Ops !',
      message: err
    }).present();
  }

  openModal() {
    this.openThis('TcModalPage');
  }

  openThis(pageName) {
    this.modal.create(pageName, null, { cssClass: 'inset-modal' })
      .present();
  }




}
