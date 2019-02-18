import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.scss']
})
export class StageHeaderComponent implements OnInit {
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
