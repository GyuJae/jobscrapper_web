import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getJobs, JobResult } from "../apis/getJobs";
import Job from "../components/Job";
import Loading from "../components/Loading";
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

const LoadingContainer = styled.div`
  padding: 30px 0px;
`;

const More = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: ${(props) => props.theme.jobWidth};
  &:hover {
    text-decoration: underline;
  }
`;

const Result = () => {
  const selectedSite = useRecoilValue(siteState);
  const client = useQueryClient();
  const { keyword } = useParams<{ keyword: string }>();
  const { isLoading, isError, error, data } = useQuery<JobResult>("jobs", () =>
    getJobs(keyword as string)
  );
  const navigate = useNavigate();

  const onClickMore = () => {
    navigate(`/${keyword}/${selectedSite}`);
  };

  useEffect(() => {
    client.refetchQueries(["jobs", "sites"]);
  }, [client, keyword]);

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loading loading={isLoading} size={20} />
        </LoadingContainer>
      </Container>
    );
  }
  if (isError) {
    if (error === "Missing queryFn") {
      return (
        <Container>
          <LoadingContainer>
            <Loading loading={isLoading} size={20} />
          </LoadingContainer>
        </Container>
      );
    }
    return (
      <Container>
        <Error>Error {error}</Error>
      </Container>
    );
  }

  return (
    <Container>
      <Header count={(keyword?.length as number) + 1}>
        {keyword?.toUpperCase()} ({data?.totalJobs})
      </Header>
      <JobsContainer>
        <Sites allJobsCount={data?.totalJobs} />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {data?.jobs[selectedSite].slice(0, 20).map((job) => (
              <Job key={job.id} {...job} />
            ))}
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {data?.jobs[selectedSite] &&
              data?.jobs[selectedSite].length >= 20 && (
                <More onClick={onClickMore}> 더 보기</More>
              )}
          </motion.div>
        </AnimatePresence>
      </JobsContainer>
    </Container>
  );
};

export default Result;
