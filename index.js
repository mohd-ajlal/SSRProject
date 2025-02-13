const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const indexRoutes = require('./routes/index');
const postRoutes = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/ssrproject').then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/posts', postRoutes);

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});