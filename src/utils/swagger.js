
const { version } = require('../../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication Server",
      description:
        "This is an Aunthetication and Authorization Server.",
      version,
    },
    servers: [
      {
        url: process.env.BASEURL,
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/controllers/*.js",
    "./src/models/*.js",
    "./src/middlewares/*.js",
  ],
};

 const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;



