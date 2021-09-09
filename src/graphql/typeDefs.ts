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
  }

  type UserProject {
    userId: ID!
    projectId: ID!
    role: Role!
  }

  type Todo {
    id: ID!
    title: String!
    status: String!
    isDone: Boolean!
    schedule: Int!
    projectId: Int!
  }

  enum Role {
    OWNER
    MEMBER
  }

  # enum TodoStatus {
  #   DONE
  #   DOING
  #   PENDING
  #   WAITING
  # }

  type Query {
    getAllUsers: [User]
    getAllProjects: [Project]
    getOneProject: Project
    # getTodos: [Todo]
  }

  type Mutation {
    addUser(name: String, email: String, image: String): User
    addProject(name: String, description: String, color: String, userId: Int): Project
    # addTodo(title: String, status: TodoStatus, isDone: Boolean, schedule: Int, projectId: Int): Todo
  }
`
