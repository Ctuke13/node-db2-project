const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/dealer.db3",
  },
  useNullAsDefault: true,
});

const getAll = async () => {
  const result = await db("cars");
  return result;
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const create = async () => {
  const [id] = await db("cars").insert(car);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};
