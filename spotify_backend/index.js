// npm init : package.json -- This is a node project.
// npm i express : expressJs package install hogya. -- project came to know that we are using express
// We finally use express

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());



// console.log(process.env);

// connecting with databse
mongoose
   .connect(
 //   "mongodb+srv://nikurajj22:"+process.env.MONGO_PASSWORD+"<password>@cluster0.tgoffv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
   "mongodb+srv://nikurajj22:"
   +process.env.MONGO_PASSWORD+
   "@cluster0.tgoffv8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    
    {
       useNewUrlParser: true,
        useUnifiedTopology: true,


    }).then((x)=>{
        console.log("Connection to mongo estd");

    }).catch((err)=>{
        console.log("error in mongo connection");


    });

// passport jwt setup


// setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: jwt_payload.identifier}, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);




// api : get type :/: return type hello spotify\






app.get("/",(req,res)=>{
    // req is request data and res is response data


    res.send("Hello User");

});

app.use("/auth",authRoutes);

app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);



app.listen(port,()=>{

    console.log("App is running on port "+port);


});