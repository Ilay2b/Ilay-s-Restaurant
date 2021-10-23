import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styled from "styled-components";

import floor from '../../data/floor.json';
import useActions from '../hooks/useActions';
import { clearTable, seatTable } from '../actions/restaurantActions';
import { getAvailableTables, getWaitingOrders } from '../reducers/restaurantReducer';
import { serveWaitingList, } from '../lib/bussinessLogic';
import Table from './common/Table';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 60px;
  
  & > * {
    font-size: 14px;
  }
`;

const Tables = () => {
    const actions = useActions({ seatTable, clearTable });
    const availableTables = useSelector(getAvailableTables);
    const waitingOrders = useSelector(getWaitingOrders);

    useEffect(() => {
        serveWaitingList(waitingOrders, availableTables, actions);
    }, [waitingOrders, availableTables, actions]);

    return (
        <Container>
            { floor?.map(table => {
                return (
                    <Table key={ table.Table } table={ table }/>
                )
            }) }
        </Container>
    );
};

export default Tables;