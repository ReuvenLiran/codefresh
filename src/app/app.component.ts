import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import MG from 'metrics-graphics';
import data from './json';
import { getLog } from './utils';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'test1';
  stages = [STAGE1, STAGE2, STAGE3];
  isOpen = false;
  selectedStep = {};
  logs = [];
  chartData = [];
  
  selectStep(id) {
    this.logs = getLog(id.name, stepsLogs[id.name]);
    this.selectedStep = id;
    this.isOpen = true;
  }

  closeTerminal() {
    this.isOpen = false;
  }

  setupChart() {
    const DATA = {
      "-LW_olZmz-8_76n4N5At": { time: 1547896559945, usage: 75247616 },
      "-LW_om9_CBEdiyNlzzA3": { time: 1547896562360, usage: 168566784 },
      "-LW_omdvdwiYdVOrEj12": { time: 1547896564370, usage: 245448704 },
      "-LW_on8ktR_MNZmQOnRV": { time: 1547896566407, usage: 315895808 },
      "-LW_onsJrx1Ums3lgPR3": { time: 1547896569386, usage: 90501120 }
    };


    const [_, { time: firstTime }] = Object.entries(DATA)[0];
    this.chartData = Object.entries(DATA).map(([_, d], i) => {
      return ({
        time: (d.time - firstTime) / 1000, 
        usage: d.usage / 1000000,
      });
    });
  }
  
  ngOnInit() {
    console.log(MG);
    this.setupChart();
    const addStepToStage = (j, i) => {
      setTimeout(() => {
        const {
          logs,
          name,
        } = steps[i];
        stepsLogs[name] = logs;
        this.stages[j].steps.push({name})
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
