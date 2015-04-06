var sslEnabled = false;
var path = require('path');


module.exports = {
    enviroment: "development",

    port: (process.env.PORT || 3000),

    middleware: {
        view_cache: false,
        logger_dev: true,
        less: false
    },

    model: {
        mongo: {
            database: "On9book", //can't user your own database name
            options: {
                host: "127.0.0.1"
            }
        }
    }
};