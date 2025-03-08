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
      exchange_times: 0,
      goods_icon: 'lmdc_141_116.png',
      goods_icon_t: 'lmdc_141_116.png',
      goods_id: 5,
      goods_name: '座驾',
      goods_num: 1,
      goods_num_text: '座驾+1',
      goods_type: 'tool',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 10,
      price: 50,
      price_text: '50',
      type: 'car_kldc'
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
          icon: 'fsjc_60_60.png',
          id: 142,
          name: '精粹',
          nums: 300,
          text: '300',
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
      days_cond: '5',
      has_right: 0,
      reach_days: 0
    },
    30: {
      amount_cond: 30,
      awards: [
        {
          icon: 'fsjc_60_60.png',
          id: 142,
          name: '精粹',
          nums: 400,
          text: '400',
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
      days_cond: '5',
      has_right: 0,
      reach_days: 0
    },
    50: {
      amount_cond: 50,
      awards: [
        {
          icon: 'fsjc_60_60.png',
          id: 142,
          name: '精粹',
          nums: 500,
          text: '500',
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
      days_cond: '5',
      has_right: 0,
      reach_days: 0
    },
    100: {
      amount_cond: 100,
      awards: [
        {
          icon: 'fsjc_60_60.png',
          id: 142,
          name: '精粹',
          nums: 800,
          text: '800',
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
      days_cond: '5',
      has_right: 0,
      reach_days: 0
    },
    300: {
      amount_cond: 300,
      awards: [
        {
          icon: 'fsjc_60_60.png',
          id: 142,
          name: '精粹',
          nums: 1500,
          text: '1500',
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
      days_cond: '5',
      has_right: 0,
      reach_days: 0
    },
    500: {
      amount_cond: 500,
      awards: [
        {
          icon: 'fsjc_60_60.png',
          id: 142,
          name: '精粹',
          nums: 2500,
          text: '2500',
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
  gender: '0',
  recharge_nums: '0',
  woman_gift: {},
  man_gift: {
    gift_rev_nums: 0,
    gift_max_nums: 136,
    gift_award_st: 0
  },
  my_present: 0,
  my_send_present: 0,
  my_username: '',
  my_profile_image: '',
  uid: '0',
  present_top: [
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 1000
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 800
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 600
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    }
  ],
  send_present_top: [
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 1000
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 800
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 600
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    },
    {
      uid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      time: '--',
      tool_nums: 300
    }
  ],
  consume_status: {
    1000: {
      condition: 1000,
      consume_nums: 0,
      has_right: 0,
      is_daily: false,
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
      is_daily: false,
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
      is_daily: false,
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
      is_daily: false,
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
      is_daily: false,
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
      consume_nums: '0',
      has_right: 0,
      is_daily: false,
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
      consume_nums: '0',
      has_right: 0,
      is_daily: false,
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
      consume_nums: '0',
      has_right: 0,
      is_daily: false,
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
      consume_nums: '0',
      has_right: 0,
      is_daily: false,
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
        icon: 'llyt_120_120.png',
        name: '座驾+3天',
        other: '',
        egg_type: '普通奖励',
        desc: '100%获得【玲珑玉兔】座驾+3天'
      },
      {
        icon: 'llyt_120_120.png',
        name: '座驾+6天',
        other: '',
        egg_type: '贪婪奖励',
        desc: '60%获得【玲珑玉兔】座驾+6天，40%一无所获'
      }
    ],
    11: [
      {
        icon: '',
        name: '声波+3天',
        other: '',
        egg_type: '普通奖励',
        desc: '100%获得【碳酸汽水】声波+3天'
      },
      {
        icon: '',
        name: '声波+6天',
        other: '',
        egg_type: '贪婪奖励',
        desc: '60%获得【碳酸汽水】声波+6天，40%一无所获'
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
      icon: 'xfzs_120_120.png',
      nums: 3,
      name: '仙风折扇',
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
      type: 'costume',
      id: 34,
      icon: 'hhmf_120_120.png',
      nums: 5,
      name: '黑红梅方',
      text: '主页特效+5天',
      show_text: '+5天',
      max: 80,
      has_right: 0
    },
    {
      award_id: 100,
      type: 'title',
      id: 4907,
      icon: '',
      nums: 7,
      name: '征服者',
      text: '属性称号+7天',
      show_text: '+7天',
      max: 100,
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
