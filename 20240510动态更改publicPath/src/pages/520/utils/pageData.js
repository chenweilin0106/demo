// 积分兑奖默认数据
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
    // {
    //   type: 'hero_tools_zhs',
    //   goods_name: '召唤石',
    //   goods_type: 'hero_tools',
    //   goods_id: 4,
    //   goods_num: 1,
    //   price: 30,
    //   price_text: '30',
    //   max_times: 10,
    //   goods_icon: 'zhs_120_120.png',
    //   goods_icon_t: 'zhs_120_120.png',
    //   goods_num_text: '召唤石+1',
    //   desc: '用于蛋蛋部落玩法中，召唤英雄',
    //   is_owned: false,
    //   is_lock: false,
    //   exchange_times: 0,
    //   has_right: 1
    // },
    {
      type: 'title',
      goods_name: '永久称号',
      goods_type: 'title',
      goods_id: 4987,
      goods_num: 0,
      price: 520,
      price_text: '520',
      max_times: 1,
      goods_icon: 'ch_arcs',
      goods_icon_t: 'ch_arcs',
      goods_num_text: '永久称号+1',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1,
      mark: '520特惠'
    },
    {
      type: 'costume',
      goods_name: '桃心气球',
      goods_type: 'costume',
      goods_id: 58,
      goods_num: 7,
      price: 100,
      price_text: '100',
      max_times: 1,
      goods_icon: 'txqq_120_120.png',
      goods_icon_t: 'txqq_120_120.png',
      goods_num_text: '主页特效+7天',
      spend_cond: 0,
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
    },
    {
      type: 'car_asqbt',
      goods_name: '爱神丘比特',
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 10,
          text: '10',
          type: 'tool'
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 20,
          text: '20',
          type: 'tool'
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 26,
          text: '26',
          type: 'tool'
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 33,
          text: '33',
          type: 'tool'
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 66,
          text: '66',
          type: 'tool'
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 100,
          text: '100',
          type: 'tool'
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
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 266,
          text: '266',
          type: 'tool'
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
    3000: {
      amount_cond: 3000,
      awards: [
        {
          icon: 'zjs_60_60.png',
          id: 142,
          name: '紫晶石',
          nums: 1000,
          text: '1000',
          type: 'tool'
        },
        {
          icon: 'lhq_60_60.png',
          id: 0,
          name: '靓号券',
          nums: 3,
          text: '3',
          type: 'pretty_card'
        },
        {
          icon: '',
          id: 2,
          name: '称号',
          nums: 7,
          text: '7天',
          type: 'title',
          desc: '称号属性：佛山无影脚技能基础命中增加10%，基础闪避增加10%'
        }
        // {
        //   id: 0,
        //   name: '威望值',
        //   nums: 0.05,
        //   text: '佛山无影脚技能基础命中增加10%，基础闪避增加10%',
        //   type: 'prestige'
        // }
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
          type: 'property',
          text_add: '加赠1.6万'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 16,
          text: '16',
          type: 'tool'
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
          text_add: '加赠2.2万',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 22,
          text: '22',
          type: 'tool'
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
          text_add: '加赠4.5万',
          type: 'property'
        },
        {
          icon: 'ljs_60_60.png',
          id: 2,
          name: '绿晶石',
          nums: 45,
          text: '45',
          type: 'tool'
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
          text_add: '加赠8.8万',
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
          icon: 'cbt_60_60.png',
          id: 4,
          name: '藏宝图',
          nums: 10,
          text: '10',
          type: 'cbt'
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
          text_add: '加赠13万',
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
          text_add: '加赠20万',
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
          icon: 'hjcbt_60_60.png',
          id: 4,
          name: '黄金藏宝图',
          nums: 1,
          text: '1',
          type: 'hjcbt'
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
          text_add: '加赠34万',
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
          text_add: '加赠60万',
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
          icon: 'hjcbt_60_60.png',
          id: 4,
          name: '召唤石',
          nums: 3,
          text: '3',
          type: 'hjcbt'
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
          text_add: '加赠120万'
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
          text_add: '加赠240万'
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
    condition: 1,
    has_right: 0,
    awards: [
      {
        type: 'tool',
        tool_id: 2,
        icon: 'ljs_120_120.png',
        name: '绿晶石',
        double_nums: 0,
        nums: 20,
        show_text: '绿晶石+20',
        text: '+20',
        mark: 'mk2_17.png'
      },
      {
        type: 'tool',
        tool_id: 158,
        icon: 'cbt_120_120.png',
        name: '藏宝图',
        nums: 1,
        show_text: '藏宝图+1',
        text: '藏宝图+1',
        mark: ''
      },
      {
        type: '',
        icon: 'sjjl_120_120.png',
        tool_id: 0,
        name: '随机稀有奖励',
        nums: 1,
        show_text: '随机稀有奖励',
        text: '随机稀有奖励',
        mark: 'mk2_18.png'
      }
    ]
  },
  user_tickets: 0,
  user_recharges: 0,
  is_last_day: false
}

// 消费有礼默认数据
export const presentGift = {
  user_gender: '0', // 性别
  user_icon: '', // 头像
  marriage_gift: {
    // 礼包
    awards: [
      {
        icon: 'ts_520male.svga',
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 2,
        //   text: '2',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 2,
        //   text: '2',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 2,
        //   text: '2',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 4,
        //   text: '4',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 200,
          text: '200',
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 4,
        //   text: '4',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 500,
          text: '500',
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 4,
        //   text: '4',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
        {
          icon: 'hjcbt_120_120.png',
          name: '黄金藏宝图',
          nums: 1,
          text: '1',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 1000,
          text: '1000',
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 8,
        //   text: '8',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 1000,
          text: '1000',
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 8,
        //   text: '8',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
        {
          icon: 'hjcbt_120_120.png',
          name: '黄金藏宝图',
          nums: 1,
          text: '1',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 2000,
          text: '2000',
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
        // {
        //   icon: 'zhs_120_120.png',
        //   name: '召唤石',
        //   nums: 8,
        //   text: '8',
        //   tool_id: 4,
        //   type: 'hero_tools'
        // },
        {
          icon: 'hjcbt_120_120.png',
          name: '黄金藏宝图',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
        },
        {
          icon: 'fsjc_120_120.png',
          name: '符石精粹',
          nums: 3000,
          text: '3000',
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

// 独家记忆默认数据
export const generatePoster = {
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
      id: '0',
      username: '虚位以待',
      profile_image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
    }
    // {
    //   id: '20013',
    //   username: '20013',
    //   profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png'
    // }
  ],
  select_info: {
    uid_mic_id: '',
    uid_title_id: '',
    tuid_mic_id: '',
    tuid_title_id: ''
  },
  equip_info: {
    // 1: true,
    // 2: true,
    // 3: '103',
    // 4: true,
    // 5: '5124',
    // 8: true
  },
  task_list: [
    {
      goods_id: 1,
      name: '时间素材',
      id: 0,
      type: 'lover_award_pri_type',
      icon: 'mk4_8.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 1,
      has_right: 0
    },
    {
      goods_id: 2,
      name: '声波+5天',
      id: 102,
      type: 'voice',
      icon: '',
      nums: 5,
      intimacy: 0,
      max_intimacy: 9999,
      has_right: 0
    },
    {
      goods_id: 3,
      name: '头饰+5天',
      id: 0,
      id_list: [103, 104],
      type: 'mic',
      icon: '',
      nums: 5,
      intimacy: 20520,
      max_intimacy: 20520,
      has_right: 0
    },
    {
      goods_id: 4,
      name: '自定义情话素材',
      id: 0,
      type: 'lover_award_pri_type',
      icon: 'zdyqhsc_120_120.png',
      nums: 0,
      intimacy: 0,
      max_intimacy: 39999,
      has_right: 0
    },
    {
      goods_id: 5,
      name: '永久称号二选一',
      id: 0,
      id_list: [5124, 5125],
      type: 'title',
      icon: '',
      nums: 0,
      intimacy: 0,
      max_intimacy: 52000,
      has_right: 0
    },
    {
      goods_id: 6,
      name: '边框素材二选一',
      id: 0,
      item_list: [
        {
          id: 's1',
          icon: 'bksc1_120_120.png',
          has_right: 2,
          name: '边框素材一'
        },
        {
          id: 's2',
          icon: 'bksc2_120_120.png',
          has_right: 2,
          name: '边框素材二'
        }
      ],
      select_type: 1,
      type: 'lover_award_pri_type',
      icon: '',
      nums: 0,
      intimacy: 0,
      max_intimacy: 66666,
      has_right: 0
    },
    {
      goods_id: 7,
      name: '装饰素材三选N',
      id: 0,
      item_list: [
        {
          id: 's3',
          icon: 'zssc1_120_120.png',
          has_right: 2,
          name: '花朵素材'
        },
        {
          id: 's4',
          icon: 'zssc2_120_120.png',
          has_right: 2,
          name: '飞鸽素材'
        },
        {
          id: 's5',
          icon: 'zssc3_120_120.png',
          has_right: 2,
          name: '千纸鹤素材'
        }
      ],
      select_type: 1,
      type: 'lover_award_pri_type',
      icon: '',
      nums: 0,
      intimacy: 0,
      max_intimacy: 79999,
      has_right: 0
    },
    {
      goods_id: 8,
      name: '情有独钟戒指+1',
      id: 17,
      type: 'ring',
      icon: '',
      nums: 1,
      text: '价值15999',
      intimacy: 0,
      max_intimacy: 99999,
      has_right: 0
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
