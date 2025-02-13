const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');

router.get('/', (req, res) => {
    res.send('Welcome to the Blog Application');
});

router.use('/posts', postsRouter);

module.exports = router;