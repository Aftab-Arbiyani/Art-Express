// Set Environment Variables
import dotenv from "dotenv";
dotenv.config({ path: `./config/${process.env.NODE_ENV}.env` });

// Import App
import app from "./app";
import sequelize from "./sequelize";

const host = process.env.HOST;
const port = process.env.PORT || 3000;

const server = app.listen(port);

sequelize
  .sync()
  .then(() => {
    console.log("\x1b[32m • Database Connected successfully.\x1b[0m");
  })
  .catch((err) => {
    console.log("\x1b[31m • Unable to connect to the database.", err.message, '\x1b[0m');
  });

process.on("unhandledRejection", (reason, p) =>
  console.error("\x1b[31m • Unhandled Rejection at: Promise ", p, reason,'\x1b[0m')
);

server.on("listening", () => {
  console.info(`\x1b[32m • Express application started on \x1b[36mhttp://${host}:${port}\x1b[0m`);
});
