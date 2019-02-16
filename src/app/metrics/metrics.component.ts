import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent 
  implements OnInit, OnChanges {
  @Input() memory;
  @Input() metrics;
  @Input() cpu;

  constructor() { }

  ngOnChanges(changes) {
    console.log(changes)
  }
  ngOnInit() {
    console.log(this)
  }
}
