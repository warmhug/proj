import moment from 'moment';

export const bizTypes: any = ['meeting', 'todo', 'collaboration'];
export const typeNameMap: any = {
  meeting: '会议',
  todo: '待办',
  REQUIREMENT: '需求',
  TASK: '任务',
  DEFECT: '缺陷',
  RISK: '风险',
};

// 对比 start or end time
export const diffTime = (time1: any, time2: any) => {
  const changeProps = [];
  if (!moment(time1.start).isSame(moment(time2.start))) {
    changeProps.push('start');
  }
  if (!moment(time1.end).isSame(moment(time2.end))) {
    changeProps.push('end');
  }
  return changeProps;
};

// 问题：日历的结束时间、如果是 某一天的零点，在 月视图 里 这一天不会高亮，而是高亮到其前一天。
// 所以在日历里对传入的 0 点时间 加一天，传出 减一天
export const fixEndTime = (endTime: Date, index = 1) => {
  // 比如 2022-01-05T16:00:00.000+00:00
  // console.log('endT', endTime, new Date(endTime), moment(endTime).isSame(new Date(endTime)));
  const et = new Date(endTime);
  if (
    et.getHours() === 0 &&
    et.getMinutes() === 0 &&
    et.getSeconds() === 0 &&
    et.getMilliseconds() === 0
  ) {
    return moment(et).add(index, 'day').toDate();
  }
  return et;
};

// 任务或待办里，有 开始时间 或 结束时间 存在之一的情况
// 在 日历事项条 中，只用展示其中之一的时间点，此时需要把 start 或 end 赋值成同一个时间
export const checkEitherTime = (start: any, end: any) => {
  const startData = start ? new Date(start) : null;
  const endData = end ? new Date(end) : null;
  if (start && !end) {
    return { start: startData, end: startData, startShow: startData, endShow: null };
  }
  if (!start && end) {
    return { start: endData, end: endData, startShow: null, endShow: endData };
  }
  return {
    start: startData,
    end: endData,
    startShow: startData,
    endShow: endData,
  };
};
