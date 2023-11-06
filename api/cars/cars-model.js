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

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = (car) => {
  return db("cars")
    .insert(car)
    .then(([id]) => {
      return getById(id);
    });
};

module.exports = {
  getAll,
  getById,
  getByVin,
  create,
};
