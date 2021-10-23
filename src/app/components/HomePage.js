import React, { useEffect } from 'react';

import styled from 'styled-components';

import RestaurantStatus from './RestaurantStatus';
import Floor from './Floor';
import useActions from '../hooks/useActions';
import { fetchTables, fetchOrders } from '../actions/restaurantActions';

const Container = styled.div`
  justify-content: center;
  margin: 20px 0;
`;

const Title = styled.span`
  font-size: 34px;
  font-family: cursive;
`;

const Restaurant = styled.div`
  display: flex;
  margin: 15px 0;
  background: white;
  border: 1px solid #efefef;
  border-radius: 10px;
`;

const HomePage = () => {
    const actions = useActions({ fetchTables, fetchOrders });

    useEffect(() => {
        actions.fetchTables();
        actions.fetchOrders();
    }, [actions]);

    return (
        <Container>
            <Title>Ilay's Restaurant</Title>
            <Restaurant>
                <RestaurantStatus/>
                <Floor/>
            </Restaurant>
        </Container>
    );
};

export default HomePage;