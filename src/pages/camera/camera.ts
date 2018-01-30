import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditPage } from './edit/edit';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  constructor(public navCtrl: NavController) {

  }

  takePicture(){
    this.navCtrl.push('EditPage');
  }

//   initializePreview() {
//     // Make the width and height of the preview equal 
//     // to the width and height of the app's window
//     let previewRect: CameraPreviewRect = {
//       x: 0,
//       y: 0,
//       width: window.innerWidth,
//       height: window.innerHeight
//     };
 
//     // More code goes here
// }


}