import { makeExecutableSchema } from "@graphql-tools/schema";
import UserTypeDef from "./user/User.graphql";
import RootTypeDef from "./Root.graphql";
import { userResolvers } from "./user/user";

export const schema = makeExecutableSchema({
  typeDefs: [RootTypeDef, UserTypeDef],
  resolvers: [userResolvers],
});
