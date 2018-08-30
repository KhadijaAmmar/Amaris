import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Path } from './path';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class MyServiceService {
  pathUrl = ' http://127.0.0.1:5000/api/getPath';  // URL to web api


  constructor(
    private http: HttpClient){}
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json()|| 'Server error');
      }

  sendPath (path: Path): Observable<Path> {
    return this.http.post<Path>(this.pathUrl, path, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRes (): Observable<Path[]> {
    return this.http.get<Path[]>(this.pathUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
}



