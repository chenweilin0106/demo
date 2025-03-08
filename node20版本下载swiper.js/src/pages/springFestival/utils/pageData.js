// 鞭炮兑奖默认数据
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
      type: 'tools_ljs',
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
      type: 'title',
      goods_name: '永久称号',
      goods_type: 'title',
      goods_id: 4987,
      goods_num: 0,
      price: 600,
      price_text: '600',
      max_times: 1,
      goods_icon: '',
      goods_icon_t: '',
      goods_num_text: '永久称号+1',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
    },
    {
      exchange_times: 0,
      goods_icon: '',
      goods_icon_t: '',
      goods_id: 80,
      goods_name: '纯白之约',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_cbzy'
    },
    {
      type: 'car_rhty',
      goods_name: '如虎添翼',
      goods_type: 'car',
      goods_id: 58,
      goods_num: 7,
      price: 300,
      price_text: '300',
      max_times: 1,
      goods_icon: 'rhty_184_108.png',
      goods_icon_t: 'rhty_184_108.png',
      goods_num_text: '座驾+7天',
      spend_cond: 0,
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
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
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 400,
          text: '400',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 1,
          text: '1',
          icon: 'lhq_60_60.png'
        }
      ]
    },
    30: {
      amount_cond: 30,
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 500,
          text: '500',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 1,
          text: '1',
          icon: 'lhq_60_60.png'
        }
      ]
    },
    50: {
      amount_cond: 50,
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 600,
          text: '600',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 1,
          text: '1',
          icon: 'lhq_60_60.png'
        }
      ]
    },
    100: {
      amount_cond: 100,
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 1000,
          text: '1000',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 1,
          text: '1',
          icon: 'lhq_60_60.png'
        }
      ]
    },
    300: {
      amount_cond: 300,
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 2000,
          text: '2000',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 1,
          text: '1',
          icon: 'lhq_60_60.png'
        }
      ]
    },
    500: {
      amount_cond: 500,
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 3000,
          text: '3000',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 2,
          text: '2',
          icon: 'lhq_60_60.png'
        }
      ]
    },
    1000: {
      amount_cond: 1000,
      days_cond: 4,
      reach_days: 0,
      has_right: 0,
      awards: [
        {
          type: 'tool',
          name: '精粹',
          id: 142,
          nums: 8000,
          text: '8000',
          icon: 'fsjc_60_60.png'
        },
        {
          type: 'pretty_card',
          name: '靓号券',
          id: 0,
          nums: 2,
          text: '2',
          icon: 'lhq_60_60.png'
        }
      ]
    }
  },
  // 累计充值
  recharge_status: {
    30: {
      condition: 30,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 176000,
          text: '16万',
          text_add: '加赠1.6万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 16,
          text: '16',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 1,
          text: '1',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    50: {
      condition: 50,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 242000,
          text: '22万',
          text_add: '加赠2.2万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 22,
          text: '22',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 1,
          text: '1',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    100: {
      condition: 100,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 495000,
          text: '45万',
          text_add: '加赠4.5万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 45,
          text: '45',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 2,
          text: '2',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    200: {
      condition: 200,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 968000,
          text: '88万',
          text_add: '加赠8.8万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 88,
          text: '88',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 4,
          text: '4',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    300: {
      condition: 300,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 1430000,
          text: '130万',
          text_add: '加赠13万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 130,
          text: '130',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 4,
          text: '4',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    500: {
      condition: 500,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 2200000,
          text: '200万',
          text_add: '加赠20万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 200,
          text: '200',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 8,
          text: '8',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    1000: {
      condition: 1000,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 3740000,
          text: '340万',
          text_add: '加赠34万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 340,
          text: '340',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_tools',
          name: '召唤石',
          id: 4,
          nums: 30,
          text: '30',
          icon: 'zhs_60_60.png'
        }
      ]
    },
    2000: {
      condition: 2000,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 6600000,
          text: '600万',
          text_add: '加赠60万',
          icon: 'yb_60_60.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 600,
          text: '600',
          icon: 'ljs_60_60.png'
        },
        {
          type: 'hero_gold_card',
          name: '24小时金币卡',
          id: 0,
          nums: 10,
          text: '10',
          icon: 'jbk24xs_60_60.png'
        }
      ]
    },
    5000: {
      condition: 5000,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 13200000,
          text: '1200万',
          text_add: '加赠120万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 1200,
          text: '1200',
          icon: 'ljs_120_120.png'
        },
        {
          type: 'hero_gold_card',
          name: '24小时金币卡',
          id: 0,
          nums: 20,
          text: '20',
          icon: 'jbk24xs_120_120.png'
        },
        {
          type: 'title',
          name: '称号',
          id: 4676,
          nums: 7,
          text: '7天',
          icon: 'ch_rsyj.gif'
        },
        {
          type: 'prestige',
          name: '威望值',
          id: 0,
          nums: 0.050000000000000003,
          text: '称号属性：每次获得+基础威望值的5%，时效可叠加'
        }
      ]
    },
    10000: {
      condition: 10000,
      recharge_nums: 0,
      has_right: 0,
      is_daily: false,
      awards: [
        {
          type: 'property',
          tool_id: 'gamegold',
          name: '元宝',
          nums: 26400000,
          text: '2400万',
          text_add: '加赠240万',
          icon: 'yb_120_120.png'
        },
        {
          type: 'tool',
          name: '绿晶石',
          id: 2,
          nums: 2400,
          text: '2400',
          icon: 'ljs_120_120.png'
        },
        {
          type: 'hero_gold_card',
          name: '24小时金币卡',
          id: 0,
          nums: 40,
          text: '40',
          icon: 'jbk24xs_120_120.png'
        },
        {
          type: 'title',
          name: '称号',
          id: 4676,
          nums: 7,
          text: '7天',
          icon: 'ch_rsyj.gif'
        },
        {
          type: 'prestige',
          name: '威望值',
          id: 0,
          nums: 0.050000000000000003,
          text: '称号属性：每次获得+基础威望值的5%，时效可叠加'
        }
      ]
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
        show_text: '永久头饰',
        type: 'car'
      }
    ],
    condition: 1,
    has_right: 0
  }
}

// 消费有礼默认数据
export const consumeGift = {
  consume_status: {
    1000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 50000,
          text: '5万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 1000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    2000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 100000,
          text: '10万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 2000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    3000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 150000,
          text: '15万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 3000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    5000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 200000,
          text: '20万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 5000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    10000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 400000,
          text: '40万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 10000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    20000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 600000,
          text: '60万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 20000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    30000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 850000,
          text: '85万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 30000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    },
    50000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 1300000,
          text: '130万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 50000,
      consume_nums: 50000,
      has_right: 0,
      is_daily: true
    },
    100000: {
      awards: [
        {
          icon: 'yb_120_120.png',
          name: '元宝',
          nums: 2000000,
          text: '200万',
          tool_id: 'gamegold',
          type: 'property'
        },
        {
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 100,
          text: '100',
          tool_id: 4,
          type: 'hero_tools'
        }
      ],
      condition: 100000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    }
  }
}

// 集福迎新默认数据
export const collectHappiness = {
  user_card_list: [
    {
      icon: 'mk4_2_1.png',
      card_id: 1,
      num: 0
    },
    {
      icon: 'mk4_3_1.png',
      card_id: 2,
      num: 0
    },
    {
      icon: 'mk4_4_1.png',
      card_id: 3,
      num: 0
    },
    {
      icon: 'mk4_5_1.png',
      card_id: 4,
      num: 0
    },
    {
      icon: 'mk4_6_1.png',
      card_id: 5,
      num: 0
    }
  ],
  is_conflate: false,
  receive_num: 0,
  task_list: [
    {
      id: 1,
      need_num: 1,
      award_num: 1,
      text: '每日登录活动页面',
      is_special: false,
      num: 0,
      has_right: 0
    },
    {
      id: 2,
      need_num: 1,
      award_num: 1,
      text: '领取1次【拜年送福】玩法的奖励',
      is_special: false,
      num: 0,
      has_right: 0
    },
    {
      id: 3,
      need_num: 1,
      award_num: 2,
      text: '完成 1 次任意一笔的钻石充值',
      is_special: false,
      num: 0,
      has_right: 0
    },
    {
      id: 4,
      need_num: 3,
      award_num: 1,
      text: '使用3次【画地为牢】技能',
      is_special: false,
      num: 0,
      has_right: 0
    },
    {
      id: 5,
      need_num: 1,
      award_num: 1,
      text: '累计完成1次科举',
      is_special: false,
      num: 0,
      has_right: 0
    },
    {
      id: 6,
      need_num: 10,
      award_num: 1,
      text: '聊天室累计玩10分钟',
      is_special: false,
      num: 0,
      has_right: 0
    }
  ]
}

// 拜年送福默认数据
export const newYearCall = {
  red_pack: {
    id: '0',
    uid: undefined,
    username: '',
    head: '',
    reset_time: 0,
    status: ''
  }
}

// 返场称号默认数据
export const titleBack = {
  user_icon: 'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
  lottery_ticket: '0',
  gift_ticket: 0,
  consume: '0',
  lottery_pool: [
    {
      type: 'tool',
      tool_id: 142,
      nums: 20,
      icon: 'fsjc_120_120.png',
      text: '+20',
      name: '精粹'
    },
    {
      type: 'tool',
      tool_id: 1,
      nums: 1,
      icon: 'zjs_120_120.png',
      text: '+1',
      name: '紫晶石'
    },
    {
      type: 'tool',
      tool_id: 23,
      nums: 1,
      icon: 'qzh_120_120.png',
      text: '+1',
      name: '千纸鹤'
    },
    {
      type: 'tool',
      tool_id: 2,
      nums: 1,
      icon: 'ljs_120_120.png',
      text: '+1',
      name: '绿晶石'
    },
    {
      type: 'tool',
      tool_id: 19,
      nums: 5,
      icon: 'sjmg_120_120.png',
      text: '+5',
      name: '玫瑰'
    },
    {
      type: 'hero_gold',
      tool_id: 0,
      nums: 10000,
      icon: 'jb_120_120.png',
      text: '+1万',
      name: '金币'
    },
    {
      type: 'tool',
      tool_id: 45,
      nums: 1,
      icon: 'bx_120_120.png',
      text: '+1',
      name: '比心'
    },
    {
      type: 'tool',
      tool_id: 2,
      nums: 3,
      icon: 'ljs_120_120.png',
      text: '+3',
      name: '绿晶石'
    }
  ],
  exchanges: [
    {
      goods_id: 1,
      type: 'tool',
      id: 2,
      nums: 500,
      icon: 'ljs_120_120.png',
      name: '绿晶石',
      text: '绿晶石+500',
      price: 100
    }
  ],
  collect_awards: [
    {
      goods_id: 1,
      task_name: '收集称号套系【冬日风情】',
      name: '落雪童话',
      type: 'mic',
      id: 46,
      icon: '',
      nums: 7,
      text: '头饰+7天',
      max_nums: 8,
      finish_nums: 0,
      has_right: 0
    },
    {
      goods_id: 2,
      task_name: '收集本期返场称号',
      name: '烟火年年',
      type: 'costume',
      id: 29,
      icon: '',
      nums: 7,
      text: '主页特效+7天',
      max_nums: 4,
      finish_nums: 0,
      has_right: 0
    }
  ]
}

// 礼物橱窗
export const giftShopWindow = {
  recharge: 0, // 我今日充值数
  task_list: [
    // 任务列表
    {
      task_id: 1,
      name: '今日充值200元',
      finish: 0, // 已完成的充值数量
      max: 200, // 任务需要完成的充值数量
      award: {
        type: 'pst_privilege',
        id: 0,
        icon: 'xsl_120_120.png',
        nums: 1,
        name: '小神龙',
        text: '赠送权+1天'
      },
      has_right: 0 // 状态：0-未完成，1-领取，2-已领取
    },
    {
      task_id: 2,
      name: '今日充值800元',
      finish: 0,
      max: 800,
      award: {
        type: 'pst_privilege',
        id: 0,
        icon: 'cjyx_120_120.png',
        nums: 2,
        name: '辞旧迎新',
        text: '赠送权+2天'
      },
      has_right: 0
    }
  ]
}

// 财神榜默认数据
export const defaultRank = {
  uid: '0',
  code: '0',
  is_pretty: false,
  my_username: '',
  my_profile_image: 'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
  my_total_recharge: 0,
  my_daily_recharge: 0,
  daily_rank: [
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 1,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 2,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 3,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 4,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 5,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 6,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 7,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 8,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 9,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 10,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 11,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 12,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 13,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 14,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 15,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 16,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 17,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 18,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 19,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 20,
      diff: 0
    }
  ],
  total_rank: [
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 1,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 2,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 3,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 4,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 5,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 6,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 7,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 8,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 9,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 10,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 11,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 12,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 13,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 14,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 15,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 16,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 17,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 18,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 19,
      diff: 0
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      username: '虚位以待',
      profile_image: '',
      time: 0,
      rank: 20,
      diff: 0
    }
  ],
  day_list: {
    20240105: '01月05日',
    20240106: '01月06日',
    20240107: '01月07日',
    20240108: '01月08日',
    20240109: '01月09日'
  },
  select_date: '20240105'
}

// 名人榜日榜默认数据
export const defaultRank2 = {
  uid: '0',
  code: '0',
  is_pretty: false,
  my_username: '',
  my_profile_image: 'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
  day_list: {
    20240116: '01月16日',
    20240117: '01月17日',
    20240118: '01月18日',
    20240119: '01月19日',
    20240120: '01月20日',
    20240121: '01月21日',
    20240122: '01月22日'
  },
  select_date: '20240118',
  daily_rank: [
    {
      uid: 0,
      code: '0',
      is_pretty: false,
      profile_image:
        'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
      username: '',
      time: 0,
      rank: 1,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image:
        'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
      username: 'zzzzz',
      time: 0,
      rank: 2,
      fans: {
        uid: '78001480',
        profile_image:
          'https://imagevo.dandanvoice.com/app/head/head_block_1.png'
      }
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 3,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 4,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 5,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 6,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 7,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 8,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 9,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 10,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 11,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 12,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 13,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 14,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 15,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 16,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 17,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 18,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 19,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 20,
      fans: {}
    }
  ],
  my_score: 0,
  my_fans: {}
}

// 名人榜总榜默认数据
export const defaultRank3 = {
  uid: '0',
  code: '0',
  is_pretty: false,
  my_username: '',
  my_profile_image: 'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
  day_list: {
    20240116: '01月16日',
    20240117: '01月17日',
    20240118: '01月18日',
    20240119: '01月19日',
    20240120: '01月20日',
    20240121: '01月21日',
    20240122: '01月22日'
  },
  select_date: '20240118',
  total_rank: [
    {
      uid: 0,
      code: '0',
      is_pretty: false,
      profile_image:
        'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
      username: '',
      time: 0,
      rank: 1,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image:
        'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
      username: '',
      time: 0,
      rank: 2,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 3,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 4,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 5,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 6,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 7,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 8,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 9,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 10,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 11,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 12,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 13,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 14,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 15,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 16,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 17,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 18,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 19,
      fans: {}
    },
    {
      uid: 0,
      code: 0,
      is_pretty: false,
      profile_image: '',
      username: '虚位以待',
      time: 0,
      rank: 20,
      fans: {}
    }
  ],
  my_score: 0,
  my_fans: {}
}

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
  // 积分兑奖任务列表
  1: {
    0: 'button-noFinish',
    1: 'button-receive',
    2: 'button-finish'
  },
  // 积分兑奖兑换好礼
  2: {
    1: 'button-noFinish',
    2: 'button-finish'
  }
}
