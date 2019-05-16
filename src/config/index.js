import fetch from 'node-fetch';
import logger from './logger';


global.fetch = fetch;

const config = {
  logger,
  fetch,
};

module.exports = config;
