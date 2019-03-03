import { Library } from '../library/library.modal';
import { HttpClient } from "@angular/common/http"
import 'rxjs'
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Element } from '../../data/element.interface';

@Injectable()
export class BpmnService {
  private baseUrl: string = 'http://127.0.0.1:3000';
 private elements: Element[] = [];
 private elementUpdate = new Subject<Element[]>();

 constructor(private http: HttpClient) {}
 getElementData() {
     this.http.get<{message: string, elements: any }>(this.baseUrl + '/api/bpmnelements')
     .pipe(map((postData) =>{
       console.log('postData', postData);
       return postData.elements.map(element => {
         return {
           title: element.title,
           category: element.category,
           sub_cat: element.sub_cat,
           content: element.content,
           image: element.image,
           id: element._id
         }
       });
     }))
     .subscribe((transformedData) =>{
       console.log('server data', transformedData);
         this.elements = transformedData;
         this.elementUpdate.next([...this.elements]);
         console.log('data', transformedData);
     });
 }
 getElementUpdateListener() {
     return this.elementUpdate.asObservable();
 }
 addNewElement(title: string, category: string, sub_cat: string, content: string, image: string) {
    const library: Library = { id: null, title: title, category: category, sub_cat: sub_cat, content: content, image: image };
    this.http
      .post<{ message: string }>("http://127.0.0.1:3000/api/bpmnelements", library)
      .subscribe(responseData => {
        console.log('responseData', responseData.message);
        this.elements.push(library);
        this.elementUpdate.next([...this.elements]);
      });
  }
}