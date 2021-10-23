import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, } from '@mui/material';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { getAvailableTables, getDoneOrders, getWaitingOrders } from '../reducers/restaurantReducer';
import WaitingOrdersList from './common/WaitingOrdersList';
import { writeServedOrders } from '../lib/bussinessLogic';

const Container = styled.div`
  width: 30%;
  padding: 20px 0 0 15px;
  border: 1px solid #efefef;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 22px;
`;

const WaitingList = styled.div`
  height: 530px;
  overflow: auto;
`;

const LinkedListItemText = styled(ListItemText)`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  
  .MuiTypography-root {
    color: blue;
  }
`;

const RestaurantStatus = () => {
    const waitingOrders = useSelector(getWaitingOrders);
    const availableTables = useSelector(getAvailableTables);
    const doneOrders = useSelector(getDoneOrders);

    const handleOnClickServedOrders = () => {
        writeServedOrders(doneOrders);
    }

    return (
        <Container>
            <Title>Restaurant Status</Title>
            <div>
            <List sx={ { width: '100%', maxWidth: 360, bgcolor: 'background.paper' } }>
                <WaitingList>
                <ListItem>
                    <ListItemAvatar>
                        <HourglassEmptyIcon/>
                    </ListItemAvatar>
                    <ListItemText primary="Orders waiting #" secondary={ waitingOrders?.length }/>
                </ListItem>
                { waitingOrders?.map(order => <WaitingOrdersList key={ order.Mobile } order={ order }/>) }
                </WaitingList>
            </List>
            <List sx={ { width: '100%', maxWidth: 360, bgcolor: 'background.paper' } }>
                <div style={ { display: 'flex' } }>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FreeBreakfastIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Available tables #" secondary={ availableTables?.length }/>
                    </ListItem>
                    <ListItem onClick={ handleOnClickServedOrders }>
                        <ListItemAvatar>
                            <Avatar>
                                <FastfoodIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <LinkedListItemText primary="Served Orders #" secondary={ doneOrders?.length }/>
                    </ListItem>
                </div>
            </List>
            </div>
        </Container>
    );
}

export default RestaurantStatus;