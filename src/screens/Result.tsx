import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getJobs, JobResult } from "../apis/getJobs";
import Job from "../components/Job";
import Sites from "../components/Sites";
import { siteState } from "../providers/site.provider";

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
  width: ${(props) => `${props.count * 20}px`};
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
  const selectedSite = useRecoilValue(siteState);
  const client = useQueryClient();
  const { keyword } = useParams<{ keyword: string }>();
  const { isLoading, isError, error, data } = useQuery<JobResult>("jobs", () =>
    getJobs(keyword as string)
  );

  useEffect(() => {
    client.refetchQueries(["jobs", "sites"]);
  }, [client, keyword]);

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
        <Sites />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {selectedSite === "All"
              ? data?.jobs
                  .slice(0, 20)
                  .map((job) => <Job key={job.id} {...job} />)
              : data?.jobs
                  .filter((job) => job.site === selectedSite)
                  .slice(0, 20)
                  .map((job) => <Job key={job.id} {...job} />)}
          </motion.div>
        </AnimatePresence>
      </JobsContainer>
    </Container>
  );
};

export default Result;
