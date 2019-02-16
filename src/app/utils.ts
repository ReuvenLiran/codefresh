import { DomSanitizer } from '@angular/platform-browser';
import AnsiUp from 'ansi_up';

const formatLog = logs => {
  const ansi_up = new AnsiUp();
  
  const html = logs.reduce((total, log) => {
    const logHtml = ansi_up.ansi_to_html(log);
    total.push(logHtml);
    return total;
  }, []);
  return html;
};

let hashLogs = {};

export const getLog = (step, logs) => {
  if (!hashLogs[step]) {
    hashLogs[step] = formatLog(logs);
  }
  return hashLogs[step];
}

const formatMemoryMetrics = memoryUsage => {
  if (!memoryUsage) return [];

  const memoryUsageArr =  Object.entries(memoryUsage);
  const [_, { time: firstTime }] = memoryUsageArr[0];
  const result =  memoryUsageArr.map(([_, d]) => {
    const { time, usage } = d;
    return ({
      time: (time - firstTime) / 1000, 
      usage: usage / 1000000,
    });
  });
  return result;
};

let hashMemory = {};

export const getMemoryMetrics = (step, memoryUsage) => {
  console.log(memoryUsage)
  if (!hashMemory[step]) {
    hashMemory[step] = formatMemoryMetrics(memoryUsage);
  }
  return hashMemory[step];
}
