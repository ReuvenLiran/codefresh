import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnChanges {
  @Input() log;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes) {
    const { log } = changes;
    this.log = this.sanitizer.bypassSecurityTrustHtml(log.currentValue);
  }
}
