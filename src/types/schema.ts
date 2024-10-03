import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Quote {
    price: Float
    volume_24h: Float
    volume_change_24h: Float
    percent_change_1h: Float
    percent_change_24h: Float
    percent_change_7d: Float
    market_cap: Float
    market_cap_dominance: Float
    fully_diluted_market_cap: Float
    last_updated: String
  }

  type QuoteCurrency {
    USD: Quote
    BTC: Quote
  }

  type Cryptocurrency {
    id: Int
    name: String
    symbol: String
    slug: String
    cmc_rank: Int
    num_market_pairs: Int
    circulating_supply: Float
    total_supply: Float
    max_supply: Float
    infinite_supply: Boolean
    last_updated: String
    date_added: String
    tags: [String]
    platform: String
    self_reported_circulating_supply: Float
    self_reported_market_cap: Float
    quote: QuoteCurrency
  }

  type Status {
    timestamp: String
    error_code: Int
    error_message: String
    elapsed: Int
    credit_count: Int
  }

  type ListingResponse {
    data: [Cryptocurrency]
    status: Status
  }

  type Query {
    getCryptocurrency(id: Int!): Cryptocurrency
    getAllCryptocurrencies(start: Int, limit: Int): [Cryptocurrency]
  }
`;

export default typeDefs;