import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./singleComicLayout.scss";
import { useQuery } from "@apollo/client";
import { FIND_ONE_COMIC } from "../../../gql/queries";
import Spinner from "../../spinner/Spinner";
import AppBanner from "../../appBanner/AppBanner";
import ErrorMessage from "../../errorMessage/ErrorMessage";

const SingleComicLayout = () => {
  const { comicId } = useParams();
  const { loading, error, data } = useQuery(FIND_ONE_COMIC, {
    variables: { findOneComicsId: comicId },
  });

  const element = loading ? <Spinner /> : <View film={data.findOneComics
  } />;
  const ifError = error ? <ErrorMessage /> : null;

  return (
    <>
      <AppBanner />
      {ifError}
      {element}
    </>
  );
};

const View = ({ film }) => {
  const { title, description, pageCount, thumbnail, language, price } = film;
  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${title} comics`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">Pages: {pageCount}p.</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicLayout;
