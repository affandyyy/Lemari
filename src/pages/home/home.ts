import { ShufflePage } from './../shuffle/shuffle';
import { AngularFireList } from 'angularfire2/database';
import firebase from 'firebase'; //firebase connection
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Facebook } from '@ionic-native/facebook';
import { WardrobePage } from './../wardrobe/wardrobe';
import { Component, ViewChild} from '@angular/core';
import { NavController, Slides, ModalController, NavParams, LoadingController } from 'ionic-angular';

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
  loading: any;

  spaceArrayDress = [];
  spaceArraySweater = [];
  spaceArrayTank = [];
  spaceArrayShirt = [];
  spaceArrayCardigan = [];
  spaceArrayTshirt = [];

  spaceArrayPants = [];
  spaceArrayJeans = [];
  spaceArrayShorts = [];
  spaceArraySkirts = [];
  spaceArraySweatpant = [];

  spaceArraySneakers = [];
  spaceArraySandals = [];
  spaceArrayFlats = [];
  spaceArraySports = [];
  spaceArraySlippers = [];
  spaceArrayBoots = [];

  spaceArrayCap = [];
  spaceArraySunglasses = [];
  spaceArrayTie = [];
  spaceArrayBowtie = [];
  spaceArrayScarf = [];

  dress:  AngularFireObject<any>;
  sweater:  AngularFireObject<any>;
  tank:  AngularFireObject<any>;
  shirt:  AngularFireObject<any>;
  cardigan:  AngularFireObject<any>;
  tshirt:  AngularFireObject<any>;

  pants:  AngularFireObject<any>;
  jeans:  AngularFireObject<any>;
  shorts:  AngularFireObject<any>;
  skirts:  AngularFireObject<any>;
  sweatpant:  AngularFireObject<any>;

  sneakers:  AngularFireObject<any>;
  sandals:  AngularFireObject<any>;
  flats:  AngularFireObject<any>;
  sports:  AngularFireObject<any>;
  slippers:  AngularFireObject<any>;
  boots:  AngularFireObject<any>;
  
  cap:  AngularFireObject<any>;
  sunglasses:  AngularFireObject<any>;
  tie:  AngularFireObject<any>;
  bowtie:  AngularFireObject<any>;
  scarf:  AngularFireObject<any>;

  dressCount:  AngularFireList<any>;
  sweaterCount:  AngularFireList<any>;
  tankCount:  AngularFireList<any>;
  shirtCount:  AngularFireList<any>;
  cardiganCount:  AngularFireList<any>;
  tshirtCount:  AngularFireList<any>;

  pantsCount:  AngularFireList<any>;
  jeansCount:  AngularFireList<any>;
  shortsCount:  AngularFireList<any>;
  skirtsCount:  AngularFireList<any>;
  sweatpantCount:  AngularFireList<any>;

  sneakersCount:  AngularFireList<any>;
  sandalsCount:  AngularFireList<any>;
  flatsCount:  AngularFireList<any>;
  sportsCount:  AngularFireList<any>;
  slippersCount:  AngularFireList<any>;
  bootsCount:  AngularFireList<any>;
  
  capCount:  AngularFireList<any>;
  sunglassesCount:  AngularFireList<any>;
  tieCount:  AngularFireList<any>;
  bowtieCount:  AngularFireList<any>;
  scarfCount:  AngularFireList<any>;

  listOne = [];
  listTwo = [];
  listThree = [];
  listFour = [];

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController, 
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

      this.loading = this.loadingCtrl.create({
        spinner: 'ios',
        content: 'Loading',
      });
      
      this.loading.present();

      this.getUserData();
      this.clothesId();
      this.calc();
      this.getImageData();

      this.loading.dismiss();
    }
  
  getUserData(){
    this.userFB.subscribe(response => {
      this.translate.setDefaultLang(response.language);
      this.translate.use(response.language);
    });  
  }

  clothesId(){
    //Tops Data
    this.dress = this.database.object(`users/${this.uid}/lemari_category_preview/tops/dress/`);
    this.sweater = this.database.object(`users/${this.uid}/lemari_category_preview/tops/sweater/`);
    this.tank = this.database.object(`users/${this.uid}/lemari_category_preview/tops/tank/`);
    this.shirt = this.database.object(`users/${this.uid}/lemari_category_preview/tops/shirt/`);
    this.cardigan = this.database.object(`users/${this.uid}/lemari_category_preview/tops/cardigan/`);
    this.tshirt = this.database.object(`users/${this.uid}/lemari_category_preview/tops/tshirt/`);

    //Bottoms Data
    this.pants = this.database.object(`users/${this.uid}/lemari_category_preview/bottom/pants/`);
    this.jeans = this.database.object(`users/${this.uid}/lemari_category_preview/bottom/jeans/`);
    this.shorts = this.database.object(`users/${this.uid}/lemari_category_preview/bottom/shorts/`);
    this.skirts = this.database.object(`users/${this.uid}/lemari_category_preview/bottom/skirts/`);
    this.sweatpant = this.database.object(`users/${this.uid}/lemari_category_preview/bottom/sweatpant/`);

    //Shoes Data
    this.sneakers = this.database.object(`users/${this.uid}/lemari_category_preview/shoes/sneakers/`);
    this.sandals = this.database.object(`users/${this.uid}/lemari_category_preview/shoes/sandals/`);
    this.flats = this.database.object(`users/${this.uid}/lemari_category_preview/shoes/flats/`);
    this.sports = this.database.object(`users/${this.uid}/lemari_category_preview/shoes/sports/`);
    this.slippers = this.database.object(`users/${this.uid}/lemari_category_preview/shoes/slippers/`);
    this.boots = this.database.object(`users/${this.uid}/lemari_category_preview/shoes/boots/`);

    //Accessories Data
    this.cap = this.database.object(`users/${this.uid}/lemari_category_preview/accessories/cap/`);
    this.sunglasses = this.database.object(`users/${this.uid}/lemari_category_preview/accessories/sunglasses/`);
    this.tie = this.database.object(`users/${this.uid}/lemari_category_preview/accessories/tie/`);
    this.bowtie = this.database.object(`users/${this.uid}/lemari_category_preview/accessories/bowtie/`);
    this.scarf = this.database.object(`users/${this.uid}/lemari_category_preview/accessories/scarf/`);

    //Tops Count Data
    this.dressCount = this.database.list(`users/${this.uid}/lemari_category/tops/dress/`);
    this.sweaterCount = this.database.list(`users/${this.uid}/lemari_category/tops/sweater/`);
    this.tankCount = this.database.list(`users/${this.uid}/lemari_category/tops/tank/`);
    this.shirtCount = this.database.list(`users/${this.uid}/lemari_category/tops/shirt/`);
    this.cardiganCount = this.database.list(`users/${this.uid}/lemari_category/tops/cardigan/`);
    this.tshirtCount = this.database.list(`users/${this.uid}/lemari_category/tops/tshirt/`);

    //Bottoms Count Data
    this.pantsCount = this.database.list(`users/${this.uid}/lemari_category/bottom/pants/`);
    this.jeansCount = this.database.list(`users/${this.uid}/lemari_category/bottom/jeans/`);
    this.shortsCount = this.database.list(`users/${this.uid}/lemari_category/bottom/shorts/`);
    this.skirtsCount = this.database.list(`users/${this.uid}/lemari_category/bottom/skirts/`);
    this.sweatpantCount = this.database.list(`users/${this.uid}/lemari_category/bottom/sweatpant/`);

    //Shoes Count Data
    this.sneakersCount = this.database.list(`users/${this.uid}/lemari_category/shoes/sneakers/`);
    this.sandalsCount = this.database.list(`users/${this.uid}/lemari_category/shoes/sandals/`);
    this.flatsCount = this.database.list(`users/${this.uid}/lemari_category/shoes/flats/`);
    this.sportsCount = this.database.list(`users/${this.uid}/lemari_category/shoes/sports/`);
    this.slippersCount = this.database.list(`users/${this.uid}/lemari_category/shoes/slippers/`);
    this.bootsCount = this.database.list(`users/${this.uid}/lemari_category/shoes/boots/`);

    //Accessories Count Data
    this.capCount = this.database.list(`users/${this.uid}/lemari_category/accessories/cap/`);
    this.sunglassesCount = this.database.list(`users/${this.uid}/lemari_category/accessories/sunglasses/`);
    this.tieCount = this.database.list(`users/${this.uid}/lemari_category/accessories/tie/`);
    this.bowtieCount = this.database.list(`users/${this.uid}/lemari_category/accessories/bowtie/`);
    this.scarfCount = this.database.list(`users/${this.uid}/lemari_category/accessories/scarf/`);
 }

  getImageData(){
    //Tops Image Data
    this.dress.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "1", title: "tops", subTitle: "dress", name: "Dress", count: this.spaceArrayDress.length, image: "./assets/imgs/card/blouse.jpg"});
      }
      else{
        this.listOne.push({id: "1", title: "tops", subTitle: "dress", name: "Dress", count: this.spaceArrayDress.length, image: response.image_url});
      }
    });
    this.sweater.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "2", title: "tops", subTitle: "sweater", name: "Sweater ", count: this.spaceArraySweater.length, image: "./assets/imgs/card/sweater.png"});
      }
      else{
        this.listOne.push({id: "2", title: "tops", subTitle: "sweater", name: "Sweater ", count: this.spaceArraySweater.length, image: response.image_url});
      }
    });
    this.tank.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "3", title: "tops", subTitle: "tank", name: "Tank ", count: this.spaceArrayTank.length, image: "./assets/imgs/card/tank.jpg"});
      }
      else{
        this.listOne.push({id: "3", title: "tops", subTitle: "tank", name: "Tank ", count: this.spaceArrayTank.length, image: response.image_url});
      }
    });
    this.shirt.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push( {id: "4", title: "tops", subTitle: "shirt", name: "Shirt ", count: this.spaceArrayShirt.length, image: "./assets/imgs/card/shirt.jpg"});
      }
      else{
        this.listOne.push({id: "4", title: "tops", subTitle: "shirt", name: "Shirt ", count: this.spaceArrayShirt.length, image: response.image_url});
      }
    });
    this.cardigan.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "5", title: "tops", subTitle: "cardigan", name: "Cardigan ", count: this.spaceArrayCardigan.length, image: "./assets/imgs/card/cardigan.jpg"});
      }
      else{
        this.listOne.push({id: "5", title: "tops", subTitle: "cardigan", name: "Cardigan ", count: this.spaceArrayCardigan.length, image: response.image_url});
      }
    });
    this.tshirt.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "6", title: "tops", subTitle: "tshirt", name: "T-Shirt ", count: this.spaceArrayTshirt.length, image: "./assets/imgs/card/shirt.jpg"});
      }
      else{
        this.listOne.push({id: "6", title: "tops", subTitle: "tshirt", name: "T-Shirt ", count: this.spaceArrayTshirt.length, image: response.image_url});
      }
    });

    //Bottoms Image Data
    this.pants.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "1", title: "bottom", subTitle: "pants", name: "Pants ", count: this.spaceArrayPants.length, image: "./assets/imgs/card/pants.jpg"});
      }
      else{
        this.listTwo.push({id: "1", title: "bottom", subTitle: "pants", name: "Pants ", count: this.spaceArrayPants.length, image: response.image_url});
      }
    });
    this.jeans.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "2", title: "bottom",subTitle: "jeans",name: "Jeans ", count: this.spaceArrayJeans.length, image: "./assets/imgs/card/jeans.png"});
      }
      else{
        this.listTwo.push({id: "2", title: "bottom",subTitle: "jeans",name: "Jeans ", count: this.spaceArrayJeans.length, image: response.image_url});
      }
    });
    this.shorts.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "3", title: "bottom", subTitle: "shorts", name: "Shorts ", count: this.spaceArrayShorts.length, image: "./assets/imgs/card/shorts.jpg"});
      }
      else{
        this.listTwo.push({id: "3", title: "bottom", subTitle: "shorts", name: "Shorts ", count: this.spaceArrayShorts.length, image: response.image_url});
      }
    });
    this.skirts.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "4", title: "bottom", subTitle: "skirts", name: "Skirts ", count: this.spaceArraySkirts.length, image: "./assets/imgs/card/skirts.jpg"});
      }
      else{
        this.listTwo.push({id: "4", title: "bottom", subTitle: "skirts", name: "Skirts ", count: this.spaceArraySkirts.length, image: response.image_url});
      }
    });
    this.sweatpant.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "5", title: "bottom", subTitle: "sweatpant", name: "Sweat Pant ", count: this.spaceArraySweatpant.length, image: "./assets/imgs/card/sweat.jpg"});
      }
      else{
        this.listTwo.push({id: "5", title: "bottom", subTitle: "sweatpant", name: "Sweat Pant ", count: this.spaceArraySweatpant.length, image: response.image_url});
      }
    });

     //Shoes Image Data
     this.sneakers.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "1", title: "shoes", subTitle: "sneakers", name: "Sneakers ", count: this.spaceArraySneakers.length, image: "./assets/imgs/card/shoes.jpg"});
      }
      else{
        this.listThree.push({id: "1", title: "shoes", subTitle: "sneakers", name: "Sneakers ", count: this.spaceArraySneakers.length, image: response.image_url});
      }
    });
    this.sandals.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "2", title: "shoes", subTitle: "sandal", name: "Sandal ", count: this.spaceArraySandals.length, image: "./assets/imgs/card/sandals.jpg"});
      }
      else{
        this.listThree.push({id: "2", title: "shoes", subTitle: "sandal", name: "Sandal ", count: this.spaceArraySandals.length, image: response.image_url});
      }
    });
    this.flats.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "3", title: "shoes", subTitle: "flats", name: "Flats ", count: this.spaceArrayFlats.length, image: "./assets/imgs/card/flat.jpg"});
      }
      else{
        this.listThree.push({id: "3", title: "shoes", subTitle: "flats", name: "Flats ", count: this.spaceArrayFlats.length, image: response.image_url});
      }
    });
    this.sports.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "4", title: "shoes", subTitle: "sports", name: "Sports ", count: this.spaceArraySports.length, image: "./assets/imgs/card/sport.jpg"});
      }
      else{
        this.listThree.push({id: "4", title: "shoes", subTitle: "sports", name: "Sports ", count: this.spaceArraySports.length, image: response.image_url});
      }
    });
    this.slippers.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "5", title: "shoes", subTitle: "slippers", name: "Slippers ", count: this.spaceArraySlippers.length, image: "./assets/imgs/card/slipper.jpg"});
      }
      else{
        this.listThree.push({id: "5", title: "shoes", subTitle: "slippers", name: "Slippers ", count: this.spaceArraySlippers.length, image: response.image_url});
      }
    });
    this.boots.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "6", title: "shoes", subTitle: "boots", name: "Boots ", count: this.spaceArrayBoots.length, image: "./assets/imgs/card/boots.jpg"});
      }
      else{
        this.listThree.push({id: "6", title: "shoes", subTitle: "boots", name: "Boots ", count: this.spaceArrayBoots.length, image: response.image_url});
      }
    });

    //Accessories Image Data
    this.cap.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "1", title: "accessories", subTitle: "Cap", name: "Cap ", count: this.spaceArrayCap.length, image: "./assets/imgs/card/hat.png"});
      }
      else{
        this.listFour.push({id: "1", title: "accessories", subTitle: "Cap", name: "Cap ", count: this.spaceArrayCap.length, image: response.image_url});
      }
    });
    this.sunglasses.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "2", title: "accessories", subTitle: "sunglasses", name: "Sunglasses ", count: this.spaceArraySunglasses.length, image: "./assets/imgs/card/glass.png"});
      }
      else{
        this.listFour.push({id: "2", title: "accessories", subTitle: "sunglasses", name: "Sunglasses ", count: this.spaceArraySunglasses.length, image: response.image_url});
      }
    });
    this.tie.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "3", title: "accessories", subTitle: "tie", name: "Tie ", count: this.spaceArrayTie.length, image: "./assets/imgs/card/tie.jpg"});
      }
      else{
        this.listFour.push({id: "3", title: "accessories", subTitle: "tie", name: "Tie ", count: this.spaceArrayTie.length, image: response.image_url});
      }
    });
    this.bowtie.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "4", title: "accessories", subTitle: "bowtie", name: "Bowtie ", count: this.spaceArrayBowtie.length, image: "./assets/imgs/card/bow.jpg"});
      }
      else{
        this.listFour.push({id: "4", title: "accessories", subTitle: "bowtie", name: "Bowtie ", count: this.spaceArrayBowtie.length, image: response.image_url});
      }
    });
    this.scarf.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "5", title: "accessories", subTitle: "scarf", name: "Sweat Scarf ", count: this.spaceArrayScarf.length, image: "./assets/imgs/card/scarf.png"});
      }
      else{
        this.listFour.push({id: "5", title: "accessories", subTitle: "scarf", name: "Sweat Scarf ", count: this.spaceArrayScarf.length, image: response.image_url});
      }
    });
  }

  calc(){
    //Tops Value
    this.dressCount.valueChanges().subscribe(response => {
     response.forEach(item => {
        this.spaceArrayDress.push(item);
     });
    });
    this.sweaterCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySweater.push(item);
     });
    });
    this.tankCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayTank.push(item);
     });
    });
    this.shirtCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayShirt.push(item);
     });
    });
    this.cardiganCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayCardigan.push(item);
     });
    });
    this.tshirtCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayTshirt.push(item);
     });
    });
    
    //Bottom Value
    this.pantsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayPants.push(item);
     });
    });
    this.jeansCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayJeans.push(item);
     });
    });
    this.shortsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayShorts.push(item);
     });
    });
    this.skirtsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySkirts.push(item);
     });
    });
    this.sweatpantCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySweatpant.push(item);
     });
    });
 
    //Shoes Value
    this.sneakersCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySneakers.push(item);
     });
    });
    this.sandalsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySandals.push(item);
     });
    });
    this.flatsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayFlats.push(item);
     });
    });
    this.sportsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySports.push(item);
     });
    });
    this.slippersCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArraySlippers.push(item);
     });
    });
    this.bootsCount.valueChanges().subscribe(response => {
     response.forEach(item => {
       this.spaceArrayBoots.push(item);
     });
    });

    //Accessories Value
   this.capCount.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArrayCap.push(item);
    });
   });
   this.sunglassesCount.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArraySunglasses.push(item);
    });
   });
   this.tieCount.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArrayTie.push(item);
    });
   });
   this.bowtieCount.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArrayBowtie.push(item);
    });
   });
   this.scarfCount.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArrayScarf.push(item);
    });
   });
  }

  openShuffle() {
    let shuffleTop = this.spaceArrayDress.length + this.spaceArraySweater.length + this.spaceArrayTank.length + this.spaceArrayShirt.length + this.spaceArrayCardigan.length + this.spaceArrayTshirt.length;
    let shuffleBottom = this.spaceArrayPants.length + this.spaceArrayJeans.length + this.spaceArrayShorts.length + this.spaceArraySkirts.length + this.spaceArraySweatpant.length;
    let shuffleShoes = this.spaceArraySneakers.length + this.spaceArraySandals.length + this.spaceArrayFlats.length + this.spaceArraySports.length + this.spaceArraySlippers.length + this.spaceArrayBoots.length;

    this.navCtrl.push(ShufflePage,{shuffleTop,shuffleBottom,shuffleShoes});
  }

  openGallery(category, subCategory, name) {
    this.navCtrl.push(WardrobePage, { category, subCategory, name });
  }

  slides = [
    {
      title: '',
      imageUrl: 'assets/imgs/wishlist-1.png',
    },
    {
      title: 'Highlights',
      imageUrl: 'assets/imgs/wishlist-2.png',
    },
    {
      title: 'OOTD',
      imageUrl: 'assets/imgs/wishlist-3.png',
    },
    {
      title: 'Trendy',
      imageUrl: 'assets/imgs/wishlist-4.png',
    }
  ];
}
