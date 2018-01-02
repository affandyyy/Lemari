import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;

  listOne = [
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

  listTwo = [
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

  listThree = [
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

  slides = [
    {
      title: '',
      imageUrl: 'assets/imgs/wishlist-1.png',
      songs: 2,
      private: false
    },
    {
      title: 'Highlights',
      imageUrl: 'assets/imgs/wishlist-2.png',
      songs: 4,
      private: false
    },
    {
      title: 'OOTD',
      imageUrl: 'assets/imgs/wishlist-3.png',
      songs: 5,
      private: true
    },
    {
      title: 'Trendy',
      imageUrl: 'assets/imgs/wishlist-4.png',
      songs: 12,
      private: true
    }
  ];
  

  constructor(public navCtrl: NavController) {

  }

}
