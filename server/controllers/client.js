import Meal from "../models/Meal.js";
import MealStat from "../models/MealStat.js";
import User from "../models/User.js"
import Transaction from "../models/Transaction.js";

export const getMeals = async (req, res) => {
    try {
        const meals = await Meal.find();

        const mealsWithStats = await Promise.all(
            meals.map(async (meal )=>{
                const stat =  await MealStat.find({
                    mealId : meal._id}
                )
                return {
                    ...meal._doc,
                    stat
                };
            })
        )

        res.status(200).json(mealsWithStats);
    } catch (error) {
        res.status(404).json( { message : error.message});
    };
};
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({role:"user"}).select("-password");

        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json( { message : error.message});
    };
};

export const getTransactions = async (req, res) => {
    try {
        // sort should look like this: { "field": "studentID", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { studentID: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { studentID: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
    } catch (error) {
        res.status(404).json( { message : error.message});
    };
};
