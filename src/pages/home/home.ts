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
  
  blouse:  AngularFireList<any>;
  sweater:  AngularFireList<any>;
  tank:  AngularFireList<any>;
  shirt:  AngularFireList<any>;
  cardigan:  AngularFireList<any>;
  tshirt:  AngularFireList<any>;

  pants:  AngularFireList<any>;
  jeans:  AngularFireList<any>;
  shorts:  AngularFireList<any>;
  skirts:  AngularFireList<any>;
  sweatpant:  AngularFireList<any>;

  sneakers:  AngularFireList<any>;
  sandals:  AngularFireList<any>;
  flats:  AngularFireList<any>;
  sports:  AngularFireList<any>;
  slippers:  AngularFireList<any>;
  boots:  AngularFireList<any>;
  
  cap:  AngularFireList<any>;
  sunglasses:  AngularFireList<any>;
  tie:  AngularFireList<any>;
  bowtie:  AngularFireList<any>;
  scarf:  AngularFireList<any>;

  counter = 0;
  total = 0;

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
      console.log("Response : " + response);
      
      if(response == null){
        this.database.object('users/' + firebase.auth().currentUser.uid).set({
          username: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          profile_picture: firebase.auth().currentUser.photoURL,
          language:"en",
          counter:0,
          subscribeId:'1'
        })
      }

      else{
        this.translate.setDefaultLang(response.language);
        this.translate.use(response.language);
      }
    });  
  }

  clothesId(){
     //Tops Data
     this.blouse = this.database.list(`users/${this.uid}/lemari_category/tops/blouse/`);
     this.sweater = this.database.list(`users/${this.uid}/lemari_category/tops/sweater/`);
     this.tank = this.database.list(`users/${this.uid}/lemari_category/tops/tank/`);
     this.shirt = this.database.list(`users/${this.uid}/lemari_category/tops/shirt/`);
     this.cardigan = this.database.list(`users/${this.uid}/lemari_category/tops/cardigan/`);
     this.tshirt = this.database.list(`users/${this.uid}/lemari_category/tops/tshirt/`);
 
     //Bottoms Data
     this.pants = this.database.list(`users/${this.uid}/lemari_category/bottom/pants/`);
     this.jeans = this.database.list(`users/${this.uid}/lemari_category/bottom/jeans/`);
     this.shorts = this.database.list(`users/${this.uid}/lemari_category/bottom/shorts/`);
     this.skirts = this.database.list(`users/${this.uid}/lemari_category/bottom/skirts/`);
     this.sweatpant = this.database.list(`users/${this.uid}/lemari_category/bottom/sweatpant/`);
 
     //Shoes Data
     this.sneakers = this.database.list(`users/${this.uid}/lemari_category/shoes/sneakers/`);
     this.sandals = this.database.list(`users/${this.uid}/lemari_category/shoes/sandals/`);
     this.flats = this.database.list(`users/${this.uid}/lemari_category/shoes/flats/`);
     this.sports = this.database.list(`users/${this.uid}/lemari_category/shoes/sports/`);
     this.slippers = this.database.list(`users/${this.uid}/lemari_category/shoes/slippers/`);
     this.boots = this.database.list(`users/${this.uid}/lemari_category/shoes/boots/`);
 
     //Accessories Data
     this.cap = this.database.list(`users/${this.uid}/lemari_category/accessories/cap/`);
     this.sunglasses = this.database.list(`users/${this.uid}/lemari_category/accessories/sunglasses/`);
     this.tie = this.database.list(`users/${this.uid}/lemari_category/accessories/tie/`);
     this.bowtie = this.database.list(`users/${this.uid}/lemari_category/accessories/bowtie/`);
     this.scarf = this.database.list(`users/${this.uid}/lemari_category/accessories/scarf/`);
  }

  conditionCounter(){
    if(this.calc() == null){
      this.database.object(`users/${this.uid}/counter`).set(0);
    }
    else{
      this.calc();
    }
  }

  calc(){
    //Tops Value
    this.blouse.valueChanges().subscribe(response => {
        this.calculateSum(response.length);
    });
    this.sweater.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.tank.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.shirt.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.cardigan.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.tshirt.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    
    //Bottom Value
    this.pants.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.jeans.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.shorts.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.skirts.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.sweatpant.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });

    //Shoes Value
    this.sneakers.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.sandals.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.flats.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.sports.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.slippers.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.boots.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });

    //Accessories Value
    this.cap.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.sunglasses.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.tie.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.bowtie.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
    this.scarf.valueChanges().subscribe(response => {
      this.calculateSum(response.length);
    });
  }

  calculateSum(value) {
    this.counter += parseInt(value);
    this.totalCount(this.counter);
  }

  totalCount(value){
    this.total = parseInt(value);
    //save count in firebase
    this.database.object(`users/${this.uid}`).update({counter:this.total});
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
      subTitle: "blouse",
      name: "Blouse",
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
