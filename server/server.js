require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const authRouter = require("./src/routes/authRoutes.js");
const morgan = require("morgan");
const createResponse = require("./src/utils/helper.js");
const noteRoutes = require("./src/routes/noteRoutes.js");
sequelize.sync().then(() => {
  console.log("✅ DB synced");
});
const app = express();
app.use(cors());
app.use(express.json());
// morgan.token("body", (req) => JSON.stringify(req.body));
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms :body")
// );

// Uncomment routes when ready
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRoutes);

app.get("/api/test", (req, res) => {
  return createResponse(res, true, 200, "API_WORKING_SUCESS_TRIAL", {
    user: "Jenil Gajera",
  });
});

// Test DB connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected via Sequelize.");

    // Sync models
    // return sequelize.sync(); // { force: true } to reset tables
    sequelize.sync({ alter: false }).then(() => {
      console.log("✅ Database synced");
    });
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Unable to connect to DB:", err);
  });
