import express, { Application } from 'express'
import axios, { AxiosResponse } from 'axios'
import LFUCache from './lfuCache'
import { Cryptocurrency, ListingResponse } from './types'


const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const API_KEY = process.env.COINMARKETCAP_API_KEY;
const PORT = parseInt(process.env.PORT || '4000', 10);
const CACHE_MAX_SIZE = parseInt(process.env.CACHE_MAX_SIZE || '100', 10);

if (!API_KEY) {
    console.error('Error: COINMARKETCAP_API_KEY is not set in .env file.');
    process.exit(1);
}


  