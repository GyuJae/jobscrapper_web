import { motion, useCycle } from "framer-motion";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MenuToggle } from "./MenuToggle";
import SerachForm from "./SerachForm";

const Container = styled(motion.header)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 50px;
  font-weight: 700;
  padding: 20px 0px;
  cursor: pointer;
  position: relative;
`;

const H1 = styled.h1`
  margin-bottom: 20px;
`;

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const isHome = pathname === "/";
  return (
    <Container initial={false} animate={isOpen ? "open" : "closed"}>
      <MenuToggle toggle={toggleOpen} />
      <H1 onClick={() => navigate("/")}>Job Scrapper</H1>
      {isOpen && <SerachForm isOpen={isOpen} />}
    </Container>
  );
};

export default Header;
