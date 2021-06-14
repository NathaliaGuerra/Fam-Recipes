const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      // API informations (required)
      title: 'Fam Recipes - Documentation', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Fam Recipes - OrugaDigital', // Description (optional)
    },
    host: `localhost:${process.env.APP_PORT || 3030}`, // Host (optional)
    basePath: '/', // Base path (optional)
    components: {
        securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
        }
    },
};
  
// Options for the swagger docs
const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
    apis: ['./routes/*.js'],
};

const swaggerSpect = swaggerJSDoc(options);

module.exports = {
    swaggerSpect,
}
