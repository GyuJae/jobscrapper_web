import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  padding: 20px 0px;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  return <Container onClick={() => navigate("/")}>Job Scrapper</Container>;
};

export default Header;
