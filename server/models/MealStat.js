import mongoose from "mongoose";

const MealStatSchema = new mongoose.Schema(
  {
    mealId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const  MealStat = mongoose.model("MealsStat",MealStatSchema);
export default MealStat;
