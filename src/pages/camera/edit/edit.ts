// import { firebase } from 'firebase/app';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Platform, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

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

  image: string = '';
  _zone: any;

  brightness: number = 12;
  contrast: number = 52;
  unsharpMask: any = { radius: 100, strength: 2 };
  hue: number = -100;
  saturation: number = -100;

  showEditFilters: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public actionsheetCtrl: ActionSheetController) {
      this._zone = new NgZone({ enableLongStackTrace: false });
      this.mypicref=firebase.storage().ref('/');
  }

   /// Execute a menu 
  openMenu() {
    let actionSheet;
      if (!this.image) {
        actionSheet = this.actionsheetCtrl.create({
        title: 'Actions',
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Take Photo',
            icon: !this.platform.is('ios') ? 'camera' : null,
            handler: () => {
              this.takePicture()
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
      encodingType: this.camera.EncodingType.PNG,
      targetHeight: 1000,
      sourceType: 1,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageURI) => {
      loader.dismissAll();

      // bind the URI returned by API
      this.image = imageURI;
      this.uploadPicture();

    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
    
  }

  uploadPicture() {
      this.mypicref.child(this.uid()).child('lemari.png')
      .putString(this.image, 'base64',{contentType:'image/png'})
      .then(savepic=>{
        this.image=savepic.downloadURL;
      })
  }

  uid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  goPost(){
    this.navCtrl.push('FormPage');
  }

}
