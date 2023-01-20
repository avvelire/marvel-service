
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useQuery } from '@apollo/client';
import { RANDOM_CHAR } from '../../gql/queries';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const RandomChar = () => {

    const {loading, error, data, refetch} = useQuery(RANDOM_CHAR)

    const element = loading ? <Spinner/> : <View data={data.findOneRandomCharacter}/>
    const ifError = error ? <ErrorMessage/> : null


    return (
        <div className="randomchar">
            {element}
            {ifError}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={() => {
                            refetch()
                        }}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({data}) => {
    const {name, description, thumbnail, homepage} = data
    const infoOfChar = description ? `${description.slice(0, 210)}...` : null
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {infoOfChar}
                </p>
                <div
                style={{'display': 'flex', 'justifyContent': 'center'}}
                className="randomchar__btns">
                    <a href={homepage} target='_blanck' className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;