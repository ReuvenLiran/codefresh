import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { 
  StepComponent,
  StageComponent,
  StageHeaderComponent,
} from './stage';
import {
  LogsComponent, 
  LogComponent,
  MetricsComponent, 
  MetricsGraphComponent,
  TerminalComponent
} from './terminal';
import { InlineStepComponent } from './inline-step/inline-step.component';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    StepComponent,
    StageHeaderComponent,
    TerminalComponent,
    InlineStepComponent,
    MetricsGraphComponent,
    LogsComponent,
    LogComponent,
    MetricsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
