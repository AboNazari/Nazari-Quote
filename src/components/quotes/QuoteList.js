import { Fragment } from "react";
import { useHistory, useLocation } from "react-router";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };
  const history = useHistory();
  const location = useLocation();

  const quoteParams = new URLSearchParams(location.search);
  const isSortingAscending = quoteParams.get("sort") === "asc";

  const onSortHandler = () => {
    // can add query routes with a cleaner synthax in this way
    history.push({
      pathname: `${location.pathname}`,
      search: `?sort=${isSortingAscending ? "des" : "asc"}`,
    });
    // history.push(`${location.pathname}?sort=${isSortingAscending ? "des" : "asc"}`);
  };

  const sortedquotes = sortQuotes(props.quotes, isSortingAscending);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={onSortHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedquotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
