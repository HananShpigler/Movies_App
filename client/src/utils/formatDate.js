const formatDate = (date) => {
  const datePart = date.match(/\d+/g),
    year = datePart[0],
    month = datePart[1],
    day = datePart[2];

  return day + "." + month + "." + year;
};

// export const utils = { formatDate };
export default formatDate;
