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
    { value: 'http://www.yeezycustom.cn/upload/goods/Apperal/T-Shirts/LV-T-Shirts/3/LV%20short%20round%20collar%20T%20man%20M-3XL%20Apr%2024-zo01_2664518.JPG', state: 'in', color: '#F44336' },
    { value: 'https://uniqlo.scene7.com/is/image/UNIQLO/goods_29_199144?$detail$', state: 'out', color: '#E91E63' },
    { value: 'http://picture-cdn.wheretoget.it/e7uryx-i.jpg', state: 'out', color: '#9C27B0' },
    { value: 'https://media.endclothing.com/media/f_auto,q_auto,w_760,h_760/prodmedia/media/catalog/product/1/4/14-06-2017_ami_flannelovershirt_blackredcheck_h17c139-221-009_mb_1.jpg', state: 'out', color: '#673AB7' },
    { value: 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=84770043', state: 'out', color: '#3F51B5' },
    { value: 'https://katemiddletonstyle.org/wp-content/uploads/2016/09/off-shoulder-top-stripe-257x300.jpeg', state: 'out', color: '#2196F3' },
    { value: 'http://sm.ign.com/t/ign_in/gallery/n/nintendo-a/nintendo-and-uniqlo-fan-created-t-shirts_gunu.640.jpg', state: 'out', color: '#03A9F4' },
    { value: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton-polka-dots-monogram-oversized-shirt-ready-to-wear--FDBL21DJC002_PM2_Front%20view.jpg?wid=614&hei=614', state: 'out', color: '#00BCD4' },
    { value: 'https://s-media-cache-ak0.pinimg.com/originals/67/c6/71/67c67184b6501e69e157d02dfd40bf2c.jpg', state: 'out', color: '#009688' },
    { value: 'http://supreme94.com/wp-content/uploads/2017/06/BWlc_WkVCdo.jpg', state: 'out', color: '#4CAF50' }
  ];

  currentIndexTWO = 0;
  intervalInstanceTWO;
  cardsTWO = [
    { value: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton-wool-and-cashmere-drawstring-pant-ready-to-wear--FDPA48DDU649_PM1_Side%20view.jpg?wid=614&hei=614', state: 'in', color: '#03A9F4' },
    { value: 'https://www.elkor.lv/media/catalog/product/cache/0/image/9df78eab33525d08d6e5fb8d27136e95/a/d/adidas_f51112_1.jpg', state: 'out', color: '#00BCD4' },
    { value: 'http://www.bcdjordan.com/Uploads/598039acb83fb.jpg', state: 'out', color: '#009688' },
    { value: 'https://liberi.lv/media/products/more/3527_55_2.JPG.900x900_q85.jpg', state: 'out', color: '#4CAF50' },
    { value: 'https://asset1.surfcdn.com/dc-snow-pants-dc-relay-youth-snow-pants-insignia-blue.jpg?w=1200&h=1200&r=4&q=80&o=E5G69DCAu4IHOpWK5dcYQkeCKGQx&V=RIdT', state: 'out', color: '#9C27B0' },
    { value: 'https://www.redttag.com/image/rubyfrostasia/image/cache/data/all_product_images/product-1249/IMG_2038-1-700x700.jpg', state: 'out', color: '#673AB7' },
    { value: 'http://www.seftonfashion.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/8/2/8233-edwin-grey-wool-labour-pant.jpg', state: 'out', color: '#3F51B5' },
    { value: 'https://f.allegroimg.com/s512/03d617/b1abe7b940f5ad660f119fad46ef', state: 'out', color: '#2196F3' },
    { value: 'https://i.pinimg.com/originals/d3/70/00/d370001e870e6b43cec00af902437cd0.jpg', state: 'out', color: '#F44336' },
    { value: 'https://media.golfdigest.com/photos/55ad786eb01eefe207f6db90/master/w_768/golf-equipment-blogs-newstuff-GI-Uniqlo-DryTechTrsr.jpg', state: 'out', color: '#E91E63' }
  ];

  currentIndexTHREE = 0;
  intervalInstanceTHREE;
  cardsTHREE = [
    { value: 'https://it.louisvuitton.com/images/is/image/lv/1/PP_VP_M/louis-vuitton-scarponcino-laureate-calzature--AE8U4BSC02_PM2_Front%20view.jpg?wid=614&hei=614', state: 'in', color: '#03A9F4' },
    { value: 'http://www.integrityfarmwi.com/images/1581/3502.jpg', state: 'out', color: '#00BCD4' },
    { value: 'https://uk.louisvuitton.com/images/is/image/lv/1/PP_VP_AS/louis-vuitton--ABWQ1BSL33_PM2_Front%20view.jpg?wid=256&hei=256', state: 'out', color: '#009688' },
    { value: 'https://media.karousell.com/media/photos/products/2015/08/31/louis_vuitton_mens_slalom_lv_monogram_leather_and_canvas__brown_athletic_shoes_1441035773_af4a1956.jpg', state: 'out', color: '#4CAF50' },
    { value: 'http://www.teradimension.com/images/pic/254018.047_4.jpg', state: 'out', color: '#9C27B0' },
    { value: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-archlight-sneaker-shoes--AE5U1BMIBG_PM2_Front%20view.jpg', state: 'out', color: '#673AB7' },
    { value: 'https://shop.r10s.jp/branding/cabinet/51/s6151_1.jpg', state: 'out', color: '#3F51B5' },
    { value: 'https://item5.tradesy.com/images/louis-vuitton-black-moccasins-ostrich-leather-driving-formal-shoes-size-us-75-12369904-0-1.jpg?width=203&height=307', state: 'out', color: '#2196F3' },
    { value: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/2/16/2116658/2116658_e32d9475-4ecc-433a-a04a-06ba03b6ceab_1024_1024.png', state: 'out', color: '#F44336' },
    { value: 'https://images.complex.com/complex/image/upload/c_fill,g_center,w_1200/fl_lossy,pg_1,q_auto/ggz8iihkqpq4ukot2ovi.jpg', state: 'out', color: '#E91E63' }
  ];


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