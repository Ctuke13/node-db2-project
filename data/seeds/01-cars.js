// STRETCH
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").truncate();
  await knex("cars").insert([
    {
      vin: "1FTYR10U53PA78822",
      make: "toyota",
      model: "prius",
      mileage: 250000,
      title: "salvage",
      transmission: "CVT",
    },
    {
      vin: "4M2ZU86K34UJ79131",
      make: "ford",
      model: "mustang",
      mileage: 120000,
      title: "clean",
      transmission: "manual",
    },
    {
      vin: "SALWR2WF6EA382634",
      make: "honda",
      model: "accord",
      mileage: 220000,
      title: "clean",
      transmission: "automatic",
    },
  ]);
};
