const express = require("express");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

const Cars = require("./cars-model");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    console.log(cars);
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.json(car);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    const { vin, make, model, mileage, title, transmission } = req.body;
    try {
      const car = await Cars.create({
        vin: vin,
        make: make,
        model: model,
        mileage: mileage,
        title: title,
        transmission: transmission,
      });
      res.status(201).json(car);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id", checkCarId, checkCarPayload, async (req, res, next) => {
  const car = await Cars.updateById(req.params.id, req.body);
  res.json(car);
  // try {
  //   res.json(account);
  // } catch (err) {
  //   next(err);
  // }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Error occured inside the cars router",
  });
});

module.exports = router;
