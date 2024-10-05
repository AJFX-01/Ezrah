```markdown
# GraphQL CoinMarketCap API Server with LFU Caching

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v16.14.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8.4-blue.svg)
![Apollo Server](https://img.shields.io/badge/Apollo_Server-3.6.6-orange.svg)
![Express](https://img.shields.io/badge/Express-4.17.1-lightgrey.svg)

A robust and scalable GraphQL server built with **TypeScript**, **Apollo Server**, and **Express**, integrated with the **CoinMarketCap API**. This server leverages an **LFU (Least Frequently Used) cache** to optimize performance by minimizing redundant API calls and enhancing response times.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing the API](#testing-the-api)
  - [Using GraphQL Playground](#using-graphql-playground)
  - [Using Postman](#using-postman)
  - [Automated Testing](#automated-testing)
- [Project Structure](#project-structure)
- [Caching Mechanism](#caching-mechanism)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **GraphQL API**: Provides robust queries to fetch cryptocurrency data.
  - `getCryptocurrency(id: Int!): Cryptocurrency` - Fetches a single cryptocurrency by its ID.
  - `getAllCryptocurrencies(start: Int, limit: Int): [Cryptocurrency]` - Retrieves a list of cryptocurrencies with pagination support.
- **TypeScript**: Ensures type safety and enhances code maintainability.
- **Apollo Server with Express**: Combines the flexibility of Express.js with Apollo Server's powerful GraphQL capabilities.
- **LFU Caching**: Implements an LFU cache to store frequently accessed data, reducing latency and API usage.
- **Environment Configuration**: Manages sensitive information and configurations using environment variables.
- **Comprehensive Testing**: Supports manual and automated testing to ensure reliability and performance.

## Demo

![GraphQL Playground](https://i.imgur.com/XZLYp8a.png)

*Access the GraphQL Playground at [http://localhost:4000/graphql](http://localhost:4000/graphql) to interact with the API.*

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v16.14.0 or later)
- **npm** (v8.3.0 or later)
- **CoinMarketCap API Key**: Obtain an API key by signing up at the [CoinMarketCap Developer Portal](https://coinmarketcap.com/api/).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/graphql-coinmarketcap-server.git
   cd graphql-coinmarketcap-server


## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/graphql-coinmarketcap-server.git
   cd graphql-coinmarketcap-server
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This command installs both runtime and development dependencies, including TypeScript, Apollo Server, Express, Axios, and more.

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory to store your configuration variables securely.

   ```bash
   touch .env
   ```

   Open the `.env` file and add the following variables:

   ```env
   COINMARKETCAP_API_KEY=your_api_key_here
   PORT=4000
   CACHE_MAX_SIZE=100
   ```

   - **`COINMARKETCAP_API_KEY`**: Your unique API key from CoinMarketCap.
   - **`PORT`**: The port on which the server will run (default is `4000`).
   - **`CACHE_MAX_SIZE`**: Maximum number of items the LFU cache can hold.

2. **Secure Your `.env` File**

   Ensure that your `.env` file is included in `.gitignore` to prevent sensitive information from being exposed.

   ```gitignore
   # .gitignore

   node_modules/
   dist/
   .env
   ```

## Running the Server

### Development Mode

Use `nodemon` with `ts-node` for automatic recompilation and server restarts during development.

```bash
npm run dev
```

### Production Mode

First, build the TypeScript code into JavaScript, then run the compiled files.

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Start the Server**

   ```bash
   npm start
   ```

The server will start and listen on the port specified in the `.env` file (default is `4000`).

```
🚀 Server running at http://localhost:4000/graphql
```

## Testing the API

Ensuring your GraphQL API functions correctly is vital. You can test the API using various tools and methods.

### Using GraphQL Playground

Apollo Server typically provides an in-browser IDE for exploring GraphQL APIs called **GraphQL Playground**.

1. **Access GraphQL Playground**

   Open your browser and navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql).

2. **Execute Queries**

   Use the Playground interface to run queries and mutations.

   **Example Query: Get a Single Cryptocurrency by ID**

   ```graphql
   query GetCryptocurrency($id: Int!) {
     getCryptocurrency(id: $id) {
       id
       name
       symbol
       cmc_rank
       quote {
         USD {
           price
           market_cap
         }
       }
     }
   }
   ```

   **Variables:**

   ```json
   {
     "id": 1
   }
   ```

### Using Postman

**Postman** is a versatile API testing tool that supports GraphQL.

1. **Create a New Request**

   - Method: `POST`
   - URL: `http://localhost:4000/graphql`

2. **Set Up the Request Body**

   - Select the **"GraphQL"** option under the **"Body"** tab.
   - **QUERY:**

     ```graphql
     query GetAllCryptocurrencies($start: Int, $limit: Int) {
       getAllCryptocurrencies(start: $start, limit: $limit) {
         id
         name
         symbol
         cmc_rank
         quote {
           USD {
             price
             market_cap
           }
         }
       }
     }
     ```

   - **VARIABLES:**

     ```json
     {
       "start": 1,
       "limit": 14
     }
     ```

3. **Add Necessary Headers**

   If your API requires authentication, add headers like `X-CMC_PRO_API_KEY`.

   | Key                 | Value                |
   |---------------------|----------------------|
   | `X-CMC_PRO_API_KEY` | `your_api_key_here`  |
   | `Content-Type`      | `application/json`   |

4. **Send the Request**

   Click **"Send"** and inspect the response.

### Automated Testing

Implement automated tests using **Jest** and **Supertest** to ensure your API's reliability and performance.

1. **Install Testing Dependencies**

   ```bash
   npm install --save-dev jest ts-jest @types/jest supertest
   ```

2. **Configure Jest**

   Initialize Jest configuration for TypeScript:

   ```bash
   npx ts-jest config:init
   ```

3. **Write Test Cases**

   **Example: Testing `getAllCryptocurrencies` Query**

   ```typescript
   // tests/getAllCryptocurrencies.test.ts

   import { ApolloServer } from 'apollo-server-express';
   import { typeDefs, resolvers } from '../src/schema';
   import { createTestClient } from 'apollo-server-testing';
   import { CoinMarketCapDataSource } from '../src/dataSources';

   const GET_ALL_CRYPTOCURRENCIES = `
     query GetAllCryptocurrencies($start: Int, $limit: Int) {
       getAllCryptocurrencies(start: $start, limit: $limit) {
         id
         name
         symbol
         cmc_rank
         quote {
           USD {
             price
             market_cap
           }
         }
       }
     }
   `;

   describe('getAllCryptocurrencies Query', () => {
     let server: ApolloServer;

     beforeAll(() => {
       server = new ApolloServer({
         typeDefs,
         resolvers,
         dataSources: () => ({
           api: new CoinMarketCapDataSource(),
         }),
       });
     });

     it('fetches a list of cryptocurrencies with default parameters', async () => {
       const { query } = createTestClient(server);
       const res = await query({
         query: GET_ALL_CRYPTOCURRENCIES,
         variables: {},
       });

       expect(res.errors).toBeUndefined();
       expect(res.data).toBeDefined();
       expect(res.data?.getAllCryptocurrencies).toHaveLength(14);
       expect(res.data?.getAllCryptocurrencies[0]).toHaveProperty('id');
       expect(res.data?.getAllCryptocurrencies[0]).toHaveProperty('name');
     });

     it('fetches a specified number of cryptocurrencies', async () => {
       const { query } = createTestClient(server);
       const res = await query({
         query: GET_ALL_CRYPTOCURRENCIES,
         variables: { start: 1, limit: 5 },
       });

       expect(res.errors).toBeUndefined();
       expect(res.data).toBeDefined();
       expect(res.data?.getAllCryptocurrencies).toHaveLength(5);
     });

     // Add more test cases as needed
   });
   ```

4. **Run Tests**

   Add the following script to your `package.json`:

   ```json
   "scripts": {
     "test": "jest"
   }
   ```

   Execute the tests:

   ```bash
   npm run test
   ```

## Project Structure

```
graphql-coinmarketcap-server/
├── node_modules/
├── src/
│   ├── dataSources/
│   │   └── CoinMarketCapDataSource.ts
│   ├── types/
│   │   └── index.ts
│   ├── lfuCache.ts
│   ├── resolver.ts
│   └── server.ts
|    
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

- **`src/`**: Contains the source code.
  - **`dataSources/`**: Houses data source classes for interacting with external APIs.
  - **`types/`**: Defines TypeScript interfaces and types.
  - **`lfuCache.ts`**: Implements the LFU caching mechanism.
  - **`schema.ts`**: Defines the GraphQL schema using SDL.
  - **`server.ts`**: Sets up and starts the Apollo Server with Express.
- **`tests/`**: Contains automated test cases.
- **`.env`**: Stores environment variables.
- **`package.json`**: Manages project dependencies and scripts.
- **`tsconfig.json`**: Configures TypeScript compiler options.
- **`README.md`**: Project documentation.

## Caching Mechanism

### LFU (Least Frequently Used) Cache

An **LFU cache** is employed to store frequently accessed data, minimizing the number of API calls to CoinMarketCap and enhancing response times.

#### **Benefits:**

- **Optimized Performance**: Reduces latency by serving cached responses for popular queries.
- **Resource Efficiency**: Lowers API usage costs and adheres to rate limits.
- **Improved Scalability**: Supports handling high traffic with efficient data retrieval.

#### **Implementation Details:**

- **Cache Size**: Configurable via the `CACHE_MAX_SIZE` environment variable.
- **Cache Key Generation**: Combines endpoint and query parameters to create unique keys.
- **Eviction Policy**: Removes the least frequently accessed items when the cache reaches its maximum size.

#### **LFU Cache Class**

```typescript
// src/lfuCache.ts

interface CacheEntry<T> {
  value: T;
  frequency: number;
}

export default class LFUCache<T> {
  private maxSize: number;
  private cache: Map<string, CacheEntry<T>>;
  private frequencyMap: Map<number, number>;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
    this.frequencyMap = new Map();
  }

  // Get data from the cache
  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Update frequency
    const newFrequency = entry.frequency + 1;
    this.cache.set(key, { value: entry.value, frequency: newFrequency });

    // Update frequency map
    this.frequencyMap.set(entry.frequency, (this.frequencyMap.get(entry.frequency) || 1) - 1);
    if (this.frequencyMap.get(entry.frequency) === 0) {
      this.frequencyMap.delete(entry.frequency);
    }

    this.frequencyMap.set(newFrequency, (this.frequencyMap.get(newFrequency) || 0) + 1);

    return entry.value;
  }

  // Add data to the cache
  set(key: string, value: T): void {
    if (this.cache.has(key)) {
      // Update existing key
      const entry = this.cache.get(key)!;
      const newFrequency = entry.frequency + 1;
      this.cache.set(key, { value, frequency: newFrequency });

      // Update frequency map
      this.frequencyMap.set(entry.frequency, (this.frequencyMap.get(entry.frequency) || 1) - 1);
      if (this.frequencyMap.get(entry.frequency) === 0) {
        this.frequencyMap.delete(entry.frequency);
      }
      this.frequencyMap.set(newFrequency, (this.frequencyMap.get(newFrequency) || 0) + 1);
    } else {
      if (this.cache.size >= this.maxSize) {
        this.evict(); // Remove least frequently used item if at capacity
      }
      this.cache.set(key, { value, frequency: 1 });
      this.frequencyMap.set(1, (this.frequencyMap.get(1) || 0) + 1);
    }
  }

  // Evict least frequently used item
  private evict(): void {
    if (this.frequencyMap.size === 0) return;

    const minFrequency = Math.min(...this.frequencyMap.keys());

    for (const [key, entry] of this.cache.entries()) {
      if (entry.frequency === minFrequency) {
        this.cache.delete(key);
        this.frequencyMap.set(minFrequency, this.frequencyMap.get(minFrequency)! - 1);
        if (this.frequencyMap.get(minFrequency)! === 0) {
          this.frequencyMap.delete(minFrequency);
        }
        break;
      }
    }
  }
}
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

   Click the **Fork** button at the top-right corner of this page to create your own fork.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/graphql-coinmarketcap-server.git
   cd graphql-coinmarketcap-server
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Changes**

   Implement your feature or fix bugs.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request**

   Navigate to the original repository and click **New Pull Request**.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Contact

**Your Name** – [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/AJFX-01/Ezrah/](https://github.com/AJFX-01/Ezrah/)
```
