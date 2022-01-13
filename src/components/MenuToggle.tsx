import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 89.41176470588236%)"
    strokeLinecap="round"
    {...props}
  />
);

const Btn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.main};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Svg = styled.svg`
  fill: #fff;
`;

export const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <Btn onClick={toggle}>
    <Svg width="23" height="23" viewBox="0 0 21 21">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </Svg>
  </Btn>
);
