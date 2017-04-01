import moment from "moment";

export const dateToString = (date) => moment(date).format("YYYY-MM-DD");
export const stringToDate = (str) => str ? new Date(str) : undefined;
export const originally = (val) => val;
export const arrToString = (arr) => arr && arr.length > 0 ? arr.join(";") : "";
export const stringToArr = (str) => str ? str.split(";") : [];
export const arrToLine = (arr) => arr && arr.length > 0 ? arr.join("\n") : "";
export const lineToArr = (str) => str ? str.split("\n") : [];
export const convertProp = (propName, value) => ({ [propName]: value });
export const stringToNumber = (str) => {
    const num = parseFloat(str, 10);
    return Number.isNaN(num) ? "" : num;
};
export const compareObjectWithProps = (p1, p2, props) => {
    if (p1 === null && p2 !== null) {
        return false;
    }

    if (p1 !== null && p2 === null) {
        return false;
    }

    if (p1 !== null && p2 !== null) {
        if (!props || props.length === 0) {
            return p1 === p2;
        } else {
            return props.reduce((results, prop) => {
                results = results && (p1[prop] === p2[prop] || (isNaN(p1[prop]) && isNaN(p2[prop])));
                return results;
            }, true);
        }
    }

    return true;
};