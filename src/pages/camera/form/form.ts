import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import firebase from 'firebase';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  listOne = [
    {
      title: '1',
      image: './assets/imgs/card/example.png',
    },
    {
      title: '2',
      image: './assets/imgs/card/sweat.jpg',
    },
    {
      title: '3',
      image: './assets/imgs/card/tank.jpeg',
    },
    {
      title: '4',
      image: './assets/imgs/card/tee.jpg',
    },
    {
      title: '5',
      image: './assets/imgs/card/cardigan.jpeg',
    },
    {
      title: '6',
      image: './assets/imgs/card/shirt.jpg',
    }
  ];

  img: any;
  mypicref:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.img = this.navParams.get('uploadImage');
    this.mypicref=firebase.storage().ref('/');
    // console.log("Form Page image: " +this.img);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  goPost(){
    this.uploadPicture();
    this.navCtrl.push(HomePage);
  }

  uploadPicture() {
    this.mypicref.child(this.uid()).child('lemari.jpeg')
    .putString(this.img, firebase.storage.StringFormat.DATA_URL)
    .then(savepic=>{
      this.img=savepic.downloadURL;
    })
}

uid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

}
