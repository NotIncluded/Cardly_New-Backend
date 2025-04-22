const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Test routes
app.get('/', (req,res) => {
  res.send("Go to /api-docs for API documentation");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// // Routes
// const recordRoutes = require("./routes/record");
// app.use("/records", recordRoutes);

// Import the routes from the 'routes/record.js' file
const recordRoutes = require("./routes/record/record_routers");
const ratingRoutes = require("./routes/rating/rating_routers");

// Use the imported routes for the '/records' path
app.use('/api/record', recordRoutes);
app.use('/api/rating', ratingRoutes);

// User routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Swagger running on port http://localhost:${PORT}/api-docs`);
});
