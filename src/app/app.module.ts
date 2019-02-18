import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StepComponent } from './step/step.component';
import { StageComponent } from './stage/stage.component';
import { StageHeaderComponent } from './stage-header/stage-header.component';
import { TerminalComponent } from './terminal/terminal.component';
import { InlineStepComponent } from './inline-step/inline-step.component';
import {
    LogsComponent, 
    LogComponent
  } from './logs';
import {
   MetricsComponent, 
   MetricsGraphComponent,
} from './metrics';


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
