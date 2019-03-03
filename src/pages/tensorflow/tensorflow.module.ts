import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TensorflowPage } from './tensorflow';

@NgModule({
  declarations: [
    TensorflowPage,
  ],
  imports: [
    IonicPageModule.forChild(TensorflowPage),
  ],
})
export class TensorflowPageModule {}
