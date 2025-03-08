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
      goods_icon: 'okb_120_120.png',
      goods_icon_t: 'okb_120_120.png',
      goods_id: 5,
      goods_name: 'OK绷',
      goods_num: 1,
      goods_num_text: 'OK绷+1',
      goods_type: 'tool',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 10,
      price: 50,
      price_text: '50',
      type: 'tools_OKb'
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
      days_cond: '5',
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
      days_cond: '5',
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
      days_cond: '5',
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
      days_cond: '5',
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
      days_cond: '5',
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
      days_cond: '5',
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
        show_text: '永久头饰',
        type: 'mic'
      }
    ],
    condition: 1,
    has_right: 0
  }
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
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
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 1000,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 800,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 600,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    }
  ],
  send_present_top: [
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 1000,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 800,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 600,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    },
    {
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      time: '--',
      tool_nums: 300,
      uid: '',
      username: '虚位以待'
    }
  ],
  uid: '0'
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
