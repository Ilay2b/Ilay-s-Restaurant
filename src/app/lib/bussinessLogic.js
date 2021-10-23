import { arrToObjArrById } from '../utils';

const getAvailableConcatTables = (table, order, availableTables) => {
    let availableConcatTables = {};
    const availableTablesObj = arrToObjArrById(availableTables, 'Table');
    table.Concat.forEach(jt => {
        const concatTable = availableTablesObj[jt];
        if (concatTable?.Diners + table.Diners === order.Diners) {
            availableConcatTables = { ...availableConcatTables, concatTable };
        }
    });

    const availableConcatTablesArr = Object.values(availableConcatTables);
    const updatedArr = availableConcatTablesArr.length > 0 ? [...availableConcatTablesArr, table] : undefined;

    return updatedArr;
}

const serveOrder = (order, availableTables, actions) => {
    let tableFound = false;
    availableTables.some(table => {
            if (table.Diners === order.Diners) {
                actions?.seatTable([table], order);
                tableFound= true;
                setTimeout(function () {actions?.clearTable([table], order)}, orderTimes.completedOrder)
                return true;
            }
    });
    if (!tableFound) {
        availableTables.some(table => {
            if (table.Diners < order.Diners) {
                const availableConcatTables = getAvailableConcatTables(table, order, availableTables);
                if (availableConcatTables) {
                    actions?.seatTable(availableConcatTables, order);
                    setTimeout(function () {actions?.clearTable(availableConcatTables, order)}, orderTimes.completedOrder)
                    tableFound= true;
                    return true;
                }
            }
        });
    }
    return tableFound;
}

export const serveWaitingList = (waitingOrders, availableTables, actions) => {
    if (waitingOrders?.length > 0 && availableTables?.length > 0) {
        waitingOrders.some(order => serveOrder(order, availableTables, actions));
    };
};

export const writeServedOrders = (doneOrders) => {
    const fileName = "completed_orders";
    const json = JSON.stringify(doneOrders);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const orderTimes = {
    completedOrder: 90000,
    aboutToExpiredOrder: 60000,
}