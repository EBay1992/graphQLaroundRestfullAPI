require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { getMovies, getSuggestionsFor, getMovie } = require("./db");

const typeDefs = gql`
  type Query {
    movie(id: ID!): Movie
    movies(minimum_rating: Float, limit: Int): [Movie]!
    suggestions(id: ID!): [Movie]!
  }

  type Movie {
    id: Int!
    title: String!
    rating: Float
    description_intro: String
    language: String
    medium_cover_image: String
    genres: [String]
    suggestions: [Movie]!
  }
`;

const resolvers = {
  Query: {
    movies: (parent, { minimum_rating, limit }, context) => {
      return getMovies(minimum_rating, limit);
    },
    movie: (_, { id }) => {
      return getMovie(id);
    },

    suggestions: (_, { id }) => {
      return getSuggestionsFor(id);
    },
  },

  Movie: {
    suggestions: ({ id }) => {
      return getSuggestionsFor(id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(true)],
});

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log("server running at " + url));
