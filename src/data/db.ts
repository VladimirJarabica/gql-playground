import { faker } from "@faker-js/faker";
import { User } from "../generated/graphql";

type UserEntity = Omit<User, "friends">;

const createRandomUser = (): UserEntity => ({
  id: faker.datatype.uuid(),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  birthDate: faker.date.birthdate().toISOString(),
});

const users = Array.from({ length: 5 }).map(() => createRandomUser());

const friendIds = {
  [users[0].id]: [users[1].id, users[2].id],
  [users[1].id]: [users[0].id, users[3].id],
  [users[2].id]: [users[0].id, users[4].id],
};

export const db = {
  users,
  friendIds,
};
