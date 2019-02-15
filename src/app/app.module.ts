import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MG } from 'metrics-graphics';

import { AppComponent } from './app.component';
import { StepComponent } from './step/step.component';
import { StepsListComponent } from './steps-list/steps-list.component';
import { StageComponent } from './stage/stage.component';
import { TerminalComponent } from './terminal/terminal.component';
import { InlineStepComponent } from './inline-step/inline-step.component';
import { LogComponent } from './log/log.component';
import { MetricsComponent } from './metrics/metrics.component';

@NgModule({
  declarations: [
    AppComponent,
    StepsListComponent,
    StepComponent,
    StageComponent,
    TerminalComponent,
    InlineStepComponent,
    LogComponent,
    MetricsComponent,
  ],
  imports: [
    BrowserModule
    // MG
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
