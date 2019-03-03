import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import * as tf from '@tensorflow/tfjs';
import { loadFrozenModel } from '@tensorflow/tfjs-converter';
import { LoadingController } from 'ionic-angular';

import { IMAGENET_CLASSES } from './imagenet-classes';
const MODEL_URL = './assets/models/tensorflowjs_model.pb';
const WEIGHTS_URL = './assets/models/weights_manifest.json';
const INPUT_NODE_NAME = 'input';
const OUTPUT_NODE_NAME = 'final_result';
const IMAGE_SIZE = 299;

//Postprocessor/ExpandDims_1,Postprocessor/Slice
/*
export type ObjectDetectionBaseModel = 'mobilenet_v1'|'mobilenet_v2'|'lite_mobilenet_v2';

export interface DetectedObject {
  bbox: [number, number, number, number];  // [x, y, width, height]
  class: string;
  score: number;
}*/

/**
 * Generated class for the TensorflowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tensorflow',
  templateUrl: 'tensorflow.html',
})
export class TensorflowPage implements OnInit {
  @ViewChild('image224by224') image224by224;
  @ViewChild('originalImage') originalImage;

  @ViewChild('macImg') macImg;
  @ViewChild('imageInput') imageInput: any;

  mobilenet: any;
  predictions = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: HttpClient, public navParams: NavParams, private camera: Camera) {
    this.initializeMobileNet();
    //this.loadcoco();
  }
  async initializeMobileNet() {

    this.mobilenet = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
     console.log('mobilenet', this.mobilenet);
   }
 
   uploadPhoto(event) {
     event.preventDefault();
     this.imageInput.nativeElement.click();
   }
 
   startUpload(event: FileList) {
     const loader = this.loadingCtrl.create({ content: "Predicting what is in your image..." });
     if (event.length > 0) {
       loader.present();
       const reader = new FileReader();
       reader.onloadend = () => {
         this.image224by224.nativeElement.width = IMAGE_SIZE;
         this.image224by224.nativeElement.height = IMAGE_SIZE;
         this.image224by224.nativeElement.src = reader.result;
         this.originalImage.nativeElement.src = reader.result;
         this.image224by224.nativeElement.onload = () => {
           this.predict(this.image224by224.nativeElement)
           loader.dismiss();
         }
       };
       reader.readAsDataURL(event[0]);
     }
   }
 
   async predict(imgElement) {
     console.log('img pride v predict', imgElement);
     const logits = tf.tidy(() => {
       const img = tf.fromPixels(imgElement).toFloat();
 
       // Normalize the image from [0, 255] to [-1, 1].
       const offset = tf.scalar(127.5);
       const normalized = img.sub(offset).div(offset);
 
       // Reshape to a single-element so we can pass it to predict 224 by 244 image RGB (3).
       const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);
       console.log('batched', batched, batched[0]);
       console.log('this.mobilenet.execute', this.mobilenet.execute({['Placeholder']: batched}, OUTPUT_NODE_NAME));
       return this.mobilenet.execute({['Placeholder']: batched}, OUTPUT_NODE_NAME);
 
       // Make a prediction through our frozen model loaded.
      // return this.mobilenet.execute({ [INPUT_NODE_NAME]: batched }, OUTPUT_NODE_NAME);
     });
     console.log('logits res', logits);
 
     // Convert logits to probabilities and class names.
     const classes = await this.getTopClasses(logits);
     console.log('classes', classes);
 
     // Set predictions to classes with more than 1% of probability
     this.predictions = classes.filter((a) => a.probability * 100 > 1);
     console.log(this.predictions);
   }
   async getTopClasses(logits, topLimit = 2) {
     return Array(...(await logits.data()))
     .map((value, index) => ({ value: value, index: index }))
       .sort((a, b) => b.value - a.value)
       .slice(0, topLimit)
       .map((value) => ({
         className: IMAGENET_CLASSES[value.index],
         probability: value.value,
       }));
      }

  ngOnInit() {  
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad TensorflowPage');
  }
  initializeModel() {
 }

/*
 async onImagePicked(event: Event) {
  const model = await tf.loadFrozenModel(this.model_url, this.weights_url);
   const file = (event.target as HTMLInputElement).files[0];
   const reader = new FileReader();
   reader.onload = () => {
    // model.execute("data:image/jpeg;base64," + reader.result);
     this.base64Image = "data:image/jpeg;base64," + reader.result;
     console.log('this.base', this.base64Image);
   }
   reader.readAsDataURL(file);

 }*/
 takePicture() {
  this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
  }).then((imageData) => {
    this.image224by224.nativeElement.src = "data:image/jpeg;base64," + imageData;
    this.originalImage.nativeElement.src = "data:image/jpeg;base64," + imageData;
  }, (err) => {
      console.log(err);
  });
}

}
