import { 
  Component, 
  ViewEncapsulation,
  Input,
  OnInit, 
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-metrics-graph',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './metrics-graph.component.html',
  styleUrls: ['./metrics-graph.component.scss']
})
export class MetricsGraphComponent implements OnChanges, OnInit {
  @Input() data = [];
  @Input() labels = [];
  @Input() yLabel;
  @Input() title;
  @Input() xAccessor;
  @Input() id;
  @Input() yAccessor;
  target = null;
  chart = [];
  @ViewChild("ref", {read: ElementRef}) ref: ElementRef;
  ctx;

  constructor(private _elementRef : ElementRef) { }

  ngAfterViewInit(): void {
    const domElem = this.ref.nativeElement;
    this.ctx = domElem.getContext('2d');
    this.chart = this.ctx ? this.setupChart(this.ctx) : [];
  }

  getMaxMin() {
    let max;
    let min = max = this.data[0];
   
    this.data.forEach((i) => {
      if (i < min) {
        min = i;
      }
      if (i > max) {
        max = i;
      }
    });
    return ({
      max,
      min,
    });
  }
  getStepSize() {
    const NUM_STEPS = 3;
    const { max, min } = this.getMaxMin();
    const diff = max - min;

    const newDiff = diff / NUM_STEPS;
    const num = newDiff.toFixed().toString().length;
    let zeros = "";
    for (let i = 0; i < num - 1; i++) {
      zeros += "0";
    }
    const roundBy = Number(`1${zeros}`);
    const stepSize = Math.ceil(newDiff/roundBy)*roundBy;
    return stepSize;
  }

  setupChart(ctx) {
    const stepSize = this.getStepSize();  
   
    const OPTIONS = {
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
            stepSize,
          }, 
        }]
      }
    }; 
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
            data: this.data,
            fill: true
          },
        ]
      },
      options: OPTIONS,
    });
  }
  ngOnChanges(changes) {
    this.chart = this.ctx ? this.setupChart(this.ctx) : [];
  }
  ngOnInit() {}
}
