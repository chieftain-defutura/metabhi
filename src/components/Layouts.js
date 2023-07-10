import React from "react"
import Layout from "./Layout/Layout"
import PropTypes from "prop-types"

const Layouts = ({ children }) => {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  )
}

Layouts.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layouts
