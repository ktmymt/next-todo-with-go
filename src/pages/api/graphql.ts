import { gql, ApolloServer } from "apollo-server-micro"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    image: String
  }

  type Project {
    id: ID!
    name: String
    description: String
    color: String
  }

  type Todo {
    id: ID!
    title: String
    status: String
    isDone: Boolean
    schedule: Int
  }

  type Query {
    getUsers: [User]
    getProjects: [Project]
    getTodos: [Todo]
  }
`

const resolvers = {
  Query: {
    getUsers: () => {
      return prisma.user.findMany()
    },
    getProjects: () => {
      return prisma.project.findMany()
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const handler = apolloServer.createHandler({ path: "/api/graphql" })

export const config = { api: { bodyParser: false } }

export default handler
