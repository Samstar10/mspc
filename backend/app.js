const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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

    post.save()
    .then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully!',
            postId: createdPost._id
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating a post failed!'
        })
    })
})

app.get('/api/posts',(req, res, next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: posts
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        })
    })
})

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
    .then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Post deleted!'
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Deleting posts failed!'
        })
    })
})

module.exports = app



// CQd0jhCebPtjc7Bn
// samuelmuli95
// mongodb+srv://samuelmuli95:CQd0jhCebPtjc7Bn@cluster0.nmhfkuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0