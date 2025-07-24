const sequelize = require("../config/db");
const User = require("./user");
const Note = require("./note");

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Note };
