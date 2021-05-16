import React from "react";
import Badge from "@material-ui/core/Badge";
import "./SingleContent.css";

import { img_300, unavailablePoster } from "../../config/config";
import formatDate from "../../utils/formatDate";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <div className="media">
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailablePoster}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{formatDate(date)}</span>
      </span>
    </div>
  );
};

export default SingleContent;
