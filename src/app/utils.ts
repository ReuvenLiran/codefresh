import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import AnsiUp from 'ansi_up';

const formatLog = logs => {
  const ansi_up = new AnsiUp();
  let sanitizer: DomSanitizer;
  
  const html = logs.reduce((total, log) => {
    const logHtml = ansi_up.ansi_to_html(log);
    total += `<samp class="log-output">${logHtml}</samp>`;
    return total;
  }, '');
  return html;
};

let hash = {};

export const getLog = (step, logs) => {
  if (!hash[step]) {
    hash[step] = formatLog(logs);
  }
  return hash[step];
}
