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
  subCategory: any;

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

  openGallery(category,subCategory){
    this.navCtrl.push(WardrobePage, {category,subCategory});
  }



  listOne = [
    {
      id:'1',
      title: 'tops',
      subTitle:'tshirt',
      image: './assets/imgs/card/example.png'
      ///./assets/imgs/card/example.png
    },
    {
      id:'2',
      title: 'tops',
      subTitle:'shirt',
      image: './assets/imgs/card/shirt.jpg'
    },
    {
      id:'3',
      title: 'tops',
      subTitle:'tanktop',
      image: './assets/imgs/card/tank.jpeg'
    },
    {
      id:'4',
      title: 'tops',
      subTitle:'sweatshirt',
      image: './assets/imgs/card/tee.jpg'
    },
    {
      id:'5',
      title: 'tops',
      subTitle:'cardigan',
      image: './assets/imgs/card/cardigan.jpeg'
    },
    {
      id:'5',
      title: 'tops',
      subTitle:'sweater',
      image: './assets/imgs/card/sweat.jpg'
    }
  ];

  listTwo = [
    {
      id:'1',
      title: 'bottom',
      subTitle:'jeans',
      image: './assets/imgs/card/trou.jpeg',
    },
    {
      id:'2',
      title: 'bottom',
      subTitle:'cargopants',
    },
    {
      id:'3',
      title: 'bottom',
      subTitle:'dresspants',
    },
    {
      id:'4',
      title: 'bottom',
      subTitle:'shorts',
    },
    {
      id:'5',
      title: 'bottom',
      subTitle:'sweatpants',
    },
    {
      id:'6',
      title: 'bottom',
      subTitle:'skirt',
    }
  ];

  listThree = [
    {
      id:'1',
      title: 'shoes',
      subTitle:'sneakers',
      image: './assets/imgs/card/shoes.jpg',
    },
    {
      id:'2',
      title: 'shoes',
      subTitle:'sandals',
    },
    {
      id:'3',
      title: 'shoes',
      subTitle:'flats',
    },
    {
      id:'4',
      title: 'shoes',
      subTitle:'heels',
    },
    {
      id:'5',
      title: 'shoes',
      subTitle:'slippers',
    },
    {
      id:'6',
      title: 'shoes',
      subTitle:'boots',
    }
  ];

  listFour = [
    {
      id:'1',
      title: 'accessories',
      subTitle:'hat',
    },
    {
      id:'2',
      title: 'accessories',
      subTitle:'cap',
    },
    {
      id:'3',
      title: 'accessories',
      subTitle:'sunglasses',
    },
    {
      id:'4',
      title: 'accessories',
      subTitle:'tie',
    },
    {
      id:'5',
      title: 'accessories',
      subTitle:'bowtie',
    },
    {
      id:'6',
      title: 'accessories',
      subTitle:'scarf',
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
