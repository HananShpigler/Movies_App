import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Search = () => {
  const [searchType, setSearchType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const getSearch = async () => {
    // Preventing api call when searchText is empty
    if (searchText !== "" && searchText !== " ") {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${
            searchType ? "tv" : "movie"
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=${currentPage}&include_adult=false`
        );
        setContent(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    getSearch();
    // eslint-disable-next-line
  }, [searchType, currentPage]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={getSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          centered={true}
          value={searchType}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newVal) => {
            setSearchType(newVal);
            setCurrentPage(1);
          }}
          style={{ paddingBottom: 20 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content.length > 0 ? (
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={searchType ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))
        ) : searchType === 0 ? (
          <h2>No Movies Found</h2>
        ) : (
          <h2>No Series Found</h2>
        )}
      </div>
      {totalPages > 1 && (
        <CustomPagination
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default Search;
