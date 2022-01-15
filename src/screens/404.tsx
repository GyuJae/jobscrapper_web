import React from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0px;
  font-size: 20px;
  font-weight: 700;
`;

const NotFound = () => {
  return <Container>This Page not found.</Container>;
};

export default NotFound;
