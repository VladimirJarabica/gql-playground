import { GraphQLError } from "graphql";
import { db } from "../data/db";
import { QueryResolvers } from "../generated/graphql";

export const userResolver: QueryResolvers["user"] = async (ctx, args) => {
  const user = db.users.find((user) => user.id === args.id);
  if (!user) {
    throw new GraphQLError("User not found");
  }

  return { ...user, friends: [] };
};
