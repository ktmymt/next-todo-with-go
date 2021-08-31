import { PrismaClient, Prisma } from "@prisma/client"
import { User, CreateUserInput } from "./types/User"
import { Project, CreateProjectInput } from "./types/Project"
import { Todo, CreateTodoInput } from "./types/Todo"

const prisma = new PrismaClient()

export const resolvers = {
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
    addUser: (args: CreateUserInput): Prisma.Prisma__UserClient<User> => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          image: args.image,
        },
      })
    },
    addProject: (args: CreateProjectInput): Prisma.Prisma__ProjectClient<Project> => {
      return prisma.project.create({
        data: {
          name: args.name,
          description: args.description,
          color: args.color,
          userId: args.userId,
        },
      })
    },
    addTodo: (args: CreateTodoInput) => {
      return prisma.todo.create({
        data: {
          title: args.title,
          status: args.status,
          isDone: args.isDone,
          schedule: args.schedule,
          projectId: args.projectId,
        },
      })
    },
  },
}
