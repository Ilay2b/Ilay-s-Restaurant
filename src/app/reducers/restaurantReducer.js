import * as actionTypes from '../actions/actionTypes';
import { arrToObjArrById, getDateNow, getUniqueArray } from '../utils';

const initialState = {
    availableTables: [],
    waitingOrders: [],
    tableOrders: [],
    doneOrders: [],
}

const assignOrderTable =  (tables, order, state)  => {
    const tableIds = tables.map(t => t.Table);
    const now = getDateNow();
    const tableOrder = { ...order, Table: tableIds, startStamp: now };

    const updatedAvailableTables = state.availableTables.filter(t => {
        return tableIds.every(tId => tId !== t.Table);
    });

    const updatedWaitingOrders = state.waitingOrders.filter(o => o.Mobile !== order.Mobile);
    const orderAlreadyAssigned = state.tableOrders.find(o => o.Mobile === tableOrder.Mobile);
    const updatedTableOrders = !!orderAlreadyAssigned ? state.tableOrders : getUniqueArray([ ...state.tableOrders, tableOrder ]);

    return { updatedAvailableTables, updatedWaitingOrders, updatedTableOrders }
}

const clearTable = (table, order, state) => {
    let doneOrder = state.tableOrders.find(o => o.Mobile === order.Mobile);
    const now = getDateNow();
    doneOrder = { ...doneOrder, endStamp: now };
    const updatedAvailableTables = getUniqueArray([ ...state.availableTables, ...table ]);
    const updatedTableOrders = state.tableOrders.filter(o => o.Mobile !== order.Mobile);
    const updatedDoneOrders = getUniqueArray([ ...state.doneOrders, doneOrder ]);

    return { updatedAvailableTables, updatedDoneOrders, updatedTableOrders }
}

export default function restaurantReducer(state = initialState, action) {
    let data = {};
    switch (action.type) {
        case actionTypes.FETCH_TABLES:
            return {
                ...state,
                availableTables: action.payload,
            }
        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                waitingOrders: action.payload,
            }
        case actionTypes.SEAT_TABLE:
            data = assignOrderTable(action.payload.table, action.payload.order, state);
            return {
                ...state,
                availableTables: data.updatedAvailableTables,
                waitingOrders: data.updatedWaitingOrders,
                tableOrders: data.updatedTableOrders,
            }
        case actionTypes.CLEAR_TABLE:
            data = clearTable(action.payload.table, action.payload.order, state);
            return {
                ...state,
                availableTables: data.updatedAvailableTables,
                doneOrders: data.updatedDoneOrders,
                tableOrders: data.updatedTableOrders,
            }
        default:
            return state;
    }
}

const restaurant = state => state.restaurant;
export const getAvailableTables = state => restaurant(state).availableTables;
export const getWaitingOrders = state => restaurant(state).waitingOrders;
export const getDoneOrders = state => restaurant(state).doneOrders;
export const getTableOrdersObj = state => arrToObjArrById(restaurant(state).tableOrders, 'Table');
