import { WardrobePage } from './../wardrobe/wardrobe';
import { Component, ViewChild} from '@angular/core';
import { NavController, Slides, ModalController } from 'ionic-angular';

import "rxjs/add/operator/take";
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;


  category: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public statusBar: StatusBar) {
      this.statusBar.backgroundColorByHexString("#500E6F");
      this.statusBar.overlaysWebView(true);
  }

  openShuffle(){
    this.navCtrl.push('ShufflePage');
  }
  
  openThis() {
    this.openModal('ItemmodalPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
                  .present();
  }

  openGallery(category){
    this.navCtrl.push(WardrobePage, {category});
  }



  listOne = [
    {
      title: '1',
      image: './assets/imgs/card/example.png',
      ///./assets/imgs/card/example.png
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

  listTwo = [
    {
      title: '1',
      image: './assets/imgs/card/trou.jpeg',
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '4',
    },
    {
      title: '5',
    },
    {
      title: '6',
    }
  ];

  listThree = [
    {
      title: '1',
      image: './assets/imgs/card/shoes.jpg',
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '4',
    },
    {
      title: '5',
    },
    {
      title: '6',
    }
  ];

  listFour = [
    {
      title: '1',
    },
    {
      title: '2',
    },
    {
      title: '3',
    },
    {
      title: '4',
    },
    {
      title: '5',
    },
    {
      title: '6',
    }
  ];

  // slides = [
  //   {
  //     title: '',
  //     imageUrl: 'assets/imgs/wishlist-1.png',
  //     songs: 2,
  //     private: false
  //   },
  //   {
  //     title: 'Highlights',
  //     imageUrl: 'assets/imgs/wishlist-2.png',
  //     songs: 4,
  //     private: false
  //   },
  //   {
  //     title: 'OOTD',
  //     imageUrl: 'assets/imgs/wishlist-3.png',
  //     songs: 5,
  //     private: true
  //   },
  //   {
  //     title: 'Trendy',
  //     imageUrl: 'assets/imgs/wishlist-4.png',
  //     songs: 12,
  //     private: true
  //   }
  // ];

}
