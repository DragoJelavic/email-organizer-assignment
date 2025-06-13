const knex = require('knex');
const { Model } = require('objection');
const config = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

// Initialize Objection.js
Model.knex(db);

module.exports = db;
