export const pageData = {
  user_icon: 'https://cdn-image.dandan818.com/app/head/head_block_1.png', // 用户头像
  candy_nums: 0, // 糖果数
  room_id: '', // 聊天室id，用于聊天室跳转用，空时则不跳转
  goods_list: [
    // 糖果兑换奖励列表
    {
      goods_id: 1, // 商品id，用于兑换请求传值
      type: 'tool',
      tool_id: 2,
      icon: 'ljs_120_120.png',
      nums: 5,
      name: '绿晶石',
      text: '绿晶石+5',
      price: 5, // 需要消耗糖果数
      has_right: 1 // 按钮状态：0-未解锁，1-兑换，2-已兑换
    },
    {
      goods_id: 2,
      type: 'keju',
      tool_id: 0,
      icon: 'sbk_120_120.png',
      nums: 1,
      name: '科举双倍卡',
      text: '科举双倍卡+1',
      price: 10,
      has_right: 0
    },
    {
      goods_id: 3,
      type: 'mic',
      tool_id: 0,
      icon: '',
      nums: 1,
      name: '尖叫之夜',
      text: '头饰+1天',
      price: 15,
      has_right: 0
    },
    {
      goods_id: 4,
      type: 'special_pumpkin',
      tool_id: 0,
      icon: 'sqng_120_120.png',
      nums: 1,
      name: '神奇南瓜',
      text: '神奇南瓜+1',
      price: 20,
      has_right: 0
    },
    {
      goods_id: 5,
      type: 'tool',
      tool_id: 1,
      icon: 'zjs_120_120.png',
      nums: 2,
      name: '紫晶石',
      text: '紫晶石+2',
      price: 20,
      has_right: 0
    },
    {
      goods_id: 6,
      type: 'mic',
      tool_id: 0,
      icon: '',
      nums: 7,
      name: '幽冥魔灵',
      text: '头饰+7天',
      price: 100,
      has_right: 0
    },
    {
      goods_id: 7,
      type: 'tool',
      tool_id: 2,
      icon: 'ljs_120_120.png',
      nums: 20,
      name: '绿晶石',
      text: '绿晶石+20',
      price: 20,
      has_right: 0
    },
    {
      goods_id: 8,
      type: 'hero_tools',
      tool_id: 4,
      icon: 'zhs_120_120.png',
      nums: 1,
      name: '召唤石',
      text: '召唤石+1',
      price: 30,
      has_right: 0
    },
    {
      goods_id: 9,
      type: 'special_pumpkin',
      tool_id: 0,
      icon: 'sqng_120_120.png',
      nums: 1,
      name: '神奇南瓜',
      text: '神奇南瓜+1',
      price: 20,
      has_right: 0
    },
    {
      goods_id: 10,
      type: 'pst_privilege',
      tool_id: 0,
      icon: 'jxwsy_120_120.png',
      nums: 7,
      name: '惊喜万圣夜礼物赠送权',
      text: '礼物赠送权+7天',
      label: '价值299',
      price: 200,
      has_right: 0
    },
    {
      goods_id: 11,
      type: 'special_box',
      tool_id: 0,
      icon: '',
      nums: 0,
      name: '神奇宝箱',
      text: '',
      price: 10,
      has_right: 0
    }
  ],
  daily_task_list: [
    // 每日任务
    {
      task_id: 1, // 任务id，用于领取任务奖励传值
      task_name: '每日登录',
      finish_time: 1, // 完成的次数
      max_time: 1, // 最大次数
      award_nums: 5, // 奖励的糖果数
      award_text: '糖果+5',
      has_right: 0 // 按钮状态：0-未完成/去完成，1-领取，2-已领取
    },
    {
      task_id: 2,
      task_name: '向1位玩家赠送任意礼物',
      finish_time: 0,
      max_time: 1,
      award_nums: 5,
      award_text: '糖果+5',
      has_right: 0
    },
    {
      task_id: 3,
      task_name: '完成1笔充值',
      finish_time: 0,
      max_time: 1,
      award_nums: 5,
      award_text: '糖果+5',
      has_right: 0
    },
    {
      task_id: 4,
      task_name: '在聊天室累计在线10分钟',
      finish_time: 0,
      max_time: 10,
      award_nums: 5,
      award_text: '糖果+5',
      has_right: 0
    }
  ],
  limit_task_list: [
    // 限定任务
    {
      task_id: 5,
      task_name: '活动期间，银卡/金卡/黑卡会员可领取20个糖果',
      award_nums: 20, // 奖励的糖果数
      award_text: '糖果+20',
      desc: '',
      need_rev: 1, // 奖励领取类型：1-需要手动领取，0-自动发放
      has_right: 0 // 按钮状态：0-未完成/去完成，1-领取，2-已领取
    },
    {
      task_id: 6,
      task_name: '每消耗200钻',
      award_nums: 10,
      award_text: '糖果+10',
      desc: '当前已消耗钻石：0',
      need_rev: 0,
      has_right: 0
    }
  ],
  title_exchange: {
    // 神奇南瓜兑换称号
    type: 'title',
    tool_id: 0,
    icon: '',
    nums: false,
    name: '万圣派对',
    text: '永久称号',
    max: 5, // 需要的最大南瓜数
    finish_nums: 0, // 用户拥有的南瓜数
    has_right: 1 // 按钮状态：1-兑换，2-已兑换
  }
}
export const magic_box_awards = [
  {
    icon: 'sqng_120_120.png',
    text: '神奇南瓜+1'
  },
  {
    icon: 'ljs_120_120.png',
    text: '绿晶石+10'
  },
  {
    icon: 'zjs_120_120.png',
    text: '紫晶石+1'
  },
  {
    icon: 'jb_120_120.png',
    text: '金币+2万'
  },
  {
    icon: 'yb_120_120.png',
    text: '元宝+1万'
  }
]
