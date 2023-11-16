import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Background = styled.div`
  display: flex;
  background-color: #3E5151;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const WelcomeText1 = styled.p`
  font-size: 100px;
  font-weight: 100;
  line-height: 0.3;
  letter-spacing: 30px;
  color: white;
`;

const WelcomeText2 = styled.p`
  font-size: 100px;
  font-weight: 900;
  line-height: 0.3;
  color: #DECBA4;
`;

const Enter = styled(NavLink)`
  font-size: 45px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  color: white;
  border: 3px solid white;
  padding: 15px;
  display: inline-block; 
  border-radius: 10px;
  margin-top: -20px;

  &:hover{
    border: 3px solid #DECBA4;
    color: #DECBA4;
  }

`

const Welcome = () => {
  return(
    <Background>
      <Container>
        <WelcomeText1>Welcome To</WelcomeText1>
        <WelcomeText2>TIC.TAC,TOE</WelcomeText2>
        <Enter to='game'>입장하기</Enter>
      </Container>
    </Background>
  );
};

export default Welcome;