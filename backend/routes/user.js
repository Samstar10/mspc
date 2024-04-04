const express = require('express')

const router = express.Router()

router.post('/signup', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
})

module.exports = router