/** 对象转下拉数组 */
export function objToOptions(data: { [key: string]: any }): Array<{ label: string; value: string }> {
    return Object.keys(data).map(i => ({
        value: i, label: data[i],
    }))
}