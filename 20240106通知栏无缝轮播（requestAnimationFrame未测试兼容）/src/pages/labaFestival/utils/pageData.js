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
      goods_name: '钥匙',
      goods_num: 1,
      goods_num_text: '钥匙+1',
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
      type: 'tools_sgw'
    },
    {
      exchange_times: 0,
      goods_icon: '',
      goods_icon_t: '',
      goods_id: 80,
      goods_name: '火树银花',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_hsyh'
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
      days_cond: '3',
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
      days_cond: '3',
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
      days_cond: '3',
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
      days_cond: '3',
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
      days_cond: '3',
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

// 神奇扭蛋
export const magicEgg = {
  recharge: 0,
  ticket: '0',
  carousel: [
    {
      uid: '20011',
      username: '我是积13极',
      profile_image:
        'https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg',
      remark: '【烟火年年】主页特效+1天'
    },
    {
      uid: '20013',
      username: '我是积13极123',
      profile_image:
        'https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg',
      remark: '【烟火年年】主页特效+1天'
    }
  ]
}

// 钻石送礼默认数据
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 2,
          text: '2',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 4,
          text: '4',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
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
          icon: 'zhs_120_120.png',
          name: '召唤石',
          nums: 8,
          text: '8',
          tool_id: 4,
          type: 'hero_tools'
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

// 技能礼包默认数据
export const MagicTwist = {
  skill_gifts: '0',
  hot_gift: {
    hot_100: {
      goods_icon: 'ljs_60_60.png',
      goods_id: 2,
      goods_name: '绿晶石',
      goods_num: 120,
      has_right: 1,
      index: 1,
      spend: 100
    },
    hot_450: {
      goods_icon: 'ljs_60_60.png',
      goods_id: 2,
      goods_name: '绿晶石',
      goods_num: 600,
      has_right: 1,
      index: 2,
      spend: 450
    },
    hot_900: {
      goods_icon: 'ljs_60_60.png',
      goods_id: 2,
      goods_name: '绿晶石',
      goods_num: 1200,
      has_right: 1,
      index: 3,
      spend: 900
    }
  }
}

// 玩趣集市
export const funfair = {
  gender: '0',
  user_icon:
    'https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg',
  snow_nums: 0,
  gift_buy_nums: 0,
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
          gift_name: '礼包一',
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
          exchange_times: 0,
          has_right: 1
        },
        {
          gift_id: 2,
          gift_name: '礼包二',
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
          exchange_times: 0,
          has_right: 1
        }
      ]
    },
    {
      name: '挚爱礼盒',
      list: [
        {
          gift_id: 3,
          gift_name: '礼包一',
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
          exchange_times: 0,
          has_right: 1
        },
        {
          gift_id: 4,
          gift_name: '礼包二',
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
          exchange_times: 0,
          has_right: 1
        }
      ]
    },
    {
      name: '符石礼盒',
      list: [
        {
          gift_id: 5,
          gift_name: '礼包一',
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
          exchange_times: 0,
          has_right: 1
        },
        {
          gift_id: 6,
          gift_name: '礼包二',
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
          exchange_times: 0,
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
      finish_times: 0,
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
      text: '+1',
      max: 2,
      need: 80,
      finish_times: 0,
      has_right: 1
    }
  ]
}

// 榜上有名
export const defaultRank = {
  uid: '20011',
  code: '116622',
  is_pretty: true,
  my_username: '我是积13极',
  my_profile_image:
    'https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg',
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
