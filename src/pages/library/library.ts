import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BpmnService } from '../services/service';
import { Library } from './library.modal';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import  { ElementData }  from '../../data/element_categories';
import { Element } from '../../data/element.interface';
import { ElementsPage } from '../elements/elements';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit{

  elements: Element[];
  elementForm: FormGroup;
  private elementSub: Subscription;
  private element_data: ElementData[] = [];

  public base64Image: string;
  categoriesCollection: {categoryname: string, elements: Element[], icon: string}[];
  catelementPage = ElementsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: BpmnService) {
  }

  ngOnInit() {
    this.service.getElementData();
    console.log('this.service', this.service);
    this.elementSub = this.service.getElementUpdateListener()
    .subscribe((data: Element[]) => {
      this.element_data = [{'categoryname':'catname', 'elements': data, 'icon':'brush'}];
      console.log('elementssub', this.element_data);
/*.subscribe((elements: Library[]) => {
      this.elements = elements;
    })*/
      //this.categoriesCollection = elements; 
     // this.elements = elements;
     // this.base64Image = "data:image/jpeg;base64," + elements.image;
    })
    this.initializeForm();
    //this.categoriesCollection = categories;

    //load data for categories and this.categoryelements.push(ovo kaj dobijem iz servera array Element)
    console.log('this.cat', this.categoriesCollection);
  }
  onAddElement() {
    console.log('elementform', this.elementForm);
    const value = this.elementForm.value;
    console.log('values', value);
    this.service.addNewElement(value.title, value.category, value.sub_cat, value.content, value.image);
    this.elementForm.reset();
  }
  private initializeForm() {
    let title = null;
    let content = null;
    let category = null;
    let sub_cat = null;
    let image = null;

    this.elementForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'category': new FormControl(category, Validators.required),
      'sub_cat': new FormControl(sub_cat, Validators.required),
      'content': new FormControl(content, Validators.required),
      'image': new FormControl(image, Validators.required),
    });
  }
}