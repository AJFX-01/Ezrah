import { Context, Cryptocurrency } from "./types";

const resolvers = {
    Query: {
        // getCryptocurrency: async (_: any, args: { id: number }, context: Context): Promise<Cryptocurrency | null> => {
        //     return await context.dataSources.api.getCryptocurrency(args.id);
        // },
        getAllCryptocurrencies: async (
            _: any,
            args: { start?: number; limit?: number },
            context: Context
        ): Promise<Cryptocurrency[]> => {
            const start = args.start || 1;
            const limit = args.limit || 14;
            return await context.dataSources.api.getAllCryptocurrencies(start, limit);
        },
    },
};


export default resolvers;
