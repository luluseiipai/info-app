/* jshint esversion:6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  user:{ // 用户id
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text:{ // 文本
    type: String,
    required: true
  },
  title:{ // 标题
    type: String,
    required: true
  },
  name:{ // 昵称
    type: String
  },
  avatar:{ // 头像
    type: String,
    required: true
  },
  likes:[ // 点赞
    {
      user:{ // 用户id
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments:[ // 评论
    {
      user: { // 用户id
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text:{ // 文本
        type: String,
        required: true
      },
      name:{ // 昵称
        type: String
      },
      avatar:{ // 头像
        type: String,
        required: true
      },
      date:{ // 日期
        type: Date,
        default: Date.now
      }
    }
  ],
  date:{ // 日期
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('forums',forumSchema);