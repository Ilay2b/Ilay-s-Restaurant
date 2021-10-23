import React from "react";
import styled from 'styled-components';

import Tables from './Tables';

const Container = styled.div`
  width: 70%;
  height: 700px;
`;

const Title = styled.div`
  font-size: 22px;
  margin-top: 20px;
`;

const Floor = () => {
    return (
        <Container>
            <Title>Floor</Title>
            <Tables/>
        </Container>
    );
}

export default Floor;