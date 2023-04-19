import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
// import authRoutes from "./routes/auth.js";
//DATA IMPORTS
import User from "./models/User.js";
import Meal from "./models/Meal.js";
import MealStat from "./models/MealStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import { meals } from "./data/meals.js";
import { mealsStat, dataOverallStat } from "./data/index.js";
import { users } from "./data/users.js";
import { dataTransaction } from "./data/dataTransaction.js";

/*configurations*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = 5001;
mongoose
  .connect(
    "mongodb+srv://CanteenAdmin:1234abcd@cluster0.jxhujik.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server working on Port: ${PORT}`));
    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(users);
    // AffiliateStat.insertMany(dataAffiliateStat);
    //OverallStat.insertMany(dataOverallStat);
    // Meals.insertMany(meals);
    // MealsStat.insertMany(mealsStat);
    //Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
