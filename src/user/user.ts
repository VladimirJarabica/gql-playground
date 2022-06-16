import { db } from "../data/db";
import { Resolvers } from "../generated/graphql";
import { userResolver } from "./userResolver";
import { usersResolver } from "./usersResolver";

export const userResolvers: Resolvers = {
  Query: {
    users: usersResolver,
    user: userResolver,
  },
  User: {
    friends: (parent) => {
      const friendIds = db.friendIds[parent.id ?? ""] ?? [];

      return db.users.filter((friend) => friendIds.includes(friend.id));
    },
  },
};
