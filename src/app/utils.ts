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

  const cpuUsageArr: metricRowArr =  Object.entries(cpuUsage);
  const [_, { time: firstTime }] = cpuUsageArr[0];
  const result = cpuUsageArr.reduce((total, [_, d]: metricRow) => {
    const {
      usage, 
      time,
    } = d;
    total.usage.push(usage);
    total.time.push(formatSecondsToTime((time - firstTime) / 1000,));
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

const formatSecondsToTime = (secs) => {
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
