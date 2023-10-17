export function optionsToObject(items: any[]) {
    const obj: { [key: string]: any } = {};
    items.forEach((item) => {
        obj[item.value] = item.label;
    });
    return obj;
}