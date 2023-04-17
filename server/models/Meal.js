import mongoose from "mongoose";

const MealSchema = new mongoose.Schema(
  {
  
	comboname:String,
	varient:String,
	price: Number,
    rating: Number,
	image: String,
  },
  { timestamps: true }
);

const   Meal = mongoose.model("Meal", MealSchema);
export default  Meal;
