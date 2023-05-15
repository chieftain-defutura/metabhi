import React from "react";
import Layout from "./Layout/Layout";

const Layouts = ({ children }) => {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

export default Layouts;
