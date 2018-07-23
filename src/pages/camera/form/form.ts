import { TabsPage } from './../../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import firebase from 'firebase';
import {AlertController} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';

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

  category:any;
  brand:any;
  color:AngularFireObject<any>;;
  price:any;
  tag:any;
  location:any;
  
  uid: string;
  newPostKey: string;
  detailRef: AngularFireObject<any>;
  details: Observable<any>;

  inputForm:FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private alert: AlertController, private builder: FormBuilder) {
    //init data
    this.uid = firebase.auth().currentUser.uid;
    this.getId();
    
    //get Image from Edit Page
    this.img = this.navParams.get('uploadImage');
    this.mypicref=firebase.storage().ref('/');

    this.inputValidator();
  
  }

  inputValidator(){
      this.inputForm = this.builder.group({
        category: [this.category, Validators.required],
        brand: [this.brand, Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        price: [this.price, Validators.required],
        color: [this.color, Validators.required],
        tag: [this.tag, Validators.compose([Validators.maxLength(30), Validators.required])],
        location: [this.location, Validators.compose([Validators.maxLength(30), Validators.required])]
    });
  }

  getId(){
    if(this.newPostKey = this.navParams.get('obj_id')){
      this.category = this.navParams.get('obj_category');
      this.brand = this.navParams.get('obj_brand');
      this.price = this.navParams.get('obj_price');
      this.color = this.navParams.get('obj_color');
      this.tag = this.navParams.get('obj_tag');
      this.location = this.navParams.get('obj_location');
    }
    else {
      this.newPostKey = firebase.database().ref().child(`users/${this.uid}/lemari_category`).push().key;
    }
  }

  saveDetail() {
    this.database.object(`users/${this.uid}/lemari_category/${this.category}/${this.newPostKey}`).set({
      id: this.newPostKey,
      category:this.inputForm.value.category,
      image_url:this.img,
      brand:this.inputForm.value.brand,
      color:this.inputForm.value.color,
      price:this.inputForm.value.price,
      tag:this.inputForm.value.tag,
      location:this.inputForm.value.location
    })
  }
  
  validInput() {
    const alertItem =  this.alert.create({
      title: 'Saved!',
      subTitle:  "Your Image and image's detail be saved!",
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.setRoot(TabsPage);
          }
        }
      ]
    });
    alertItem.present();
  }

  invalidInput() {
    const alertItem =  this.alert.create({
      title: 'Error!',
      subTitle:  "Please key-in the Form before saved",
      buttons: ['Dismiss']
    });
    alertItem.present();
  }
 
  goPost(){
    if(!this.inputForm.valid){
      this.invalidInput();
    }
    else{
      this.submitAttempt = true;
      this.saveDetail();
      this.validInput();
    }
  }
}
