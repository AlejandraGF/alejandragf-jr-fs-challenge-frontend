import React, { useState } from "react";
import PropTypes from "prop-types";
import { apiURL } from "./App";
import copyIcon from "./copy-icon.png"

const UrlItem = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${apiURL}/${url.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <tr>
      <td>{url.title}</td>
      <td>{url.click_count}</td>
      <td>{url.full_url}</td>
      <td>
        <div style={{ display: "flex", alignItems: "center" }}>
        <a href={`${apiURL}/${url.id}`}>{apiURL}/{url.id}</a>
          <button onClick={copyToClipboard} style={{ marginLeft: "5px", backgroundColor:"transparent",border:"none",cursor:"pointer" }}>
            {copied ? "Copied!" : <img src={copyIcon} alt="Copy" style={{ width: "20px", height: "20px" }}/>}
          </button>
        </div>
      </td>
      <td>{new Date(url.created_at).toLocaleString()}</td>
      <td>{new Date(url.updated_at).toLocaleString()}</td>
    </tr>
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
