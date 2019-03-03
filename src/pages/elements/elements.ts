import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Element } from '../../data/element.interface';

/**
 * Generated class for the ElementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elements',
  templateUrl: 'elements.html',
})
export class ElementsPage implements OnInit{
  elementGroup: {category: string, elements: Element[], icon: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }
  ngOnInit() {

    this.elementGroup = this.navParams.data;
  }


}
