import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import data from './json';
import { 
  getLog, 
  getCPUMetrics,
  getMemoryMetrics,
  formatStep,
} from './utils';
import {
  STAGES,
} from './consts';

const { steps } = data;
let stepsData = {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  stages = STAGES;
  isOpen = false;
  selectedStep = {};
  logs = [];
  metrics = {
    memory: {
      usage: [],
      time: [],
    },
    cpu: {
      usage: [],
      time: [],
    },
  };

  selectStep(step) {
    const {
      name,
    } = step;
    const {
      logs,
      memory: memoryData,
      cpu: cpuData,
    } = stepsData[name];
    this.logs = getLog(name, logs);
    const memory = getMemoryMetrics(name, memoryData);
    const cpu = getCPUMetrics(name, cpuData);
    this.metrics = {
      cpu,
      memory,
    };
    this.selectedStep = step;
    this.isOpen = true;
  }

  closeTerminal() {
    this.isOpen = false;
  }

  addStepToStage(j, i) {
    const DELAY = 500;
    setTimeout(() => {
      const step = formatStep(steps[i]);
      const { data, ...other } = step;
      stepsData[step.name] = data;
      this.stages[j].steps.push(other);
    }, (i + 1) * DELAY)
  }

  ngOnInit() {
    let j = 0;
    for (let i = 0; i < steps.length; i++) {
      this.addStepToStage(j, i);
      if (i > 0 && i % 4 === 0) {
        j++;
      }
    }
  }
}
