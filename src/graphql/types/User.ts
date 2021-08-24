import { enumType, intArg, objectType, stringArg, extendType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id"), t.string("username"), t.string("email"), t.string("image")
  },
})
