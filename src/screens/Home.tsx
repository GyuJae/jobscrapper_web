import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Inputs = {
  keyword: string;
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
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

const Submit = styled.button`
  all: unset;
  border: 1.5px solid;
  padding: 5px 10px;
  margin-top: 15px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Error = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.color.accent};
`;

const Home = () => {
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
    <Container>
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

export default Home;
