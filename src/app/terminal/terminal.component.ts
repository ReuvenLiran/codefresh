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
  @Input() metrics;

  @Output() closeTerminal = new EventEmitter();

  view = 'metrics';

  constructor() { }

  get hasMetrics() {
    const {
      cpu,
      memory,
    } = this.metrics;
    const hasMemory = memory.usage.length > 0 && memory.time.length > 0;
    const hasCPU = cpu.usage.length > 0 && cpu.time.length > 0;
    return hasCPU || hasMemory;
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
    const noMetrics = (metrics && !this.hasMetrics) || !metrics;
    if (noMetrics) {
        this.showOutput();
    }
  }
}
