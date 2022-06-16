import { db } from "../data/db";
import { QueryResolvers } from "../generated/graphql";

export const usersResolver: QueryResolvers["users"] = async () => {
  return db.users.map((user) => ({ ...user, friends: [] }));
};
