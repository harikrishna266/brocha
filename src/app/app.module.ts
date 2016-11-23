import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent } from './app.component';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'swipe': {velocity: 0.1, threshold: .1} // override default settings
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
   providers: [ { 
                    provide: HAMMER_GESTURE_CONFIG, 
                    useClass: MyHammerConfig 
                } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
