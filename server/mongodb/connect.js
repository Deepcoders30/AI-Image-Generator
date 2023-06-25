const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = { connectDB };
