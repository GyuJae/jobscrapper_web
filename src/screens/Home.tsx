import React from "react";
import styled from "styled-components";
import SerachForm from "../components/SerachForm";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Container>
      <SerachForm isOpen={true} />
    </Container>
  );
};

export default Home;
