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
  border: 1.5px solid ${(props) => props.theme.color.sub};
  padding: 20px;
  border-radius: 10px;
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
  font-size: 20px;
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
  const client = useQueryClient();
  const onSubmit: SubmitHandler<Inputs> = ({ keyword }) => {
    toggleOpen(false);
    client.refetchQueries(["jobs", "sites"]);
    navigate(keyword);
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
