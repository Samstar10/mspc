const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://samuelmuli95:CQd0jhCebPtjc7Bn@cluster0.nmhfkuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection failed!')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })

    console.log(post)
    res.status(201).json({
        message: 'Post added successfully!',
    })
})

app.get('/api/posts',(req, res, next) => {
    const posts = [
        {
            id: 'sjdncls',
            title: 'First Post',
            content: 'This is the first post'
        },
        {
            id: 'jdccsj',
            title: 'Second Post',
            content: 'This is the second post'
        },
        {
            id: 'biiwwkn',
            title: 'Third Post',
            content: 'This is the third post'
        }
    ]
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    })
})

module.exports = app



// CQd0jhCebPtjc7Bn
// samuelmuli95
// mongodb+srv://samuelmuli95:CQd0jhCebPtjc7Bn@cluster0.nmhfkuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0