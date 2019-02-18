import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  @Input() steps;
  @Input() stage;
  @Input() isFinal;
  @Output() selectStep = new EventEmitter();

  constructor() { }

  selectStep1(name) {
    this.selectStep.emit(name);
  }

  ngOnInit() {
  }
}
