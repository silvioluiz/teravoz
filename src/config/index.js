import logger from './logger';
import fetch from 'node-fetch';

global.fetch = fetch;

const config = {
    logger,
    fetch
}



module.exports = config;

