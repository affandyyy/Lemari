import { TranslateService } from "@ngx-translate/core";
import { TabsPage } from "./../../tabs/tabs";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import firebase from "firebase";
import { AlertController } from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "../../../../node_modules/@angular/forms";

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-form",
  templateUrl: "form.html"
})
export class FormPage {
  listOne = [
    {
      title: "1",
      image: "./assets/imgs/card/example.png"
    },
    {
      title: "2",
      image: "./assets/imgs/card/sweat.jpg"
    },
    {
      title: "3",
      image: "./assets/imgs/card/tank.jpeg"
    },
    {
      title: "4",

      image: "./assets/imgs/card/tee.jpg"
    },
    {
      title: "5",
      image: "./assets/imgs/card/cardigan.jpeg"
    },
    {
      title: "6",
      image: "./assets/imgs/card/shirt.jpg"
    }
  ];

  uid: string;
  newPostKey: string;
  detailRef: AngularFireObject<any>;
  details: Observable<any>;

  img: any;
  image: string = "";
  // category:any;
  brand: any;
  color: String = '#000000';
  price: any;
  tag: any;
  location: any;

  inputForm: FormGroup;
  falseAttempt: boolean = false;
  
  counterRef:any;
  counter=0;

  category: any[];
  subCategory: any[];

  selectedCategory: any[];
  selectedsubCategory: any[];

  sCategory: any;
  ssubCategory: any;

  categoryValue:any;
  subCategoryValue: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private alert: AlertController,
    private builder: FormBuilder,
    public translate: TranslateService
  ) {
    //init data
    this.uid = firebase.auth().currentUser.uid;

    //get image from Edit Page
    this.img = this.navParams.get("uploadImage");

    this.initializeCategory();
    this.initializeSubCategory();

    this.getId();
    this.inputValidator();
  }

  initializeCategory() {
    this.category = [
      { id: 1, name: "Tops", value: "tops" },
      { id: 2, name: "Bottom", value: "bottom" },
      { id: 3, name: "Shoes", value: "shoes" },
      { id: 4, name: "Accessories", value: "accessories" }
    ];
  }

  initializeSubCategory() {
    this.subCategory = [
      {
        id: 1,
        name: "Blouse",
        value: "blouse",
        category_id: 1,
        category_name: "tops"
      },
      {
        id: 2,
        name: "Sweater",
        value: "sweater",
        category_id: 1,
        category_name: "tops"
      },
      {
        id: 3,
        name: "Tank",
        value: "tank",
        category_id: 1,
        category_name: "tops"
      },
      {
        id: 4,
        name: "Shirt",
        value: "shirt",
        category_id: 1,
        category_name: "tops"
      },
      {
        id: 5,
        name: "Cardigan",
        value: "cardigan",
        category_id: 1,
        category_name: "tops"
      },
      {
        id: 6,
        name: "T-Shirt",
        value: "tshirt",
        category_id: 1,
        category_name: "tops"
      },
      {
        id: 7,
        name: "Pants",
        value: "pants",
        category_id: 2,
        category_name: "bottom"
      },
      {
        id: 8,
        name: "Jeans",
        value: "jeans",
        category_id: 2,
        category_name: "bottom"
      },
      {
        id: 9,
        name: "Shorts",
        value: "shorts",
        category_id: 2,
        category_name: "bottom"
      },
      {
        id: 10,
        name: "Skirts",
        value: "skirts",
        category_id: 2,
        category_name: "bottom"
      },
      {
        id: 11,
        name: "Sweat Pant",
        value: "sweatpant",
        category_id: 2,
        category_name: "bottom"
      },
      {
        id: 12,
        name: "Sneakers",
        value: "sneakers",
        category_id: 3,
        category_name: "shoes"
      },
      {
        id: 13,
        name: "Sandals",
        value: "sandals",
        category_id: 3,
        category_name: "shoes"
      },
      {
        id: 14,
        name: "Flats",
        value: "flats",
        category_id: 3,
        category_name: "shoes"
      },
      {
        id: 15,
        name: "Sandal",
        value: "sports",
        category_id: 3,
        category_name: "shoes"
      },
      {
        id: 16,
        name: "Slippers",
        value: "slippers",
        category_id: 3,
        category_name: "shoes"
      },
      {
        id: 17,
        name: "Boots",
        value: "boots",
        category_id: 3,
        category_name: "shoes"
      },
      {
        id: 18,
        name: "Cap",
        value: "cap",
        category_id: 4,
        category_name: "accessories"
      },
      {
        id: 19,
        name: "Sunglasses",
        value: "sunglasses",
        category_id: 4,
        category_name: "accessories"
      },
      {
        id: 20,
        name: "Tie",
        value: "tie",
        category_id: 4,
        category_name: "accessories"
      },
      {
        id: 21,
        name: "Bowtie",
        value: "bowtie",
        category_id: 4,
        category_name: "accessories"
      },
      {
        id: 22,
        name: "Scarf",
        value: "scarf",
        category_id: 4,
        category_name: "accessories"
      }
    ];
  }

  setsubCategoryValues(sCategory) {
    this.selectedsubCategory = this.subCategory.filter(
      subCategory => subCategory.category_id == sCategory.id
    );
  }

  inputValidator() {
    this.inputForm = this.builder.group({
      // category: [this.category, Validators.required],
      brand: [
        this.brand,
        Validators.compose([Validators.maxLength(30), Validators.required])
      ],
      price: [this.price, Validators.required],
      color: [this.color, Validators.required],
      tag: [
        this.tag,
        Validators.compose([Validators.maxLength(30), Validators.required])
      ],
      location: [
        this.location,
        Validators.compose([Validators.maxLength(30), Validators.required])
      ]
    });
  }

  getId() {
    if((this.newPostKey = this.navParams.get("obj_id"))) {
      this.categoryValue = this.navParams.get("obj_category");
      this.subCategoryValue = this.navParams.get("obj_subCategory");
      this.brand = this.navParams.get("obj_brand");
      this.price = this.navParams.get("obj_price");
      this.color = this.navParams.get("obj_color");
      this.tag = this.navParams.get("obj_tag");
      this.location = this.navParams.get("obj_location");

      this.sCategory = this.category.filter(category => category.value == this.categoryValue);
      this.sCategory.value = this.categoryValue;
      this.ssubCategory = this.subCategory.filter(subCategory => subCategory.value == this.subCategoryValue);
      this.ssubCategory.value = this.subCategoryValue;
      
      this.counter=0;
      
      console.log("Category : " + this.sCategory);
      console.log("Category : " + this.sCategory.value);
    }
    else {
      this.newPostKey = firebase.database().ref().child(`users/${this.uid}/lemari_category`).push().key;
      this.counter=1;
    }
  }

  saveDetail() {
    this.database
      .object(
        `users/${this.uid}/lemari_category/${this.sCategory.value}/${
          this.ssubCategory.value
        }/${this.newPostKey}`
      )
      .set({
        id: this.newPostKey,
        category: this.sCategory,
        subCategory: this.ssubCategory,
        image_url: this.img,
        brand: this.inputForm.value.brand,
        color: this.inputForm.value.color,
        price: this.inputForm.value.price,
        tag: this.inputForm.value.tag,
        location: this.inputForm.value.location
      });
  }

  validInput() {
    const alertItem = this.alert.create({
      title: "Saved!",
      subTitle: "Your Image and image's detail be saved!",
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.database.object(`users/${this.uid}/counter/`).valueChanges().subscribe(data =>{
              this.counterRef=data;
              this.counterRef = this.counterRef + this.counter;
              let obj_counter = this.counterRef
              this.navCtrl.push(TabsPage,{obj_counter});
            });
            
          }
        }
      ]
    });
    alertItem.present();
  }

  invalidInput() {
    const alertItem = this.alert.create({
      title: "Error!",
      subTitle: "Please key-in the Form before saved",
      buttons: ["Dismiss"]
    });
    alertItem.present();
  }

  goPost() {
    if (!this.inputForm.valid) {
      this.falseAttempt = true;
      this.invalidInput();
    }
    else{
      this.saveDetail();
      this.validInput();
    }
  }
}
