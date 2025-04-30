const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require('cors')

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

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
const bookmarkRoutes = require("./routes/bookmark/bookmark_routers");
const coverRoutes = require('./routes/cover/cover_routers')

// Use the imported routes for the '/records' path
app.use('/api/record', recordRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/cover', coverRoutes)
// User routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Swagger running on port http://localhost:${PORT}/api-docs`);
});
