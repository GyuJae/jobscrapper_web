import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getJobs, JobResult } from "../apis/getJobs";
import Job from "../components/Job";
import Loading from "../components/Loading";
import { siteState } from "../providers/site.provider";
import { getSites } from "../apis/getSites";

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
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 100px 0px;
`;

const SiteContainer = styled.div`
  max-width: ${(props) => props.theme.jobWidth};
  padding: 20px;
  display: flex;
  justify-content: space-around;
`;

const Site = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 1.5px;
  background: ${(props) => props.theme.color.accent};
`;

const JobCount = styled(motion.div)`
  font-size: 15px;
  font-weight: 700;
  margin-left: 5px;
`;

const Pagination = styled(motion.div)`
  font-size: 20px;
  font-weight: 700;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: ${(props) => props.theme.jobWidth};
`;

const PaginationArrow = styled(motion.div)`
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Page = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

const Result = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const [siteRecoilValue, setSiteValue] = useRecoilState(siteState);
  const { isLoading, isError, error, data } = useQuery<JobResult>("jobs", () =>
    getJobs(keyword || "")
  );

  const {
    isLoading: siteLoading,
    isError: siteIsError,
    error: siteError,
    data: siteData,
  } = useQuery<{
    success: boolean;
    sites: string[];
  }>("sites", getSites);

  if (isLoading || siteLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loading loading={isLoading} size={20} />
        </LoadingContainer>
      </Container>
    );
  }
  if (isError || siteIsError) {
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
        <Error>
          Error {error} {siteError}
        </Error>
      </Container>
    );
  }

  return (
    <Container>
      <Header count={(keyword?.length as number) + 2}>
        {keyword?.toUpperCase()} ({data?.totalJobs})
      </Header>
      <JobsContainer>
        <SiteContainer>
          {siteData?.sites.map((site, index) => (
            <Site
              onClick={() => setSiteValue({ site: site, page: 0 })}
              key={index}
            >
              {site}
              {siteRecoilValue.site === site ? (
                <Underline layoutId="underline" />
              ) : null}
              <JobCount>({data?.jobs && data?.jobs[site].length})</JobCount>
            </Site>
          ))}
        </SiteContainer>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {data?.jobs &&
              Object.keys(data?.jobs).map((siteValue) =>
                siteValue === siteRecoilValue.site
                  ? data.jobs[siteValue]
                      .slice(
                        siteRecoilValue.page * 20,
                        siteRecoilValue.page * 20 + 20
                      )
                      .map((job) => <Job job={job} key={job.id} />)
                  : null
              )}
            <Pagination>
              {siteRecoilValue.page > 0 ? (
                <PaginationArrow
                  onClick={() => {
                    setSiteValue({
                      site: siteRecoilValue.site,
                      page: siteRecoilValue.page - 1,
                    });
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Prev
                </PaginationArrow>
              ) : (
                <div></div>
              )}
              <Page>{siteRecoilValue.page + 1}</Page>
              {data?.jobs &&
              siteRecoilValue.page <
                Math.floor(data?.jobs[siteRecoilValue.site].length / 20) ? (
                <PaginationArrow
                  onClick={() => {
                    setSiteValue({
                      site: siteRecoilValue.site,
                      page: siteRecoilValue.page + 1,
                    });
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Next
                </PaginationArrow>
              ) : (
                <div></div>
              )}
            </Pagination>
          </motion.div>
        </AnimatePresence>
      </JobsContainer>
    </Container>
  );
};

export default Result;
