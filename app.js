const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json()); //application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const MONGODB_URI = "mongodb+srv://sagarj123:sagarj123@cluster0.m574a.mongodb.net/portfolio?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb://sagarj123:sagarj123@cluster0-shard-00-00.m574a.mongodb.net:27017,cluster0-shard-00-01.m574a.mongodb.net:27017,cluster0-shard-00-02.m574a.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-mq6yo7-shard-0&authSource=admin&retryWrites=true&w=majority";
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
    next();
})

app.use('/project',projectRoutes);
app.use('/auth',authRoutes);

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(result => {
            console.log("connect to database");
            app.listen(8080);
        })
        .catch(err => console.log(err));

