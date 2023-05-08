import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
   sname:{
    type: String,
    required: true,
    min: 2,
    max: 100,
   },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    studentID: {
        type: String,
         required: true,
         unique: true,
    },
    
  
    
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model("User", UserSchema);
export default User;
