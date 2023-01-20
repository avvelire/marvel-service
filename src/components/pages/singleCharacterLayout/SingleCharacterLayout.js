import "./singleCharacterLayout.scss";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FIND_ONE_CHAR } from "../../../gql/queries";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";

const SingleCharacterLayout = () => {
  const { charId } = useParams();
  const { loading, error, data } = useQuery(FIND_ONE_CHAR, {
    variables: { findOneCharacterId: charId },
  });

  const element = loading ? <Spinner /> : <View film={data.findOneCharacter} />;
  const ifError = error ? <ErrorMessage /> : null;

  return (
    <>
      {ifError}
      {element}
    </>
  );
};

const View = ({ film }) => {
  const { name, description, thumbnail } = film;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={`${name} page`} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
