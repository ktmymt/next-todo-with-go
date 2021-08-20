import { PrismaClient } from "@prisma/client"

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
    addTodo: (_parent, { title, status, isDone, schedule, projectId }) => {
      return prisma.todo.create({
        data: {
          title: title,
          status: status,
          isDone: isDone,
          schedule: schedule,
          projectId: projectId,
        },
      })
    },
  },
}
