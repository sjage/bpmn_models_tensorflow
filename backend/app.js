const express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();
var cookieParser = require('cookie-parser');
let cors = require('cors');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if(isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
mongoose.connect('mongodb+srv://slavica:2a8BXBfYf6U36HG@cluster0-ude9e.mongodb.net/test?retryWrites=true')
.then(() => {
  console.log('connected to database');
})
.catch(() => {
  console.log('connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Content-Type", "application/json")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get('/api/bpmnelements', (req, res, next) => {
  console.log('req');
   Post.find().then(documents => {
     console.log('doc', documents);
    res.status(200).json({
        message: 'posts fetched',
        elements: documents
});
   });
  });
app.get('/api/tensorflow', (req, res, next) => {

})
app.post('/api/bpmnelements', (req, res, next) => {
  console.log('post request?', req.body);
  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    sub_cat: req.body.sub_cat,
    content: req.body.content,
    image: req.body.image
  }); 
  post.save();
  console.log('post', post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

module.exports = app;