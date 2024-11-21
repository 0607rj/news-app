import React, { useEffect, useState } from "react";
import NewsList from "./components/NewsList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 5;

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "api";
      const url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;

      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setLoading(false);
    };

    fetchNews();
  }, [searchQuery, currentPage]);

  return (
    <div className="App">
      <h1>News App</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <NewsList articles={articles} />
          <Pagination
            totalResults={totalResults}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
