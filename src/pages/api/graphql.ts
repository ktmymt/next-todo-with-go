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
    userId: Int
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

  type Mutation {
    addUser(name: String, email: String, image: String): User
    addProject(name: String, description: String, color: String, userId: Int): Project
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
    getTodos: () => {
      return prisma.todo.findMany()
    },
  },

  Mutation: {
    addUser: (_parent, { name, email, image }, _context) => {
      return prisma.user.create({
        data: {
          name: name,
          email: email,
          image: image,
        },
      })
    },
    addProject: (_parent, { name, description, color, userId }, _context) => {
      return prisma.project.create({
        data: {
          name: name,
          description: description,
          color: color,
          userId: userId,
        },
      })
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const handler = apolloServer.createHandler({ path: "/api/graphql" })

export const config = { api: { bodyParser: false } }

export default handler
