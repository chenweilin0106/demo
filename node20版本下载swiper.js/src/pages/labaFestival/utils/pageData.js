// 积分兑奖默认数据
export const pointReward = {
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
      exchange_times: '4',
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
      exchange_times: '0',
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
      exchange_times: '0',
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
      exchange_times: '0',
      has_right: 1
    },
    {
      type: 'title',
      goods_name: '永久称号',
      goods_type: 'title',
      goods_id: 5073,
      goods_num: 0,
      price: 600,
      price_text: '600',
      max_times: 1,
      goods_icon: '',
      goods_icon_t: '',
      goods_num_text: '永久称号+1',
      is_owned: false,
      is_lock: false,
      exchange_times: '0',
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
      is_owned: false,
      is_lock: false,
      exchange_times: 0,
      has_right: 1
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
        show_text: '1天',
        type: 'car'
      }
    ],
    condition: 1,
    has_right: 0
  }
}

// 钻石送礼默认数据
export const presentGift = {
  my_present: 0,
  my_send_present: 0,
  my_username: '',
  my_profile_image: '',
  uid: '',
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
  sign_type: 0,
  is_sign_award: false,
  consume_add_rate: 0,
  task_info: {},
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 50000,
          is_add: true
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 100000,
          is_add: true
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 150000,
          is_add: true
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 200000,
          is_add: true
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 400000,
          is_add: true
        }
      ]
    },
    20000: {
      condition: 20000,
      consume_nums: 0,
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 600000,
          is_add: true
        }
      ]
    },
    30000: {
      condition: 30000,
      consume_nums: 0,
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 850000,
          is_add: true
        }
      ]
    },
    50000: {
      condition: 50000,
      consume_nums: 0,
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 1300000,
          is_add: true
        }
      ]
    },
    100000: {
      condition: 100000,
      consume_nums: 0,
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
        },
        {
          type: 'property',
          name: '元宝',
          tool_id: 'gamegold',
          nums: 0,
          text: '加赠',
          icon: 'yb_120_120.png',
          add_num: 2000000,
          is_add: true
        }
      ]
    }
  }
}

// 神奇扭蛋
export const magicEgg = {
  recharge: 0,
  ticket: '0',
  carousel: [
    // {
    //   uid: '20011',
    //   username: '我是积13极',
    //   profile_image:
    //     'https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg',
    //   remark: '【烟火年年】主页特效+1天'
    // }
  ]
}

// 玩趣集市
export const funfair = {
  gender: '0',
  user_icon: 'https://imagevo.dandanvoice.com/app/head/head_block_1.png',
  snow_nums: 0,
  gift_buy_nums: '0',
  lamp_status: {
    type: 'pst_privilege',
    tool_id: 111,
    nums: 1,
    icon: 'hd_120_120.png',
    name: '花灯',
    text: '赠送权+1天',
    max: 1,
    has_right: 0,
    finish_nums: 0
  },
  gifts_list: [
    {
      name: '晶石礼盒',
      list: [
        {
          gift_id: 1,
          gift_name: '晶石礼盒1',
          price: 288,
          org_price: 1400,
          discount: '2.1',
          max_times: 20,
          awards: [
            {
              id: 2,
              type: 'tool',
              icon: 'ljs_120_120.png',
              nums: 100,
              name: '绿晶石',
              text: '+100'
            },
            {
              id: 1,
              type: 'tool',
              icon: 'zjs_120_120.png',
              nums: 10,
              name: '紫晶石',
              text: '+10'
            }
          ],
          exchange_times: '0',
          has_right: 1
        },
        {
          gift_id: 2,
          gift_name: '晶石礼盒2',
          price: 588,
          org_price: 4300,
          discount: '1.4',
          max_times: 20,
          awards: [
            {
              id: 2,
              type: 'tool',
              icon: 'ljs_120_120.png',
              nums: 200,
              name: '绿晶石',
              text: '+200'
            },
            {
              id: 1,
              type: 'tool',
              icon: 'zjs_120_120.png',
              nums: 20,
              name: '紫晶石',
              text: '+20'
            },
            {
              id: 4,
              type: 'hero_tools',
              icon: 'zhs_120_120.png',
              nums: 5,
              name: '召唤石',
              text: '+5'
            }
          ],
          exchange_times: '0',
          has_right: 1
        }
      ]
    },
    {
      name: '挚爱礼盒',
      list: [
        {
          gift_id: 3,
          gift_name: '挚爱礼盒1',
          price: 88,
          org_price: 435,
          discount: '2.0',
          max_times: 5,
          awards: [
            {
              id: 2,
              type: 'ring',
              icon: 'xsjz_120_120.png',
              nums: 1,
              name: '心锁戒指',
              text: '戒指+1'
            },
            {
              id: 123,
              type: 'tool',
              icon: 'qmtg_120_120.png',
              nums: 28,
              name: '亲密糖果',
              text: '+28'
            }
          ],
          exchange_times: '0',
          has_right: 1
        },
        {
          gift_id: 4,
          gift_name: '挚爱礼盒2',
          price: 520,
          org_price: 3159,
          discount: '1.6',
          max_times: 5,
          awards: [
            {
              id: 13,
              type: 'ring',
              icon: 'prxdjz_120_120.png',
              nums: 1,
              name: '怦然心动戒指',
              text: '戒指+1'
            },
            {
              id: 0,
              type: 'mic',
              icon: '',
              nums: 3,
              name: '爱的告白',
              text: '头饰+3天'
            },
            {
              id: 123,
              type: 'tool',
              icon: 'qmtg_120_120.png',
              nums: 80,
              name: '亲密糖果',
              text: '+80'
            }
          ],
          exchange_times: '0',
          has_right: 1
        }
      ]
    },
    {
      name: '符石礼盒',
      list: [
        {
          gift_id: 5,
          gift_name: '符石礼盒1',
          price: 388,
          org_price: 13000,
          discount: '腊八特典',
          max_times: 10,
          awards: [
            {
              id: 0,
              type: 'rune',
              icon: 'sjlsfs_120_120.png',
              nums: 1,
              name: '随机蓝色符石',
              text: '随机蓝色符石+1'
            },
            {
              id: 142,
              type: 'tool',
              icon: 'fsjc_120_120.png',
              nums: 100,
              name: '符石精粹',
              text: '+100'
            }
          ],
          exchange_times: '0',
          has_right: 1
        },
        {
          gift_id: 6,
          gift_name: '符石礼盒2',
          price: 1888,
          org_price: 95000,
          discount: '腊八特典',
          max_times: 10,
          awards: [
            {
              id: 0,
              type: 'rune',
              icon: 'sjzsfs_120_120.png',
              nums: 1,
              name: '随机紫色符石',
              text: '随机紫色符石+1'
            },
            {
              id: 142,
              type: 'tool',
              icon: 'fsjc_120_120.png',
              nums: 500,
              name: '符石精粹',
              text: '+500'
            }
          ],
          exchange_times: '0',
          has_right: 1
        }
      ]
    }
  ],
  snow_awards: [
    {
      award_id: 5,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 1,
      name: '小雪人',
      text: '+1',
      need: 5,
      has_right: 0
    },
    {
      award_id: 10,
      id: 'gamegold',
      type: 'property',
      icon: 'yb_120_120.png',
      nums: 20000,
      name: '元宝',
      text: '+2万',
      need: 10,
      has_right: 0
    },
    {
      award_id: 15,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 5,
      name: '小雪人',
      text: '+5',
      need: 15,
      has_right: 0
    },
    {
      award_id: 20,
      id: 2,
      type: 'tool',
      icon: 'ljs_120_120.png',
      nums: 25,
      name: '绿晶石',
      text: '+25',
      need: 20,
      has_right: 0
    },
    {
      award_id: 30,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 10,
      name: '小雪人',
      text: '+10',
      need: 30,
      has_right: 0
    },
    {
      award_id: 40,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 14,
      name: '小雪人',
      text: '+14',
      need: 40,
      has_right: 0
    },
    {
      award_id: 50,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 20,
      name: '小雪人',
      text: '+20',
      need: 50,
      has_right: 0
    },
    {
      award_id: 60,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 25,
      name: '小雪人',
      text: '+25',
      need: 60,
      has_right: 0
    },
    {
      award_id: 70,
      id: 0,
      type: 'award_snowman',
      icon: 'xxr_120_120.png',
      nums: 35,
      name: '小雪人',
      text: '+35',
      need: 70,
      has_right: 0
    }
  ],
  exchange_list: [
    {
      goods_id: 1,
      id: 4,
      type: 'hero_tools',
      icon: 'zhs_120_120.png',
      nums: 2,
      name: '召唤石',
      text: '+2',
      max: false,
      need: 6,
      finish_times: '1',
      has_right: 1
    },
    {
      goods_id: 2,
      id: 142,
      type: 'tool',
      icon: 'fsjc_120_120.png',
      nums: 100,
      name: '符石精粹',
      text: '+100',
      max: false,
      need: 10,
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 3,
      id: 59,
      type: 'car',
      icon: 'lmdc_120_120.png',
      nums: 2,
      name: '浪漫单车',
      text: '座驾+2天',
      max: 10,
      need: 14,
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 4,
      id: 90,
      type: 'voice',
      icon: '',
      nums: 5,
      name: '荧荧微光',
      text: '声波+5天',
      max: 10,
      need: 12,
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 5,
      id: 137,
      type: 'mic',
      icon: '',
      nums: 5,
      name: '踏雪寻梅',
      text: '头饰+5天',
      max: 5,
      need: 20,
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 6,
      id: 0,
      type: 'rune',
      icon: 'sjcsfs_120_120.png',
      nums: 1,
      name: '随机橙色符石',
      text: '随机橙色符石+1',
      max: 2,
      need: 80,
      finish_times: 0,
      has_right: 1
    }
  ]
}

// 榜上有名
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
    20240117: '01月17日',
    20240118: '01月18日',
    20240119: '01月19日',
    20240120: '01月20日',
    20240121: '01月21日'
  },
  select_date: '20240117'
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
    1: 'theme_botton_did',
    2: 'theme_botton_done'
  }
}
