import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import firebase from "firebase";
import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams, LoadingController } from "ionic-angular";

import { AlertController } from "ionic-angular";
import { CameraPage } from '../camera/camera';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

// import { Diagnostic, CameraPreviewRect } from "ionic-native";
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { FormPage } from '../camera/form/form';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  image: string = '';
  imageBefore: boolean = true;

  public base64Image: string;
  photos : Array<string>;

  tab1Root = HomePage;
  tab2Root = CameraPage;
  tab3Root = ProfilePage;

  uid:any;
  subscribeIdRef:AngularFireObject<any>;

  space = 0;
  spaceArray = [];

  dress:  AngularFireList<any>;
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

  loading: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public camera: Camera,
    public viewCtrl: ViewController, 
    public cropService: Crop,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public database: AngularFireDatabase,
    private alert: AlertController
  ) {
    this.uid = firebase.auth().currentUser.uid;
    this.subscribeIdRef = this.database.object(`users/${this.uid}/subscribeId/`);
    this.clothesId();
    this.calc();
  }

  clothesId(){
    //Tops Data
    this.dress = this.database.list(`users/${this.uid}/lemari_category/tops/dress/`);
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

 calc(){
   //Tops Value
   this.dress.valueChanges().subscribe(response => {
    response.forEach(item => {
       this.spaceArray.push(item);
    });
   });
   this.sweater.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.tank.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.shirt.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.cardigan.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.tshirt.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   
   //Bottom Value
   this.pants.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.jeans.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.shorts.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.skirts.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.sweatpant.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });

   //Shoes Value
   this.sneakers.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.sandals.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.flats.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.sports.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.slippers.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.boots.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });

   //Accessories Value
   this.cap.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.sunglasses.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.tie.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.bowtie.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
   this.scarf.valueChanges().subscribe(response => {
    response.forEach(item => {
      this.spaceArray.push(item);
    });
   });
 }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose or take a picture',
      buttons: [
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Choose pictures',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }


  // takePicture(){
  //   let options =
  //   {
  //     quality: 100,
  //     correctOrientation: true
  //   };
  //   this.camera.getPicture(options)
  //   .then((data) => {
  //     this.photos = new Array<string>();
  //     this.cropService
  //     .crop(data, {quality: 75})
  //     .then((newImage) => {
  //       this.photos.push(newImage);
  //       // push here
  //     }, error => console.error("Error cropping image", error));
  //   }, function(error) {
  //     console.log(error);
  //   });
  // }

  // takePicture(){
  //   this.navCtrl.push(EditPage)
  // }

  //condition for subscribe
  takePicture() {
    console.log("Space in takePicture: " + this.spaceArray.length);
    this.subscribeIdRef.valueChanges().subscribe(response =>{
      if(response == '1'){
        if(this.spaceArray.length >= 20){
          this.overlimit();
        }
        else if(this.spaceArray.length <= 19){
          this.openCamera();
        }
      }
      else if(response == '2'){
        if(this.spaceArray.length >= 100){
          this.overlimit();
        }
        else if(this.spaceArray.length <= 99){
          this.openCamera();
        }
      }
      else if(response == '3'){
        if(this.spaceArray.length>=300){
          this.overlimit();
        }
        else if(this.spaceArray.length <= 299){
          this.openCamera();
        }
      }
      else if(response == '4'){
        this.openCamera();
      }
    });
  }

  openCamera(){
    // let loader = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loader.present();

    // Take a picture saving in device, as jpg and allows edit
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      sourceType: 1,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageURI) => {
      // loader.dismissAll();

      // bind the URI returned by API
      this.image = 'data:image/jpeg;base64,' + imageURI;

      let uploadImage = this.image;

      this.navCtrl.push(FormPage, {uploadImage});

    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  //condition for subscribe
  openImagePicker() {
    console.log("Space in openImagePicker: " + this.spaceArray.length);
    this.subscribeIdRef.valueChanges().subscribe(response =>{
      if(response == '1'){
          if(this.spaceArray.length >= 20){
            this.overlimit();
          }
          else if(this.spaceArray.length <= 19){
            this.openGallery();
          }
      }
      else if(response == '2'){
        if(this.spaceArray.length >= 100){
          this.overlimit();
        }
        else if(this.spaceArray.length <= 99){
          this.openGallery();
        }
      }
      else if(response == '3'){
        if(this.spaceArray.length >= 300){
          this.overlimit();
        }
        else if(this.spaceArray.length <= 299){
          this.openGallery();
        }
      }
      else if(response == '4'){
        this.openGallery();
      }
    });
  }

  openGallery(){
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

      let uploadImage = this.image;

      this.navCtrl.push(FormPage, {uploadImage});

      }, (err) => {
        
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  overlimit(){
    const alertItem = this.alert.create({
      title: "Over Limit!",
      subTitle: "Your storage already full, Please upgrade your storage!",
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

  reduceImages(selected_pictures: any): any {
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then(result => {
        return this.cropService
          .crop(item, { quality: 75 })
          .then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
