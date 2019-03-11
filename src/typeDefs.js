const typeDefs =
`type Query {
  info: String!
  feed: [Link!]!
  find: link(id: ID!): Link
}
type Mutation {
  post(url: String!, description: String!): Link!
  update(id: ID!, url: String, description: String): Link
}
type Link {
  id: ID!
  description: String!
  url: String!
}`

module.exports = typeDefs;
