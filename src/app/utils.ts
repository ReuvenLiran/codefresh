import { DomSanitizer } from '@angular/platform-browser';
import AnsiUp from 'ansi_up';
import { totalmem } from 'os';

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
  const DEFAULT = { usage: [], time: [] }
  if (!memoryUsage) return DEFAULT;

  const memoryUsageArr =  Object.entries(memoryUsage);
  const [_, { time: firstTime }] = memoryUsageArr[0];
  // const result =  memoryUsageArr.map(([_, d]) => {
  //   const { time, usage } = d;
  //   return ({
  //     time: formatSecondsToTime((time - firstTime) / 1000), 
  //     usage: usage / 1000000,
  //   });
  // });
  const result = memoryUsageArr.reduce((total, [_, d]) => {
    const {
      usage, 
      time,
    } = d;
    total.usage.push(usage / 1000000);
    total.time.push(formatSecondsToTime((time - firstTime) / 1000,));
    return total;
  }, DEFAULT);
  return result;
};

let hashMemory = {};

export const getMemoryMetrics = (step, memoryUsage) => {
  if (!hashMemory[step]) {
    hashMemory[step] = formatMemoryMetrics(memoryUsage);
  }
  return hashMemory[step];
}



const formatCPUMetrics = cpuUsage => {
  const DEFAULT = { usage: [], time: [] }
  if (!cpuUsage) return DEFAULT;

  const cpuUsageArr =  Object.entries(cpuUsage);
  const [_, { time: firstTime }] = cpuUsageArr[0];
  const result = cpuUsageArr.reduce((total, [_, d]) => {
    const {
      usage, 
      time,
    } = d;
    total.usage.push(usage);
    total.time.push(formatSecondsToTime((time - firstTime) / 1000,));
    return total;
  }, DEFAULT);
  // const result =  cpuUsageArr.map(([_, d]) => {
  //   const { time, usage } = d;
  //   return ({
  //     time: (time - firstTime) / 1000, 
  //     usage,
  //   });
  // });
  return result;
};

let hashCPU = {};

export const getCPUMetrics = (step, cpuUsage) => {
  if (!hashCPU[step]) {
    hashCPU[step] = formatCPUMetrics(cpuUsage);
  }
  return hashCPU[step];
}

const formatSecondsToTime = (secs) => {
  const sec_num = parseInt(secs, 10); // don't forget the second param
  const hoursVal   = Math.floor(sec_num / 3600);
  const minutesVal = Math.floor((sec_num - (hoursVal * 3600)) / 60);
  const secondsVal = sec_num - (hoursVal * 3600) - (minutesVal * 60);

  let hours = hoursVal.toString(),
      minutes = minutesVal.toString(),
      seconds = secondsVal.toString();

  if (hoursVal   < 10) {hours   = "0"+hours;}
  if (minutesVal < 10) {minutes = "0"+minutes;}
  if (secondsVal < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
};
