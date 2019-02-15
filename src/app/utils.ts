import { DomSanitizer } from '@angular/platform-browser';
import { default as AnsiUp} from 'ansi_up';

const formatLog = logs => {
  const ansi_up = new AnsiUp();
  
  const html = logs.reduce((total, log) => {
    const logHtml = ansi_up.ansi_to_html(log);
    total.push(logHtml);
    // total += `<app-log log="${logHtml}"></app-log>`;
    return total;
  }, []);
  return html;
};

let hash = {};

export const getLog = (step, logs) => {
  if (!hash[step]) {
    hash[step] = formatLog(logs);
  }
  return hash[step];
}
