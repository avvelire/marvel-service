import "./charInfo.scss";
import { useQuery } from "@apollo/client";
import { FIND_ONE_CHAR } from "../../gql/queries";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const { loading, data } = useQuery(FIND_ONE_CHAR, {
    variables: { findOneCharacterId: props.charId },
  });

  const element = loading ? <Spinner /> : null;
  const content = !data ? <Skeleton /> : <View data={data.findOneCharacter} />;

  return (
    <div className="char__info">
      {element}
      {content}
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, comics } = data;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} target="_blanck" className="button button__main">
              <div className="inner">homepage</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <li key={i} className="char__comics-item">
              {item.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
