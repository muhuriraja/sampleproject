var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/27017');
// var db = mongoose.connection;
// db.on('error',console.error.bind(console, 'connection error: '));
// db.once('open', function callback(){
//     console.log("h");
// });

async function dbConnect() {
  try {
    await mongoose.connect(
      `mongodb+srv://nilAponiar:aponiar123@test.kdcjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db is connected");
  } catch (error) {
    console.error(error);
  }
}

module.exports = dbConnect;

