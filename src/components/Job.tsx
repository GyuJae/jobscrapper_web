import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { JobType } from "../apis/getJobs";

const Container = styled(motion.div)`
  width: ${(props) => props.theme.jobWidth};
  background-color: ${(props) => props.theme.color.sub};
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 17px 10px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
`;

const Link = styled(motion.a)`
  padding: 3px 0px;
  text-decoration: none;
`;

const Title = styled(motion.h2)`
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.color.main};
  &:hover {
    text-decoration: underline;
  }
`;

const Company = styled(motion.h3)`
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.color.main};
  margin-top: 5px;
`;

const Condition = styled(motion.h4)`
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  margin-top: 5px;
`;

const Site = styled(motion.h5)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.color.main};
`;

interface IJob {
  job: JobType;
}

const Job: React.FC<IJob> = ({
  job: { title, company, condition, url, site },
}) => {
  return (
    <Container
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={url} target="_blank">
        <Title>{title}</Title>
      </Link>
      <Company>{company}</Company>
      <Condition>{condition}</Condition>
      <Site>{site}</Site>
    </Container>
  );
};
export default Job;
