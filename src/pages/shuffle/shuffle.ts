import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import  * as firebase from "firebase";
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  trigger, state, animate, transition,
  style
} from '@angular/animations';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

  uid: string;
  
  blouse:  AngularFireList<any>;
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

  imageUrl: string

  currentIndex = 0;
  intervalInstance;
  cards = [
    { value: 'http://www.yeezycustom.cn/upload/goods/Apperal/T-Shirts/LV-T-Shirts/3/LV%20short%20round%20collar%20T%20man%20M-3XL%20Apr%2024-zo01_2664518.JPG', state: 'in', color: '#F44336' },
  ];

  currentIndexTWO = 0;
  intervalInstanceTWO;
  cardsTWO = [
    { value: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton-wool-and-cashmere-drawstring-pant-ready-to-wear--FDPA48DDU649_PM1_Side%20view.jpg?wid=614&hei=614', state: 'in', color: '#03A9F4' },
  ];
  
  currentIndexTHREE = 0;
  intervalInstanceTHREE;
  cardsTHREE = [
    { value: 'https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton-scarponcino-laureate-calzature--AE8U4BSC02_PM2_Front%20view.jpg?wid=614&hei=614', state: 'in', color: '#03A9F4' },
    { value: 'http://www.integrityfarmwi.com/images/1581/3502.jpg', state: 'out', color: '#00BCD4' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private zone: NgZone) {
    this.uid = firebase.auth().currentUser.uid;

     //Tops Data
     this.blouse = this.database.list(`users/${this.uid}/lemari_category/tops/blouse/`);
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

    this.shuffleClothes();
  }

  shuffleClothes(){
    //Tops Value
    this.blouse.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cards.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.sweater.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cards.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.tank.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cards.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.shirt.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cards.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.cardigan.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cards.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.tshirt.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cards.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    
    //Bottom Value
    this.pants.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTWO.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.jeans.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTWO.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.shorts.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTWO.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.skirts.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTWO.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.sweatpant.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTWO.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });

    //Shoes Value
    this.sneakers.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTHREE.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.sandals.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTHREE.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.flats.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTHREE.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.sports.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTHREE.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.slippers.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTHREE.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
    this.boots.valueChanges().subscribe(response => {
      response.forEach(item => {
        this.cardsTHREE.push( { value: item.image_url, state: 'out', color: '#E91E63' },);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShufflePage');
  }


  animateAll() {
    this.animateSpin();
    this.animateSpinTWO();
    this.animateSpinTHREE();
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

animateSpinTHREE() {
  this.cardsTHREE.forEach(cardthree => cardthree.state = 'out');
  this.currentIndexTHREE = 0;
  this.cardsTHREE[this.currentIndexTHREE].state = 'in';

  this.intervalInstanceTHREE = setInterval(() => {
    this.currentIndexTHREE++;
    if (this.currentIndexTHREE === this.cardsTHREE.length) {
      this.currentIndexTHREE = 0;
    }
    if (this.currentIndexTHREE !== 0) {
      this.cardsTHREE[this.currentIndexTHREE - 1].state = 'out';
    } else {
      this.cardsTHREE[this.cardsTHREE.length - 1].state = 'out';
    }
    this.cardsTHREE[this.currentIndexTHREE].state = 'in';
  }, 100);

  const itemIndex = Math.floor((Math.random() * ((this.cardsTHREE.length * 5) - this.cardsTHREE.length)) + this.cardsTHREE.length);
  console.log(itemIndex);
  setTimeout(() => {
    clearInterval(this.intervalInstanceTHREE);
    const randomCard = this.cardsTHREE.filter(cardthree => cardthree.state === 'in');
    console.log(randomCard);
  }, itemIndex * 100);

}
}