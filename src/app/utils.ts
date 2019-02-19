import AnsiUp from 'ansi_up';
import {
  H_M_S,
  HH_MM_SS,
} from './consts'

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
interface metricType {
  time: number;
  usage: number;
};
type metricRow = [string, metricType];
type metricRowArr = Array<metricRow>;

const formatMemoryMetrics = memoryUsage => {
  const DEFAULT = { usage: [], time: [] }
  if (!memoryUsage) return DEFAULT;

  const memoryUsageArr: metricRowArr =  Object.entries(memoryUsage);
  const [_, { time: firstTime }] = memoryUsageArr[0];
  const result = memoryUsageArr.reduce((total, [_, d]: metricRow) => {
    const {
      usage, 
      time,
    } = d;
    total.usage.push(usage / 1000000);
    const secsDiff = (time - firstTime) / 1000;
    const formattedTime = formatSecondsToTime(secsDiff, 'hh:mm:ss')
    total.time.push(formattedTime);
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

  const cpuUsageArr: metricRowArr =  Object.entries(cpuUsage);
  const [_, { time: firstTime }] = cpuUsageArr[0];
  const result = cpuUsageArr.reduce((total, [_, d]: metricRow) => {
    const {
      usage, 
      time,
    } = d;
    total.usage.push(usage);
    const secsDiff = (time - firstTime) / 1000;
    const formattedTime = formatSecondsToTime(secsDiff, 'hh:mm:ss')
    total.time.push(formattedTime);
    return total;
  }, DEFAULT);
  return result;
};


let hashCPU = {};

export const getCPUMetrics = (step, cpuUsage) => {
  if (!hashCPU[step]) {
    hashCPU[step] = formatCPUMetrics(cpuUsage);
  }
  return hashCPU[step];
}

const formatSecondsToFormat2 = (secs) => {
  const sec_num = parseInt(secs, 10);
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

const formatSecondsToFormat1 = secs => {
  const sec_num = parseInt(secs, 10);
  const hoursVal   = Math.floor(sec_num / 3600);
  const minutesVal = Math.floor((sec_num - (hoursVal * 3600)) / 60);
  const secondsVal = sec_num - (hoursVal * 3600) - (minutesVal * 60);

  if (secs === 0) {
    return '1s';
  }

  let result = "";
  if (hoursVal > 0) {
    const hours =  hoursVal.toString() + 'h';
    result += `${hours} `;
  }

  if (minutesVal > 0) {
    const minutes =  minutesVal.toString() + 'm';
    result += `${minutes} `;
  }
  
  if (secondsVal > 0) {
    const seconds =  secondsVal.toString() + 's';
    result += seconds;
  }  
  return result;
}

const TIMES_FORMAT = {
  [H_M_S]: formatSecondsToFormat1,
  [HH_MM_SS]: formatSecondsToFormat2,
}

export const formatSecondsToTime = (secs, format) => {
  const func = TIMES_FORMAT[format];
  return func(secs);
};

export const formatStep = (step) =>  {
  const {
    logs,
    name,
    status,
    metrics = {},
    creationTimeStamp,
    finishTimeStamp,
  } = step;
  const { memory, cpu } = metrics;
  const diff = finishTimeStamp - creationTimeStamp;
  const formattedDuration = formatSecondsToTime(diff, H_M_S);
  const newStep = {
    name,
    status,
    duration: formattedDuration,
    data: { logs, memory, cpu },
  };
  return newStep;
}
