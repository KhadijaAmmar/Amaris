import { Component } from '@angular/core';
import {MyServiceService} from './my-service.service'
import { Path } from './path';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-Rec-voc';
  errorMessage : String;
  path : Path[];
  test : string;
  constructor(private serv : MyServiceService) {}
  ngOnInit(): void {
  }
  
  send(path : string):void{
path = path.trim();
const pathh =  { path } as Path;

//this.serv.sendPath(pathh).subscribe(pathaudio => this.path.push(pathaudio));
this.serv.sendPath(pathh).subscribe(val => this.test=val["prediction"]);


  }
rec():void{
  console.log(this.serv.getRes().subscribe(val => console.log(val)));
}

}

