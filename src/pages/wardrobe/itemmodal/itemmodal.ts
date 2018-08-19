import { EditPage } from './../../camera/edit/edit';
import { TabsPage } from './../../tabs/tabs';
import { WardrobePage } from './../wardrobe';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

import { TranslateService } from '@ngx-translate/core';

import  * as firebase from "firebase";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";
import {AlertController} from "ionic-angular";
import { FormPage } from '../../camera/form/form';

/**
 * Generated class for the ItemmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itemmodal',
  templateUrl: 'itemmodal.html',
})
export class ItemmodalPage {

  uid: string;
  detailRef:  AngularFireObject<any>;
  details: Observable<any>;

  mypicref:any;
  mypic:Observable<any>;

  newPostKey: any;
  imageUrl: any;
  category:any;
  subCategory:any;
  brand:any;
  colour:AngularFireObject<any>;
  price:any;
  tag:any;
  location:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController, 
              private database: AngularFireDatabase, 
              private zone: NgZone, 
              private alert: AlertController,
              public translate:TranslateService) {
    this.uid = firebase.auth().currentUser.uid;
    
    this.category = this.navParams.get('category');
    this.subCategory = this.navParams.get('subCategory');
    this.newPostKey = this.navParams.get('id');
    this.imageUrl= this.navParams.get('image_url');
    this.brand = this.navParams.get('brand');
    this.price = this.navParams.get('price');
    this.colour = this.navParams.get('color');
    this.tag = this.navParams.get('tag');
    this.location = this.navParams.get('location');

    this.detailRef = this.database.object(`users/${this.uid}/lemari_category/${this.category}/${this.subCategory}/${this.newPostKey}`);
    this.details = this.detailRef.valueChanges();
    this.getImage();

  }

  getImage(){
     this.details.subscribe(response => {
        console.log(response);
        this.zone.run(() => {
          this.imageUrl = response.image_url;
        });
    });
  }
  
  editDetail(){
    let obj_category = this.category;
    let obj_subCategory = this.subCategory;
    let obj_id = this.newPostKey;
    let image = this.imageUrl;
    let obj_brand = this.brand;
    let obj_price = this.price;
    let obj_color = this.colour;
    let obj_tag = this.tag;
    let obj_location = this.location;

    this.navCtrl.push(EditPage, {obj_category,obj_subCategory,obj_id,image,obj_brand,obj_price,obj_color,obj_tag,obj_location});
  }

  removeDetail(){
    const alertItem =  this.alert.create({
      title: 'Deleted!',
      subTitle:  "Your Image and image's detail have be deleted!",
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.detailRef.remove();
            this.navCtrl.push(TabsPage);
          }
        }
      ]
    });
    alertItem.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemmodalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  closeModal() {
    this.navCtrl.pop();
}


}
