import { gql, useQuery } from "@apollo/client"
import React,{FC} from "react"

const character:FC<{id: string}> = ({id}) =>{
  const query = gql`
      query character($id:ID!){
        character(id:$id){
          name
        }
      }
    `
  const {loading, error, data} = useQuery<{
    character: {
      name:string
    }
  }>(query,{
      variables:{
        id
      }
  });

  if (loading) return <div>loading....</div>
  if (error) return <div>error....</div>

  return(
    <div>
        asd
        {data!.character.name}
    </div>
  )
}

export default character;