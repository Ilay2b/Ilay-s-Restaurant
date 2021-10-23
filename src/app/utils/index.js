import moment from 'moment';

export const objToArray = (obj) => {
    return Object.values(obj);
}

export const arrToObjArrById = (arr, key) => {
    const objArr = {};
    arr.forEach(val => {
        const keys = val[key].toString().split(',');
        return keys.forEach(k => objArr[k] = val)
    })
    return objArr;
}

export const getUniqueArray = (arr) => {
    return Array.from(new Set(arr));
}

export const getDateNow = () => {
    return new moment().format("DD.MM.YYYY HH:mm:ss");
}
