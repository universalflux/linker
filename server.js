const { GraphQLServer } = require('graphql-yoga')
const _ = require('lodash')
let idCount = 0;
let links = [{
  id: '0',
  url: 'www.awesomesauce.com',
  description: 'This is my API, no one elses.'
}]
const resolvers = {
  Query: {
    feed: () => links,
    find: (parent, id) => {
      return _.find(links, id)
    },
  },
  Mutation: {
      post: (parent, args) => {
        const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
      }
      links.push(link)
      return link
      },
      put: (parent, args) => {
        let link = {}
        links = links.map(x => {
          if(x.id === args.id) {
            x = args
            link = x
          }
          return x;
        })
        return link
      },
      delete: (parent, args) => {
        let index;

        links.map((x, i) => {
          if(x.id === args.id) {
            index = i;
          }
          return;
        })
        links.splice(index, 1)
        return args
      }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Running on PORT#4000`))
