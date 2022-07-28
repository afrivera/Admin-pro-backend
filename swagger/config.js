exports.configSwagger = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Admin Pro',
            version: '1.0.0',
            description: 'This Api is use for data management of Admin Pro',
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local server',
            },
            {
                url: 'here url production',
                description: 'Production',
            },
        ],
    },
    apis: ['./routes/*.js'],
}