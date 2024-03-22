const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
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
        }
    ]
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    })
})

module.exports = app