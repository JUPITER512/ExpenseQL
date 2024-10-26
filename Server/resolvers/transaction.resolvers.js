import Transaction from "../models/transaction.model.js";
const transaction_resolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized User");
        const userId = context.getUser()._id;
        const transacations = await Transaction.find({ userId });
        return transacations;
      } catch (error) {
        console.log("Error while getting transacitons", error);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.log("Error while getting transaciton", error);
        throw new Error("Error getting transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
 
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error while creating transaction", error);
        throw new Error("Error creating transaction");
      }
    },  
    updateTransaction: async (_, { input }, context) => {
      try {
        const updateTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updateTransaction;
      } catch (error) {
        console.log("Error while updating transaction", error);
        throw new Error("Error  while updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionID }) => {
      try {
        const deleted=await Transaction.findByIdAndDelete(transactionID);
        return deleted
      } catch (error) {
        console.log("Error while deleting transaction", error);
        throw new Error("Error  while deleting transaction");
      }
    },
  },
};

export default transaction_resolver;
