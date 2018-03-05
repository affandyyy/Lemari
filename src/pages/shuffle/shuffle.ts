import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger, state, animate, transition,
  style
} from '@angular/animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  animations: [
    trigger('cardSpinner', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      state('out', style({ opacity: 0, display: 'none', transform: 'translateX(-100%)' })),
      transition('in => out', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('0.1s', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ]),
      transition('out => in', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.1s', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ShufflePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  currentIndex = 0;
  intervalInstance;
  cards = [
    { value: 'https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300', state: 'in', color: '#F44336' },
    { value: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/6c/31/82/6c3182cd-f718-d550-181f-051f4148a2e4/mzl.qmwzcqcf.png/1200x630bb.jpg', state: 'out', color: '#E91E63' },
    { value: 'https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=w300', state: 'out', color: '#9C27B0' },
    { value: 'https://pbs.twimg.com/profile_images/949374088249671680/MuxDEZpD.jpg', state: 'out', color: '#673AB7' },
    { value: 'http://www.appyhapps.com/wp-content/uploads/2018/01/SQUARE-CASH.png', state: 'out', color: '#3F51B5' },
    { value: 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_Windows8_Store.png', state: 'out', color: '#2196F3' },
    { value: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG', state: 'out', color: '#03A9F4' },
    { value: 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_OS_Apple.png', state: 'out', color: '#00BCD4' },
    { value: 'https://cdn.worldvectorlogo.com/logos/whatsapp-icon.svg', state: 'out', color: '#009688' },
    { value: 'https://cdn.worldvectorlogo.com/logos/apple-carplay-icon.svg', state: 'out', color: '#4CAF50' }
  ];

  currentIndexTWO = 0;
  intervalInstanceTWO;
  cardsTWO = [
    { value: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG', state: 'in', color: '#03A9F4' },
    { value: 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_OS_Apple.png', state: 'out', color: '#00BCD4' },
    { value: 'https://cdn.worldvectorlogo.com/logos/whatsapp-icon.svg', state: 'out', color: '#009688' },
    { value: 'https://cdn.worldvectorlogo.com/logos/apple-carplay-icon.svg', state: 'out', color: '#4CAF50' },
    { value: 'https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=w300', state: 'out', color: '#9C27B0' },
    { value: 'https://pbs.twimg.com/profile_images/949374088249671680/MuxDEZpD.jpg', state: 'out', color: '#673AB7' },
    { value: 'http://www.appyhapps.com/wp-content/uploads/2018/01/SQUARE-CASH.png', state: 'out', color: '#3F51B5' },
    { value: 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_Windows8_Store.png', state: 'out', color: '#2196F3' },
    { value: 'https://lh3.googleusercontent.com/dB3Dvgf3VIglusoGJAfpNUAANhTXW8K9mvIsiIPkhJUAbAKGKJcEMPTf0mkSexzLM5o=w300', state: 'out', color: '#F44336' },
    { value: 'https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/6c/31/82/6c3182cd-f718-d550-181f-051f4148a2e4/mzl.qmwzcqcf.png/1200x630bb.jpg', state: 'out', color: '#E91E63' }
  ];


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShufflePage');
  }


  animateAll() {
    this.animateSpin();
    this.animateSpinTWO();
  }



animateSpin() {
  this.cards.forEach(card => card.state = 'out');
  this.currentIndex = 0;
  this.cards[this.currentIndex].state = 'in';

  this.intervalInstance = setInterval(() => {
    this.currentIndex++;
    if (this.currentIndex === this.cards.length) {
      this.currentIndex = 0;
    }
    if (this.currentIndex !== 0) {
      this.cards[this.currentIndex - 1].state = 'out';
    } else {
      this.cards[this.cards.length - 1].state = 'out';
    }
    this.cards[this.currentIndex].state = 'in';
  }, 100);

  const itemIndex = Math.floor((Math.random() * ((this.cards.length * 5) - this.cards.length)) + this.cards.length);
  console.log(itemIndex);
  setTimeout(() => {
    clearInterval(this.intervalInstance);
    const randomCard = this.cards.filter(card => card.state === 'in');
    console.log(randomCard);
  }, itemIndex * 100);
}


// for cardsTWO


animateSpinTWO() {
  this.cardsTWO.forEach(cardtwo => cardtwo.state = 'out');
  this.currentIndexTWO = 0;
  this.cardsTWO[this.currentIndexTWO].state = 'in';

  this.intervalInstanceTWO = setInterval(() => {
    this.currentIndexTWO++;
    if (this.currentIndexTWO === this.cardsTWO.length) {
      this.currentIndexTWO = 0;
    }
    if (this.currentIndexTWO !== 0) {
      this.cardsTWO[this.currentIndexTWO - 1].state = 'out';
    } else {
      this.cardsTWO[this.cardsTWO.length - 1].state = 'out';
    }
    this.cardsTWO[this.currentIndexTWO].state = 'in';
  }, 100);

  const itemIndex = Math.floor((Math.random() * ((this.cardsTWO.length * 5) - this.cardsTWO.length)) + this.cardsTWO.length);
  console.log(itemIndex);
  setTimeout(() => {
    clearInterval(this.intervalInstanceTWO);
    const randomCard = this.cardsTWO.filter(cardtwo => cardtwo.state === 'in');
    console.log(randomCard);
  }, itemIndex * 100);

}
}