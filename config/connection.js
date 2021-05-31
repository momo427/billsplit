const Sequelize = require("sequelize");
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306
    }
  );
};

module.exports = sequelize;


// process.env.DB_HOST,
// process.env.SESSION_SECRET,

// host: "localhost",
//       dialect: "mysql",
//DB_HOST=localhost
//SESSION_SECRET='super secret secret'




//console.log(process)