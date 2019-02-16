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

  setupChart(ctx) {
    let max;
    let min = max = this.data[0];
    console.log({
      min,
      max,
    });
    this.data.forEach((i) => {
      if (i < min) {
        min = i;
      }
      if (i > max) {
        max = i;
      }
    });
    const diff = max - min;

    const newDiff = diff / 3;
    const num = newDiff.toFixed().toString().length;
    let finalNum = "";
    for (let i = 0; i < num - 1; i++) {
      finalNum += "0";
    }
    const lastNum1 = Number(`1${finalNum}`);

    // console.log(lastNum1)
    console.log(Math.ceil(newDiff/lastNum1)*lastNum1)
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
            stepSize:  Math.ceil(newDiff/lastNum1)*lastNum1,
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
