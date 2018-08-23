import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { MyServiceService } from './my-service.service';
import { RecorderService } from './recorder.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [MyServiceService,
             RecorderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
