export const tableHeadKeyMap = {
  hb: {
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '新增合计', type: 'string', key: 'xzyhs' },
      { name: '新增居民', type: 'string', key: 'xzshjm' },
      { name: '新增非居民', type: 'string', key: 'xzyfhs' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '新增合计', type: 'string', key: 'xzyhs' },
      { name: '新增居民', type: 'string', key: 'xzshjm' },
      { name: '新增非居民', type: 'string', key: 'xzyfhs' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '新增合计', type: 'string', key: 'xzyhs' },
      { name: '新增居民', type: 'string', key: 'xzshjm' },
      { name: '新增非居民', type: 'string', key: 'xzyfhs' },
    ],
  },
  sf: {
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '应收水费(元)', type: 'double', key: 'yssf' },
      { name: '实收水费(元)', type: 'double', key: 'sssf' },
      { name: '回收率', type: 'string', key: 'hsl' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '应收水费(元)', type: 'double', key: 'yssf' },
      { name: '实收水费(元)', type: 'double', key: 'sssf' },
      { name: '回收率', type: 'string', key: 'hsl' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '应收水费(元)', type: 'double', key: 'yssf' },
      { name: '实收水费(元)', type: 'double', key: 'sssf' },
      { name: '回收率', type: 'string', key: 'hsl' },
    ],
  },
  // 欠费
  qf: {
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '欠费金额(元)', type: 'double', key: 'qfje' },
      { name: '欠费笔数(笔)', type: 'double', key: 'qfbs' },
      { name: '欠费水量(吨)', type: 'double', key: 'qfsl' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '欠费金额(元)', type: 'double', key: 'qfje' },
      { name: '欠费笔数(笔)', type: 'double', key: 'qfbs' },
      { name: '欠费水量(吨)', type: 'double', key: 'qfsl' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '欠费金额(元)', type: 'double', key: 'qfje' },
      { name: '欠费笔数(笔)', type: 'double', key: 'qfbs' },
      { name: '欠费水量(吨)', type: 'double', key: 'qfsl' },
    ],
  },
  cb: {
    day: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '计划抄表数', type: 'double', key: 'cbs' },
      { name: '完成抄表数', type: 'double', key: 'zccbs' },
      { name: '抄表率', type: 'string', key: 'cbl' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '计划抄表数', type: 'double', key: 'cbs' },
      { name: '完成抄表数', type: 'double', key: 'zccbs' },
      { name: '抄表率', type: 'string', key: 'cbl' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '计划抄表数', type: 'double', key: 'cbs' },
      { name: '完成抄表数', type: 'double', key: 'zccbs' },
      { name: '抄表率', type: 'string', key: 'cbl' },
    ],
  },
  sl: {
    day: [
      { name: '时间', type: 'date', key: 'dateText' },
      { name: '合计水量(吨)', type: 'double', key: 'hjsl' },
      { name: '居民售水量(吨)', type: 'double', key: 'jmssl' },
      { name: '非居民售水量(吨)', type: 'double', key: 'fjmssl' },
    ],
    month: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '合计水量(吨)', type: 'double', key: 'hjsl' },
      { name: '居民售水量(吨)', type: 'double', key: 'jmssl' },
      { name: '非居民售水量(吨)', type: 'double', key: 'fjmssl' },
    ],
    year: [
      { name: '日期', type: 'date', key: 'dateText' },
      { name: '合计水量(吨)', type: 'double', key: 'hjsl' },
      { name: '居民售水量(吨)', type: 'double', key: 'jmssl' },
      { name: '非居民售水量(吨)', type: 'double', key: 'fjmssl' },
    ],
  },
};

export const CardsMap = {
  hb: [
    { name: '公司合计', topData: '', bottomData: '', className: '' },
    {
      name: '居民',
      topData: '',
      bottomData: '',
      className: 'card-data-center',
    },
    {
      name: '非居民',
      topData: '',
      bottomData: '',
      className: 'card-data-last',
    },
  ],
  sf: [
    { name: '应收水费', topData: 'gshj', bottomData: '', className: '' },
    {
      name: '实收水费',
      topData: 'gshj',
      bottomData: '',
      className: 'card-data-center',
    },
    {
      name: '回收率',
      topData: '',
      bottomData: '',
      className: 'card-data-last',
    },
  ],
  qf: [
    { name: '欠费金额', topData: '', bottomData: '', className: '' },
    {
      name: '欠费笔数',
      topData: '',
      bottomData: '',
      className: 'card-data-center',
    },
    {
      name: '欠费水量',
      topData: '',
      bottomData: '',
      className: 'card-data-last',
    },
  ],
  cb: [
    { name: '计划抄表数', topData: '', bottomData: '', className: '' },
    {
      name: '完成抄表数',
      topData: '',
      bottomData: '',
      className: 'card-data-center',
    },
    {
      name: '抄表率',
      topData: '',
      bottomData: '',
      className: 'card-data-last',
    },
  ],
  sl: [
    { name: '公司合计', topData: '', bottomData: '', className: '' },
    {
      name: '居民',
      topData: '',
      bottomData: '',
      className: 'card-data-center',
    },
    {
      name: '非居民',
      topData: '',
      bottomData: '',
      className: 'card-data-last',
    },
  ],
};
