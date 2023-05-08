import Meal from '../models/Meal.js';

export async function createMeal(req, res) {
  try {
    const newMeal = new Meal({
      comboname: req.body.comboname,
      varient: req.body.varient,
      price: req.body.price,
      rating: req.body.rating,
      image: req.body.image,
    });

    const meal = await newMeal.save();
    res.json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}