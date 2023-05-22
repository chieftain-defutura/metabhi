import React from "react";
import PropTypes from "prop-types";

export default function Icon(props) {
  return (
    <img
      src={props.src}
      style={{ color: props.color, width: props.size, height: props.size, background: props.background }}
    />
  );
}

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired
};

Icon.defaultProps = {
  color: "white",
  size: 32,
  background: "rgba(0,0,0,0.5)"
};
