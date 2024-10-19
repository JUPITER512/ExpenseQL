import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDefs from './user.typedefs.js'
import transaction_typedef from './transaction.typedefs.js'

const mergerTypeDef=mergeTypeDefs([userTypeDefs,transaction_typedef])
export default mergerTypeDef