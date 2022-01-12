import { motion } from "framer-motion";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
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
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  border: 1.5px solid;
  padding: 5px 10px;
  margin-top: 15px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Error = styled(motion.span)`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.color.accent};
`;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface ISearchForm {
  isOpen: boolean;
}

const SerachForm: React.FC<ISearchForm> = ({ isOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const client = useQueryClient();
  const onSubmit: SubmitHandler<Inputs> = ({ keyword }) => {
    navigate(keyword);
    client.fetchQuery("jobs");
  };
  return (
    <Container variants={variants} animate={isOpen ? "open" : "close"}>
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
