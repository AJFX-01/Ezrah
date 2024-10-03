// Load environment variables

class Configs {
    static API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    static API_KEY = process.env.COINMARKETCAP_API_KEY;
    static PORT = parseInt(process.env.PORT || '4000', 10);
    static CACHE_MAX_SIZE = parseInt(process.env.CACHE_MAX_SIZE || '100', 10);
}

export default Configs;