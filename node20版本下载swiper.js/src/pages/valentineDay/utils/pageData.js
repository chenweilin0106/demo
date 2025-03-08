// 浪漫回馈默认数据
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
      type: 'car_asqbt',
      goods_name: '如虎添翼',
      goods_type: 'car',
      goods_id: 58,
      goods_num: 7,
      price: 300,
      price_text: '300',
      max_times: 1,
      goods_icon: 'asqbt_130_117.png',
      goods_icon_t: 'asqbt_130_117.png',
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
      days_cond: '7',
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
      days_cond: '7',
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
      days_cond: '7',
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
      days_cond: '7',
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
      days_cond: '7',
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
      days_cond: '7',
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
      days_cond: '7',
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
          type: 'property'
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

// 告白情歌默认数据
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
      icon: 'sjsc_120_120.png',
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
      icon: 'yedt_120_120.png',
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
      name: '自定义情话素材',
      id: 0,
      type: 'common_goods',
      icon: 'zdyqhsc_120_120.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 79999,
      has_right: 0
    },
    {
      goods_id: 5,
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
      goods_id: 6,
      name: '边框素材',
      id: 0,
      type: 'common_goods',
      icon: 'bksc_120_120.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 66666,
      has_right: 0
    },
    {
      goods_id: 7,
      name: '装饰素材',
      id: 0,
      type: 'common_goods',
      icon: 'zssc_120_120.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 66666,
      has_right: 0
    },
    {
      goods_id: 8,
      name: '比翼双飞戒指+1',
      id: 10,
      type: 'mic',
      icon: '',
      nums: 1,
      text: '价值15999',
      intimacy: 0,
      max_intimacy: 99999,
      has_right: 0
    },
    {
      goods_id: 9,
      name: '+10万',
      id: 10,
      type: 'common_goods',
      icon: 'aqnl_120_120.png',
      nums: 1,
      text: '',
      intimacy: 0,
      max_intimacy: 99999,
      has_right: 0
    }
  ]
}

// 甜蜜宝藏默认数据
export const sweetTreasure = {
  is_sign_in: true,
  ticket_nums: '0',
  sign_list: [
    {
      date: '19700101',
      date_text: '01月01日',
      status: 0
    },
    {
      date: '19700102',
      date_text: '01月02日',
      status: 0
    },
    {
      date: '19700103',
      date_text: '01月03日',
      status: 0
    },
    {
      date: '19700104',
      date_text: '01月04日',
      status: 0
    },
    {
      date: '19700105',
      date_text: '01月05日',
      status: 0
    }
  ],
  layer_list: {
    1: {
      layer: 1,
      name: '1层',
      need_ticket: 1,
      is_locker: false,
      has_optional: false,
      award_list: [
        {
          awardId: 1,
          id: 6,
          type: 'tool',
          icon: 'kxt_120_120.png',
          nums: 1,
          name: '口香糖',
          text: '+1',
          number: 1,
          weight: '25'
        },
        {
          awardId: 2,
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 10000,
          name: '元宝',
          text: '+1万',
          number: 1,
          weight: '25'
        },
        {
          awardId: 3,
          id: 3,
          type: 'tool',
          icon: 'sgw_120_120.png',
          nums: 1,
          name: '神功丸',
          text: '+1',
          number: 1,
          weight: '25'
        },
        {
          awardId: 4,
          id: 0,
          type: 'luck_key',
          icon: 'xyys_120_120.png',
          nums: 1,
          name: '钥匙',
          text: '+1',
          number: 1,
          weight: '25'
        },
        {
          awardId: 17,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 5,
          name: '绿晶石',
          text: '+5',
          number: 1,
          weight: '40'
        },
        {
          awardId: 18,
          id: 1,
          type: 'tool',
          icon: 'zjs_120_120.png',
          nums: 1,
          name: '紫晶石',
          text: '+1',
          number: 1,
          weight: '40'
        }
      ]
    },
    2: {
      layer: 2,
      name: '2层',
      need_ticket: 2,
      is_locker: true,
      has_optional: false,
      award_list: [
        {
          awardId: 5,
          id: 0,
          type: 'luck_key',
          icon: 'xyys_120_120.png',
          nums: 1,
          name: '钥匙',
          text: '+1',
          number: 1,
          weight: '25'
        },
        {
          awardId: 6,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 10,
          name: '绿晶石',
          text: '+10',
          number: 1,
          weight: '25'
        },
        {
          awardId: 7,
          id: 0,
          type: 'hero_gold',
          icon: 'jb_120_120.png',
          nums: 100000,
          name: '金币',
          text: '金币+10万',
          number: 1,
          weight: '25'
        },
        {
          awardId: 8,
          id: 4,
          type: 'hero_tools',
          icon: 'zhs_120_120.png',
          nums: 1,
          name: '召唤石',
          text: '召唤石+1',
          number: 1,
          weight: '25'
        },
        {
          awardId: 19,
          id: 1,
          type: 'tool',
          icon: 'zjs_120_120.png',
          nums: 2,
          name: '紫晶石',
          text: '+2',
          number: 1,
          weight: '40'
        },
        {
          awardId: 20,
          id: 0,
          type: 'hero_gold',
          icon: 'jb_120_120.png',
          nums: 30000,
          name: '金币',
          text: '金币+3万',
          number: 1,
          weight: '40'
        }
      ]
    },
    3: {
      layer: 3,
      name: '3层',
      need_ticket: 3,
      is_locker: true,
      has_optional: false,
      award_list: [
        {
          awardId: 9,
          id: 7,
          type: 'hero_tools',
          icon: 'py_120_120.png',
          nums: 20,
          name: '璞玉',
          text: '璞玉+20',
          number: 1,
          weight: '25'
        },
        {
          awardId: 10,
          id: 0,
          type: 'voice',
          icon: '',
          nums: 3,
          name: '桃花盛开',
          text: '声波+3天',
          number: 1,
          weight: '25'
        },
        {
          awardId: 11,
          id: 6,
          type: 'tool',
          icon: 'kxt_120_120.png',
          nums: 3,
          name: '口香糖',
          text: '+3',
          number: 1,
          weight: '25'
        },
        {
          awardId: 12,
          id: 1,
          type: 'tool',
          icon: 'zjs_120_120.png',
          nums: 5,
          name: '紫晶石',
          text: '+5',
          number: 1,
          weight: '25'
        },
        {
          awardId: 21,
          id: 4,
          type: 'hero_tools',
          icon: 'zhs_120_120.png',
          nums: 3,
          name: '召唤石',
          text: '召唤石+3',
          number: 1,
          weight: '40'
        },
        {
          awardId: 22,
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 50000,
          name: '元宝',
          text: '+5万',
          number: 1,
          weight: '40'
        }
      ]
    },
    4: {
      layer: 4,
      name: '4层',
      need_ticket: 4,
      is_locker: true,
      has_optional: false,
      award_list: [
        {
          awardId: 13,
          id: 0,
          type: 'pretty_card',
          icon: 'lhq_120_120.png',
          nums: 10,
          name: '靓号券',
          text: '+10',
          number: 1,
          weight: '25'
        },
        {
          awardId: 14,
          id: 0,
          type: 'chat_bubble',
          icon: '',
          nums: 5,
          name: '纯爱降临',
          text: '私聊气泡+5天',
          number: 1,
          weight: '25'
        },
        {
          awardId: 15,
          id: 1,
          type: 'tool',
          icon: 'zjs_120_120.png',
          nums: 8,
          name: '紫晶石',
          text: '+8',
          number: 1,
          weight: '25'
        },
        {
          awardId: 16,
          id: 158,
          type: 'tool',
          icon: 'cbt_120_120.png',
          nums: 1,
          name: '藏宝图',
          text: '+1',
          number: 1,
          weight: '25'
        },
        {
          awardId: 23,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 40,
          name: '绿晶石',
          text: '+40',
          number: 1,
          weight: '40'
        },
        {
          awardId: 24,
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 80000,
          name: '元宝',
          text: '+8万',
          number: 1,
          weight: '40'
        }
      ]
    },
    5: {
      layer: 5,
      name: '5层',
      need_ticket: 5,
      is_locker: true,
      has_optional: false,
      award_list: [
        {
          awardId: 41,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 80,
          name: '绿晶石',
          text: '+80',
          weight: '17'
        },
        {
          awardId: 42,
          id: 0,
          type: 'voice',
          icon: '',
          nums: 3,
          name: '桃花盛开',
          text: '声波+3天',
          weight: '18'
        },
        {
          awardId: 43,
          id: 4993,
          type: 'title',
          icon: '',
          nums: 3,
          name: '找个CP',
          text: '+3天',
          weight: '10'
        },
        {
          awardId: 44,
          id: 142,
          type: 'tool',
          icon: 'fsjc_120_120.png',
          nums: 100,
          name: '精粹',
          text: '+100',
          weight: '15'
        },
        {
          awardId: 45,
          id: 109,
          type: 'pst_privilege',
          icon: 'sglr_120_120.png',
          nums: 1,
          name: '时光恋人',
          text: '物赠送权+1天',
          weight: '15'
        },
        {
          awardId: 46,
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 100000,
          name: '元宝',
          text: '+10万',
          weight: '15'
        }
      ]
    }
  },
  spend_awards: [
    {
      awardId: 6,
      id: 0,
      type: 'chat_bubble',
      icon: '',
      nums: 3,
      name: '纯爱降临',
      text: '私聊气泡+3天',
      need: 6,
      has_right: 0
    },
    {
      awardId: 11,
      id: 92,
      type: 'property',
      icon: 'tezw_120_120.png',
      nums: 3,
      name: '天鹅之吻',
      text: '礼物赠送权+3天',
      need: 11,
      has_right: 0
    },
    {
      awardId: 25,
      id: 0,
      type: 'pretty_card',
      icon: 'lhq_120_120.png',
      nums: 5,
      name: '靓号券',
      text: '+5',
      need: 25,
      has_right: 0
    },
    {
      awardId: 40,
      id: 158,
      type: 'tool',
      icon: 'cbt_120_120.png',
      nums: 5,
      name: '藏宝图',
      text: '+5',
      need: 40,
      has_right: 0
    },
    {
      awardId: 60,
      id: 0,
      type: 'luck_key',
      icon: 'xyys_120_120.png',
      nums: 2,
      name: '钥匙',
      text: '+2',
      need: 60,
      has_right: 0
    },
    {
      awardId: 80,
      id: 158,
      type: 'tool',
      icon: 'cbt_120_120.png',
      nums: 10,
      name: '藏宝图',
      text: '+10',
      need: 80,
      has_right: 0
    },
    {
      awardId: 100,
      id: 61,
      type: 'car',
      icon: 'sswz_120_120.png',
      nums: 14,
      name: '神圣王座',
      text: '座驾+14天',
      need: 100,
      has_right: 0
    }
  ],
  spend_nums: '0',
  recharges: '0'
}

// 珍宝弹框默认数据
export const treasureDialogData = {
  list: [
    {
      layer: 1,
      is_curr: true,
      is_special: false,
      layer_name: '1层',
      awards: [
        {
          awardId: 25,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 10,
          name: '绿晶石',
          text: '+10',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 26,
          id: 0,
          type: 'hero_gold',
          icon: 'jb_120_120.png',
          nums: 20000,
          name: '金币',
          text: '金币+2万',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 27,
          id: 0,
          type: 'luck_key',
          icon: 'xyys_120_120.png',
          nums: 1,
          name: '钥匙',
          text: '+1',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 28,
          id: 142,
          type: 'tool',
          icon: 'fsjc_120_120.png',
          nums: 15,
          name: '精粹',
          text: '+15',
          number: 1,
          optional: 1,
          weight: '20'
        }
      ]
    },
    {
      layer: 2,
      is_curr: false,
      is_special: false,
      layer_name: '2层',
      awards: [
        {
          awardId: 29,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 20,
          name: '绿晶石',
          text: '+20',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 30,
          id: 0,
          type: 'luck_key',
          icon: 'xyys_120_120.png',
          nums: 2,
          name: '钥匙',
          text: '+2',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 31,
          id: 76,
          type: 'pst_privilege',
          icon: 'thy_120_120.png',
          nums: 3,
          name: '桃花运',
          text: '赠送权+3天',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 32,
          id: 142,
          type: 'tool',
          icon: 'fsjc_120_120.png',
          nums: 30,
          name: '精粹',
          text: '+30',
          number: 1,
          optional: 1,
          weight: '20'
        }
      ]
    },
    {
      layer: 3,
      is_curr: false,
      is_special: false,
      layer_name: '3层',
      awards: [
        {
          awardId: 33,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 40,
          name: '绿晶石',
          text: '+40',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 34,
          id: 92,
          type: 'mic',
          icon: '',
          nums: 2,
          name: '真爱永恒',
          text: '头饰+3天',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 35,
          id: 0,
          type: 'pretty_card',
          icon: 'lhq_120_120.png',
          nums: 5,
          name: '靓号券',
          text: '+5',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 36,
          id: 142,
          type: 'tool',
          icon: 'fsjc_120_120.png',
          nums: 50,
          name: '精粹',
          text: '+50',
          number: 1,
          optional: 1,
          weight: '20'
        }
      ]
    },
    {
      layer: 4,
      is_curr: false,
      is_special: false,
      layer_name: '4层',
      awards: [
        {
          awardId: 37,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 60,
          name: '绿晶石',
          text: '+60',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 38,
          id: 0,
          type: 'luck_key',
          icon: 'xyys_120_120.png',
          nums: 5,
          name: '钥匙',
          text: '+5',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 39,
          id: 158,
          type: 'tool',
          icon: 'cbt_120_120.png',
          nums: 1,
          name: '藏宝图',
          text: '+1',
          number: 1,
          optional: 1,
          weight: '20'
        },
        {
          awardId: 40,
          id: 142,
          type: 'tool',
          icon: 'fsjc_120_120.png',
          nums: 70,
          name: '精粹',
          text: '+70',
          number: 1,
          optional: 1,
          weight: '20'
        }
      ]
    },
    {
      layer: 5,
      is_curr: false,
      is_special: true,
      layer_name: '5层',
      awards: [
        {
          awardId: 47,
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 100,
          name: '绿晶石',
          text: '+100',
          optional: 1,
          weight: '20'
        },
        {
          awardId: 48,
          id: 158,
          type: 'tool',
          icon: 'cbt_120_120.png',
          nums: 1,
          name: '藏宝图',
          text: '+1',
          optional: 1,
          weight: '20'
        },
        {
          awardId: 49,
          id: 61,
          type: 'car',
          icon: 'sswz_120_120.png',
          nums: 7,
          name: '神圣王座',
          text: '座驾+7天',
          optional: 1,
          weight: '20'
        },
        {
          awardId: 50,
          id: 142,
          type: 'tool',
          icon: 'fsjc_120_120.png',
          nums: 80,
          name: '精粹',
          text: '+80',
          optional: 1,
          weight: '20'
        }
      ]
    }
  ]
}

// 桃花签运默认数据
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
          nums: 1,
          name: '紫晶石',
          text: '+1',
          weight: '25'
        },
        {
          id: 'gamegold',
          type: 'property',
          icon: 'yb_120_120.png',
          nums: 20000,
          name: '元宝',
          text: '+2万',
          weight: '25'
        },
        {
          id: 3,
          type: 'tool',
          icon: 'sgw_120_120.png',
          nums: 1,
          name: '神功丸',
          text: '+1',
          weight: '25'
        },
        {
          id: 2,
          type: 'tool',
          icon: 'ljs_120_120.png',
          nums: 5,
          name: '绿晶石',
          text: '+5',
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
          id: 123,
          type: 'tool',
          icon: 'qmtg_120_120.png',
          nums: 10,
          name: '亲密糖果',
          text: '+10',
          weight: '25'
        },
        {
          id: 6,
          type: 'CP_card',
          icon: 'wrmm_120_120.png',
          nums: 1,
          name: '温柔弥漫',
          text: '+1',
          weight: '25'
        },
        {
          id: 5,
          type: 'tool',
          icon: 'msm_120_120.png',
          nums: 1,
          name: '魔术帽',
          text: '+1',
          weight: '25'
        },
        {
          id: 6,
          type: 'tool',
          icon: 'kxt_120_120.png',
          nums: 1,
          name: '口香糖',
          text: '+1',
          weight: '25'
        }
      ],
      org_price: 16,
      real_price: 16
    }
  ]
}

// 长情回顾默认数据
export const longLoveReviewData = {
  cp_info: {
    icon_info: {
      uid: 0,
      username: '',
      profile_image: '',
      tuid: 0,
      tusername: '',
      tprofile_image: ''
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
      text: '桃花币+1',
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
      text: '桃花币+1',
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
      text: '桃花币+1',
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
      text: '桃花币+1',
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
      text: '桃花币+1',
      nums: 3,
      days: '365',
      sweet: '205200',
      has_right: 0
    }
  ]
}

// 心动较量
export const loveRank = {
  day_list: {
    20240213: '02月13日',
    20240214: '02月14日',
    20240215: '02月15日',
    20240216: '02月16日',
    20240217: '02月17日'
  },
  select_date: '20240213',
  belong_server: '1',
  daily_rank: [
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
      rank: 1,
      uidStr: 0
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
      rank: 2,
      uidStr: 0
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
      rank: 3,
      uidStr: 0
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
      rank: 4,
      uidStr: 0
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
      rank: 5,
      uidStr: 0
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
      rank: 6,
      uidStr: 0
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
      rank: 7,
      uidStr: 0
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
      rank: 8,
      uidStr: 0
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
      rank: 9,
      uidStr: 0
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
      rank: 10,
      uidStr: 0
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
      rank: 11,
      uidStr: 0
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
      rank: 12,
      uidStr: 0
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
      rank: 13,
      uidStr: 0
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
      rank: 14,
      uidStr: 0
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
      rank: 15,
      uidStr: 0
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
      rank: 16,
      uidStr: 0
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
      rank: 17,
      uidStr: 0
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
      rank: 18,
      uidStr: 0
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
      rank: 19,
      uidStr: 0
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
      rank: 20,
      uidStr: 0
    }
  ],
  total_rank: [
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
      rank: 1,
      uidStr: 0
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
      rank: 2,
      uidStr: 0
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
      rank: 3,
      uidStr: 0
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
      rank: 4,
      uidStr: 0
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
      rank: 5,
      uidStr: 0
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
      rank: 6,
      uidStr: 0
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
      rank: 7,
      uidStr: 0
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
      rank: 8,
      uidStr: 0
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
      rank: 9,
      uidStr: 0
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
      rank: 10,
      uidStr: 0
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
      rank: 11,
      uidStr: 0
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
      rank: 12,
      uidStr: 0
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
      rank: 13,
      uidStr: 0
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
      rank: 14,
      uidStr: 0
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
      rank: 15,
      uidStr: 0
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
      rank: 16,
      uidStr: 0
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
      rank: 17,
      uidStr: 0
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
      rank: 18,
      uidStr: 0
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
      rank: 19,
      uidStr: 0
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
      rank: 20,
      uidStr: 0
    }
  ]
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
