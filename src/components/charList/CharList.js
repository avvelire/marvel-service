import { useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
import { useQuery } from "@apollo/client";
import { FIND_ALL_CHARS } from "../../gql/queries";

const CharList = (props) => {
  let counter = 9;
  const { loading, error, data, refetch } = useQuery(FIND_ALL_CHARS, {
    variables: { query: { skip: 0, take: counter } },
  });

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };

      return (
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => (itemRefs.current[i] = el)}
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter") {
                props.onCharSelected(item.id);
                focusOnItem(i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  const element = loading ? (
    <Spinner />
  ) : (
    renderItems(data.findAllCharacters.items)
  );
  const ifError = error ? <ErrorMessage /> : null;

  return (
    <div className="char__list">
      {ifError}
      {element}
      <button
        className="button button__main button__long"
        style={{ display: loading ? "none" : "block" }}
        onClick={() => {
          counter += 9;
          refetch({ query: { skip: 0, take: counter } });
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
