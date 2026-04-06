const dashboardService = require("../services/dashboard.service");

const getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getSummary();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const getCategorySummary = async (req, res, next) => {
  try {
    const data =
      await dashboardService.getCategorySummary();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const getMonthlyTrends = async (req, res, next) => {
  try {
    const data =
      await dashboardService.getMonthlyTrends();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

const getRecentTransactions = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await dashboardService.getRecentTransactions();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSummary,
  getCategorySummary,
  getMonthlyTrends,
  getRecentTransactions
};