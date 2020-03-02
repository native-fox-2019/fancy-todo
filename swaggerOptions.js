module.exports = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Fancy Todo API Documentation",
            version: "1.0.0",
            description: "JSON API for Fancy Todo app",
            license: {
                name: "MIT"
            },
            contact: {
                name: "Rofandi"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: [
        "./models/todo.js",
        "./controllers/ToDoController.js"
    ]
};