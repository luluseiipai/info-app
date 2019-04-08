/* jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user:{ // 用户id
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle:{ // 文档id
      type:String,
      required:true,
      max:40
  },
  name:{ // 姓名
    type: String,
    required: true
  },
  tel:{ // 手机
    type: String,
    required: true
  },
  birth:{ // 生日
    type: String,
    required: true
  },
  location:{ // 位置
    type: [String]
  },
  status:{ // 在职状态
    type: String,
    required:true
  },
  position:{ // 职位
    type: String
  },
  skills:[ // 技能
    {
      skillName:{ // 技能名
        type: String,
        required: true
      },
      proficient:{ // 熟练度
        type: String,
        required: true
      }
    }
  ],
  rewards:[ // 获奖经历
    {
      rewardName:{ // 获奖名称
        type: String,
        required: true
      },
      organizer:{ // 主办组织
        type: String,
        required: true
      },
      time:{ // 获奖日期
        type: String,
        required: true
      }
    }
  ],
  bio:{ // 简介
    type: String
  },
  website:{ // 网址
    type: String
  },
  githubName:{ // github 昵称
    type: String
  },
  education:[ // 教育经历
    {
      school:{ // 学校
        type: String,
        required:true
      },
      degree:{ // 学位
        type: String,
        required:true
      },
      class:{ // 班级
        type: String,
        required:true
      },
      major:{ // 专业
        type: String,
        required:true
      },
      scoreRank:{ // 学习排名
        type: String,
        required: true
      },
      from:{ // 开始时间
        type: String,
        required:true
      },
      to:{ // 结束时间
        type: String
      },
      description:{ // 描述
        type: String
      }
    }
  ],
  experience:[ // 工作经验
    {
      title:{ // 头衔
        type: String,
        required: true
      },
      company:{ // 公司名
        type: String,
        required: true
      },
      location:{ // 具体地址
        type: String,
        required: true
      },
      from:{ // 开始时间
        type: String,
        required: true
      },
      to:{ // 结束时间
        type: String,
        required:true
      },
      description:{ // 描述
        type: String
      }
    }
  ],
  projects:[ // 项目经验
    {
      projectName:{ // 项目名称
        type: String,
        required: true
      },
      position:{ // 担任位置
        type: String,
        required: true
      },
      projectDesc:{ // 项目描述
        type: String
      },
      charge:{ // 负责内容
        type: String
      },
      from:{ // 开始时间
        type: String,
        required:true
      },
      to:{ // 结束时间
        type: String
      }
    }
  ],
  link:{ // 其他联系方式
    wechat:{ // 微信
      type:String
    },
    qq:{ // qq
      type:String
    }
  },
  date:{ // 信息创建日期
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profiles',profileSchema);