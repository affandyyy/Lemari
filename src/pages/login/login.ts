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
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            if(firebase.auth().currentUser.uid == null){
              firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                username: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                profile_picture: firebase.auth().currentUser.photoURL,
              })
              this.navCtrl.setRoot(TabsPage);
            }
            else{
              this.navCtrl.setRoot(TabsPage);
            }
          })
      })
      .catch((error) => { this.createAlert(error) })
  }

  // login(){
  //   this.navCtrl.push(TabsPage);
  // }

  createAlert(err) {
    let alert = this.alt.create({
      title: 'Errors',
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
