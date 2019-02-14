import { Component, OnInit, Input } from '@angular/core';
import getIcon from './icons';

@Component({
  selector: 'app-inline-step',
  templateUrl: './inline-step.component.html',
  styleUrls: ['./inline-step.component.scss']
})
export class InlineStepComponent implements OnInit {
  @Input() step;
  @Input() className;
  image;

  constructor() { }

  ngOnInit() {
    this.image = getIcon(this.step.name);
  }
}
