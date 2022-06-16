import { Resolvers } from "../generated/graphql";
import { usersResolver } from "./usersResolver";

export const userResolvers: Resolvers = {
  Query: {
    users: usersResolver,
  },
  User: {
    friends: (parent) => parent.friends ?? [],
  },
};
