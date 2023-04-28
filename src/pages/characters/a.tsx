import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import getApolloClient from '@/libs/client';

interface Character {
  name: string;
}

interface CharactersData {
  characters: {
    results: Character[];
  };
}

interface Props {
  names: string[];
}

const GET_CHARACTERS = gql`
  query Characters {
    characters(page: 1) {
      results {
        name
      }
    }
  }
`;

const CharactersPage = ({ names }: Props) => {
  return (
    <div>
      <h1>List of Characters</h1>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const client = getApolloClient();

  const { data } = await client.query<CharactersData>({
    query: GET_CHARACTERS,
  });

  const names = data.characters.results.slice(0, 20).map((character) => character.name);

  return {
    props: {
      names,
    },
  };
};

export default CharactersPage;