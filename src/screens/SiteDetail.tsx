import React from "react";
import { useParams } from "react-router-dom";

interface IParams {
  keyword: string;
  site: string;
}

const SiteDetail = () => {
  const { keyword, site } = useParams<keyof IParams>();
  return (
    <div>
      {keyword} {site}
    </div>
  );
};

export default SiteDetail;
