import { Component } from '@angular/core';
import {LibraryPage } from '../library/library';
import { TensorflowPage } from '../tensorflow/tensorflow';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LibraryPage;
  tab2Root = TensorflowPage;

  constructor() {

  }
}

