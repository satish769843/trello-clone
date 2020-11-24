const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://node-user:${process.env.MONGO_PWD}@satish.f113j.mongodb.net/dragList?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected ....');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
