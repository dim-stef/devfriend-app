import { GraphQLClient, gql } from "graphql-request";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { UseQueryResult, UseMutationResult, UseMutationOptions } from "react-query";
import { CreateSnippetQueryInterface } from "../types";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
  // headers: {
  //   Authorization: `Bearer ${process.env.API_KEY}`
  // }
});

export function useCreateSnippet(){
  return useMutation('create-snippet', async (variables: CreateSnippetQueryInterface) => {
    const {createOneSnippet} = await graphQLClient.request(gql`
      mutation CreateSnippet($type: String!, $language: String!, $body: String!) {
        createOneSnippet (
          input: {snippet: {type: $type, language: $language, body: $body}}
        ){
          type
          body
          created
        }
      }
    `, variables)
    return createOneSnippet;
  })
}