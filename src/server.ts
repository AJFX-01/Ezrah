import express, { Application } from 'express'
import { Context } from './types'
import typeDefs from './types/schema';
import resolvers from './resolver';
import CoinMarketCapDataSource from './api';
import { ApolloServer } from 'apollo-server-express';

if (!Configs.API_KEY) {
    console.error('Error: COINMARKETCAP_API_KEY is not set in .env file.');
    process.exit(1);
}


const startServer = async (): Promise<void> => {
    const app: Application = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: (): Context => ({
            dataSources: {
                api: new CoinMarketCapDataSource(),
            },
        }),
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen({ port: Configs.PORT }, () => {
        console.log(`Server running at http://localhost:${Configs.PORT}${server.graphqlPath}`);
    });
};

// Start the server
startServer().catch((error) => {
    console.error('Error starting server:', error);
});


