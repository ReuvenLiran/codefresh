import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StepComponent } from './step/step.component';
import { StepsListComponent } from './steps-list/steps-list.component';
import { StageComponent } from './stage/stage.component';
const STAGE1 = {
  stage: 'DEFAULT',
  steps: [],
  isFinal: false,
};
const STAGE2 = {
  stage: 'BUILD&TEST',
  steps: [],
  isFinal: false,
};
const STAGE3 = {
  stage: 'RELEASE',
  steps: [],
  isFinal: true,
};

@NgModule({
  declarations: [
    AppComponent,
    StepsListComponent,
    StepComponent,
    StageComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
