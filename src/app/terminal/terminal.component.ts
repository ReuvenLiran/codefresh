import { Component, Input, Output, OnChanges, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges {
  @Input() isOpen;
  @Input() step;
  @Input() logs = [];
  @Input() metrics = {
    memory: [],
    cpu: [],
  };

  @Output() closeTerminal = new EventEmitter();

  view = 'output';

  constructor() { }

  get hasMetrics() {
    const {
      cpu,
      memory,
    } = this.metrics;
    return cpu.length > 0 || memory.length > 0;
  }
  close() {
    this.closeTerminal.emit();
  }
  showMetrics() {
    this.view = 'metrics';
  }
  showOutput() {
    this.view = 'output';
  }

  ngOnChanges(changes) {
    const { metrics } = changes;
    if (metrics) {
      const {
        currentValue: {
          cpu,
          memory,
        },
      } = metrics;
      if (cpu.length  === 0 && memory.length  === 0) {
        this.showOutput();
      }
    } else {
      this.showOutput();
    }
  }
}
