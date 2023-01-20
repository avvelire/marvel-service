import {useHttp} from '../components/hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c08ae7f5da8be385fbff5a5ada69754b'
    const _baseOffset = 210
    // https://gateway.marvel.com:443/v1/public/!!characters?modifiedSince=2020-01-01T00%3A00%3A00-0400&limit=90&offset=0&apikey=c08ae7f5da8be385fbff5a5ada69754b


    const getAllCharacters = async (offset = _baseOffset) => {
        // const res = await request(`${_apiBase}characters?modifiedSince=2020-01-01T00%3A00%3A00-0400&limit=9&offset=0&${_apiKey}`);
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        try {
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

            return _transformCharacter(res.data.results[0]);
        } catch(e) {
            const id = Math.floor(Math.random() * (1011400 - 1011100) + 1011100)
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            return _transformCharacter(res.data.results[0]);
        }
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {loading,
            error,
            clearError,
            process,
            setProcess,
            getAllCharacters,
            getCharacter,
            getAllComics,
            getComic,
            getCharacterByName}
}

export default useMarvelService;