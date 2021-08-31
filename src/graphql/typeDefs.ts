import { gql } from "apollo-server-micro"

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    image: String!
  }
  type Project {
    id: ID!
    name: String!
    description: String
    color: String!
    userId: Int!
  }
  type Todo {
    id: ID!
    title: String!
    status: String!
    isDone: Boolean!
    schedule: Int!
    projectId: Int!
  }
  type Query {
    getUsers: [User]
    getProjects: [Project]
    getTodos: [Todo]
  }
  type Mutation {
    addUser(name: String, email: String, image: String): User
    addProject(name: String, description: String, color: String, userId: Int): Project
    addTodo(title: String, status: String, isDone: Boolean, schedule: Int, projectId: Int): Todo
  }
`
