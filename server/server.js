require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/db");
const { User, Note } = require("./src/models"); // if you've defined them
const authRouter = require("./src/routes/authRoutes");;
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
});
const app = express();
app.use(cors());
app.use(express.json());

// Uncomment routes when ready
app.use("/api/auth", authRouter);
// app.use("/api/notes", require("./src/routes/noteRoutes"));

// Test DB connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected via Sequelize.");

    // Sync models
    // return sequelize.sync(); // { force: true } to reset tables
    sequelize.sync({ alter: true }).then(() => {
      console.log("Database synced");
    });
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Unable to connect to DB:", err);
  });
