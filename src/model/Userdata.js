const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
//mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.1k3dv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
        username: String,
        password: String,
        phoneno: Number
});
UserSchema.plugin(passportLocalMongoose);
var Userdata = mongoose.model('userdata',UserSchema);
module.exports = Userdata;