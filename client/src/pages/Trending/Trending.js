import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";

import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Trending = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState([]);

  const getTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    getTrending();
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Trending;
