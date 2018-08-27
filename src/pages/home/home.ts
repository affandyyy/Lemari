import { AngularFireList } from 'angularfire2/database';
import firebase from 'firebase'; //firebase connection
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { WardrobePage } from './../wardrobe/wardrobe';
import { Component, ViewChild} from '@angular/core';
import { NavController, Slides, ModalController, NavParams } from 'ionic-angular';

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
  subCategory: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController, 
              public statusBar: StatusBar, 
              public translate:TranslateService,
              public facebook: Facebook,
              private database: AngularFireDatabase
            ) {
      this.statusBar.backgroundColorByHexString("#500E6F");
      this.statusBar.overlaysWebView(true);

      this.uid = firebase.auth().currentUser.uid;
      this.userFBRef = this.database.object(`users/${this.uid}`);
      this.userFB = this.userFBRef.valueChanges();

      this.getUserData();
    }
  
  getUserData(){
    this.userFB.subscribe(response => {
      
      if(response == null){
        this.database.object('users/' + firebase.auth().currentUser.uid).set({
          username: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          profile_picture: firebase.auth().currentUser.photoURL,
          language:"en",
          subscribeId:'1'
        })
      }
      else{
        this.translate.setDefaultLang(response.language);
        this.translate.use(response.language);
      }
    });  
  }

  openShuffle() {
    this.navCtrl.push("ShufflePage");
  }

  openGallery(category, subCategory) {
    this.navCtrl.push(WardrobePage, { category, subCategory });
  }

  listOne = [
    {
      id: "1",
      title: "tops",
      subTitle: "dress",
      name: "Dress",
      image: "./assets/imgs/card/blouse.jpg"
    },
    {
      id: "2",
      title: "tops",
      subTitle: "sweater",
      name: "Sweater",
      image: "./assets/imgs/card/sweater.png"
    },
    {
      id: "3",
      title: "tops",
      subTitle: "tank",
      name: "Tank",
      image: "./assets/imgs/card/tank.jpg"
    },
    {
      id: "4",
      title: "tops",
      subTitle: "shirt",
      name: "Shirt",
      image: "./assets/imgs/card/shirt.jpg"
    },
    {
      id: "5",
      title: "tops",
      subTitle: "cardigan",
      name: "Cardigan",
      image: "./assets/imgs/card/cardigan.jpg"
    },
    {
      id: "6",
      title: "tops",
      subTitle: "tshirt",
      name: "T-Shirt",
      image: "./assets/imgs/card/shirt.jpg"
    }
  ];

  listTwo = [
    {
      id: "1",
      title: "bottom",
      subTitle: "pants",
      name: "Pants",
      image: "./assets/imgs/card/pants.jpg"
    },
    {
      id: "2",
      title: "bottom",
      subTitle: "jeans",
      name: "Jeans",
      image: "./assets/imgs/card/jeans.png"
    },
    {
      id: "3",
      title: "bottom",
      subTitle: "shorts",
      name: "Shorts",
      image: "./assets/imgs/card/shorts.jpg"
    },
    {
      id: "4",
      title: "bottom",
      subTitle: "skirts",
      name: "Skirts",
      image: "./assets/imgs/card/skirts.jpg"
    },
    {
      id: "5",
      title: "bottom",
      subTitle: "sweatpant",
      name: "Sweat Pant",
      image: "./assets/imgs/card/sweat.jpg"
    }
  ];

  listThree = [
    {
      id: "1",
      title: "shoes",
      subTitle: "sneakers",
      name: "Sneakers",
      image: "./assets/imgs/card/shoes.jpg"
    },
    {
      id: "2",
      title: "shoes",
      subTitle: "sandal",
      name: "Sandal",
      image: "./assets/imgs/card/sandals.jpg"
    },
    {
      id: "3",
      title: "shoes",
      subTitle: "flats",
      name: "Flats",
      image: "./assets/imgs/card/flat.jpg"
    },
    {
      id: "4",
      title: "shoes",
      subTitle: "sports",
      name: "Sports",
      image: "./assets/imgs/card/sport.jpg"
    },
    {
      id: "5",
      title: "shoes",
      subTitle: "slippers",
      name: "Slippers",
      image: "./assets/imgs/card/slipper.jpg"
    },
    {
      id: "6",
      title: "shoes",
      subTitle: "boots",
      name: "Boots",
      image: "./assets/imgs/card/boots.jpg"
    }
  ];

  listFour = [
    {
      id: "1",
      title: "accessories",
      subTitle: "Cap",
      name: "Cap",
      image: "./assets/imgs/card/hat.png"
    },
    {
      id: "3a",
      title: "accessories",
      subTitle: "sunglasses",
      name: "Sunglasses",
      image: "./assets/imgs/card/glass.png"
    },
    {
      id: "4",
      title: "accessories",
      subTitle: "tie",
      name: "Tie",
      image: "./assets/imgs/card/tie.jpg"
    },
    {
      id: "5",
      title: "accessories",
      subTitle: "bowtie",
      name: "Bowtie",
      image: "./assets/imgs/card/bow.jpg"
    },
    {
      id: "6",
      title: "accessories",
      subTitle: "scarf",
      name: "Scarf",
      image: "./assets/imgs/card/scarf.png"
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
