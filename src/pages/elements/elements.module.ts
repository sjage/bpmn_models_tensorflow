import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElementsPage } from './elements';

@NgModule({
  declarations: [
    ElementsPage,
  ],
  imports: [
    IonicPageModule.forChild(ElementsPage),
  ],
})
export class ElementsPageModule {}
