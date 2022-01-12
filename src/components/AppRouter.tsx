import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Result from "../screens/Result";
import SiteDetail from "../screens/SiteDetail";
import Layout from "./Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:keyword" element={<Result />} />
          <Route path="/:keyword/:site" element={<SiteDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
