import { motion } from "framer-motion";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
type Inputs = {
  keyword: string;
};

const Container = styled(motion.main)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1.5px solid ${(props) => props.theme.color.sub};
  padding: 15px;
  border-radius: 5px;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Input = styled(motion.input)`
  border: none;
  outline: none;
  border-bottom: 2px solid white;
  width: 400px;
  height: 40px;
  font-size: 20px;
  background-color: ${(props) => props.theme.color.main};
  color: ${(props) => props.theme.color.sub};
  &:focus {
  }
`;

const Submit = styled(motion.button)`
  all: unset;
  padding: 7px 10px;
  margin-top: 15px;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => props.theme.color.sub};
  border-radius: 5px;
  color: ${(props) => props.theme.color.main};
`;

const Error = styled(motion.span)`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.color.accent};
`;

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

interface ISearchForm {
  isOpen: boolean;
  toggleOpen: any;
}

const SerachForm: React.FC<ISearchForm> = ({ isOpen, toggleOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = ({ keyword }) => {
    toggleOpen(false);
    navigate(keyword, { replace: true });
    window.location.reload();
  };
  return (
    <Container variants={sidebar} animate={isOpen ? "open" : "close"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("keyword", { required: true })}
          autoComplete="off"
        />
        <Submit type="submit">Search</Submit>
      </Form>
      {errors.keyword?.type === "required" && (
        <Error>Please enter a search term</Error>
      )}
    </Container>
  );
};

export default SerachForm;
