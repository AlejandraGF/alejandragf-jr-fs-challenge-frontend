import React from "react";
import PropTypes from "prop-types";
import { apiURL } from "./App";

const UrlItem = ({ url }) => {
  return (
    <li
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <p><strong>{url.title}</strong> Clicks: <strong>{url.click_count}</strong></p>
      <p>Full URL: {url.full_url}</p>
      <p>Short URL: <a href={`${apiURL}/${url.id}`}>{apiURL}/{url.id}</a></p>
      <p>Created at: {new Date(url.created_at).toLocaleString()}</p>
      <p>Updated at: {new Date(url.updated_at).toLocaleString()}</p>
    </li>
  );
};

UrlItem.propTypes = {
  url: PropTypes.shape({
    id: PropTypes.number.isRequired,
    full_url: PropTypes.string.isRequired,
    title: PropTypes.string,
    click_count: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default UrlItem;
