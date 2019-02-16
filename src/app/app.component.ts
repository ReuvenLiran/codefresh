import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import data from './json';
import { 
  getLog, 
  getCPUMetrics,
  getMemoryMetrics,
} from './utils';

const { steps } = data;

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

let stepsLogs = {};
let stepsMemory = {};
let stepsCPU = {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'test1';
  stages = [STAGE1, STAGE2, STAGE3];
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

  
  selectStep(id) {
    this.logs = getLog(id.name, stepsLogs[id.name]);
    const memory = getMemoryMetrics(id.name, stepsMemory[id.name]);
    const cpu = getCPUMetrics(id.name, stepsCPU[id.name]);
    this.metrics = {
      cpu,
      memory,
    };
    this.selectedStep = id;
    this.isOpen = true;
  }

  closeTerminal() {
    this.isOpen = false;
  }
  
  ngOnInit() {
    const addStepToStage = (j, i) => {
      setTimeout(() => {
        const {
          logs,
          name,
          status,
          metrics = {},
        } = steps[i];
        const { memory, cpu } = metrics;
        stepsLogs[name] = logs;
        stepsMemory[name] = memory;
        stepsCPU[name] = cpu;
        this.stages[j].steps.push({name, status})
      }, (i + 1) * 500)
    }
    let j = 0;
    for (let i = 0; i < steps.length; i++) {
      addStepToStage(j, i);
      if (i > 0 && i % 4 === 0) {
        j++;
      }
    }
  }
}
