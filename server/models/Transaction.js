import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
  
	studentID: String,
    cost: String,
    meals: Array
    // meals:{
    //     // type: [mongoose.Types.ObjectId],
    //     // of: Number,

    // },
    

  },
  { timestamps: true }
);

const   Transaction = mongoose.model("Transaction", TransactionSchema);
export default  Transaction;
