import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MyServiceService} from './my-service.service'
import { Path } from './path';



declare var test: any;

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
  btn_status : boolean;
  fileName : any;
  



  constructor(private serv : MyServiceService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.btn_status=true;
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



openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '250px',
    data: {label: this.path}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.path = result;
  });
}


f(){
 
  if ( this.btn_status == true ) {
    new test();

} else if ( this.btn_status == false) {
    new stop();
    this.openDialog();
    this.btn_status = (!this.btn_status);

setTimeout(() => {
console.log('Test');
this.send(this.fileName);
}, 1000);
console.log('send');
    
}
this.btn_status = (!this.btn_status);
console.log(this.btn_status);

//this.send('');
}

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Path) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}