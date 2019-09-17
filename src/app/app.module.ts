import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MaterialsModule } from './MaterialsModule';
import { GestureConfig } from './config/GestureConfig';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs/hammer';



import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, MaterialsModule, BrowserAnimationsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: GestureConfig,
  }]
})
export class AppModule { }
