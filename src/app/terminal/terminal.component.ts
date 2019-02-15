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
  @Output() closeTerminal = new EventEmitter();

  constructor() { }

  close() {
    this.closeTerminal.emit();
  }
}
