import { PrismaClient, Prisma, User, Project } from "@prisma/client"
import { CreateUserInput } from "./types/User"
import { CreateProjectInput } from "./types/Project"
import { Todo, CreateTodoInput } from "./types/Todo"

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    getAllUsers: () => {
      return prisma.user.findMany()
    },
    getAllProjects: () => {
      return prisma.project.findMany()
    },
    getOneProject: () => {
      return prisma.project.findUnique({
        where: {
          id: 1,
        },
      })
    },
    // getTodos: () => {
    //   return prisma.todo.findMany()
    // },
  },

  Mutation: {
    addUser: (_, args: CreateUserInput): Prisma.Prisma__UserClient<User> => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          image: args.image,
        },
      })
    },
    addProject: (_, args: CreateProjectInput): Prisma.Prisma__ProjectClient<Project> => {
      console.log(args)
      return prisma.project.create({
        data: {
          name: args.name,
          description: args.description,
          color: args.color,
          users: {
            connect: {
              id: args.userId,
            },
          },
        },
        include: {
          users: true,
        },
      })
    },
    // addTodo: (args: CreateTodoInput) => {
    //   return prisma.todo.create({
    //     data: {
    //       title: args.title,
    //       status: args.status,
    //       schedule: args.schedule,
    //       projectId: args.projectId,
    //     },
    //   })
    // },
  },
}
