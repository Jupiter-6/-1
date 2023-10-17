import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

export interface BiEchartsConfig {
    option: EChartsOption;
    name: string;
    icon: string;
    height?: number;
}

/** 条形图 */
export function getBarDiagramOptions(config: {
    data: Array<{ value: string; datatime: string; }>
    theme?: 'theme1' | 'theme2' | 'theme3';
    unit?: string;
    name?: string;
    formatter?: any;
}): EChartsOption {
    const theme = {
        theme1: [
            { offset: 0, color: '#FF544F' },
            { offset: 1, color: '#FAD126' }
        ],
        theme2: [
            { offset: 0, color: '#A541FF' },
            { offset: 1, color: '#3464FF' }
        ],
        theme3: [
            { offset: 0, color: '#43debc' },
            { offset: 1, color: '#4caf50' }
        ]
    }

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            renderMode: 'html',
            formatter: config.formatter || ''
        },
        grid: {
            left: 10,
            top: 10,
            bottom: 10,
            right: 30,
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            name: config.unit,
            axisLine: {
                lineStyle: {
                    color: "#BDBDBD"
                }
            },
            axisTick: { show: false },
            axisLabel: {
                color: '#BDBDBD',
                fontSize: 10
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#E8E8E8"
                }
            },
        },
        yAxis: {
            type: 'category',
            data: config.data.map(i => i.datatime),
            nameTextStyle: {
                fontSize: 10,
                color: '#BDBDBD'
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#aaa',
                fontSize: 10
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "#E8E8E8"
                }
            },
            axisTick: { show: false },
        },
        series: {
            name: config.name || '',
            type: 'bar',
            data: config.data.map(i => i.value),
            smooth: true,
            connectNulls: false,
            showBackground: true,
            lineStyle: {
                shadowColor: 'rgba(52,100,255,.5)',
                shadowBlur: 5,
                shadowOffsetY: 5,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: config.theme && theme[config.theme] || theme.theme1,
                    global: false // 缺省为 false
                },
            },
            barMaxWidth: 15,
            itemStyle: {
                normal: {
                    barBorderRadius: [0, 2, 2, 0],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                        config.theme && theme[config.theme] || theme.theme1,            //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                    )
                }
            },

        }
    } as EChartsOption;
    return option;
}

/** 通用柱状图、折线图 */
export function getLineOptions(config: Array<{
    unit: string;
    type?: 'bar' | 'line';
    data: Array<{ value: string | number; datatime: string; }>
    name: string;
    theme?: 'theme1' | 'theme2' | 'theme3';
    yAxisIndex?: number;
    legend?: boolean;
}>): EChartsOption {
    const theme = {
        theme1: [
            { offset: 0, color: '#FF544F' },
            { offset: 1, color: '#FAD126' }
        ],
        theme2: [
            { offset: 0, color: '#A541FF' },
            { offset: 1, color: '#3464FF' }
        ],
        theme3: [
            { offset: 0, color: '#43debc' },
            { offset: 1, color: '#007bff' }
        ]
    }

    const option: EChartsOption = {
        legend: {
            show: config[0].legend || false
        },
        tooltip: {
            trigger: 'axis',
            renderMode: 'html'
        },
        grid: {
            left: 10,
            top: 30,
            bottom: 10,
            right: 10,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: "#E8E8E8"
                }
            },
            axisTick: { show: false },
            axisLabel: {
                color: '#BDBDBD',
                fontSize: 10
            },
            data: config[0].data.map(i => i.datatime)
        },
        yAxis: config.map(i => {
            return {
                type: 'value',
                name: i.unit,
                nameTextStyle: {
                    fontSize: 10,
                    color: '#BDBDBD'
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#BDBDBD',
                    fontSize: 10
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#E8E8E8"
                    }
                },
                axisTick: { show: false },
            }
        }),
        series: config.map(i => {
            return {
                yAxisIndex: i.yAxisIndex || 0,
                name: i.name,
                type: i.type || 'line',
                data: i.data.map(i => i.value),
                smooth: true,
                connectNulls: false,
                lineStyle: {
                    shadowColor: 'rgba(52,100,255,.5)',
                    shadowBlur: 5,
                    shadowOffsetY: 5,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: i.theme && theme[i.theme] || theme.theme1,
                        global: false // 缺省为 false
                    },
                },
                barMaxWidth: 15,
                itemStyle: {
                    normal: {
                        barBorderRadius: [2, 2, 0, 0],
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                            i.theme && theme[i.theme] || theme.theme1,            //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                        )
                    }
                }
            }
        })
    } as EChartsOption;
    return option;
}

/** 雷达图 */
export function getRadarOptions(config: {
    data: Array<{ value: string; datatime: string; }>
    theme?: 'theme1' | 'theme2' | 'theme3';
    shape?: 'circle' | 'polygon',
    name?: string;
}): EChartsOption {
    const themeConfig = {
        theme1: {
            color: '#1890FF',
            areaColor: 'rgba(38, 131, 255,0.15)',
        },
        theme2: {
            color: '#A541FF',
            areaColor: 'rgba(165,65,255,0.15)',
        },
        theme3: {
            color: '#4caf50',
            areaColor: 'rgba(76,175,80,0.15)',
        },
    }

    const max = Math.max(...config.data.map(i => +i.value));
    const option: EChartsOption = {
        color: config.theme && themeConfig[config.theme].color || themeConfig['theme1'].color,
        tooltip: {
            trigger: 'item'
        },
        radar: {
            center: ['50%', '50%'],
            shape: config.shape || 'polygon',
            radius: '60%',
            indicator: config.data.map(i => ({ text: i.datatime, max }))
            ,
            axisLine: {
                lineStyle: {
                    color: '#e9e9e9'
                }
            },
            axisName: {
                color: 'rgba(0, 0, 0, 0.45)'
            },
            splitLine: {
                lineStyle: {
                    color: ['#E9E9E9']
                }
            },
            splitArea: {
                show: false
            },
        },
        series: [{
            name: config.name || '',
            type: 'radar',
            symbol: 'none',
            areaStyle: {
                color: config.theme && themeConfig[config.theme].areaColor || themeConfig['theme1'].areaColor,
            },
            data: [
                {
                    value: config.data.map(i => +i.value),
                    name: ''
                }
            ]
        }]
    } as EChartsOption;
    return option;
}