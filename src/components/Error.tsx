import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: red;
`;

interface IError {
  error: unknown | string;
}

const Error: React.FC<IError> = ({ error }) => {
  return <Container>Error : {error}</Container>;
};

export default Error;
