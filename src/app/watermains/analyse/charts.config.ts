import { EChartsOption } from 'echarts';

export function getLineptions(data: Array<{ minute: string, value: string }>): EChartsOption {
    /** https://echarts.apache.org/examples/zh/editor.html?c=line-stack */

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            renderMode: 'richText',
        },
        grid: { left: 5, top: '15%',right:10, bottom: 5,containLabel:true },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: { show: false },//去除网格线
            axisLine: { lineStyle: { color: "#BDBDBD" } },
            data: data.map(i => i.minute)
        },
        yAxis: {
            axisLine: { show: false, lineStyle: { color: "#BDBDBD" } },
            axisLabel: { color: '#BDBDBD' },
            splitLine: { lineStyle: { color: '#BDBDBD', type: 'dotted' } },
        },
        series: [
            {
                type: 'line',
                stack: 'Total',
                data: data.map(i => i.value),
                showSymbol: false,
                lineStyle: { color: '#FF8929', width: 0.5 },
                itemStyle: { color: "#FF8929" },
                areaStyle: { color: "#FF8929", opacity: 0.1 }
            }
        ]
    };
    return option;
}