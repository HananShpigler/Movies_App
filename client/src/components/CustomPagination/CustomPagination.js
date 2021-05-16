import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ setCurrentPage, totalPages = 10 }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={totalPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hidePrevButton
          hideNextButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
