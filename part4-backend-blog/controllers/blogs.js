const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => next(err));
});

blogRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => next(err));
});

blogRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog);
      } else {
        res
          .status(404)
          .send(`Blog with id: ${req.params.id} not found in database`);
      }
    })
    .catch(err => next(err));
});

blogRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id, (err, doc) => {
    if (doc === null) {
      return res
        .status(404)
        .send(`Blog with id ${req.params.id} does not exist`);
    }
    if (err) {
      next(err);
    } else {
      return res.status(204).json(doc);
    }
  });
});

module.exports = blogRouter;
