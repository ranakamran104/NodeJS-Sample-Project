import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini Blog API",
      description:
        "API endpoints for a mini blog services documented on swagger",
      contact: {
        name: "Rana Kamran",
        email: "rana.kamran@invozone.dev",
        url: "https://github.com/ranakamran104/BlogAPI",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5001/api/v1",
        description: "Local server",
      },
      {
        url: "<your live url here>/api/v1",
        description: "Live server",
      },
    ],
    components: {
      securitySchemes: {
        jwtAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    // security: [
    //   {
    //     jwtAuth: [],
    //   },
    // ],
  },
  // looks for configuration in specified directories
  // apis: ["./router/*.js"],
  apis: ["./src/routes/*.js"],
}
const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
