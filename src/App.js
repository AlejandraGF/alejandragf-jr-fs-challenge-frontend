import React, { useEffect, useState } from "react";
import './App.css';
import UrlItem from "./UrlItem";

export const apiURL = "http://localhost:3000";

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

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
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          fetchURLs();
          setUrl("");
          setError("");
        })
        .catch((error) => {
          setError("Error shortening URL");
          console.error("Error shortening URL:", error);
        });
    } else {
      setError("URL cannot be empty");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL"
            className="input-field"
          />
          <button onClick={handleSubmit} className="submit-button">
            Shorten URL
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
        <hr className="divider" />
        <div>
          <ul className="url-list">
            {urls.slice(0, 100).map((url) => (
              <UrlItem key={url.id} url={url} />
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
