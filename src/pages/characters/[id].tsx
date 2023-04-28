import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import getApolloClient from '@/libs/client';

interface CharacterData {
  character: {
    id: string;
    name: string;
    image: string;
    location: {
      name: string;
    };
    gender: string;
    episode: {
      name: string;
    }[];
  };
}

interface Props {
  character: CharacterData['character'];
}

const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      location {
        name
      }
      gender
      episode {
        name
      }
    }
  }
`;

const CharacterPage = ({ character }: Props) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Location: {character.location.name}</p>
      <p>Gender: {character.gender}</p>
      <p>Episodes:</p>
      <ul>
        {character.episode.map((episode) => (
          <li key={episode.name}>{episode.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const client = getApolloClient();

  const { data } = await client.query<CharacterData>({
    query: GET_CHARACTER,
    variables: { id: params?.id },
  });

  return {
    props: {
      character: data.character,
    },
  };
};

export default CharacterPage;
