import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

import "./comicsList.scss";
import { useQuery } from "@apollo/client";
import { FIND_ALL_COMICS } from "../../gql/queries";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsList = () => {
  let counter = 8;
  const { loading, error, data, refetch } = useQuery(FIND_ALL_COMICS, {
    variables: { query: { skip: 0, take: counter } },
  });

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}$</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  const element = loading ? (
    <Spinner />
  ) : (
    renderItems(data.findAllComicss.items)
  );
  const ifError = error ? <ErrorBoundary /> : null;

  return (
    <div className="comics__list">
      {ifError}
      {element}
      <button
        style={{ display: loading ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => {
          counter += 8;
          refetch({ query: { skip: 0, take: counter } });
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
