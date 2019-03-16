/* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{ // 账户名
    type: String,
    required: true
  },
  email:{ // 邮箱
    type: String,
    required: true
  },
  password:{ // 密码
    type: String,
    required: true
  },
  avatar:{ // 头像
    type: String
  },
  identity:{ // 身份
    type: String,
    required: true
  },
  date:{ // 日期
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users',userSchema);