import { GraphQLClient, gql } from "graphql-request";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
  // headers: {
  //   Authorization: `Bearer ${process.env.API_KEY}`
  // }
});

export function useGetSnippets() {
  console.log("process.env.API_URL", process.env.NEXT_PUBLIC_API_URL)
  return useQuery('get-snippets', async () => {
    const {snippets} = await graphQLClient.request(gql`
      query {
        snippets (sorting: [{field: created, direction: DESC}]){
          edges {
            node {
              id
              type
              language
              body
              created
            }
          }
        }
      }
    `)
    return snippets.edges;
  })
}