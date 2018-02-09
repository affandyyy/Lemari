import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShufflePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shuffle',
  templateUrl: 'shuffle.html',
})
export class ShufflePage {

  
  listOne = [
    {
      title: '1',
      image: '../assets/imgs/card/example.png',
    },
    {
      title: '2',
      image: '../assets/imgs/card/sweat.jpg',
    },
    {
      title: '3',
      image: '../assets/imgs/card/tank.jpeg',
    },
    {
      title: '4',
      image: '../assets/imgs/card/tee.jpg',
    },
    {
      title: '5',
      image: '../assets/imgs/card/cardigan.jpeg',
    },
    {
      title: '6',
      image: '../assets/imgs/card/shirt.jpg',
    }
  ];

  listTwo = [
    {
      title: '1',
      image: '../assets/imgs/card/trou.jpeg',
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
      image: '../assets/imgs/card/shoes.jpg',
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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShufflePage');
  }

}
