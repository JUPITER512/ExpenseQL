import { mergeResolvers } from "@graphql-tools/merge";
import user_Resolver from "./user.resolvers.js";
import transaction_resolver from './transaction.resolvers.js'

const mergedResolvers=mergeResolvers([user_Resolver,transaction_resolver])

export default mergedResolvers  