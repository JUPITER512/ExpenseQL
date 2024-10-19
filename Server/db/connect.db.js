import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL+"/expenseQl");
    console.log(`Database Connected on Host : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error while connecting database ", error.message);
    process.exit(1)
  }
};
