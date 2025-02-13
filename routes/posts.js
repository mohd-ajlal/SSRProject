const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/new', (req, res) => {
    res.render('posts/new');
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        comments: req.body.comments,
        tag: req.body.tag
    });
    await post.save();
    res.redirect('/posts');
});

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('posts/index', { posts });
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/show', { post });
});

router.get('/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/edit', { post });
});

router.put('/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        comments: req.body.comments,
        tag: req.body.tag
    });
    res.redirect(`/posts/${req.params.id}`);
});

// DELETE - Delete Post
router.get('/:id/delete', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('posts/delete', { post });
});

router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts');
});

module.exports = router;