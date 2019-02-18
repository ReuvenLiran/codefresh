import { Component, Input } from '@angular/core';
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  @Input() logs;
  constructor() { }
}
