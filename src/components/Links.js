import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { url: "/search", text: "🔎 All" },
  { url: "/image", text: "📷 Images" },
  { url: "/news", text: "📰 News" },
  { url: "/video", text: "📺 Videos" },
];

const activeStyle = {
  // textDecoration: "underline",
  color: "rgb(29 78 216)",
  borderColor : "rgb(29 78 216)",
  borderBottomWidth : "2px",
  paddingBottom : "10px"
};

// eslint-disable-next-line
const activeDarkStyle = {
  color: "rgb(147 197 253)",
  borderColor : "rgb(147 197 253)",
  borderBottomWidth : "2px",
  paddingBottom : "10px"
};

const Links = () => {
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }, index) => (
        <NavLink
          key={index}
          to={url}
          style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            className="m-2 mb-0 pb-2"
        // activeClassName="m-2 mb-0 text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-3"
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default Links;
