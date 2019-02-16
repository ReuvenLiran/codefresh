import { Component, Input, OnChanges } from '@angular/core';
import MG from 'metrics-graphics';

@Component({
  selector: 'app-metrics-graph',
  templateUrl: './metrics-graph.component.html',
  styleUrls: ['./metrics-graph.component.scss']
})
export class MetricsGraphComponent implements OnChanges {
  @Input() data = [];
  @Input() yLabel;
  @Input() title;
  @Input() xAccessor;
  @Input() id;
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

  ngOnChanges(changes) {
    if (changes.data.currentValue.length > 0) {
      MG.data_graphic({
        title: this.title,
        description: "This is a simple line chart. You can remove the area portion by adding area: false to the arguments list.",
        data: this.data,
        width: 600,
        height: 200,
        left: 70,
        xax_format: this.formatSecondsToTime,
        y_label: this.yLabel,
        target: document.getElementById(this.id),
        x_accessor: this.xAccessor,
        y_accessor: this.yAccessor,
      });
    }
   
  }
}
