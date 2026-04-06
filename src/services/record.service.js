const ApiError = require("../utils/ApiError");

const FinancialRecord = require("../models/FinancialRecord");

const createRecord = async (recordData, userId) => {
  const record = await FinancialRecord.create({
    ...recordData,
    createdBy: userId
  });

  return record;
};

const getRecords = async (filters = {}) => {
  const query = {};

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.startDate || filters.endDate) {
    query.date = {};

    if (filters.startDate) {
      query.date.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.date.$lte = new Date(filters.endDate);
    }
  }

  const records = await FinancialRecord.find(query)
    .populate("createdBy", "name email role")
    .sort({ date: -1 });

  return records;
};

const getRecordById = async (id) => {
  const record = await FinancialRecord.findById(id)
    .populate("createdBy", "name email");

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
};

const updateRecord = async (id, updateData) => {
  const record = await FinancialRecord.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true
    }
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
};

const deleteRecord = async (id) => {
  const record = await FinancialRecord.findByIdAndDelete(id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};