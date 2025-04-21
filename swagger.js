const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Record API',
            version: '1.0.0',
            description: 'API to manage records',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Optional: you can use env vars too
            },
        ],
    },
    apis: ['./routes/**/*.js'], // Path to the API docs
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec
