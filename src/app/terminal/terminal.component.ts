import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import AnsiUp from 'ansi_up';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @Input() isOpen;
  @Input() step;
  log;
 
  // logs = [
  //   "Validating connection to Docker daemon...\r\n",
  //   "Connection to Docker daemon validated\r\n",
  //   "Creating logging service...\r\n",
  //   "Logging service created\r\n",
  //   "Validating logging service\r\n",
  //   "Logging service validated\r\n",
  //   "Provisioning volume: pipeline_5c336db4c67fe44c098c9cd3\r\n",
  //   "Successfully provisioned volume: pipeline_5c336db4c67fe44c098c9cd3\r\n",
  //   "Creating environment variable exporting file: /codefresh/volume/env_vars_to_export\r\n",
  //   "Creating export environment variable script file: /codefresh/volume/cf_export\r\n",
  //   "Creating kube config file\r\n",
  //   "Successfully created kube config\r\n"
  // ];

  constructor(private sanitizer: DomSanitizer) { }

  close() {
    this.isOpen = false;
  }
  
  ngOnInit() {
    const ansi_up = new AnsiUp();
    const txt  = "Evaluating execution condition \u001b[01;33mskip\u001b[0m \u001b[00;33m( '${{CF_SKIP_MAIN_CLONE}}' != 'true' )\u001b[0m: it evaluates to \u001b[01;32mtrue\u001b[0m\r\n"
    // const txt  = "\n\n\x1B[1;33;40m 33;40  \x1B[1;33;41m 33;41  \x1B[1;33;42m 33;42  \x1B[1;33;43m 33;43  \x1B[1;33;44m 33;44  \x1B[1;33;45m 33;45  \x1B[1;33;46m 33;46  \x1B[1m\x1B[0\n\n\x1B[1;33;42m >> Tests OK\n\n"
    const html = ansi_up.ansi_to_html(txt);
    this.log = this.sanitizer.bypassSecurityTrustHtml(html);
    // this.log = ansi_up.ansi_to_html(txt);
    // this.logs = this.logs.forEach()
  }

}
