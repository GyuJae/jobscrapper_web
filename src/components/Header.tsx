import { motion, useCycle } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
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
`;

const H1 = styled.h1`
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <Container initial={false} animate={isOpen ? "open" : "closed"}>
      <Title>
        <MenuToggle toggle={toggleOpen} />
        <H1 onClick={() => navigate("/")}>Job Scrapper</H1>
      </Title>
      {isOpen && <SerachForm isOpen={isOpen} toggleOpen={toggleOpen} />}
    </Container>
  );
};

export default Header;
