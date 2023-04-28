// import getApolloClient from '@/libs/client'
// import { gql } from '@apollo/client'

// export const getServerSideProps = async () => {
//   const query = gql`

//       query character($id:ID!){
//         character(id:$id){
//           name
//         }
//       }
//     `
  
//   const client = getApolloClient();

//   const {data} = await client.query<{
//     character:{
//       name:string
//     }
//   }>({
//       query,
//       variables:{
//         id: "4"
//       }
//     });

//   return {
//     props:{
//       name: data.character.name
//     }
//   }
// }

// export default function Home(props: {name:string}) {
//   return (
//     <>
//       {props.name}
//     </>
//   )
// }

import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import Link from 'next/link'; // Importamos el componente Link
import getApolloClient from '@/libs/client';


export interface Character {
  id: string;
  name: string;
  image: string;
  episode: string[];
}


export interface CharactersData {
  characters: {
    results: Character[];
  };
}


interface Props {
  characters: Character[];
}

const GET_CHARACTERS = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      results {
        id # Agregamos la propiedad id
        name
        image
      }
    }
  }
`;

const CharactersPage = ({ characters }: Props) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [moreCharacters, setMoreCharacters] = useState<Character[]>([]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    const client = getApolloClient();

    const { data } = await client.query<CharactersData>({
      query: GET_CHARACTERS,
      variables: { page: page + 1 },
    });

    const newCharacters = data.characters.results;

    if (newCharacters.length === 0) {
      setHasMore(false);
    } else {
      setPage((prevPage) => prevPage + 1);
      setMoreCharacters(newCharacters);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>List of Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}> {/* Usamos character.id */}
            <Link href={`/character/${character.id}`}> {/* Envolvemos en un componente Link */}
              <a> {/* Usamos un elemento <a> dentro del componente Link */}
                <img src={character.image} alt={character.name} />
                {character.name}
              </a>
            </Link>
          </li>
        ))}
        {moreCharacters.map((character) => (
          <li key={character.id}> {/* Usamos character.id */}
            <Link href={`/character/${encodeURIComponent(character.id)}`}>
              <a>
                <img src={character.image} alt={character.name} />
                {character.name.slice(0, 20)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const client = getApolloClient();

  const { data } = await client.query<CharactersData>({
    query: GET_CHARACTERS,
    variables: { page: 1 },
  });

  const characters = data.characters.results.slice(0, 20);

  return {
    props: {
      characters,
    },
  };
};

export default CharactersPage;
