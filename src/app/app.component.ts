import { Component } from '@angular/core';
import {MyServiceService} from './my-service.service'
import { Path } from './path';


declare var $:any;
declare var recorderObject: any;
declare function startRecording(button) : void;

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
  btn_status : string;
  lang:any;
  time:any;
  msg_box:any;
 
  navigator:any;


  mediaRecorder:any;
  chunks :any;
  audio = new Audio();
  mediaStream:any;
  audioSrc:any;
  type = {
      'type': 'audio/ogg,codecs=opus'
  };
  ctx:any;
  analys:any;
  blob:any;


  constructor(private serv : MyServiceService) {}
  ngOnInit(): void {
    this.btn_status= 'inactive';
    this.lang = {
      'mic_error': 'Error accessing the microphone', //Ошибка доступа к микрофону
      'press_to_start': 'Press to start recording', //Нажмите для начала записи
      'recording': 'Recording', //Запись
      'play': 'Play', //Воспроизвести
      'stop': 'Stop', //Остановить
      'download': 'Download', //Скачать
      'use_https': 'This application in not working over insecure connection. Try to use HTTPS'
  };


  
  
  this.msg_box = this.lang.press_to_start;
  this.navigator = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
  
  if ( this.navigator.mediaDevices === undefined ) {
    this.navigator.mediaDevices = {};
  }
  
  
  if ( navigator.mediaDevices.getUserMedia === undefined ) {
    this.navigator.mediaDevices.getUserMedia =  ( constrains )=> {
          let getUserMedia = this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia
          if ( !getUserMedia )  {
              return Promise.reject( new Error( 'getUserMedia is not implemented in this browser' ) );
          }
  
          return new Promise( ( resolve, reject ) =>{
              getUserMedia.call( navigator, constrains, resolve, reject );
          } );
      }
  }

  if ( this.navigator.mediaDevices.getUserMedia ) {
        this.btn_status = 'inactive';
        this.mediaRecorder;
        this.chunks = [];
        this.audio = new Audio();
        this.mediaStream;
        this.audioSrc;
        this.type = {
            'type': 'audio/ogg,codecs=opus'
        };
        this.ctx;
        this.analys;
        this.blob;
  } else {
    if ( location.protocol != 'https:' ) {
      this.msg_box = this.lang.mic_error + '<br>'  + this.lang.use_https;
    
    } else {
      this.msg_box = this.lang.mic_error; 
    }
    console.log(this.msg_box);

}
  
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

record() {


  if ( this.btn_status  =='inactive' ) {
    this.start();
    
} else if ( this.btn_status  =='recording') {
    this.stop();
}
  

}

 start() {
  navigator.mediaDevices.getUserMedia( { 'audio': true } ).then(  ( stream ) =>{
     let mediaRecorder = new MediaRecorder( stream );
      mediaRecorder.start();

    
      this.btn_status ='recording';

    
    
      if ( navigator.vibrate ) navigator.vibrate( 150 );

      this.time = Math.ceil( new Date().getTime() / 1000 );


      mediaRecorder.ondataavailable =  ( event ) =>{
          this.chunks.push( event.data );
      }

      mediaRecorder.onstop =  ()=> {
          stream.getTracks().forEach( ( track ) =>{ track.stop() } );

        let  blob = new Blob( this.chunks, this.type );
          this.audioSrc = window.URL.createObjectURL( blob );

          this.audio.src = this.audioSrc;

         this.chunks = [];
      }   

      
      
  } ).catch(  ( error )=> {
      if ( location.protocol != 'https:' ) {
       
        this.msg_box = this.lang.mic_error + '<br>'  + this.lang.use_https;
      } else {
        this.msg_box = this.lang.mic_error;
      }

      console.log(this.msg_box);
 
  });
}

 stop() {
  this.mediaRecorder.stop();

  this.btn_status ='inactive' ;

  if ( navigator.vibrate ) navigator.vibrate( [ 200, 100, 200 ] );

  let now = Math.ceil( new Date().getTime() / 1000 );

  let t = this.parseTime( now - this.time );


}
 parseTime( sec : number ) {
  let h = parseInt( sec / 3600 );
  let m = parseInt( sec / 60 );
  let sec = sec - ( h * 3600 + m * 60 );

  h = h == 0 ? '' : h + ':';
  sec = sec < 10 ? '0' + sec : sec;

  return h + m + ':' + sec;
}

}