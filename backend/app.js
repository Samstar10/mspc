const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');

const PostRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://samuelmuli95:CQd0jhCebPtjc7Bn@cluster0.nmhfkuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((error) => {
        console.log('Connection failed!', error)
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use("/api/posts" ,PostRoutes)
app.use("/api/user" ,userRoutes)

module.exports = app



// CQd0jhCebPtjc7Bn
// samuelmuli95
// mongodb+srv://samuelmuli95:CQd0jhCebPtjc7Bn@cluster0.nmhfkuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0