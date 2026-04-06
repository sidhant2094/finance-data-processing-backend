const ApiError = require("../utils/ApiError");

const validateRecordInput = (req, res, next) => {
  const { amount, type, category, date } = req.body;

  if (
    amount === undefined ||
    !type ||
    !category ||
    !date
  ) {
    return next(
      new ApiError(
        400,
        "amount, type, category and date are required"
      )
    );
  }

  if (typeof amount !== "number" || amount < 0) {
    return next(
      new ApiError(
        400,
        "amount must be a positive number"
      )
    );
  }

  if (!["income", "expense"].includes(type)) {
    return next(
      new ApiError(
        400,
        "type must be income or expense"
      )
    );
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return next(
      new ApiError(400, "invalid date format")
    );
  }

  next();
};

module.exports = {
  validateRecordInput
};