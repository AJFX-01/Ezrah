import axios, { AxiosResponse } from "axios";
import LFUCache from "./lfuCache";
import { ListingResponse, Cryptocurrency } from "./types";


class CoinMarketCapDataSource {
    private cache: LFUCache<ListingResponse>;
    private headers: { [key: string]: string };

    constructor() {
        this.cache = new LFUCache<ListingResponse>(Configs.CACHE_MAX_SIZE);
        this.headers = {
            'X-CMC_PRO_API_KEY': Configs.API_KEY!,
            'Accept': 'application/json',
        };
    }

    // Generate cache key based on endpoint and parameters
    private generateCacheKey(endpoint: string, params: { [key: string]: any }): string {
        const sortedParams = Object.keys(params)
            .sort()
            .map((key) => `${key}=${params[key]}`)
            .join('&');
        return `${endpoint}?${sortedParams}`;
    }

    // Fetch data from CoinMarketCap API with caching
    async fetchAPI(endpoint: string, params: { [key: string]: any } = {}): Promise<ListingResponse> {
        const cacheKey = this.generateCacheKey(endpoint, params);
        const cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return cachedData;
        }

        try {
            const response: AxiosResponse<ListingResponse> = await axios.get(endpoint, {
                headers: this.headers,
                params: params,
            });
            const data = response.data;
            this.cache.set(cacheKey, data);
            console.log(`Fetched and cached data for key: ${cacheKey}`);
            return data;
        } catch (error: any) {
            console.error(`Error fetching data from CoinMarketCap API: ${error.message}`);
            throw new Error('Failed to fetch data from CoinMarketCap API');
        }
    }

    // Get a single cryptocurrency by ID
    async getCryptocurrency(id: number): Promise<Cryptocurrency | null> {
        const data = await this.fetchAPI(Configs.API_URL, { id });
        return data.data.find((crypto) => crypto.id === id) || null;
    }

    // Get all cryptocurrencies with pagination
    async getAllCryptocurrencies(start: number, limit: number): Promise<Cryptocurrency[]> {
        const data = await this.fetchAPI(Configs.API_URL, { start, limit });
        return data.data;
    }
}

export default CoinMarketCapDataSource;