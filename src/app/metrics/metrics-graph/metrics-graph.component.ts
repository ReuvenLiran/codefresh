import { 
  Component, 
  ViewEncapsulation,
  Input,
  OnInit, 
  OnChanges 
} from '@angular/core';
import MG from 'metrics-graphics';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-metrics-graph',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './metrics-graph.component.html',
  styleUrls: ['./metrics-graph.component.scss']
})
export class MetricsGraphComponent implements OnChanges, OnInit {
  @Input() data = [];
  @Input() yLabel;
  @Input() title;
  @Input() xAccessor;
  @Input() id;
  @Input() yAccessor;
  target = null;
  chart = [];
  
  constructor() { }

  ngOnChanges(changes) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.data.time,
        datasets: [{
            data: this.data.usage,
            // borderColor: '#ffcc00',
            fill: true
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              stepSize: 100,
            }, 
          }]
        }
      }
    });
  }
  ngOnInit() {}
}
