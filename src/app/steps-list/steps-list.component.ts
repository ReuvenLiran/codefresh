import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.scss']
})
export class StepsListComponent implements OnInit {
  @Input() steps;
  @Input() stage;
  @Input() isFinal;
  @Output() selectStep = new EventEmitter();

  constructor() { }

  selectStep1(name) {
    this.selectStep.emit(name);
    // console.log(name);
    // this.selectStep.emit(name);
  }

  ngOnInit() {
    console.log(this)
    console.log(this.selectStep)
  }

  // selectStep(id) {
  //   console.log(id)
  // }

}
