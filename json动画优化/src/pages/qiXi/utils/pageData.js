// 情蝶兑奖默认数据
export const pointReward = {
  goods_list: [
    {
      desc: '用于提升技能等级，可增加成功率',
      exchange_times: 0,
      goods_icon: 'ljs_120_120.png',
      goods_icon_t: 'ljs_120_120.png',
      goods_id: 2,
      goods_name: '绿晶石',
      goods_num: 1,
      goods_num_text: '绿晶石+1',
      goods_type: 'tool',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 0,
      price: 1,
      price_text: '1',
      type: 'tools_ljs2'
    },
    {
      exchange_times: 0,
      goods_icon: 'xyys_120_120.png',
      goods_icon_t: 'xyys_120_120.png',
      goods_id: 0,
      goods_name: '钥匙',
      goods_num: 1,
      goods_num_text: '钥匙+1',
      goods_type: 'keys',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      is_second_half: false,
      max_times: 2,
      price: 50,
      price_text: '50',
      type: 'lucky_key'
    },
    {
      desc: '可在科举中使获得的元宝变为双倍',
      exchange_times: 0,
      goods_icon: 'sbk_120_120.png',
      goods_icon_t: 'sbk_120_120.png',
      goods_id: 1,
      goods_name: '科举双倍卡',
      goods_num: 1,
      goods_num_text: '科举双倍卡+1',
      goods_type: 'keju',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 5,
      price: 8,
      price_text: '8',
      type: 'keju'
    },
    {
      desc: '用于蛋蛋部落玩法中，召唤英雄',
      exchange_times: '0',
      goods_icon: 'zhs_120_120.png',
      goods_icon_t: 'zhs_120_120.png',
      goods_id: 4,
      goods_name: '召唤石',
      goods_num: 1,
      goods_num_text: '召唤石+1',
      goods_type: 'hero_tools',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 10,
      price: 30,
      price_text: '30',
      type: 'hero_tools_zhs'
    },
    {
      exchange_times: 0,
      goods_icon: '',
      goods_icon_t: '',
      goods_id: 4965,
      goods_name: '永久称号',
      goods_num: 0,
      goods_num_text: '永久称号+1',
      goods_type: 'title',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 600,
      price_text: '600',
      type: 'title'
    },
    {
      exchange_times: 0,
      goods_icon: '',
      goods_icon_t: '',
      goods_id: 80,
      goods_name: '火树银花',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_hsyh'
    },
    {
      exchange_times: 0,
      goods_icon: '',
      goods_icon_t: '',
      goods_id: 0,
      goods_name: '称呼返场',
      goods_num: 1,
      goods_num_text: '返场称号兑换N选一',
      goods_type: 'title_return',
      has_right: 0,
      is_lock: false,
      is_owned: false,
      max_times: 0,
      price: 480,
      price_text: 480,
      spend_cond: 600,
      type: 'title_return'
    },
    {
      desc: '用于提升技能等级，可增加成功率',
      exchange_times: '0',
      goods_icon: 'zjs_120_120.png',
      goods_icon_t: 'zjs_120_120.png',
      goods_id: 1,
      goods_name: '紫晶石',
      goods_num: 1,
      goods_num_text: '紫晶石+1',
      goods_type: 'tool',
      has_right: 0,
      is_lock: false,
      is_owned: false,
      max_times: 100,
      no_unlocked: 'zjs_120_120.png',
      price: 10,
      price_text: 10,
      spend_cond: 1000,
      type: 'tools_zjs'
    }
  ],
  love_open: false,
  my_goods: '0',
  spend_point: '0',
  task_list: {
    login: {
      award_nums: 5,
      finish_times: 0,
      has_right: '0',
      is_recharge: false,
      max_times: 1,
      need_rev: true,
      show_text: '5',
      task_name: '每日登录',
      piece: 2
    },
    keju: {
      award_nums: 5,
      finish_times: 0,
      has_right: 0,
      is_recharge: false,
      max_times: 1,
      need_rev: true,
      show_text: '5',
      task_name: '完成一次科举',
      piece: 2
    },
    recharge_once: {
      award_nums: 5,
      finish_times: 0,
      has_right: 0,
      is_recharge: true,
      max_times: 1,
      need_rev: true,
      show_text: '5',
      task_name: '完成一笔充值',
      piece: 2
    },
    masonry_consume: {
      award_nums: 10,
      finish_times: 0,
      has_right: 0,
      is_recharge: false,
      max_times: 1000,
      need_rev: true,
      piece: 4,
      show_text: '10',
      task_name: '消费1000钻'
    },
    recharge: {
      award_nums: 6,
      finish_times: 0,
      has_right: 0,
      is_recharge: false,
      max_times: 10,
      need_rev: false,
      show_text: '6',
      task_name: '每充值10元'
    }
  },
  user_icon: ''
}

// 充值有礼默认数据
export const rechargeRebate = {
  // 连续充值
  accruing_days_list: {
    10: {
      amount_cond: 10,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 60000,
          text: '6万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 1,
          text: '1',
          type: 'pretty_card'
        }
      ],
      days_cond: '3',
      has_right: 0,
      reach_days: 0
    },
    30: {
      amount_cond: 30,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 120000,
          text: '12万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 1,
          text: '1',
          type: 'pretty_card'
        }
      ],
      days_cond: '3',
      has_right: 0,
      reach_days: 0
    },
    50: {
      amount_cond: 50,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 160000,
          text: '16万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 1,
          text: '1',
          type: 'pretty_card'
        }
      ],
      days_cond: '3',
      has_right: 0,
      reach_days: 0
    },
    100: {
      amount_cond: 100,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 200000,
          text: '20万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 1,
          text: '1',
          type: 'pretty_card'
        }
      ],
      days_cond: '3',
      has_right: 0,
      reach_days: 0
    },
    300: {
      amount_cond: 300,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 400000,
          text: '40万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 1,
          text: '1',
          type: 'pretty_card'
        }
      ],
      days_cond: '3',
      has_right: 0,
      reach_days: 0
    }
  },
  // 累计充值
  recharge_status: {
    30: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 160000,
          text: '16万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 16,
          text: '16',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 1,
          text: '1',
          type: 'hero_tools'
        }
      ],
      condition: 30,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    50: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 220000,
          text: '22万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 22,
          text: '22',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 1,
          text: '1',
          type: 'hero_tools'
        }
      ],
      condition: 50,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    100: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 450000,
          text: '45万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 45,
          text: '45',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 2,
          text: '2',
          type: 'hero_tools'
        }
      ],
      condition: 100,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    200: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 880000,
          text: '88万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 88,
          text: '88',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 4,
          text: '4',
          type: 'hero_tools'
        }
      ],
      condition: 200,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    300: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 1300000,
          text: '130万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 130,
          text: '130',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 4,
          text: '4',
          type: 'hero_tools'
        }
      ],
      condition: 300,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    500: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 2000000,
          text: '200万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 200,
          text: '200',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 8,
          text: '8',
          type: 'hero_tools'
        }
      ],
      condition: 500,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    1000: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 3400000,
          text: '340万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 340,
          text: '340',
          type: 'tool'
        },
        {
          icon: 'zhs_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 30,
          text: '30',
          type: 'hero_tools'
        }
      ],
      condition: 1000,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    2000: {
      awards: [
        {
          icon: 'yb_60_60.png',
          name: '元宝',
          nums: 6000000,
          text: '600万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 600,
          text: '600',
          type: 'tool'
        },
        {
          icon: 'jbk24xs_60_60.png',
          id: 0,
          name: '24小时金币卡',
          nums: 10,
          text: '10',
          type: 'hero_tools'
        }
      ],
      condition: 2000,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    },
    5000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 12000000,
          text: '1200万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'ljs_120_120.png',
          id: 2,
          name: '绿晶石',
          nums: 1200,
          text: '1200',
          type: 'tool'
        },
        {
          icon: 'jbk24xs_120_120.png',
          id: 0,
          name: '24小时金币卡',
          nums: 20,
          text: '20',
          type: 'hero_tools'
        },
        {
          icon: 'ch_rsyj.gif',
          id: 4676,
          name: '称号',
          nums: 7,
          text: '7天',
          type: 'title'
        },
        {
          id: 0,
          name: '威望值',
          nums: 0.05,
          text: '称号属性：每次获得+基础威望值的5%，时效可叠加',
          type: 'prestige'
        }
      ],
      condition: 5000,
      has_right: 0,
      is_daily: true,
      recharge_nums: 0
    }
  },
  // 首次充值
  single_recharge_status: {
    awards: [
      {
        nums: 30000,
        show_text: '3万',
        tool_id: 'gamegold',
        type: 'property'
      },
      {
        id: 2,
        nums: 10,
        show_text: '10',
        type: 'tool'
      },
      {
        id: 47,
        nums: 1,
        show_text: '1天',
        type: 'car'
      }
    ],
    condition: 1,
    has_right: 0
  }
}

// 消费有礼默认数据
export const spendingGift = {
  user_gender: '0', // 性别
  user_icon: '', // 头像
  marriage_gift: {
    // 礼包
    awards: [
      {
        icon: '',
        id: 0,
        name: '头饰爱的告白',
        nums: 3,
        text: '头饰+3天',
        type: 'mic'
      },
      {
        icon: 'yb_120_120.png',
        id: 'gamegold',
        name: '元宝',
        nums: 200000,
        text: '+20万',
        type: 'property'
      }
    ],
    has_right: 0 // 按钮状态：0-不可领取，1-可以领取，2-已经领取
  },
  consume_status: {
    1000: {
      condition: 1000,
      consume_nums: 1000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 50000,
          text: '5万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 2,
          text: '2',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    2000: {
      condition: 2000,
      consume_nums: 2000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 100000,
          text: '10万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 2,
          text: '2',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    3000: {
      condition: 3000,
      consume_nums: 3000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 150000,
          text: '15万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 2,
          text: '2',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    5000: {
      condition: 5000,
      consume_nums: 5000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 200000,
          text: '20万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 4,
          text: '4',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    10000: {
      condition: 10000,
      consume_nums: 10000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 400000,
          text: '40万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 4,
          text: '4',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    20000: {
      condition: 20000,
      consume_nums: 20000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 600000,
          text: '60万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 4,
          text: '4',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    30000: {
      condition: 30000,
      consume_nums: 30000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 850000,
          text: '85万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 8,
          text: '8',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    50000: {
      condition: 50000,
      consume_nums: 50000,
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 1300000,
          text: '130万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 8,
          text: '8',
          icon: 'zhs_120_120.png'
        }
      ]
    },
    100000: {
      condition: 100000,
      consume_nums: '50000',
      has_right: 0,
      is_daily: true,
      awards: [
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 2000000,
          text: '200万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          tool_id: 4,
          nums: 8,
          text: '8',
          icon: 'zhs_120_120.png'
        }
      ]
    }
  }
}

// 以纸传情默认数据
export const loveName = {
  is_sign_in: false,
  user_icon: '',
  pair_status: false,
  love_words: [
    '你的名字，是我读过最短的情诗',
    '有你的陪伴，我的心才完整',
    '和你在一起，每一天都是浪漫',
    '你的笑容是我最美的风景',
    '你是我生命里最重要的存在',
    '爱上你，是我这辈子最正确的选择',
    '白茶清风无别事，我在等风又等你',
    '情长纸短，还吻你万千',
    '在月色与雪色之间，你是第三种绝色',
    '你是年少的欢喜，这句话反过来也是你',
    '就借着月光，再与你对望',
    '白茶清欢无别事，我在等风也等你',
    '假装看不见，余光千百遍',
    '被爱总是值得记录的',
    '重要的人安安稳稳放心上',
    '我喜欢你，不是情话，是心里话',
    '永远沉溺于温柔和让步',
    '最好的人就在身边',
    '我爱你有开始，但是没有结束',
    '爱没有定义，你与我同在就好',
    '始于心动，陷于温柔，有且仅有一个你',
    '俩人心，一世情，白头普，山海约',
    '愿得一人心，白首不相离',
    '结发为夫妻，恩爱俩不疑',
    '海上月是天上月，眼前人是心上人',
    '落俗不可避免，浪漫至死不渝',
    '望你珍重，吻你千万',
    '就算风散了冰雪，想念也会留存下来',
    '鸿是江边鸟，你是心上人',
    '风很温柔，花很浪漫，你很特别',
    '希望这份爱意撑过每个四季',
    '南方有嘉木，北方有相思',
    '喜欢是棋逢对手，爱好似甘拜下风',
    '此心安处，是有你的地方',
    '公开偏爱是爱一个人的基础',
    '我们相爱一生，一生还是太短',
    '我们涉身浪潮与爱。',
    '等我把愚勇熬成温柔',
    '倘若我双手合十的愿望里有你呢',
    '外面风大，和我回家',
    '遇见你花光了我所有的运气'
  ],
  my_words: '',
  intimacy: 0,
  pair_info: [
    {
      id: '',
      username: '',
      profile_image: ''
    },
    {
      id: '',
      username: '',
      profile_image: ''
    }
  ],
  select_info: {
    uid_mic_id: '',
    uid_title_id: '',
    tuid_mic_id: '',
    tuid_title_id: ''
  },
  equip_info: {},
  task_list: [
    {
      goods_id: 1,
      name: '时间素材',
      id: 0,
      type: 'common_goods',
      icon: 'mk4_3.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 1,
      has_right: 0
    },
    {
      goods_id: 2,
      name: '主页特效+5天',
      id: 29,
      type: 'costume',
      icon: 'mk4_17.png',
      nums: 5,
      intimacy: 0,
      max_intimacy: 9999,
      has_right: 0
    },
    {
      goods_id: 3,
      name: '头饰+5天',
      id: 0,
      id_list: [18, 17],
      type: 'mic',
      icon: '',
      nums: 5,
      intimacy: 0,
      max_intimacy: 20520,
      has_right: 0
    },
    {
      goods_id: 4,
      name: '永久称号',
      id: 0,
      id_list: [4939, 4938],
      type: 'title',
      icon: '',
      nums: 0,
      intimacy: 0,
      max_intimacy: 52000,
      has_right: 0
    },
    {
      goods_id: 5,
      name: '边框素材',
      id: 0,
      type: 'common_goods',
      icon: 'mk4_18.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 66666,
      has_right: 0
    },
    {
      goods_id: 6,
      name: '自定义情话素材',
      id: 0,
      type: 'common_goods',
      icon: 'mk4_19.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 79999,
      has_right: 0
    },
    {
      goods_id: 7,
      name: '比翼双飞戒指+1',
      id: 10,
      type: 'mic',
      icon: 'mk4_11_1.png',
      nums: 1,
      text: '价值20999',
      intimacy: 0,
      max_intimacy: 99999,
      has_right: 0
    }
  ]
}

// 每日运势默认数据
export const dailyFortune = {
  masonry_consume: 0,
  user_coins: '0',
  sign_info: {
    sign_type: 0
  },
  exchange_list: [
    {
      goods_id: 1,
      award1: [
        {
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 25,
          name: '绿晶石',
          text: '+25'
        }
      ],
      award2: [
        {
          id: 1,
          type: 'tool',
          icon: 'zjs_120_120.png',
          nums: 2,
          name: '紫晶石',
          text: '+2',
          weight: '25'
        },
        {
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 10000,
          name: '元宝',
          text: '+1万',
          weight: '25'
        },
        {
          id: 1,
          type: 'tool',
          icon: 'zjs_120_120.png',
          nums: 1,
          name: '紫晶石',
          text: '+1',
          weight: '25'
        },
        {
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 5,
          name: '绿晶石',
          text: '+55',
          weight: '25'
        }
      ],
      org_price: 4,
      real_price: 4
    },
    {
      goods_id: 2,
      award1: [
        {
          id: 0,
          type: 'hero_gold',
          icon: 'jb_120_120.png',
          nums: 150000,
          name: '金币',
          text: '+15万'
        }
      ],
      award2: [
        {
          id: 7,
          type: 'hero_tools',
          icon: 'py_120_120.png',
          nums: 10,
          name: '璞玉',
          text: '+10',
          weight: '35'
        },
        {
          id: 80,
          type: 'mic',
          icon: '',
          nums: 1,
          name: '火树银花头饰',
          text: '头饰+1天',
          weight: '35'
        },
        {
          id: 4,
          type: 'hero_tools',
          icon: 'zhs_120_120.png',
          nums: 1,
          name: '召唤石',
          text: '+1',
          weight: '20'
        },
        {
          id: 51,
          type: 'car',
          icon: 'asqbt_120_120.png',
          nums: 1,
          name: '爱神丘比特座驾',
          text: '座驾+1天',
          weight: '10'
        }
      ],
      org_price: 12,
      real_price: 12
    },
    {
      goods_id: 3,
      award1: [
        {
          id: 11,
          type: 'ring',
          icon: 'mtjz_120_120.png',
          nums: 1,
          name: '戒指',
          text: '戒指+1'
        }
      ],
      award2: [
        {
          id: 57,
          type: 'pst_privilege',
          icon: 'hshs_120_120.png',
          nums: 1,
          name: '好柿花生礼物赠送权',
          text: '赠送权+1天',
          weight: '20'
        },
        {
          id: 19,
          type: 'tool',
          icon: 'sjmg_120_120.png',
          nums: 20,
          name: '水晶玫瑰',
          text: '+20',
          weight: '30'
        },
        {
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 20000,
          name: '元宝',
          text: '+2万',
          weight: '20'
        },
        {
          id: 5,
          type: 'tool',
          icon: 'msm_120_120.png',
          nums: 5,
          name: '魔术帽',
          text: '+5',
          weight: '30'
        }
      ],
      org_price: 20,
      real_price: 20
    }
  ]
}

// 长情回顾默认数据
export const longLoveReviewData = {
  cp_info: {
    icon_info: {
      uid: 0,
      username: '',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png'
    },
    days: 1,
    sweet: '0',
    cp_day: '2023-08-10',
    week: '星期四'
  },
  task_list: [
    {
      task_id: 1,
      icon: 'thb_50_50.png',
      name1: '结成CP已经3天了',
      name2: '或甜蜜值达到20,520',
      text: '桃花币+1天',
      nums: 1,
      days: '3',
      sweet: '20520',
      has_right: 0
    },
    {
      task_id: 2,
      icon: 'thb_50_50.png',
      name1: '结成CP已经7天了',
      name2: '或甜蜜值达到52,000',
      text: '桃花币+1天',
      nums: 1,
      days: '7',
      sweet: '52000',
      has_right: 0
    },
    {
      task_id: 3,
      icon: 'thb_50_50.png',
      name1: '结成CP已经30天了',
      name2: '或甜蜜值达到99,999',
      text: '桃花币+1天',
      nums: 1,
      days: '30',
      sweet: '99999',
      has_right: 0
    },
    {
      task_id: 4,
      icon: 'thb_50_50.png',
      name1: '结成CP已经180天了',
      name2: '或甜蜜值达到131,452',
      text: '桃花币+1天',
      nums: 2,
      days: '180',
      sweet: '131452',
      has_right: 0
    },
    {
      task_id: 5,
      icon: 'thb_50_50.png',
      name1: '结成CP已经365天了',
      name2: '或甜蜜值达到205,200',
      text: '桃花币+1天',
      nums: 3,
      days: '365',
      sweet: '205200',
      has_right: 0
    }
  ]
}

// 七夕冲榜主页信息（财富榜）
export const qixiRank = {
  my_username: '',
  my_profile_image:
    'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
  belong_server: '1',
  my_total_recharge: 0,
  my_daily_recharge: 0,
  daily_rank: [
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      time: 0,
      rank: 1
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      time: 0,
      rank: 2
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      time: 0,
      rank: 3
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 4
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 5
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 6
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 7
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 8
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 9
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 10
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 11
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 12
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 13
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 14
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 15
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 16
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 17
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 18
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 19
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 20
    }
  ],
  total_rank: [
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      time: 0,
      rank: 1
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      time: 0,
      rank: 2
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      time: 0,
      rank: 3
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 4
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 5
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 6
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 7
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 8
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 9
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 10
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 11
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 12
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 13
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 14
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 15
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 16
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 17
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 18
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 19
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 20
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 21
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 22
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 23
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 24
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 25
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 26
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 27
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 28
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      time: 0,
      rank: 29
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      time: 0,
      rank: 30
    }
  ]
}

// cp榜单信息
export const cpList = {
  // self_daily_rank: {
  //   uid: '20011',
  //   username: '',
  //   profile_image:
  //     'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
  //   tuid: '20013',
  //   tusername: '',
  //   tprofile_image:
  //     'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
  //   num: 0,
  //   rank: '20+'
  // },
  // self_total_rank: {
  //   uid: '20011',
  //   username: '',
  //   profile_image:
  //     'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
  //   tuid: '20013',
  //   tusername: '',
  //   tprofile_image:
  //     'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
  //   num: 0,
  //   rank: '20+'
  // },
  belong_server: '1',
  rank_tabs: {
    1: '倾国倾城',
    2: '情深意长',
    99: '异地恋'
  },
  daily_rank: [
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      num: 0,
      rank: 1
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      num: 0,
      rank: 2
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      num: 0,
      rank: 3
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 4
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 5
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 6
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 7
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 8
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 9
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 10
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 11
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 12
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 13
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 14
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 15
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 16
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 17
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 18
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 19
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 20
    }
  ],
  total_rank: [
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      num: 0,
      rank: 1
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      num: 0,
      rank: 2
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink1.png',
      num: 0,
      rank: 3
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 4
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 5
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 6
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 7
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 8
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 9
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 10
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 11
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 12
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 13
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 14
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 15
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 16
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 17
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 18
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink2.png',
      num: 0,
      rank: 19
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      tuid: 0,
      tusername: '虚位以待',
      tprofile_image:
        'http://imagevo.dandanvoice.com/app/activity/head/no_seat_pink3.png',
      num: 0,
      rank: 20
    }
  ]
}

// 按钮文本
export const ButtonTexts = {
  // 0：未完成，1：领取，2：已领取
  GoodsTask: {
    0: '未完成',
    1: '领取',
    2: '已领取'
  },
  // 1：兑换，2：已兑换
  chargeGoods: {
    1: '兑换',
    2: '已兑换'
  },
  // 积分兑奖弹框
  dialogRbtn: {
    title: '兑换并佩戴',
    mic: '兑换并装扮',
    car: '兑换并装备',
    keys: '兑2个',
    pretty_card: '兑2个'
  },
  // 0：去完成，1：领取，2：已领取
  rechargeStatus: {
    0: '去完成',
    1: '领取',
    2: '已领取'
  }
}

// 按钮样式
export const ButtonStyle = {
  // 积分兑奖任务列表
  GoodsTask: {
    1: 'theme_botton_did',
    2: 'theme_botton_done'
  },
  // 积分兑奖兑换好礼
  ChargeGoods: {
    1: 'theme_botton_undid',
    2: 'theme_botton_done'
  }
}
