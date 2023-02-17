import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useResultsContext } from "../contexts/ResultContextProvider";
import ReactPlayer from "react-player";

const Results = () => {
  // eslint-disable-next-line
  const { getResults, results, searchTerm, setSearchTerm, loading } =
    useResultsContext();

  const location = useLocation(); // images, news, videos

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/video") {
        getResults(`/video/q=${searchTerm}`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}`);
      }
    }
    // eslint-disable-next-line
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  console.log(location.pathname);

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap items-center justify-between space-y-6 sm:px-56">
          {results?.map((item, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a
                href={item?.link}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {/* {item?.link} */}
                <p className="text-lg dark:text-blue-500 text-blue-700">
                  {item?.title}
                </p>
                
              </a>
            </div>
          ))}
        </div>
      );
    case "/image":
      return (
        <div className="flex flex-wrap items-start justify-center">
          {results?.map(({ image, link }, index) => (
            <a
              className="sm:p3 p-5"
              href={link?.href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={image?.alt} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{link?.title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results.length > 0 ? (
            results.map(({ link, title, source }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg hover:underline dark:text-blue-500 text-blue-700">
                    {title}
                  </p>
                </a>
                <div className="flex gap-4">
                  <a href={source?.href} target="_blank" rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <h1>EMPTY FOR SEARCH NEWS</h1>
          )}
        </div>
      );
    case "/video":
      return (
        <div className="flex flex-wrap">
          {results?.map((item, index) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={item?.link}
                controls
                width="355px"
                height="200px"
              />
            </div>
          ))}
        </div>
      );
    default:
      return "ERROR";
  }
};

export default Results;
