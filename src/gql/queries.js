import { gql } from "@apollo/client";

export const RANDOM_CHAR = gql`
query FindOneRandomCharacter {
    findOneRandomCharacter {
      id
      name
      homepage
      description
      thumbnail
    }
  }
`;

export const FIND_ALL_CHARS = gql`
query Query($query: CharacterQueryInput!) {
    findAllCharacters(query: $query) {
      count
      items {
        id
        name
        description
        thumbnail
        homepage
        comics {
          title
        }
      }
    }
  }
`;

export const FIND_ONE_CHAR = gql`
query FindOneCharacter($findOneCharacterId: String!) {
    findOneCharacter(id: $findOneCharacterId) {
      id
      name
      description
      thumbnail
      homepage
      comics {
        title
      }
    }
  }
`;

export const FIND_ALL_COMICS = gql`
query FindAllComicss($query: ComicsQueryInput!) {
    findAllComicss(query: $query) {
      count
      items {
        id
        title
        thumbnail
        price
      }
    }
  }
`;

export const FIND_ONE_COMIC = gql`
query FindOneComics($findOneComicsId: String!) {
    findOneComics(id: $findOneComicsId) {
      id
      title
      description
      pageCount
      thumbnail
      language
      price
    }
  }
`