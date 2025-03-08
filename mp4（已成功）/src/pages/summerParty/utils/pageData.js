// 积分兑奖默认数据
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
      goods_name: '幸运钥匙',
      goods_num: 1,
      goods_num_text: '幸运钥匙+1',
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
      goods_id: 4942,
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
      goods_icon: 'sgw_120_120.png',
      goods_icon_t: 'sgw_120_120.png',
      goods_id: 6,
      goods_name: '口香糖',
      goods_num: 1,
      goods_num_text: '口香糖+1',
      goods_type: 'tool',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 10,
      price: 50,
      price_text: '50',
      type: 'tools_sgw'
    },
    {
      exchange_times: 0,
      goods_icon: '',
      goods_icon_t: '',
      goods_id: 11,
      goods_name: '嗨起来',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_hql'
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
      task_name: '每日登录'
    },
    keju: {
      award_nums: 5,
      finish_times: 0,
      has_right: 0,
      is_recharge: false,
      max_times: 1,
      need_rev: true,
      show_text: '5',
      task_name: '完成一次科举'
    },
    recharge_once: {
      award_nums: 5,
      finish_times: 0,
      has_right: 0,
      is_recharge: true,
      max_times: 1,
      need_rev: true,
      show_text: '5',
      task_name: '完成一笔充值'
    },
    masonry_consume: {
      award_nums: 10,
      finish_times: 0,
      has_right: 0,
      is_recharge: false,
      max_times: 1000,
      need_rev: true,
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

// 充值返利默认数据
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
      days_cond: '4',
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
      days_cond: '4',
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
      days_cond: '4',
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
      days_cond: '4',
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
      days_cond: '4',
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
          icon: 'ljs_60_60.png',
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

// 礼尚往来
export const presentContact = {
  award_list: [
    {
      key: 5000, // key值用于领取该项奖励请求时mark值
      finish_nums: 0, // 用户已完成的累积打劫礼物价值数
      max_nums: 5000, // 累积打劫礼物价值达成奖励的最大数目
      type: 'tool',
      id: 2,
      text: '100',
      icon: 'ljs_60_60.png',
      nums: 0,
      has_right: 0 // 领取按钮状态：0-不可以领取，1-可以领取，2-已领取
    },
    {
      max_nums: 10000,
      type: 'tool',
      id: 9,
      nums: 0,
      text: '50',
      icon: 'fbs_60_60.png',
      key: 10000,
      finish_nums: 0,
      has_right: 0
    },
    {
      max_nums: 15000,
      type: 'tool',
      id: 2,
      nums: 0,
      text: '280',
      icon: 'ljs_60_60.png',
      key: 15000,
      finish_nums: 0,
      has_right: 0
    },
    {
      max_nums: 20000,
      type: 'tool',
      id: 1,
      nums: 0,
      text: '80',
      icon: 'zjs_60_60.png',
      key: 20000,
      finish_nums: 0,
      has_right: 0
    }
  ],
  consume_status: {
    // 累计消费返利列表
    1000: {
      condition: 1000,
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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
      consume_nums: 0,
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

// 海底宝藏
export const summerTreasure = {
  simple_lottery_list: [
    // 许愿池
    {
      id: 1,
      text: '座驾+3',
      textAna: '座驾+3天',
      type: 'car',
      tool_id: 1,
      nums: 7,
      icon: 'zj_120_120.png', // 图标
      number: 1, // 商品剩余份数数
      sort: 1 // 排序
    },
    {
      id: 2,
      text: '+2万',
      textAna: '绿晶石+10',
      type: 'tool',
      tool_id: 2,
      nums: 10,
      icon: 'yb_120_120.png',
      number: 3,
      sort: 2
    },
    {
      id: 3,
      text: '+1',
      textAna: '元宝+2万',
      type: 'property',
      tool_id: 'gamegold',
      nums: 20000,
      icon: 'kxt_120_120.png',
      number: 3,
      sort: 3
    },
    {
      id: 4,
      text: '+5',
      textAna: 'OK绷+1',
      type: 'tool',
      tool_id: 6,
      nums: 1,
      icon: 'ljs_120_120.png',
      number: 2,
      sort: 4
    },
    {
      id: 5,
      text: '+5',
      textAna: '神功丸+1',
      type: 'tool',
      tool_id: 6,
      nums: 1,
      icon: 'py_120_120.png',
      number: 2,
      sort: 5
    },
    {
      id: 6,
      text: '+1',
      textAna: '口香糖+1',
      type: 'tool',
      tool_id: 6,
      nums: 1,
      icon: '',
      number: 2,
      sort: 6
    },
    {
      id: 7,
      text: '+1',
      textAna: '魔术帽+1',
      type: 'tool',
      tool_id: 5,
      nums: 1,
      icon: 'yb_120_120.png',
      number: 2,
      sort: 7
    },
    {
      id: 8,
      text: '+1',
      textAna: '聚宝盆+1',
      type: 'tool',
      tool_id: 7,
      nums: 1,
      icon: 'by_120_120.png',
      number: 2,
      sort: 8
    }
  ],
  senior_lottery_list: [
    // 摩天轮奖池
    {
      id: 1,
      text: '赠送权+1天',
      textAna: '座驾+1天',
      type: 'tool',
      tool_id: 1,
      nums: 3,
      icon: 'tezw_120_120.png',
      number: 15, // 奖品剩余数量：false-表示不限份数
      sort: 1
    },
    {
      id: 2,
      text: '+10',
      textAna: '紫晶石+3',
      type: 'costume',
      tool_id: 7,
      nums: 1,
      icon: 'ljs_120_120.png',
      number: false,
      sort: 2
    },
    {
      id: 3,
      text: '+1',
      textAna: '靓号券+1',
      type: 'tool',
      tool_id: 1,
      nums: 2,
      icon: 'zhs_120_120.png',
      number: false,
      sort: 3
    },
    {
      id: 4,
      text: '+2',
      textAna: '紫晶石+2',
      type: 'mic',
      tool_id: 65,
      nums: 1,
      icon: 'zjs_120_120.png',
      number: false,
      sort: 4
    },
    {
      id: 5,
      text: '+1',
      textAna: '防爆石+1',
      type: 'tool',
      tool_id: 9,
      nums: 1,
      icon: 'lhq_120_120.png',
      number: false,
      sort: 5
    },
    {
      id: 6,
      text: '+1',
      textAna: '幸运钥匙+1',
      type: 'tool',
      tool_id: 1,
      nums: 1,
      icon: 'fbs_120_120.png',
      number: 5,
      sort: 6
    },
    {
      id: 7,
      text: '+1',
      textAna: '赠送权+1天',
      type: 'luck_key',
      tool_id: 0,
      nums: 1,
      icon: 'yyys_120_120.png',
      number: 5,
      sort: 7
    },
    {
      id: 8,
      text: '+1天',
      textAna: '头饰+1天',
      type: 'pretty_card',
      tool_id: 0,
      nums: 1,
      icon: 'xrzy_120_120.png',
      number: false,
      sort: 8
    },
    {
      id: 9,
      text: '+3天',
      textAna: '头饰+1天',
      type: 'pretty_card',
      tool_id: 0,
      nums: 1,
      icon: 'zj_120_120.png',
      number: false,
      sort: 8
    }
  ],
  awards: [
    // 抽奖返回奖励列表
    {
      id: 3,
      name: '元宝',
      text: '+5万',
      type: 'property',
      tool_id: 'gamegold',
      nums: 50000,
      icon: ''
    },
    {
      id: 12,
      name: '绿晶石',
      text: '+35',
      type: 'tool',
      tool_id: 2,
      nums: 35,
      icon: ''
    },
    {
      id: 12,
      name: '绿晶石',
      text: '主页特效+1天',
      type: 'costume',
      tool_id: 2,
      nums: 35,
      icon: ''
    },
    {
      id: 12,
      name: '绿晶石',
      text: '头饰+1天',
      type: 'tool',
      tool_id: 2,
      nums: 35,
      icon: ''
    },
    {
      id: 12,
      name: '绿晶石',
      text: '主页特效+1天',
      type: 'tool',
      tool_id: 2,
      nums: 35,
      icon: ''
    }
  ],
  sign_list: [
    // 签到列表
    {
      date: '20220307',
      date_text: '7月19日',
      status: 0 // 签到状态：0-已过期，1-即将开始，2-已签到
    },
    {
      date: '20220308',
      date_text: '7月20日',
      status: 0
    },
    {
      date: '20220309',
      date_text: '7月21日',
      status: 0
    },
    {
      date: '20220310',
      date_text: '7月22日',
      status: 0
    },
    {
      date: '20220311',
      date_text: '7月23日',
      status: 0
    }
  ]
}

// 积分翻倍
export const filpGame = {
  user_icon: '', // 用户头像
  flip_ticket: '0', // 翻牌币数量
  flip_credit: 0, // 积分数
  credit_spend: 0, // 用户已消耗的积分数
  free_used: true, // 每日首次免费购买礼包的是否已使用， true-已使用，false-未使用
  has_ticket: false, // 是否已获得翻牌门票 true-是，false-没有
  masonry_consume: 0, // 消耗的钻石数
  flip_list: [
    // 九宫格翻牌状态(九宫格序号，从上往下，从左往右的顺序)
    {
      index: 1, // 序号
      open_status: false, // 翻牌状态 false-未翻，true-已翻
      times: 0 // 获得的积分倍数，未翻时默认0
    },
    {
      index: 2,
      open_status: false,
      times: 0
    },
    {
      index: 3,
      open_status: false,
      times: 0
    },
    {
      index: 4,
      open_status: false,
      times: 0
    },
    {
      index: 5,
      open_status: false,
      times: 0
    },
    {
      index: 6,
      open_status: false,
      times: 0
    },
    {
      index: 7,
      open_status: false,
      times: 0
    },
    {
      index: 8,
      open_status: false,
      times: 0
    },
    {
      index: 9,
      open_status: false,
      times: 0
    }
  ],
  flip_button: {
    // 按钮状态
    flip_max_times: 6, // 每轮最多可翻牌张数
    flip_left_times: 6, // 本轮剩余可翻牌张数
    flip_need_tickets: 6, // 一键翻牌需要消耗的翻牌币数量
    flip_status: 1 // 状态：1-按钮显示“一键翻牌”，2-按钮显示“领取积分”
  },
  exchange_list: [
    // 兑换列表
    {
      id: 1, // 商品id，用于后面兑换接口传值
      type: 'hero_gold',
      tool_id: 0,
      icon: 'jb_120_120.png', // 图片
      nums: 20000,
      text: '+10万', // 显示数量
      name: '金币',
      price: 15, // 价格，单个兑换需要消耗的积分数
      max: 10, // 最大可兑换次数，false-表示没有兑换次数限制
      locker: false, // 解锁条件：false-不需要解锁，300-消耗300积分解锁
      finish_times: 0, // 已用掉的兑换次数
      has_right: 1 // 1-可以兑换，2-已兑换
    },
    {
      id: 2,
      type: 'costume',
      tool_id: 9,
      icon: 'xtdwd_120_120.png',
      nums: 3,
      text: '+3天',
      name: '主页特效',
      price: 70,
      max: false,
      locker: false,
      finish_times: 0,
      has_right: 1
    },
    {
      id: 3,
      type: 'voice',
      tool_id: 0,
      icon: '',
      nums: 3,
      text: '+3天',
      name: '声波',
      price: 100,
      max: false,
      locker: false,
      finish_times: 0,
      has_right: 1
    },
    {
      id: 4,
      type: 'tool',
      tool_id: 2,
      icon: 'ljs_120_120.png',
      nums: 100,
      text: '+100',
      name: '绿晶石',
      price: 120,
      max: 10,
      locker: false,
      finish_times: 0,
      has_right: 1
    },
    {
      id: 5,
      type: 'pst_privilege',
      tool_id: 75,
      icon: 'jtlppq_120_120.png',
      nums: 5,
      text: '+5天',
      name: '加特林泡泡枪',
      price: 100,
      max: 10,
      locker: 300,
      finish_times: 0,
      has_right: 1
    },
    {
      id: 6,
      type: 'pretty_card',
      tool_id: 0,
      icon: 'lhq_120_120.png',
      nums: 0,
      text: '3-7个',
      name: '靓号券包',
      price: 150,
      max: 10,
      locker: 300,
      finish_times: 0,
      has_right: 1
    },
    {
      id: 7,
      type: 'hero_tools',
      tool_id: 4,
      icon: 'zhs_120_120.png',
      nums: 5,
      text: '+5',
      name: '召唤石',
      price: 180,
      max: 10,
      locker: 300,
      finish_times: 0,
      has_right: 1
    }
  ]
}

// 榜上有名
export const summerRank = {
  lucky_ranks_index: [
    // 幸运奖名次列表
    13, 17, 23, 27, 33, 37, 43, 47
  ],
  present_top: [
    // 小时榜
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    }
  ],
  send_present_top: [
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '20013',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    }
  ],
  hour_rank: [
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    },
    {
      uid: '',
      profile_image:
        'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--'
    }
  ]
}

// 按钮文本
export const ButtonTexts = {
  // 积分兑奖任务列表
  GoodsTask: {
    0: '未完成',
    1: '领取',
    2: '已领取'
  },
  // 积分兑奖兑换好礼
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
    hero_tools: '兑换并使用'
  },
  // 充值返利
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
    1: 'theme_botton_did',
    2: 'theme_botton_done'
  }
}
