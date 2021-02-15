// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') ;

// module.exports = {
//     mongoURI: dbPassword
// };

const mongoose = require("mongoose");

function dbConfig() {
    /* mongoose
        .connect("mongodb+srv://Jyoti123:Priya123@cluster0.xmwft.mongodb.net/Jyoti?retryWrites=true&w=majority", {
            useNewUrlParser: true
        }) */
        mongoose
        .connect('mongodb://localhost:27017/bluehills',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        .then(() => console.log("connected to MongoDb"))
        .catch(err => console.log("could not connect to mongodb" + err));

}

//exporting the connection and configuration
module.exports.dbConfig = dbConfig;
