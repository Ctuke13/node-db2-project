const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Cars.getById(id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({ status: 404, message: `Car with id ${id} is not found` });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // const error = { status: 400 };

  const { vin, make, model, mileage } = req.body;
  if (vin === undefined) {
    return next({
      status: 400,
      message: "vin is missing",
    });
  } else if (make === undefined) {
    return next({
      status: 400,
      message: "make is missing",
    });
  } else if (model === undefined) {
    return next({
      status: 400,
      message: "model is missing",
    });
  } else if (mileage === undefined) {
    return next({
      status: 400,
      message: "mileage is missing",
    });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const vinIsValid = vinValidator.validate(vin);
  if (vinIsValid) {
    next();
  } else {
    return next({
      status: 400,
      message: `vin ${vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVin = await Cars.getByVin(req.body.vin);
    if (!existingVin) {
      next();
    } else {
      next({
        status: 400,
        message: `vin ${req.body.vin} already exists`,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
