import { Knex } from "knex";

exports.seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  await knex("auth").del();
  await knex("auth").insert([
    {
      id: 1,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 2,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 3,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 4,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 5,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 6,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 7,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 8,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 9,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 10,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
    {
      id: 11,
      password: "$2a$10$6JEb1c5AMMOmFDSXJDTwqOQspMWoDc4egY7jJRJOiEjrL3W5XUw96",
    },
  ]);
};
