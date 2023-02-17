import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://seo-api.p.rapidapi.com/v1";

const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // /videos, /search, /images
  const getResults = (type) => {
    setLoading(true);

    axios
      .get(`${baseUrl}${type}`, {
        method: "GET",
        // params: {
        // num: "20",
        // },
        headers: {
          // "X-Proxy-Location": "EU",
          // "X-User-Agent": "desktop",
          "X-RapidAPI-Key":
            process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "seo-api.p.rapidapi.com",
        },
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data;

        if (type.includes("/search")) setResults(data.results);
        else if (type.includes("/image")) setResults(data.image_results);
        else if (type.includes("/video")) setResults(data.results);
        else if(type.includes("/news")) setResults(data.entries);

        setLoading(false);

        console.log("DATA => ");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultsContext = () => useContext(ResultContext);

export default ResultContextProvider;
