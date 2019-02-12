import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test1';
  steps = [];
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
    }];
      for (let i = 0; i < steps.length; i++) {
        setTimeout(() =>
        this.steps.push(steps[i]), (i + 1) * 500)
      }
  }
}
