// 积分兑奖
export const pointReward = {
  user_icon: '',
  my_goods: 0,
  spend_point: 0,
  task_list: {
    login: {
      task_name: '每日登录',
      award_nums: 5,
      show_text: '5',
      finish_times: 1,
      max_times: 1,
      need_rev: true,
      has_right: 0,
      is_recharge: false
    },
    keju: {
      task_name: '完成一次科举',
      award_nums: 5,
      show_text: '5',
      finish_times: 0,
      max_times: 1,
      need_rev: true,
      has_right: 0,
      is_recharge: false
    },
    recharge_once: {
      task_name: '完成一笔充值',
      award_nums: 5,
      show_text: '5',
      finish_times: 0,
      max_times: 1,
      need_rev: true,
      has_right: 0,
      is_recharge: true
    },
    masonry_consume: {
      task_name: '消费1000钻',
      award_nums: 10,
      show_text: '10',
      finish_times: 0,
      max_times: 1000,
      need_rev: true,
      has_right: 0,
      is_recharge: false
    },
    recharge: {
      task_name: '每充值10元',
      award_nums: 6,
      show_text: '6',
      finish_times: 0,
      max_times: 10,
      need_rev: false,
      has_right: 0,
      is_recharge: false
    }
  },
  goods_list: [
    {
      type: 'tools_ljs2',
      goods_name: '绿晶石',
      goods_type: 'tool',
      goods_id: 2,
      goods_num: 1,
      price: 1,
      price_text: '1',
      max_times: 0,
      goods_icon: 'ljs_120_120.png',
      goods_icon_t: 'ljs_120_120.png',
      goods_num_text: '绿晶石+1',
      desc: '用于提升技能等级，可增加成功率',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
    },
    {
      type: 'lucky_key',
      goods_name: '钥匙',
      goods_type: 'keys',
      goods_id: 0,
      goods_num: 1,
      price: 50,
      price_text: '50',
      max_times: 2,
      goods_icon: 'xyys_120_120.png',
      goods_icon_t: 'xyys_120_120.png',
      goods_num_text: '钥匙+1',
      is_second_half: false,
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
    },
    {
      type: 'keju',
      goods_name: '科举双倍卡',
      goods_type: 'keju',
      goods_id: 1,
      goods_num: 1,
      price: 8,
      price_text: '8',
      max_times: 5,
      goods_icon: 'sbk_120_120.png',
      goods_icon_t: 'sbk_120_120.png',
      goods_num_text: '科举双倍卡+1',
      desc: '可在科举中使获得的元宝变为双倍',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
    },
    {
      type: 'hero_tools_zhs',
      goods_name: '召唤石',
      goods_type: 'hero_tools',
      goods_id: 4,
      goods_num: 1,
      price: 30,
      price_text: '30',
      max_times: 10,
      goods_icon: 'zhs_120_120.png',
      goods_icon_t: 'zhs_120_120.png',
      goods_num_text: '召唤石+1',
      desc: '用于蛋蛋部落玩法中，召唤英雄',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
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
      goods_name: '天籁之音',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_tlzy'
    },
    {
      type: 'tools_zjs',
      goods_name: '紫晶石',
      goods_type: 'tool',
      goods_id: 1,
      goods_num: 1,
      price: 10,
      price_text: 10,
      max_times: 100,
      goods_icon: 'zjs_120_120.png',
      no_unlocked: 'zjs_120_120.png',
      goods_icon_t: 'zjs_120_120.png',
      goods_num_text: '紫晶石+1',
      desc: '用于提升技能等级，可增加成功率',
      spend_cond: 1000,
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 0
    }
  ]
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
          nums: 75000,
          text: '7.5万',
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
          nums: 150000,
          text: '15万',
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
    100: {
      amount_cond: 100,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 250000,
          text: '25万',
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
          nums: 500000,
          text: '50万',
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
    500: {
      amount_cond: 500,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 750000,
          text: '75万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 2,
          text: '2',
          type: 'pretty_card'
        }
      ],
      days_cond: '4',
      has_right: 0,
      reach_days: 0
    },
    1000: {
      amount_cond: 1000,
      awards: [
        {
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 1200000,
          text: '120万',
          type: 'property'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 2,
          text: '2',
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
          type: 'property',
          text_add: '加赠24000万'
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
          icon: '',
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
    },
    10000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 24000000,
          text: '24000万',
          tool_id: 'gamegold',
          type: 'property',
          text_add: '加赠24000万'
        },
        {
          icon: 'ljs_120_120.png',
          id: 2,
          name: '绿晶石',
          nums: 2400,
          text: '2400',
          type: 'tool'
        },
        {
          icon: 'jbk24xs_120_120.png',
          id: 0,
          name: '24小时金币卡',
          nums: 40,
          text: '40',
          type: 'hero_tools'
        },
        {
          icon: '',
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
      condition: 10000,
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

// 钻石送礼
export const presentGift = {
  gender: '',
  masonry_nums: 0,
  masonry_max: 26666,
  recharge_nums: 0,
  recharge_max: 300,
  award_list: [
    {
      award_id: 1,
      type: 'title',
      name: '一见钟情',
      icon: '',
      tool_id: 0,
      nums: false,
      text: '永久称号',
      has_right: 0
    }
  ],
  consume_status: {
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 100,
          text: '100',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 100,
          text: '100',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 100,
          text: '100',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 200,
          text: '200',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 500,
          text: '500',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 1000,
          text: '1000',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 1000,
          text: '1000',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 2000,
          text: '2000',
          icon: 'fsjc_60_60.png'
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
        },
        {
          type: 'tool',
          name: '精粹',
          tool_id: 142,
          nums: 3000,
          text: '3000',
          icon: 'fsjc_60_60.png'
        }
      ]
    }
  }
}

// 亲密挑战
export const intimateChallenge = {
  pair_status: false,
  belong_server: '1',
  intimacy: 0,
  pair_info: [],
  pair_awards: [
    {
      award_id: 1,
      id: 13,
      type: 'ring',
      icon: 'jl_01_120.png',
      nums: 1,
      text: '戒指+1',
      show_text: '+1',
      name: '怦然心动',
      max: 1314,
      has_right: 0
    },
    {
      award_id: 2,
      id: 19,
      type: 'tool',
      icon: 'jl_02_120.png',
      nums: 520,
      text: '+520',
      show_text: '+520',
      name: '乍见之欢',
      max: 3344,
      has_right: 0
    },
    {
      award_id: 3,
      id: 123,
      type: 'tool',
      icon: 'jl_03_120.png',
      nums: 80,
      text: '+80',
      show_text: '+80',
      name: '心心相印',
      max: 5200,
      has_right: 0
    },
    {
      award_id: 4,
      id: 63,
      type: 'car',
      icon: 'jl_04_120.png',
      nums: 3,
      text: '座驾+3天',
      show_text: '+3天',
      name: '两情相悦',
      max: 9999,
      has_right: 0
    },
    {
      award_id: 5,
      id: 32,
      type: 'costume',
      icon: 'jl_05_120.png',
      nums: 7,
      text: '主页特效+7天',
      show_text: '+7天',
      name: '永结同好',
      max: 20520,
      has_right: 0
    },
    {
      award_id: 6,
      id: 64,
      type: 'car',
      icon: 'jl_06_120.png',
      nums: 30,
      text: '座驾+30天',
      show_text: '+30天',
      name: '天作之合',
      max: 33440,
      has_right: 0
    }
  ],
  pair_rank: [
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 1
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 2
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 3
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 4
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 5
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 6
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 7
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 8
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 9
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 10
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 11
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 12
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 13
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 14
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 15
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 16
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 17
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 18
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 19
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      tuid: 0,
      tuid_code: 0,
      tuid_is_pretty: false,
      tusername: '虚位以待',
      tprofile_image: '',
      num: 0,
      rank: 20
    }
  ],
  self_rank: {}
}

// 爱的祈愿
export const lovePray = {
  is_sign_in: true,
  ticket_nums: '0',
  recharge_nums: 0,
  is_locker: true,
  simple_count: 0,
  sign_list: [
    {
      date: '20240313',
      date_text: '03月13日',
      status: 1
    },
    {
      date: '20240314',
      date_text: '03月14日',
      status: 1
    },
    {
      date: '20240315',
      date_text: '03月15日',
      status: 1
    },
    {
      date: '20240316',
      date_text: '03月16日',
      status: 1
    },
    {
      date: '20240317',
      date_text: '03月17日',
      status: 2
    }
  ],
  simple_lottery_list: [
    {
      id: 8,
      name: '一箭钟情',
      text: '赠送权+1天',
      type: 'pst_privilege',
      tool_id: 56,
      nums: 1,
      icon: 'yjzq_120_120.png',
      number: 1,
      sort: 1
    },
    {
      id: 9,
      name: '藏宝图',
      text: '+1',
      type: 'tool',
      tool_id: 158,
      nums: 1,
      icon: 'cbt_120_120.png',
      number: 1,
      sort: 2
    },
    {
      id: 1,
      name: '绿晶石',
      text: '+5',
      type: 'tool',
      tool_id: 2,
      nums: 5,
      icon: 'ljs_120_120.png',
      number: 4,
      sort: 3
    },
    {
      id: 2,
      name: '璞玉',
      text: '+5',
      type: 'hero_tools',
      tool_id: 7,
      nums: 5,
      icon: 'py_120_120.png',
      number: 4,
      sort: 4
    },
    {
      id: 3,
      name: '神功丸',
      text: '+1',
      type: 'tool',
      tool_id: 3,
      nums: 1,
      icon: 'sgw_120_120.png',
      number: 4,
      sort: 5
    },
    {
      id: 4,
      name: '口香糖',
      text: '+1',
      type: 'tool',
      tool_id: 6,
      nums: 1,
      icon: 'kxt_120_120.png',
      number: 4,
      sort: 6
    },
    {
      id: 5,
      name: '金币',
      text: '+2万',
      type: 'hero_gold',
      tool_id: 0,
      nums: 20000,
      icon: 'jb_120_120.png',
      number: 4,
      sort: 7
    },
    {
      id: 6,
      name: '元宝',
      text: '+2万',
      type: 'property',
      tool_id: 'gamegold',
      nums: 20000,
      icon: 'yb_120_120.png',
      number: 4,
      sort: 8
    },
    {
      id: 7,
      name: '宝玉',
      text: '+3',
      type: 'hero_tools',
      tool_id: 6,
      nums: 3,
      icon: 'by_120_120.png',
      number: 4,
      sort: 9
    }
  ],
  senior_lottery_list: [
    {
      id: 8,
      name: '恋爱日记',
      text: '赠送权+1天',
      type: 'pst_privilege',
      tool_id: 0,
      nums: 1,
      icon: 'larj_120_120.png',
      number: false,
      weight: 20,
      sort: 1
    },
    {
      id: 2,
      name: '紫晶石',
      text: '+2',
      type: 'tool',
      tool_id: 1,
      nums: 2,
      icon: 'zjs_120_120.png',
      number: false,
      weight: 25,
      sort: 2
    },
    {
      id: 3,
      name: '精粹',
      text: '+3',
      type: 'tool',
      tool_id: 142,
      nums: 3,
      icon: 'fsjc_120_120.png',
      number: false,
      weight: 20,
      sort: 3
    },
    {
      id: 4,
      name: '金币',
      text: '+2万',
      type: 'hero_gold',
      tool_id: 0,
      nums: 20000,
      icon: 'jb_120_120.png',
      number: false,
      weight: 15,
      sort: 4
    },
    {
      id: 5,
      name: '钥匙',
      text: '+1',
      type: 'luck_key',
      tool_id: 0,
      nums: 1,
      icon: 'xyys_120_120.png',
      number: 99,
      weight: 10,
      sort: 5
    },
    {
      id: 6,
      name: '一箭钟情',
      text: '赠送权+1天',
      type: 'pst_privilege',
      tool_id: 56,
      nums: 1,
      icon: 'yjzq_120_120.png',
      number: false,
      weight: 50,
      sort: 6
    },
    {
      id: 7,
      name: '靓号券',
      text: '+1',
      type: 'pretty_card',
      tool_id: 0,
      nums: 1,
      icon: 'lhq_120_120.png',
      number: false,
      weight: 30,
      sort: 7
    },
    {
      id: 1,
      name: '绿晶石',
      text: '+10',
      type: 'tool',
      tool_id: 2,
      nums: 10,
      icon: 'ljs_120_120.png',
      number: false,
      weight: 30,
      sort: 8
    }
  ]
}

// 恋爱翻牌
export const loveFlop = {}

// 按钮文本
export const ButtonTexts = {
  // 0：未完成，1：领取，2：已领取
  1: {
    0: '未完成',
    1: '领取',
    2: '已领取'
  },
  // 1：兑换，2：已兑换
  2: {
    1: '兑换',
    2: '已兑换'
  },
  // 积分兑奖弹框
  3: {
    title: '兑换并佩戴',
    mic: '兑换并装扮',
    car: '兑换并装备',
    keys: '兑2个',
    pretty_card: '兑2个'
  },
  // 0：去完成，1：领取，2：已领取
  4: {
    0: '去完成',
    1: '领取',
    2: '已领取'
  }
}

// 按钮样式
export const ButtonStyle = {
  1: {
    0: 'button-noFinish',
    1: 'button-receive',
    2: 'button-finish'
  },
  2: {
    1: 'button-noFinish',
    2: 'button-finish'
  }
}
