import { Component, OnInit, Input } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Input() stage;
  @Input() isFinal;
  icon = "->";
  constructor() { }

  ngOnInit() {
    if (this.isFinal) {
      this.icon = null;
    } 
  }

}
