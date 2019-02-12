import { Component, OnInit, Input } from '@angular/core';
import getIcon from './icons';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() step;
  image;
  
  constructor() { }

  ngOnInit() {
    this.image = getIcon(this.step.name);
  }

}
