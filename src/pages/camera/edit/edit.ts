import { FormPage } from './../form/form';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Platform, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import {AngularFireObject} from "angularfire2/database";


/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

var canvas: any;

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  @ViewChild('imageResult') private imageResult: ElementRef; // reference to DOM element
  // private brightness = 50;
  // private contrast = 50;
  // private saturation = 50;

  // variable for data to firebase
  mypicref:any;

  newPostKey: any;
  category:any;
  brand:any;
  color:AngularFireObject<any>;
  price:any;
  tag:any;
  location:any;

  image: string = '';
  _zone: any;

  photos : Array<string>;

  brightness: number = 12;
  contrast: number = 52;
  unsharpMask: any = { radius: 100, strength: 2 };
  hue: number = -100;
  saturation: number = -100;

  showEditFilters: boolean = false;
  imageBefore: boolean = true;
  imageAfter: boolean = true;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public cropService: Crop,
    public imagePicker: ImagePicker,
    public actionsheetCtrl: ActionSheetController) {
      this._zone = new NgZone({ enableLongStackTrace: false });
      this.imageReplace();
  }

  imageReplace(){
    if(this.image = this.navParams.get('image')){
      this.imageBefore = false;
      this.category = this.navParams.get('obj_category');
      this.newPostKey = this.navParams.get('obj_id');
      this.brand = this.navParams.get('obj_brand');
      this.price = this.navParams.get('obj_price');
      this.color = this.navParams.get('obj_color');
      this.tag = this.navParams.get('obj_tag');
      this.location = this.navParams.get('obj_location');
    }
    else if(this.image = ''){
      this.imageAfter = false;
    }
  }

   /// Execute a menu 
  openMenu() {
    let actionSheet;
      if (!this.image) {
        actionSheet = this.actionsheetCtrl.create({
        title: 'Add new',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Camera',
            icon: !this.platform.is('ios') ? 'camera' : null,
            handler: () => {
              this.takePicture()
            }
          },
          {
            text: 'From Gallery',
            icon: !this.platform.is('ios') ? 'md-image' : null,
            handler: () => {
              this.openImagePicker()
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
       });
      }
      else {
        actionSheet = this.actionsheetCtrl.create({
          title: 'Actions',
          cssClass: 'action-sheets-basic-page',
          buttons: [
            {
              text: 'Re-Take photo',
              icon: !this.platform.is('ios') ? 'camera' : null,
              handler: () => {
                this.takePicture()
              }
            },
            {
              text: 'Apply filters',
              icon: !this.platform.is('ios') ? 'barcode' : null,
              handler: () => {
                this.filter(this.imageResult.nativeElement.src)
              }
            },
            {
              text: 'Clean filters',
              icon: !this.platform.is('ios') ? 'refresh' : null,
              handler: () => {
                this.restoreImage()
              }
            },
            {
              text: this.showEditFilters == false ? 'Customize filters' : 'Hide customization filters',
              icon: !this.platform.is('ios') ? 'hammer' : null,
              handler: () => {
                this.showEditFilters = this.showEditFilters == false ? true : false;
              }
            },
            {
              text: 'Cancel',
              role: 'cancel', // will always sort to be on the bottom
              icon: !this.platform.is('ios') ? 'close' : null,
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
      }
      actionSheet.present();
  }

  restoreImage() {
    if (this.image) {
      this.imageResult.nativeElement.src = this.image;
    }
  }

  filter(image) {
    /// Initialization of glfx.js
    /// is important, to use js memory elements
    /// access to Window element through (<any>window)

    
    try {
      canvas = (<any>window).fx.canvas();
    } catch (e) {
      alert(e);
      return;
    }
  
    /// taken from glfx documentation
    var imageElem = this.imageResult.nativeElement; // another trick is acces to DOM element
    var texture = canvas.texture(imageElem);

    /// filters applied to clean text
    canvas.draw(texture)
      .hueSaturation(this.hue / 100, this.saturation / 100)//grayscale
      .unsharpMask(this.unsharpMask.radius, this.unsharpMask.strength)
      .brightnessContrast(this.brightness / 100, this.contrast / 100)
      .update();

    /// replace image src 
    imageElem.src = canvas.toDataURL('image/png');
  }

  takePicture() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    // Take a picture saving in device, as jpg and allows edit
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      sourceType: 1,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageURI) => {
      loader.dismissAll();

      // bind the URI returned by API
      this.image = 'data:image/jpeg;base64,' + imageURI;
      this.imageBefore = false;

    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
    
  }

  openImagePicker() {
    // let options = {
    //   maximumImagesCount: 5
    // };
    // this.photos = new Array<string>();
    // this.imagePicker.getPictures(options).then(
    //   results => {
    //     this.reduceImages(results).then(() => {
    //       console.log("all images cropped!!");
    //     });
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.camera.getPicture({

      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      correctOrientation: true
    }).then((imageURI) => {

      // bind the URI returned by API
      this.image = 'data:image/jpeg;base64,' + imageURI;
      this.imageBefore = false;

      }, (err) => {
        
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });

  }

  reduceImages(selected_pictures: any): any {
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then(result => {
        return this.cropService
          .crop(item, { quality: 75 })
          .then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  goPost(){
    let obj_category = this.category;
    let obj_id = this.newPostKey;
    let uploadImage = this.image;
    let obj_brand = this.brand;
    let obj_price = this.price;
    let obj_color = this.color;
    let obj_tag = this.tag;
    let obj_location = this.location;
  
    this.navCtrl.push(FormPage, {obj_category,obj_id,uploadImage,obj_brand,obj_price,obj_color,obj_tag,obj_location});
  }

}
