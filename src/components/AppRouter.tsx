import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Result from "../screens/Result";
import Layout from "./Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:keyword" element={<Result />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
