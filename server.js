/* jshint esversion:6 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// 启用express
const app = express();

// 引入路由
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const forums = require('./routes/api/forums');

// DB Config
const db = require('./config/keys').mongoURI;

// 使用 body-parser 中间件
// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符,只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib,返回的对象是一个键值对，当extended 为false的时候，键值对中的值为 'String' 或 'Array', 当为true的时候, 则可为任何数据类型
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 连接数据库MongoDB
mongoose.connect(db)
  .then(() => {console.log('MongoDB is connected!');})
  .catch((err) => {console.log(err);});

// 使用passport中间件
// passport初始化
app.use(passport.initialize());
require('./config/passport.js')(passport);

// 使用路由
app.use('/api/users',users);
app.use('/api/profiles',profiles);
app.use('/api/forums',forums);

// 启用5000端口或其他端口
const port = process.env.PORT || 5001;

app.listen(port,() => {
  console.log(`Server is running on port: ${port}`);
});