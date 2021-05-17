import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setCurrentPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setCurrentPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setCurrentPage(1);
  };

  const getGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    getGenres();

    // Canceling API call
    return () => {
      setGenres({});
    }; // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            key={genre.id}
            style={{ margin: 2 }}
            size="small"
            color="primary"
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            key={genre.id}
            style={{ margin: 2 }}
            size="small"
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
