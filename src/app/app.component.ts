import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'test1';
  stages = [STAGE1, STAGE2, STAGE3];
  ngOnInit() {
    const steps = [ {
      name: 'ssss',
      status: 'success',
    }, { 
      name: 'main_clone',
      status: 'success',
    }, {
      name: 'aaaaa',
      status: 'error',
    }, {
      name: 'bbbbb',
      status: 'success',
    }, {
      name: 'ccccc',
      status: 'error',
    }, {
      name: 'ssss',
      status: 'success',
    }, { 
      name: 'main_clone',
      status: 'success',
    }, {
      name: 'aaaaa',
      status: 'error',
    }, {
      name: 'bbbbb',
      status: 'success',
    }, {
      name: 'ccccc',
      status: 'error',
    }];

    const addStepToStage = (j, i) => {
      setTimeout(() => {
        this.stages[j].steps.push(steps[i])
      }, (i + 1) * 500)
    }
    let j = 0;
    for (let i = 0; i < steps.length; i++) {
      addStepToStage(j, i);
      if (i > 0 && i % 3 === 0) {
        j++;
      }
    }
  }
}
