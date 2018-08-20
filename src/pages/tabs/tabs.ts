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
  counterRef:AngularFireObject<any>;

  counter = 0;

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
  ) {}

  getCounter(){
    if(this.counter == null){
      this.counter = 0;
    }
    else if (this.counter = this.navParams.get("obj_counter")){
      this.database.object(`users/${firebase.auth().currentUser.uid}`).update({counter:this.counter});
    }
    console.log("Counter : " + this.counter);
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
    this.uid = firebase.auth().currentUser.uid;
    this.subscribeIdRef = this.database.object(`users/${this.uid}/subscribeId/`);
    this.counterRef = this.database.object(`users/${this.uid}/counter/`);
    this.subscribeIdRef.valueChanges().subscribe(response =>{
      if(response == '1'){
        this.counterRef.valueChanges().subscribe(data =>{
          if(data >= 20){
            this.overlimit();
          }
          else if(data <= 19){
            this.openCamera();
          }
        });
      }
      else if(response == '2'){
        this.counterRef.valueChanges().subscribe(data =>{
          if(data >= 100){
            this.overlimit();
          }
          else if(data <= 99){
            this.openCamera();
          }
        });
      }
      else if(response == '3'){
        this.counterRef.valueChanges().subscribe(data =>{
          if(data>=300){
            this.overlimit();
          }
          else if(data <= 299){
            this.openCamera();
          }
        });
      }
      else if(response == '4'){
        this.openCamera();
      }
    });
  }

  openCamera(){
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
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageURI) => {
      loader.dismissAll();

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
    this.uid = firebase.auth().currentUser.uid;
    this.subscribeIdRef = this.database.object(`users/${this.uid}/subscribeId/`);
    this.counterRef = this.database.object(`users/${this.uid}/counter/`);
    this.subscribeIdRef.valueChanges().subscribe(response =>{
      if(response == '1'){
        this.counterRef.valueChanges().subscribe(data =>{
          if(data >= 2){
            this.overlimit();
          }
          else if(data <= 1){
            this.openGallery();
          }
        });
      }
      else if(response == '2'){
        this.counterRef.valueChanges().subscribe(data =>{
          if(data >= 100){
            this.overlimit();
          }
          else if(data <= 99){
            this.openGallery();
          }
        });
      }
      else if(response == '3'){
        this.counterRef.valueChanges().subscribe(data =>{
          if(data >= 300){
            this.overlimit();
          }
          else if(data <= 299){
            this.openGallery();
          }
        });
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
          this.dismiss();
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
