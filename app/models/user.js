var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
// var UserSchema = new Schema({
//   name: {
//         type: String,
//         unique: true,
//         required: true
//     },
//   password: {
//         type: String,
//         required: true
//     }
// });

var UserSchema = new Schema({
    local : {
        name : String,
        password : String
    },
    twitter : {
        id : String,
        token : String,
        tokenSecret : String,
        displayName  : String,
        photo : String
    },
    facebook : {
        id : String,
        token : String,
        refreshToken : String,
        displayName : String,
        email : String
    },
    google : {
        id : String,
        token : String,
        refreshToken : String,
        displayName : String,
        email : String,
        photo : String
    },
    yahoo : {
        id : String,
        token : String,
        tokenSecret : String,
        displayName : String
    },
    linkedin : {
        id : String,
        token : String,
        tokenSecret : String,
        displayName : String,
        email : String,
        industry : String,
        headline : String,
        photo : String
    },
    github : {
        id : String,
        token : String,
        refreshToken : String,
        displayName : String,
        email : String,
        photo : String
    }
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('local.password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.local.password, salt, function (err, hash) {
                console.log(err);
                if (err) {
                    return next(err);
                }
                user.local.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);