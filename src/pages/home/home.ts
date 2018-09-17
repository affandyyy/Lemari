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

  listOne = [];
  listTwo = [];
  listThree = [];
  listFour = [];

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
      this.clothesId();
      this.getImageData();
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
 }

  getImageData(){

    //Tops Image Data
    this.dress.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "1", title: "tops", subTitle: "dress", name: "Dress", image: "./assets/imgs/card/blouse.jpg"});
      }
      else{
        this.listOne.push({id: "1", title: "tops", subTitle: "dress", name: "Dress", image: response.image_url});
      }
    });
    this.sweater.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "2", title: "tops", subTitle: "sweater", name: "Sweater", image: "./assets/imgs/card/sweater.png"});
      }
      else{
        this.listOne.push({id: "2", title: "tops", subTitle: "sweater", name: "Sweater", image: response.image_url});
      }
    });
    this.tank.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "3", title: "tops", subTitle: "tank", name: "Tank", image: "./assets/imgs/card/tank.jpg"});
      }
      else{
        this.listOne.push({id: "3", title: "tops", subTitle: "tank", name: "Tank", image: response.image_url});
      }
    });
    this.shirt.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push( {id: "4", title: "tops", subTitle: "shirt", name: "Shirt", image: "./assets/imgs/card/shirt.jpg"});
      }
      else{
        this.listOne.push({id: "4", title: "tops", subTitle: "shirt", name: "Shirt", image: response.image_url});
      }
    });
    this.cardigan.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "5", title: "tops", subTitle: "cardigan", name: "Cardigan", image: "./assets/imgs/card/cardigan.jpg"});
      }
      else{
        this.listOne.push({id: "5", title: "tops", subTitle: "cardigan", name: "Cardigan", image: response.image_url});
      }
    });
    this.tshirt.valueChanges().subscribe(response => {
      if(response==null){
        this.listOne.push({id: "6", title: "tops", subTitle: "tshirt", name: "T-Shirt", image: "./assets/imgs/card/shirt.jpg"});
      }
      else{
        this.listOne.push({id: "6", title: "tops", subTitle: "tshirt", name: "T-Shirt", image: response.image_url});
      }
    });

    //Bottoms Image Data
    this.pants.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "1", title: "bottom", subTitle: "pants", name: "Pants", image: "./assets/imgs/card/pants.jpg"});
      }
      else{
        this.listTwo.push({id: "1", title: "bottom", subTitle: "pants", name: "Pants", image: response.image_url});
      }
    });
    this.jeans.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "2", title: "bottom",subTitle: "jeans",name: "Jeans", image: "./assets/imgs/card/jeans.png"});
      }
      else{
        this.listTwo.push({id: "2", title: "bottom",subTitle: "jeans",name: "Jeans", image: response.image_url});
      }
    });
    this.shorts.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "3", title: "bottom", subTitle: "shorts", name: "Shorts", image: "./assets/imgs/card/shorts.jpg"});
      }
      else{
        this.listTwo.push({id: "3", title: "bottom", subTitle: "shorts", name: "Shorts", image: response.image_url});
      }
    });
    this.skirts.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "4", title: "bottom", subTitle: "skirts", name: "Skirts", image: "./assets/imgs/card/skirts.jpg"});
      }
      else{
        this.listTwo.push({id: "4", title: "bottom", subTitle: "skirts", name: "Skirts", image: response.image_url});
      }
    });
    this.sweatpant.valueChanges().subscribe(response => {
      if(response==null){
        this.listTwo.push({id: "5", title: "bottom", subTitle: "sweatpant", name: "Sweat Pant", image: "./assets/imgs/card/sweat.jpg"});
      }
      else{
        this.listTwo.push({id: "5", title: "bottom", subTitle: "sweatpant", name: "Sweat Pant", image: response.image_url});
      }
    });

     //Shoes Image Data
     this.sneakers.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "1", title: "shoes", subTitle: "sneakers", name: "Sneakers", image: "./assets/imgs/card/shoes.jpg"});
      }
      else{
        this.listThree.push({id: "1", title: "shoes", subTitle: "sneakers", name: "Sneakers", image: response.image_url});
      }
    });
    this.sandals.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "2", title: "shoes", subTitle: "sandal", name: "Sandal", image: "./assets/imgs/card/sandals.jpg"});
      }
      else{
        this.listThree.push({id: "2", title: "shoes", subTitle: "sandal", name: "Sandal", image: response.image_url});
      }
    });
    this.flats.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "3", title: "shoes", subTitle: "flats", name: "Flats", image: "./assets/imgs/card/flat.jpg"});
      }
      else{
        this.listThree.push({id: "3", title: "shoes", subTitle: "flats", name: "Flats", image: response.image_url});
      }
    });
    this.sports.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "4", title: "shoes", subTitle: "sports", name: "Sports", image: "./assets/imgs/card/sport.jpg"});
      }
      else{
        this.listThree.push({id: "4", title: "shoes", subTitle: "sports", name: "Sports", image: response.image_url});
      }
    });
    this.slippers.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "5", title: "shoes", subTitle: "slippers", name: "Slippers", image: "./assets/imgs/card/slipper.jpg"});
      }
      else{
        this.listThree.push({id: "5", title: "shoes", subTitle: "slippers", name: "Slippers", image: response.image_url});
      }
    });
    this.boots.valueChanges().subscribe(response => {
      if(response==null){
        this.listThree.push({id: "6", title: "shoes", subTitle: "boots", name: "Boots", image: "./assets/imgs/card/boots.jpg"});
      }
      else{
        this.listThree.push({id: "6", title: "shoes", subTitle: "boots", name: "Boots", image: response.image_url});
      }
    });

    //Accessories Image Data
    this.cap.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "1", title: "accessories", subTitle: "Cap", name: "Cap", image: "./assets/imgs/card/hat.png"});
      }
      else{
        this.listFour.push({id: "1", title: "accessories", subTitle: "Cap", name: "Cap", image: response.image_url});
      }
    });
    this.sunglasses.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "2", title: "accessories", subTitle: "sunglasses", name: "Sunglasses", image: "./assets/imgs/card/glass.png"});
      }
      else{
        this.listFour.push({id: "2", title: "accessories", subTitle: "sunglasses", name: "Sunglasses", image: response.image_url});
      }
    });
    this.tie.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "3", title: "accessories", subTitle: "tie", name: "Tie", image: "./assets/imgs/card/tie.jpg"});
      }
      else{
        this.listFour.push({id: "3", title: "accessories", subTitle: "tie", name: "Tie", image: response.image_url});
      }
    });
    this.bowtie.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "4", title: "accessories", subTitle: "bowtie", name: "Bowtie", image: "./assets/imgs/card/bow.jpg"});
      }
      else{
        this.listFour.push({id: "4", title: "accessories", subTitle: "bowtie", name: "Bowtie", image: response.image_url});
      }
    });
    this.scarf.valueChanges().subscribe(response => {
      if(response==null){
        this.listFour.push({id: "5", title: "accessories", subTitle: "scarf", name: "Sweat Scarf", image: "./assets/imgs/card/scarf.png"});
      }
      else{
        this.listFour.push({id: "5", title: "accessories", subTitle: "scarf", name: "Sweat Scarf", image: response.image_url});
      }
    });
  }

  openShuffle() {
    this.navCtrl.push("ShufflePage");
  }

  openGallery(category, subCategory) {
    this.navCtrl.push(WardrobePage, { category, subCategory });
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
