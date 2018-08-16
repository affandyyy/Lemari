import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import firebase from 'firebase';

/**
 * Generated class for the SubsuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subsuccess',
  templateUrl: 'subsuccess.html',
})
export class SubsuccessPage {

  uid:any;

  subscribeId:any;
  space:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.subscribeId = this.navParams.get('subscribeId');
    this.conditionSubscribeId();

    this.uid = firebase.auth().currentUser.uid;
    this.database.object(`users/${this.uid}/`).update({subscribeId:this.subscribeId});
  }

  conditionSubscribeId(){
    if(this.subscribeId=='1'){
      this.space = '20';
    }
    else if(this.subscribeId=='2'){
      this.space = '100';
    }
    else if(this.subscribeId=='3'){
      this.space = '300';
    }
    else if(this.subscribeId=='4'){
      this.space = 'infinite';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubsuccessPage');
  }

  openShuffle() {
    this.navCtrl.push("ShufflePage");
  }

  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }

}
