import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
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
  url:any;

  category:any;
  brand:any;
  color:AngularFireObject<any>;;
  price:any;
  tag:any;
  location:any;
  
  uid: string;
  detailRef: AngularFireList<any>;
  details: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    //init data
    this.uid = firebase.auth().currentUser.uid;
    this.detailRef = this.database.list(`users/${this.uid}/lemari_category/`);
    this.details = this.detailRef.valueChanges();
    this.getData();
    
    //get Image from Edit Page
    this.img = this.navParams.get('uploadImage');
    this.mypicref=firebase.storage().ref('/');
    // console.log("Form Page image: " +this.img);
  }

  getData(){
    this.details.subscribe(response => {
      console.log(response);
    });
  }

  saveDetail() {
    this.mypicref.child(this.imageUid()).child('lemari.jpeg')
    .putString(this.img, firebase.storage.StringFormat.DATA_URL)
    .then(savepic=>{
      this.img=savepic.downloadURL;

      let url = savepic.downloadURL;
      this.database.list(`users/${this.uid}/lemari_category/`).push({
        category:this.category,
        image_url:url,
        brand:this.brand,
        color:this.color,
        price:this.price,
        tag:this.tag,
        location:this.location
      })
      
      // console.log(url);
    })
  }

  imageUid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  goPost(){
    this.saveDetail();
    this.navCtrl.push(HomePage);
  }

}
