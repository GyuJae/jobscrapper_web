import { motion } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getSites } from "../apis/getSites";
import { siteState } from "../providers/site.provider";

const Container = styled.div`
  max-width: ${(props) => props.theme.jobWidth};
  padding: 20px;
  display: flex;
  justify-content: space-around;
`;

const Site = styled.div`
  cursor: pointer;
  position: relative;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 1px;
  background: ${(props) => props.theme.color.accent};
`;

const Sites = () => {
  const [siteValue, setSiteValue] = useRecoilState(siteState);
  const { isLoading, isError, error, data } = useQuery<{
    success: boolean;
    sites: string[];
  }>("sites", getSites);
  if (isLoading) {
    <Container>loading...</Container>;
  }

  if (isError) {
    return <Container>Error : {error}</Container>;
  }
  return (
    <Container>
      <Site onClick={() => setSiteValue("All")}>
        All
        {siteValue === "All" ? <Underline layoutId="underline" /> : null}
      </Site>
      {data?.sites.map((site, index) => (
        <>
          <Site onClick={() => setSiteValue(site)} key={index}>
            {site}
            {siteValue === site ? <Underline layoutId="underline" /> : null}
          </Site>
        </>
      ))}
    </Container>
  );
};

export default Sites;
