// 积分兑奖
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
      exchange_times: 0,
      goods_icon: 'ch_clxf',
      goods_icon_t: 'ch_clxf',
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
      goods_icon: 'sgw_120_120.png',
      goods_icon_t: 'sgw_120_120.png',
      goods_id: 5,
      goods_name: '神功丸',
      goods_num: 1,
      goods_num_text: '神功丸+1',
      goods_type: 'tool',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 10,
      price: 50,
      price_text: '50',
      type: 'tools_Sgw'
    },
    {
      exchange_times: 0,
      goods_icon: 'ts_xkzl.svga',
      goods_icon_t: 'ts_xkzl.svga',
      goods_id: 80,
      goods_name: '星空之旅',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_zlzx'
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
          nums: 8,
          text: '8',
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
      days_cond: '3',
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
          nums: 15,
          text: '15',
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
      days_cond: '3',
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
      days_cond: '3',
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
          nums: 25,
          text: '25',
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
      days_cond: '3',
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
          nums: 50,
          text: '50',
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
      days_cond: '3',
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
          nums: 80,
          text: '80',
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
          type: 'property',
          text_add: '加赠2.2万'
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
          type: 'property',
          text_add: '加赠4.5万'
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
          text: '88万',
          tool_id: 'gamegold',
          text_add: '加赠8.8万',
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
          type: 'tool',
          name: '藏宝图',
          id: 158,
          nums: 10,
          text: '10',
          icon: 'cbt_60_60.png'
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
          text_add: '加赠13万',
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
          text: '200万',
          tool_id: 'gamegold',
          text_add: '加赠20万',
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
          type: 'tool',
          name: '黄金藏宝图',
          id: 159,
          nums: 1,
          text: '1',
          icon: 'hjcbt_60_60.png'
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
          text_add: '加赠34万',
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
          tool_id: 'gamegold',
          text_add: '加赠60万',
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
          type: 'tool',
          name: '黄金藏宝图',
          id: 159,
          nums: 3,
          text: '3',
          icon: 'hjcbt_60_60.png'
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
        // {
        //   icon: 'jbk24xs_120_120.png',
        //   id: 0,
        //   name: '24小时金币卡',
        //   nums: 20,
        //   text: '20',
        //   type: 'hero_tools'
        // },
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
        tool_id: 2,
        icon: 'cbt_120_120.png',
        name: '藏宝图',
        double_nums: 0,
        nums: 1,
        show_text: '藏宝图+1',
        text: '+1',
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
    ],
    condition: 1,
    has_right: 0
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
        {
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 100,
          text: '100',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 1000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 100,
          text: '100',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 2000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 100,
          text: '100',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 3000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 200,
          text: '200',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 5000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 500,
          text: '500',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 10000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          type: 'tool',
          name: '黄金藏宝图',
          id: 158,
          nums: 1,
          text: '1',
          icon: 'hjcbt_60_60.png'
        },
        {
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 1000,
          text: '1000',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 20000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 1000,
          text: '1000',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 30000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
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
          type: 'tool',
          name: '黄金藏宝图',
          id: 158,
          nums: 1,
          text: '1',
          icon: 'hjcbt_60_60.png'
        },
        {
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 2000,
          text: '2000',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 50000,
      consume_nums: 50000,
      has_right: 0,
      is_daily: false
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
          type: 'tool',
          name: '黄金藏宝图',
          id: 158,
          nums: 2,
          text: '2',
          icon: 'hjcbt_60_60.png'
        },
        {
          icon: 'fsjc_60_60.png',
          name: '精粹',
          nums: 3000,
          text: '3000',
          tool_id: 142,
          type: 'tool'
        }
      ],
      condition: 100000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false
    }
  },
  present_top: [
    {
      profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 1000,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 800,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 600,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    }
  ],
  send_present_top: [
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 1000,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 800,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 600,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image: 'https://cdn-image.dandan818.com/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    }
  ],
  uid: '0'
}

// 疯狂砸蛋
export const crazyEgg = {
  consume: '0',
  hammer_nums: '0',
  server_pool: '1,000,000',
  egg_list: [
    {
      egg_id: 1,
      egg_type: '1',
      egg_icon: 'dan_1.png'
    },
    {
      egg_id: 2,
      egg_type: '2',
      egg_icon: 'dan_2.png'
    },
    {
      egg_id: 3,
      egg_type: '3',
      egg_icon: 'dan_3.png'
    },
    {
      egg_id: 4,
      egg_type: '4',
      egg_icon: 'dan_4.png'
    },
    {
      egg_id: 5,
      egg_type: '5',
      egg_icon: 'dan_5.png'
    }
  ],
  egg_types: {
    1: '红色蛋',
    2: '紫色蛋',
    3: '蓝色蛋',
    4: '绿色蛋',
    5: '黄色蛋',
    6: '普通炫彩蛋',
    7: '贪婪炫彩蛋',
    8: '普通光明蛋',
    9: '贪婪光明蛋',
    10: '普通星遇蛋',
    11: '贪婪星遇蛋'
  },
  greedy_types: [7, 9, 11],
  greedy_awards: {
    7: [
      {
        icon: 'yb_120_120.png',
        name: '10%元宝奖池',
        other: '',
        egg_type: '普通奖励',
        desc: '100%获得奖池中10%元宝'
      },
      {
        icon: 'yb_120_120.png',
        name: '10%元宝奖池',
        other: '+50万元宝',
        egg_type: '贪婪奖励',
        desc: '60%获得奖池中10%元宝+50万元宝，40%一无所获'
      }
    ],
    9: [
      {
        icon: 'cysn_120_120.png',
        name: '座驾+3天',
        other: '',
        egg_type: '普通奖励',
        desc: '100%获得【赤焰神牛】座驾+3天'
      },
      {
        icon: 'cysn_120_120.png',
        name: '座驾+6天',
        other: '',
        egg_type: '贪婪奖励',
        desc: '60%获得【赤焰神牛】座驾+6天，40%一无所获'
      }
    ],
    11: [
      {
        icon: 'prxdjz_120_120.png',
        name: '戒指+1',
        other: '',
        egg_type: '普通奖励',
        desc: '100%获得【怦然心动戒指】+1'
      },
      {
        icon: 'prxdjz_120_120.png',
        name: '戒指+2',
        other: '',
        egg_type: '贪婪奖励',
        desc: '60%获得【怦然心动戒指】+2，40%一无所获'
      }
    ]
  },
  smash_nums: 0,
  process_awards: [
    {
      award_id: 15,
      type: 'tool',
      id: 2,
      icon: 'ljs_120_120.png',
      nums: 50,
      name: '绿晶石',
      text: '+50',
      show_text: '+50',
      max: 15,
      has_right: 0
    },
    {
      award_id: 30,
      type: 'pst_privilege',
      id: 77,
      icon: 'kamm_120_120.png',
      nums: 3,
      name: '礼物赠送权',
      text: '赠送权+3天',
      show_text: '+3天',
      max: 30,
      has_right: 0
    },
    {
      award_id: 50,
      type: 'luck_key',
      id: 0,
      icon: 'xyys_120_120.png',
      nums: 2,
      name: '钥匙',
      text: '+2',
      show_text: '+2',
      max: 50,
      has_right: 0
    },
    {
      award_id: 80,
      type: 'chat_bubble_pub',
      id: 34,
      icon: 'xrxg_120_120.png',
      nums: 5,
      name: '公屏气泡',
      text: '+5天',
      show_text: '+5天',
      max: 80,
      has_right: 0
    },
    // 征服者
    {
      award_id: 100,
      type: 'title',
      id: 4907,
      icon: 'ch_zfz',
      nums: 7,
      name: '属性称号',
      text: '属性称号+7天',
      show_text: '+7天',
      max: 100,
      has_right: 0
    }
    // 找个CP
    // {
    //   award_id: 100,
    //   type: 'title',
    //   id: 4907,
    //   icon: 'ch_zgcp',
    //   nums: 7,
    //   name: '属性称号',
    //   text: '属性称号+7天',
    //   show_text: '+7天',
    //   max: 100,
    //   has_right: 0
    // }
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
