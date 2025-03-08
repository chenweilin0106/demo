// 积分兑奖默认数据
export const pointReward = {
  user_icon: `${process.env.VUE_APP_OSS_PATH}/app/head/head_block_1.png`,
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
      price: 550,
      mark: '600',
      max_times: 1,
      goods_icon: 'ch_wxrg',
      goods_icon_t: 'ch_wxrg',
      goods_num_text: '永久称号+1',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
    },
    {
      exchange_times: 0,
      goods_icon: 'msm_120_120.png',
      goods_icon_t: 'msm_120_120.png',
      goods_id: 5,
      goods_name: '魔术帽',
      goods_num: 1,
      goods_num_text: '魔术帽+1',
      goods_type: 'tool',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 10,
      price: 50,
      price_text: '50',
      type: 'tools_msm'
    },
    {
      exchange_times: 0,
      goods_icon: 'sb_laxh',
      goods_icon_t: 'sb_laxh',
      goods_id: 80,
      goods_name: '恋爱讯号',
      goods_num: 7,
      goods_num_text: '声波+7天',
      goods_type: 'voice',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'sb_laxh'
    },
    {
      type: 'car_cysn',
      goods_name: '赤炎神牛',
      goods_type: 'car',
      goods_id: 58,
      goods_num: 7,
      price: 300,
      price_text: '300',
      max_times: 1,
      goods_icon: 'cysn_120_120.png',
      goods_icon_t: 'cysn_120_120.png',
      goods_num_text: '座驾+7天',
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
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
          text_add: '加赠3.2万'
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
          text_add: '加赠4.4万',
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
          text_add: '加赠9万',
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
          text_add: '加赠17.6万',
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
          text_add: '加赠26万',
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
          text_add: '加赠40万',
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
          text_add: '加赠68万',
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
          text_add: '加赠120万',
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
          text_add: '加赠240万'
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
          text_add: '加赠480万'
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

// 钻石送礼
export const presentGift = {
  my_present: 0,
  my_profile_image: '',
  my_send_present: 0,
  my_username: '--',
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
  },
  present_top: [
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 1000,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 800,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 600,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    }
  ],
  send_present_top: [
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 1000,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 800,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 600,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`,
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    }
  ],
  uid: '0'
}

// 盖房子
export const buildHouse = {
  user_icon: `${process.env.VUE_APP_OSS_PATH}/app/head/head_block_1.png`, // 用户头像
  consume: '0', // 消耗的钻石数
  build_times: '0', // 剩余建造次数
  tot_nums: 0, // 累计建造层数
  server_layer: 1, // 当前大楼正在建造的楼层
  special_layers: [
    {
      uid: 0,
      username: '虚位以待',
      profile_image: '',
      layer: 588
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image: '',
      layer: 488
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image: '',
      layer: 388
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image: '',
      layer: 288
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image: '',
      layer: 188
    },
    {
      uid: 0,
      username: '虚位以待',
      profile_image: '',
      layer: 88
    }
  ],
  tot_awards: [
    {
      id: 25,
      need_num: 25,
      award: {
        id: 2,
        type: 'tool',
        nums: 50,
        name: '绿晶石',
        text: '+50',
        icon: 'ljs_120_120.png'
      },
      has_right: 0
    },
    {
      id: 38,
      need_num: 38,
      award: {
        id: 0,
        type: 'luck_key',
        nums: 1,
        name: '钥匙',
        text: '+1',
        icon: 'xyys_120_120.png'
      },
      has_right: 0
    },
    {
      id: 50,
      need_num: 50,
      award: {
        id: 0,
        type: 'chat_bubble',
        nums: 5,
        name: '一夜豹富',
        text: '气泡+5天',
        icon: 'qp_yybf_sc'
      },
      has_right: 0
    },
    {
      id: 90,
      need_num: 90,
      award: {
        id: 100,
        type: 'mic',
        nums: 5,
        name: '财神',
        text: '头饰+5天',
        icon: 'ts_cs.svga'
      },
      has_right: 0
    },
    {
      id: 140,
      need_num: 140,
      award: {
        id: 151,
        type: 'pst_privilege',
        nums: 5,
        name: '礼物赠送权',
        text: '赠送权+5天',
        icon: 'csd_120_120.png'
      },
      has_right: 0
    },
    {
      id: 160,
      need_num: 160,
      award: {
        id: 159,
        type: 'tool',
        nums: 1,
        name: '黄金藏宝图',
        text: '+1',
        icon: 'hjcbt_120_120.png'
      },
      has_right: 0
    }
  ],
  task_list: [
    // 补给任务
    {
      task_id: 1, // 任务id，用于任务奖励领取请求传值
      name: '每日登录活动页面',
      nums: 1, // 奖励建造机会的数量
      finish: 1, // 已完成次数
      max: 1, // 最大完成次数
      has_right: 0 // 任务领取状态：0-不可以领取，1-可以领取，2-已领取
    },
    {
      task_id: 2,
      name: '每日聊天室累计在线10分钟',
      nums: 1,
      finish: 0,
      max: 10,
      has_right: 0
    },
    {
      task_id: 3,
      name: '每日使用5次唇齿相依',
      nums: 1,
      finish: 0,
      max: 5,
      has_right: 0
    },
    {
      task_id: 4,
      name: '每日进行1次符石寻宝',
      nums: 1,
      finish: 0,
      max: 1,
      has_right: 0
    }
  ],
  room_id: '' // 聊天室id
}
