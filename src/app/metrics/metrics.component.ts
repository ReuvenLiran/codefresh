import { Component, OnInit, Input } from '@angular/core';
import MG from 'metrics-graphics';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  @Input() data;
  @Input() yLabel;
  @Input() title;
  @Input() xAccessor;
  @Input() yAccessor;

  constructor() { }

  formatSecondsToTime = (secs) => {
    const sec_num = parseInt(secs, 10); // don't forget the second param
    const hoursVal   = Math.floor(sec_num / 3600);
    const minutesVal = Math.floor((sec_num - (hoursVal * 3600)) / 60);
    const secondsVal = sec_num - (hoursVal * 3600) - (minutesVal * 60);

    let hours = hoursVal.toString(),
        minutes = minutesVal.toString(),
        seconds = secondsVal.toString();
  
    if (hoursVal   < 10) {hours   = "0"+hours;}
    if (minutesVal < 10) {minutes = "0"+minutes;}
    if (secondsVal < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  };
  ngOnInit() {
    MG.data_graphic({
      title: this.title,
      description: "This is a simple line chart. You can remove the area portion by adding area: false to the arguments list.",
      data: this.data,
      width: 600,
      height: 300,
      left: 100,
      xax_format: a => {
        console.log(a);
        return this.formatSecondsToTime(a);
      },
      y_label: this.yLabel,
      target: document.getElementById('chart'),
      x_accessor: this.xAccessor,
      y_accessor: this.yAccessor,
    });
  }

}
