import {Knex} from "knex";

const knex: Knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 49153,
        user: 'postgres',
        password: 'postgrespw',
        database: 'postgres'
    }
});

export default knex;