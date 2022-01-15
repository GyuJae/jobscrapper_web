import { motion } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getSitesImage, IGetSitesImageResult } from "../apis/getSiteImage";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Container = styled(motion.main)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  flex-direction: column;
`;

const SiteListContainer = styled(motion.div)`
  max-width: ${(props) => props.theme.jobWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  flex-wrap: wrap;
`;

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LoadingContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
`;

const SiteImage = styled(motion.img)`
  width: 200px;
  border-radius: 15px;
  margin-right: 20px;
  object-fit: contain;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Home = () => {
  const { isLoading, isError, error, data } = useQuery<IGetSitesImageResult>(
    ["sites", "image"],
    getSitesImage
  );

  if (isLoading) {
    return (
      <SiteListContainer>
        <LoadingContainer>
          <Loading loading={true} size={25} />
        </LoadingContainer>
      </SiteListContainer>
    );
  }

  if (isError) {
    return (
      <SiteListContainer>
        <Error error={error} />
      </SiteListContainer>
    );
  }

  return (
    <Container initial="hidden" animate="visible" variants={variants}>
      <SiteListContainer>
        {data?.sites.map((site) => (
          <SiteImage
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            key={site.site}
            src={site.url}
          />
        ))}
      </SiteListContainer>
    </Container>
  );
};

export default Home;
