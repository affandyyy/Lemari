import firebase from 'firebase'; //firebase connection
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { WardrobePage } from './../wardrobe/wardrobe';
import { Component, ViewChild} from '@angular/core';
import { NavController, Slides, ModalController } from 'ionic-angular';

import "rxjs/add/operator/take";
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;

  userFBRef: AngularFireObject<any>;
  userFB: Observable<any>;
  uid:any;

  category: any;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public statusBar: StatusBar, 
              public translate:TranslateService,
              public facebook: Facebook,
              private database: AngularFireDatabase) {
      this.statusBar.backgroundColorByHexString("#500E6F");
      this.statusBar.overlaysWebView(true);

      this.uid = firebase.auth().currentUser.uid;
      this.userFBRef = this.database.object(`users/${this.uid}`);
      this.userFB = this.userFBRef.valueChanges();

      this.getUserData();
  }

  getUserData(){
    this.userFB.subscribe(response => {
      console.log("Response : " + response);
      
      this.translate.setDefaultLang(response.language);
      this.translate.use(response.language);

      if(response == null){
        this.database.object('users/' + firebase.auth().currentUser.uid).set({
          username: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          profile_picture: firebase.auth().currentUser.photoURL,
          language:"en",
        })
      }
    });  
  }

  openShuffle(){
    this.navCtrl.push('ShufflePage');
  }
  
  openThis() {
    this.openModal('ItemmodalPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  openGallery(category){
    this.navCtrl.push(WardrobePage, {category});
  }



  listOne = [
    {
      image: './assets/imgs/card/blouse.jpg',
      name: 'Blouse'
    },
    {
      image: './assets/imgs/card/sweater.png',
      name: 'Sweat'
    },
    {
      image: './assets/imgs/card/tank.jpg',
      name: 'Tank'

    },
    {
      image: './assets/imgs/card/shirt.jpg',
      name: 'Shirt'

    },
    {
      image: './assets/imgs/card/cardigan.jpg',
      name: 'Cardigan'

    },
    {
      image: './assets/imgs/card/shirt.jpg',
      name: 'Shirt'

    }
  ];

  listTwo = [
    {
      image: './assets/imgs/card/pants.jpg',
      name: 'Pants'
    },
    {
      image: './assets/imgs/card/jeans.jpg',
      name: 'Jeans'
    },
    {
      image: './assets/imgs/card/shorts.jpg',
      name: 'Shorts'
    },
    {
      image: './assets/imgs/card/skirts.jpg',
      name: 'Skirts'
    },
    {
      image: './assets/imgs/card/sweat.jpg',
      name: 'Sweat Pant'
    }
  ];

  listThree = [
    {
      image: './assets/imgs/card/sandals.jpg',
      name: 'Sandal'
    },
    {
      name: 'Sneakers'
    },
    {
      name: 'Flats'
    },
    {
      name: 'Sports'
    },
    {
      name: 'Slippers'
    },
    {
      name: 'Boots'
    }
  ];

  listFour = [
    {
      name: ' '
    },
    {
      name: ' '
    },
    {
      name: ' '
    },
    {
      name: ' '
    },
    {
      name: ' '
    },
    {
      name: ' '
    }
  ];

  // slides = [
  //   {
  //     title: '',
  //     imageUrl: 'assets/imgs/wishlist-1.png',
  //     songs: 2,
  //     private: false
  //   },
  //   {
  //     title: 'Highlights',
  //     imageUrl: 'assets/imgs/wishlist-2.png',
  //     songs: 4,
  //     private: false
  //   },
  //   {
  //     title: 'OOTD',
  //     imageUrl: 'assets/imgs/wishlist-3.png',
  //     songs: 5,
  //     private: true
  //   },
  //   {
  //     title: 'Trendy',
  //     imageUrl: 'assets/imgs/wishlist-4.png',
  //     songs: 12,
  //     private: true
  //   }
  // ];

}
