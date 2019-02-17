import { Component, OnInit, Input, OnChanges } from '@angular/core';
import getIcon from './icons';

@Component({
  selector: 'app-inline-step',
  templateUrl: './inline-step.component.html',
  styleUrls: ['./inline-step.component.scss']
})
export class InlineStepComponent implements OnInit, OnChanges {
  @Input() step;
  @Input() className;
  image;

  constructor() { }

  ngOnInit() {
    this.image = getIcon(this.step.name);
  }

  ngOnChanges() {
    this.image = getIcon(this.step.name);
  }
}
