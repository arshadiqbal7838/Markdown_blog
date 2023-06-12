const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const ejsMate = require('ejs-mate');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the useCreateIndex option
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  } catch (err) {
    console.error('Error retrieving articles:', err);
    res.status(500).send('Internal Server Error');
  }
});



app.use('/articles', articleRouter);

app.listen(5000);
