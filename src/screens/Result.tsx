import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getJobs, JobResult } from "../apis/getJobs";
import Job from "../components/Job";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
`;

const Header = styled.div<{ count: number }>`
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid ${(props) => props.theme.color.accent};
  padding: 10px 0px;
  margin-bottom: 10px;
  width: ${(props) => `${props.count * 14}px`};
`;

const Error = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: red;
`;

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Result = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const { isLoading, isError, error, data } = useQuery<JobResult>("jobs", () =>
    getJobs(keyword as string)
  );

  if (isLoading) {
    return <Container>loading....</Container>;
  }
  if (isError) {
    return (
      <Container>
        <Error>Error {error}</Error>
      </Container>
    );
  }

  return (
    <Container>
      <Header count={keyword?.length as number}>
        {keyword?.toUpperCase()}
      </Header>
      <JobsContainer>
        {data?.jobs.map((job) => (
          <Job key={job.id} {...job} />
        ))}
      </JobsContainer>
    </Container>
  );
};

export default Result;
