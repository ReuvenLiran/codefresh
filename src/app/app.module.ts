import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StepComponent } from './step/step.component';
import { StepsListComponent } from './steps-list/steps-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StepsListComponent,
    StepComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
