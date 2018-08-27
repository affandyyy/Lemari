import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController,
  AlertController,
  Tab
} from "ionic-angular";

// import { CameraPage } from '../camera/camera';
//Pages

import firebase from "firebase"; //firebase connection
import { Facebook } from "@ionic-native/facebook"; //facebook connection
// import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { SubsuccessPage } from "../subscribe/subsuccess/subsuccess";
import { AngularFireDatabase  } from "angularfire2/database";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  @ViewChild("player") player;

  public backgroundImage = "./assets/imgs/tnc.jpg";
  loading: any;

  constructor(
    private alt: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public facebook: Facebook,
    private database: AngularFireDatabase
  ) {}

  // // It's interesting to remove the src and put it back
  // // when entering and leaving the page so there are no memory leaks.
  // ionViewWillLeave() {
  //   // the .nativeElement property of the ViewChild is the reference to the tag <video>
  //   this.player.nativeElement.src = "";
  //   this.player.nativeElement.load();
  // }

  // ionViewWillEnter() {
  //   this.player.nativeElement.src = "assets/video/clothing.mp4";
  //   this.player.nativeElement.load();
  // }

  // authentication to login facebook
  login(): Promise<any> {
    return this.facebook
      .login(["email", "public_profile"])
      .then(response => {
        this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `<img src="assets/imgs/loading.gif" />`,
          duration: 3000
        });

        this.loading.present();
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then((success) => {  
            this.database.object(`users/${firebase.auth().currentUser.uid}`).valueChanges().subscribe(response => {
      
              if(response == null){
                firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                  username: firebase.auth().currentUser.displayName,
                  email: firebase.auth().currentUser.email,
                  profile_picture: firebase.auth().currentUser.photoURL,
                  language:"en",
                  subscribeId:'1'
                })
                this.navCtrl.setRoot(TabsPage);
              }
              else{
                this.navCtrl.setRoot(TabsPage);
              }
            }); 
          });
      })
      .catch(error => {
        this.createAlert("Sign in failed. Please try again");
      });
  }

  createAlert(err) {
    let alert = this.alt
      .create({
        title: "Ops !",
        message: err
      })
      .present();
  }

  openModal() {
    this.openThis("TcModalPage");
  }

  openThis(pageName) {
    this.modal.create(pageName, null, { cssClass: "inset-modal" }).present();
  }

  // // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // // A programmatically way to make a nice rainbow effect, there you go.
  // // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  // colors = new Array(
  //   [62, 35, 255],
  //   [60, 255, 60],
  //   [255, 35, 98],
  //   [45, 175, 230],
  //   [255, 0, 255],
  //   [255, 128, 0]);

  // step = 0;
  // // color table indices for:
  // // [current color left,next color left,current color right,next color right]
  // colorIndices = [0, 1, 2, 3];

  // // transition speed
  // gradientSpeed = 0.00005;
  // gradient = '';

  // updateGradient() {

  //   const c00 = this.colors[this.colorIndices[0]];
  //   const c01 = this.colors[this.colorIndices[1]];
  //   const c10 = this.colors[this.colorIndices[2]];
  //   const c11 = this.colors[this.colorIndices[3]];

  //   const istep = 1 - this.step;
  //   const r1 = Math.round(istep * c00[0] + this.step * c01[0]);
  //   const g1 = Math.round(istep * c00[1] + this.step * c01[1]);
  //   const b1 = Math.round(istep * c00[2] + this.step * c01[2]);
  //   const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

  //   const r2 = Math.round(istep * c10[0] + this.step * c11[0]);
  //   const g2 = Math.round(istep * c10[1] + this.step * c11[1]);
  //   const b2 = Math.round(istep * c10[2] + this.step * c11[2]);
  //   const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

  //   this.gradient = `-webkit-gradient(linear, left top, right bottom, from(${color1}), to(${color2}))`;
  //   this.step += this.gradientSpeed;
  //   if (this.step >= 1) {
  //     this.step %= 1;
  //     this.colorIndices[0] = this.colorIndices[1];
  //     this.colorIndices[2] = this.colorIndices[3];

  //     // pick two new target color indices
  //     // do not pick the same as the current one
  //     this.colorIndices[1] =
  //       (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
  //       % this.colors.length;

  //     this.colorIndices[3] =
  //       (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
  //       % this.colors.length;

  //   }

  //   setInterval(() => { this.updateGradient(); }, 40);
  // }
}
