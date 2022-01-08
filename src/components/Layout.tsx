import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  max-width: ${(props) => props.theme.basicWidth};
  margin: 0px auto;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
