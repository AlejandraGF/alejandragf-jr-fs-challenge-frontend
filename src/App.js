import React, { useEffect, useState } from "react";
import './App.css';
import UrlItem from "./UrlItem";

export const apiURL = "http://localhost:3000";

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState(""); 

  const fetchURLs = () => {
    fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => setUrls(data.urls))
    .catch((error) => {
      setError("Error fetching URLs");
      console.error("Error fetching URLs:", error);
    });
  };

  useEffect(() => {
    fetchURLs();
  }, []);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    setError("");
    setShortenedUrl("");
    if (url) {
      fetch(`${apiURL}/short_urls.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          full_url: url,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 422) {
              throw new Error("Invalid URL");
            } else {
              throw new Error("Network response was not ok");
            }
          }
          return response.json();
        })
        .then((data) => {
          fetchURLs();
          setShortenedUrl(apiURL.concat("/", data.short_code));
        })
        .catch((error) => {
          if (error.message === "Invalid URL") {
            setError("The URL provided is not valid");
          } else {
            setError("Error shortening URL");
          }
        });
    } else {
      setError("URL cannot be empty");
    }
  };

  return (
    <div className="App">
      <div className="card-container">
      <h1 className="title">URL Shortener</h1>
      <span className="input-text">Enter your long URL:</span>
      
        <div className="input-wrapper">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
            className="input-field"
          />
        
        <button onClick={handleSubmit} className="submit-button">
          Shorten
        </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {shortenedUrl && (
          <div className="shortened-url">
            <p>Your shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></p>
          </div>
        )}
      </div>
      <hr className="divider" />
      <div>
        <table className="url-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Clicks</th>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {urls.slice(0, 100).map((url) => (
              <UrlItem key={url.id} url={url} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
