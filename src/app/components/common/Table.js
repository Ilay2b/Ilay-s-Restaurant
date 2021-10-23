import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Box, Popper } from '@mui/material';

import { getTableOrdersObj } from '../../reducers/restaurantReducer';
import { useSelector } from 'react-redux';
import useDebouncedFunction from '../../hooks/useDebouncedFunction';
import { orderTimes } from '../../lib/bussinessLogic';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 60px;
  
  & > * {
    font-size: 14px;
  }
`;

const OneTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: ${ props => props.color ? props.color : '#C89D7C' };
  border-radius: 50%;
  margin: 20px;
`;

const TwoTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 90px;
  background: ${ props => props.color ? props.color : '#C89D7C' };
  border-radius: 100px / 50px;
  margin: 20px;
`;

const ThreeTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: ${ props => props.color ? `120px solid ${props.color}` : '120px solid #C89D7C' };
  margin: 20px;
`;

const FourTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: ${ props => props.color ? props.color : '#C89D7C' };
  margin: 20px;
`;

const FivePlusTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100px;
  box-sizing: content-box;
  border-width: 66px 18px 0;
  border-style: solid;
  border-color: ${ props => props.color ? props.color : '#C89D7C' } transparent;
  bottom: -80px;

  :before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: -100px;
    left: -19px;
    border-width: 0px 69px 35px;
    border-style: solid;
    border-color: transparent transparent ${ props => props.color ? props.color : '#C89D7C' };
  }
`;

const FivePlusTableId = styled.div`
  position: absolute;
  top: -65px;
`;

const ThreeTableId = styled.div`
  position: relative;
  bottom: -84px;
`;

const GetTable = ({ table, color }) => {
    const diners = table.Diners;
    const tableId = table.Table;
    switch (true) {
        case diners === 1:
            return (<OneTable color={ color }>Table: { tableId }</OneTable>);
        case diners === 2:
            return (<TwoTable color={ color }>Table: { tableId }</TwoTable>);
        case diners === 3:
            return (<ThreeTable color={ color }><ThreeTableId>Table: { tableId }</ThreeTableId></ThreeTable>);
        case diners === 4:
            return (<FourTable color={ color }>Table: { tableId }</FourTable>);
        case diners >= 5:
            return (<FivePlusTable color={ color }><FivePlusTableId>Table: { tableId }</FivePlusTableId></FivePlusTable>);
        default:
            return;
    }
}

const Table = ({ table, }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = useState();
    const open = Boolean(anchorEl);
    const id = open ? 'popper' : undefined;
    const tableOrders = useSelector(getTableOrdersObj);
    const tableOrder = tableOrders[table.Table];
    const setOrangeColor = useDebouncedFunction(() => setColor('orange'), orderTimes.aboutToExpiredOrder);
    const setDefaultColor = useDebouncedFunction(() => setColor('#C89D7C'), orderTimes.completedOrder);

    useEffect(() => {
        if (tableOrder) {
            setColor('#F64D4D');
            setOrangeColor();
            setDefaultColor();
        }
    }, [tableOrder]);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
        <Container onClick={ handleClick }>
                { tableOrder && <Popper id={id} open={open} anchorEl={anchorEl}>
                    <Box
                        sx={{
                            border: 1, p: 1, bgcolor: 'background.paper', position: "relative", mt: "10px",
                        "&::before": {
                            backgroundColor: "white",
                            borderTop: '1px solid black',
                            borderLeft: '1px solid black',
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: 12,
                            height: 12,
                            top: -6,
                            transform: "rotate(45deg)",
                            left: "calc(50% - 6px)",
                        }}}>
                        <div>Mobile: { tableOrder?.Mobile }</div>
                        <div>Start time: { tableOrder?.startStamp }</div>
                        <div>Diners: { tableOrder?.Diners }</div>
                    </Box>
                </Popper> }
            <GetTable table={ table } color={ color }/>
        </Container>
    );
}

export default Table;