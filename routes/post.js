var express = require('express');
const Post = require('../models/post');
const Like = require('../models/like');
const Save = require('../models/save');
const Comment = require('../models/comment');
const mongoose = require('mongoose');
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })
const fs = require('fs-extra');
var router = express.Router();


router.post('/add',
  uploads.single('post-image'),
  async function (req, res, next) {

    let buffer, base64String = '';

    // Read the uploaded file 
    if (req.file) {
      let fileContent = fs.readFileSync(req.file.path);

      // Convert the image to base64
      buffer = Buffer.from(fileContent);
      base64String = buffer.toString('base64');
    }

    // Add the post to the database    
    try {
      let newPost = await Post.create(Object.assign(req.body, {
        image: base64String
      }));

      const successMessage = "Successfully published a post";
      return res.send(`<script>alert('${successMessage}');</script><script>window.location.href='/home';</script>`);
    } catch (err) {
      const errorMessage = err.message;
      return res.send(`<script>alert('${"An empty post cannot be published"}');</script><script>window.location.href='/home';</script>`
      );
    }

  });

router.post('/like',
  async function (req, res, next) {

    // Add the post to the database
    try {
      const newLike = await Like.create(req.body);
      return res.redirect('/home');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

router.post('/save',
  async function (req, res, next) {

    console.log('post/save');
    // Add the post to the database
    try {
      const newSave = await Save.create(req.body);
      return res.redirect('/home');
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

router.get('/delete/:postId',
  async function (req, res, next) {

    console.log(`post/delete [${req.params.postId}]`);
    await Post.findByIdAndDelete({ _id: req.params.postId });
    return res.redirect('/personalArea/view');

  });

router.post('/comment',
  async function (req, res, next) {

    console.log('post/comment');
    // Add the post to the database
    try {
      const newSave = await Comment.create({
        postId: req.body.commentPostId,
        comment: req.body.postComment
      });
      // Success message
      const successMessage = "Successfully published a post";
      return res.send(`<script>alert('${successMessage}');</script><script>window.location.href='/home';</script>`);
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });


module.exports = router;
