module.exports = {
    database: process.env.WAFFLESTAY_DB_DATABASE,
    host: process.env.WAFFLESTAY_DB_HOST,
    port: process.env.WAFFLESTAY_DB_PORT,
    user: process.env.WAFFLESTAY_DB_USER,
    password: process.env.WAFFLESTAY_DB_PASSWORD,
    connectionLimit: 100,
    connectTimeout: 1000,
    multipleStatements: true,
};
