import { Component } from '@angular/core';
import {MyServiceService} from './my-service.service'
import { Path } from './Path';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-Rec-voc';
  errorMessage : String;
  path = new Path();
  constructor(private serv : MyServiceService) {}
  ngOnInit(): void {

  }
  
  send(name):void{
this.path.path=name;
console.log(this.path.path);
 this.serv.sendPath(this.path).subscribe( path => {
                                          console.log('path: '+path);
                                          this.path = path;},
  error => this.errorMessage = <any>error);      ;
      }
  }

