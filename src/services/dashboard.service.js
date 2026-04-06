const FinancialRecord = require("../models/FinancialRecord");

const getSummary = async () => {
  const summary = await FinancialRecord.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let totalIncome = 0;
  let totalExpenses = 0;

  summary.forEach((item) => {
    if (item._id === "income") {
      totalIncome = item.total;
    }

    if (item._id === "expense") {
      totalExpenses = item.total;
    }
  });

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses
  };
};

const getCategorySummary = async () => {
  return await FinancialRecord.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { total: -1 }
    }
  ]);
};

const getMonthlyTrends = async () => {
  return await FinancialRecord.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" }
        },
        total: { $sum: "$amount" }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
};

const getRecentTransactions = async () => {
  return await FinancialRecord.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("createdBy", "name email");
};

module.exports = {
  getSummary,
  getCategorySummary,
  getMonthlyTrends,
  getRecentTransactions
};