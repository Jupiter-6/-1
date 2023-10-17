export const tableHeadKeyMap = {
  // 供水量
  gsl: {
    day: [{ name: '日期', type: 'date', key: 'dateText' }],
    month: [{ name: '日期', type: 'date', key: 'dateText' }],
    year: [{ name: '日期', type: 'date', key: 'dateText' }],
  },
  //ydl用电量
  ydl: {
    day: [{ name: '日期', type: 'date', key: 'dateText' }],
    month: [{ name: '日期', type: 'date', key: 'dateText' }],
    year: [{ name: '日期', type: 'date', key: 'dateText' }],
  },
  // power能耗
  power: {
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '公司', type: 'string', key: 'all' },
      { name: '生产', type: 'string', key: 'shengchan' },
      { name: '二供', type: 'string', key: 'ergong' },
      { name: '增压', type: 'string', key: 'zengguansuo' },
      { name: '办公', type: 'string', key: 'bangong' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '公司', type: 'string', key: 'all' },
      { name: '生产', type: 'string', key: 'shengchan' },
      { name: '二供', type: 'string', key: 'ergong' },
      { name: '增压', type: 'string', key: 'zengguansuo' },
      { name: '办公', type: 'string', key: 'bangong' },
    ],
    year: [
      { name: '日期', type: 'string', key: 'dateText' },
      { name: '公司', type: 'string', key: 'all' },
      { name: '生产', type: 'string', key: 'shengchan' },
      { name: '二供', type: 'string', key: 'ergong' },
      { name: '增压', type: 'string', key: 'zengguansuo' },
      { name: '办公', type: 'string', key: 'bangong' },
    ],
  },
};
