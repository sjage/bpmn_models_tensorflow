import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';
import { LibraryPage } from '../pages/library/library';
import { ElementsPage } from '../pages/elements/elements';
import { ElementPage } from '../pages/element/element';
import { TensorflowPage } from '../pages/tensorflow/tensorflow';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BpmnService } from '../pages/services/service';

import { HttpClientModule } from "@angular/common/http";
import { Camera } from '@ionic-native/camera'; 

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LibraryPage,
    ElementsPage,
    ElementPage,
    TensorflowPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LibraryPage,
    ElementsPage,
    ElementPage,
    TensorflowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BpmnService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
