import { EChartsOption } from 'echarts';

export function getEasyOptions(): EChartsOption {
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
        xAxisData.push('category' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    const option: EChartsOption = {
        legend: {
            data: ['bar', 'bar2'],
            align: 'left',
        },
        grid: {
            right: 10,
            bottom: 40,
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
                show: false,
            },
        },
        yAxis: {},
        series: [
            {
                name: 'bar',
                type: 'bar',
                data: data1,
                animationDelay: (idx: number) => idx * 10,
            },
            {
                name: 'bar2',
                type: 'bar',
                data: data2,
                animationDelay: (idx: number) => idx * 10 + 100,
            },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => idx * 5,
    };

    return option
}

export function getDynamicOptions(data: any): EChartsOption {


    const option: EChartsOption = {
        grid: {
            left: 50,
            right: 30,
            top: 20,
            bottom: 40,
        },
        tooltip: {
            trigger: 'axis',
            renderMode: 'richText',
            formatter: (params: any) => {
                params = params[0];
                const date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: true
            }
        },
        series: [{
            name: 'Mocking Data',
            type: 'line',
            showSymbol: false,
            data
        }]
    };

    return option;
}
export function getLineptions(): EChartsOption {
    /** https://echarts.apache.org/examples/zh/editor.html?c=line-stack */

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            renderMode: 'richText'
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    return option;
}