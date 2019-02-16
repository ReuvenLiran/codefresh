import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent {
  @Input() isOpen;
  @Input() step;
  @Input() logs = [];
  @Input() metrics = {
    memory: [],
    cpu: [],
  };
  // @Input() memory = [];
  // @Input() cpu = [];

  @Output() closeTerminal = new EventEmitter();

  view = 'output';

  constructor() { }

  close() {
    this.closeTerminal.emit();
  }
  showMetrics() {
    this.view = 'metrics';
  }
  showOutput() {
    this.view = 'output';
  }
}
