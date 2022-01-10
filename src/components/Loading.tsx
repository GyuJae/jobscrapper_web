import React from "react";
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";

interface ILoading {
  size: number;
    loading: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading: React.FC<ILoading> = ({ size,loading }) => {
  return (
    <Container>
      <MoonLoader color="#fff" loading={loading} size={size} />
    </Container>
  );
};

export default Loading;
