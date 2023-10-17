export const tableHeadKeyMap = {
  //话务展示的key
  hw: {
    hour: [
      { name: '时间', type: 'date', key: 'dateText', width: 100 },
      { name: '话务量', type: 'string', key: 'hwl' },
      { name: '拨入数', type: 'string', key: 'brdhs' },
      { name: '拨出数', type: 'string', key: 'bcdhs' },
      { name: '丢失数', type: 'double', key: 'brdss' },
    ],
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '话务量', type: 'string', key: 'rxhwl' },
      { name: '拨入数', type: 'string', key: 'rxbrs' },
      { name: '拨出数', type: 'string', key: 'hfbcs' },
      { name: '丢失数', type: 'double', key: 'rxdss' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '话务量', type: 'string', key: 'rxhwl' },
      { name: '拨入数', type: 'string', key: 'rxbrs' },
      { name: '拨出数', type: 'string', key: 'hfbcs' },
      { name: '丢失数', type: 'double', key: 'rxdss' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '话务量', type: 'string', key: 'rxhwl' },
      { name: '拨入数', type: 'string', key: 'rxbrs' },
      { name: '拨出数', type: 'string', key: 'hfbcs' },
      { name: '丢失数', type: 'double', key: 'rxdss' },
    ],
  },
  //工单
  gd: {
    hour: [
      { name: '时间', type: 'date', key: 'dateText' },
      { name: '工单数', type: 'string', key: 'gdsl' },
      { name: '完成数', type: 'string', key: 'gdwcs' },
      { name: '及时完成', type: 'string', key: 'jswc' },
      { name: '未完成', type: 'double', key: 'wwc' },
    ],
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '工单数', type: 'string', key: 'gdsl' },
      { name: '完成数', type: 'string', key: 'gdwcs' },
      { name: '及时完成', type: 'string', key: 'jswc' },
      { name: '未完成', type: 'double', key: 'wwc' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '工单数', type: 'string', key: 'gdsl' },
      { name: '完成数', type: 'string', key: 'gdwcs' },
      { name: '及时完成', type: 'string', key: 'jswc' },
      { name: '未完成', type: 'double', key: 'wwc' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '工单数', type: 'string', key: 'gdsl' },
      { name: '完成数', type: 'string', key: 'gdwcs' },
      { name: '及时完成', type: 'string', key: 'jswc' },
      { name: '未完成', type: 'double', key: 'wwc' },
    ],
  },
  // 服务
  fw: {
    hour: [
      { name: '时间', type: 'date', key: 'dateText' },
      { name: '单均话务时长(S)', type: 'string', key: 'hwscText', width: 120 },
      { name: '最长等待时间(S)', type: 'string', key: 'zcddsj', width: 120 },
      { name: '服务水平', type: 'string', key: 'fwzs' },
    ],
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '单均话务时长(S)', type: 'string', key: 'hwscText', width: 120 },
      { name: '最长等待时间(S)', type: 'string', key: 'zcddsj', width: 120 },
      { name: '服务水平', type: 'string', key: 'fwzs' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '单均话务时长(S)', type: 'string', key: 'hwscText', width: 120 },
      { name: '最长等待时间(S)', type: 'string', key: 'zcddsj', width: 120 },
      { name: '服务水平', type: 'string', key: 'fwzs' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '单均话务时长(S)', type: 'string', key: 'hwscText', width: 120 },
      { name: '最长等待时间(S)', type: 'string', key: 'zcddsj', width: 120 },
      { name: '服务水平', type: 'string', key: 'fwzs' },
    ],
  },
  //分布
  fb: {
    hour: [
      { name: '时间', type: 'date', key: 'dateText', width: 100 },
      // { name: '区域', type: 'string', key: 'qy' },
      // { name: '热线数量', type: 'string', key: 'rxsl' },
    ],
    day: [
      { name: '日期', type: 'date', key: 'dateText', width: 100 },
      // { name: '区域', type: 'string', key: 'qy' },
      // { name: '热线数量', type: 'string', key: 'rxsl' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      // { name: '区域', type: 'string', key: 'qy' },
      // { name: '热线数量', type: 'string', key: 'rxsl' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      // { name: '区域', type: 'string', key: 'qy' },
      // { name: '热线数量', type: 'string', key: 'rxsl' },
    ],
  },
  // 类别
  lb: {
    hour: [
      { name: '时间', type: 'date', key: 'dateText' },
      // { name: '工单种类', type: 'string', key: 'gdzl' },
      // { name: '工单数量', type: 'string', key: 'gdsl' },
    ],
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      // { name: '工单种类', type: 'string', key: 'gdzl' },
      // { name: '工单数量', type: 'string', key: 'gdsl' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      // { name: '工单种类', type: 'string', key: 'gdzl' },
      // { name: '工单数量', type: 'string', key: 'gdsl' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      // { name: '工单种类', type: 'string', key: 'gdzl' },
      // { name: '工单数量', type: 'string', key: 'gdsl' },
    ],
  },
};
