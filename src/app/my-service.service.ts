import { Injectable } from '@angular/core';
import {  Response, RequestOptions, Headers} from '@angular/http';
import { Http } from  '@angular/http'; 

import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { HttpHeaders } from '@angular/common/http'; 
import {Path} from './Path'

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  
constructor(private http: Http) {

   }
   private Url = 'http://localhost:5000/api/getPath';
   
   sendPath(audio : Path) : Observable<Path> {
      //let pathString = JSON.stringify(audio); // Stringify payload
    
      
      //console.log('second test '+this.audio.path);
      //return this.http.post<Path>(this.Url, this.audio)//

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log ('second test '+audio.path);
    return this.http.post(this.Url, audio, options)
                   .map(this.extractData);

}

getResult(): Observable<Path> {
  return this.http.get(this.Url)
  .map(this.extractData)
  .catch(this.handleErrorObservable);
}

private extractData(res: Response) {
  let body = res.json();
        console.log ('succes');
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
  } 

}




}
