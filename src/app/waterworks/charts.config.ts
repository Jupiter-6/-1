import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

export function getLineptions(config: {
    unit: string;
    type: 'bar' | 'line';
    data: Array<{ value: string; datatime: string; }>
    name: string;
}): EChartsOption {

    const theme1 = [
        { offset: 0, color: '#FF544F' },
        { offset: 1, color: '#FAD126' }
    ]

    const theme2 = [
        { offset: 0, color: '#A541FF' },
        { offset: 1, color: '#3464FF' }
    ]
    
    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            renderMode: 'richText'
        },
        grid: {
            left: 40,
            top: 25,
            bottom: 20,
            right: 10,
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
            data: config.data.map(i => i.datatime)
        },
        yAxis: {
            type: 'value',
            name: config.unit,
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
                lineStyle: {
                    color: "#E8E8E8"
                }
            },
            axisTick: { show: false },
        },
        series: [
            {
                name: config.name,
                type: config.type,
                data: config.data.map(i => i.value),
                smooth: true,
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
                        colorStops: config.name === '公司合计' && theme1 || theme2,
                        global: false // 缺省为 false
                    },
                },
                barMaxWidth: 15,
                itemStyle: {
                    normal: {
                        barBorderRadius: [2, 2, 0, 0],
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                            config.name === '公司合计' && theme1 || theme2,            //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                        )
                    }
                }
            }
        ]
    } as EChartsOption;
    return option;
}