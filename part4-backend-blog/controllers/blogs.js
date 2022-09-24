const blogRouter = require('express').Router();
const Blog = require('../models/blog');

//without async/await
// blogRouter.get('/', (req, res, next) => {
//   Blog.find({})
//     .then(blogs => {
//       res.json(blogs);
//     })
//     .catch(err => next(err));
// });

//async/await
// blogRouter.get('/', async (req, res, next) => {
//   try {
//     const blogsReturned = await Blog.find({});
//     res.json(blogsReturned);
//   } catch (exception) {
//     next(exception);
//   }
// });

//using express-async-errors
blogRouter.get('/', async (req, res) => {
  const blogsReturned = await Blog.find({});
  res.json(blogsReturned);
});

//without async/await
// blogRouter.post('/', (req, res, next) => {
//   const blog = new Blog(req.body);

//   blog
//     .save()
//     .then(result => {
//       res.status(201).json(result);
//     })
//     .catch(err => next(err));
// });

//async/await
// blogRouter.post('/', async (req, res, next) => {
//   const blog = new Blog(req.body);
//   try {
//     const savedBlog = await blog.save();
//     res.status(201).json(savedBlog);
//   } catch (exception) {
//     next(exception);
//   }
// });

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

//without async/await
// blogRouter.get('/:id', (req, res, next) => {
//   Blog.findById(req.params.id)
//     .then(blog => {
//       if (blog) {
//         res.json(blog);
//       } else {
//         res
//           .status(404)
//           .send(`Blog with id: ${req.params.id} not found in database`);
//       }
//     })
//     .catch(err => next(err));
// });

//async/await
// blogRouter.get('/:id', async (req, res, next) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (blog) {
//       res.json(blog);
//     } else {
//       res
//         .status(404)
//         .send(`Blog with id: ${req.params.id} not found in database`);
//     }
//   } catch (exception) {
//     next(exception);
//   }
// });

//express-async-errors
blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res
      .status(404)
      .send(`Blog with id: ${req.params.id} not found in database`);
  }
});

//without async/await
// blogRouter.delete('/:id', (req, res, next) => {
//   Blog.findByIdAndDelete(req.params.id, (err, doc) => {
//     if (doc === null) {
//       return res
//         .status(404)
//         .send(`Blog with id ${req.params.id} does not exist`);
//     }
//     if (err) {
//       next(err);
//     } else {
//       return res.status(204).json(doc);
//     }
//   });
// });

//with async/await
// blogRouter.delete('/:id', async (req, res, next) => {
//   try {
//     await Blog.findByIdAndRemove(req.params.id);
//     res.status(204).end();
//   } catch (exception) {
//     console.log(exception);
//     next(exception);
//   }
// });

//express-async-errors
blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

// blogRouter.put('/:id', async (req, res, next) => {
//   const body = req.body;
//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   };
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
//       new: true,
//       runValidators: true,
//       context: 'query',
//     });

//     res.status(202).json(updatedBlog);
//   } catch (exception) {
//     next(exception);
//   }
// });

//express-async-errors
blogRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  res.status(202).json(updatedBlog);
});

module.exports = blogRouter;
