import tables from '../../data/floor.json';
import orders from '../../data/orders.json';

import { CLEAR_TABLE, FETCH_ORDERS, FETCH_TABLES, SEAT_TABLE } from './actionTypes';

export const fetchTables = () => {
    return {
        type: FETCH_TABLES,
        payload: tables,
    }
}

export const fetchOrders = () => {
    return {
        type: FETCH_ORDERS,
        payload: orders,
    }
}

export const seatTable = (table, order) => {
    return {
        type: SEAT_TABLE,
        payload: { table, order },
    }
}

export const clearTable = (table, order) => {
    return {
        type: CLEAR_TABLE,
        payload: { table, order },
    }
}