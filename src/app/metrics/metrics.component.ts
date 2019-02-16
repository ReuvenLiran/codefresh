import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent 
  implements OnInit, OnChanges {
  @Input() metrics;
  @Input() name;

  constructor() { }

  ngOnChanges(changes) {
  }
  ngOnInit() {
  }
}
