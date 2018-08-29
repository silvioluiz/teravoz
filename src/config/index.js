import logger from './logger';

import fetch from 'node-fetch';
global.fetch = fetch;

logger.info('Inicializando configurações');

const config = {
    logger,
    fetch
}

module.exports = config;

