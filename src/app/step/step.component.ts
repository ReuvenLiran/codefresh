import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import getIcon from './icons';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Output() selectStep = new EventEmitter();
  @Input() step;
  image;
  
  constructor() { }

  selectStep1() {
    this.selectStep.emit(this.step);
  }

  ngOnInit() {
    this.image = getIcon(this.step.name);
  }

}
