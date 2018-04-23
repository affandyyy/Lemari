import { Component } from "@angular/core";
import { ActionSheetController } from "ionic-angular";

import { CameraPage } from "../camera/camera";
import { ProfilePage } from "../profile/profile";
import { HomePage } from "../home/home";

import { Diagnostic, CameraPreviewRect } from "ionic-native";
import { ImagePicker } from "@ionic-native/image-picker";
import { Crop } from "@ionic-native/crop";
import { Camera } from "@ionic-native/camera";

import { AngularFireDatabase} from 'angularfire2/database'

import * as firebase from 'firebase';

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  public base64Image: string;
  photos: Array<string>;

  tab1Root = HomePage;
  tab2Root = CameraPage;
  tab3Root = ProfilePage;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public cameraPlugin: Camera,
    public cropService: Crop,
    private db: AngularFireDatabase
  ) {}

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Choose or take a picture",
      buttons: [
        {
          text: "Take a picture",
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: "Choose pictures",
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(profilePicture => {

        const storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`users/user1/profilePicture/` + "test.png");
        uploadTask
          .putString(profilePicture, "base64", { contentType: "image/png" })
          .then(snapshot => {
            this.db
              .list(
                `users/user1/profilePicture`
              )
              .push({
                image_caption: "My Caption",
                image_name:  "test.png",
                image_url: snapshot.downloadURL,
                uploaded_on: firebase.database.ServerValue.TIMESTAMP
              });
          });
        // Send the picture to Firebase Storage
        // const selfieRef = firebase
        //   .storage()
        //   .ref("profilePictures/user1/profilePicture.png");
        // selfieRef
        //   .putString(profilePicture, "base64", { contentType: "image/png" })
        //   .then(savedProfilePicture => {
        //     firebase
        //       .database()
        //       .ref().child(`users/user1/profilePicture`)
        //       .set(savedProfilePicture.downloadURL);
        //   });
      });
  }

  openImagePicker() {
    let options = {
      maximumImagesCount: 5
    };
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options).then(
      results => {
        this.reduceImages(results).then(() => {
          console.log("all images cropped!!");
        });
      },
      err => {
        console.log(err);
      }
    );
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
}
