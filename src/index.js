const app = require('./app');
require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);


dburl = process.env.MONGODB_URL;
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const port = process.env.PORT || 5000;

db.on("error", console.error.bind(console, "mongodb connection error found: "));
db.once("open", () => {
  console.log(`Database is running.`);
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
});


