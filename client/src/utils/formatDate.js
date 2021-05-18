const formatDate = (date) => {
  if (date !== undefined && date.length !== 0) {
    const datePart = date.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + "." + month + "." + year;
  }
};

export default formatDate;
