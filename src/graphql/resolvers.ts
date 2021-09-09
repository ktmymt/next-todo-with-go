import { PrismaClient, Prisma, PrismaPromise, User, Project, Todo } from "@prisma/client"
import { CreateProjectInput } from "./types/Project"
import { CreateTodoInput } from "./types/Todo"

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    getAllUsers: (): PrismaPromise<User[]> => {
      return prisma.user.findMany()
    },
    getAllProjects: (): PrismaPromise<Project[]> => {
      return prisma.project.findMany()
    },
    getTodos: (): PrismaPromise<Todo[]> => {
      return prisma.todo.findMany()
    },
  },

  Mutation: {
    addUser: (_, args: Prisma.UserCreateInput): Prisma.Prisma__UserClient<User> => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          image: args.image,
        },
      })
    },
    addProject: (_, args: CreateProjectInput): Prisma.Prisma__ProjectClient<Project> => {
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
      })
    },
    addTodo: (_, args: CreateTodoInput): Prisma.Prisma__TodoClient<Todo> => {
      console.log(args)
      return prisma.todo.create({
        data: {
          title: args.title,
          status: args.status,
          schedule: args.schedule,
          project: {
            connect: {
              id: args.projectId,
            },
          },
        },
      })
    },
  },
}
