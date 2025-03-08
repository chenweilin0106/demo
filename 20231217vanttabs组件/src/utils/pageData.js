export const module1 = {
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
    masonry_consume1: {
      award_nums: 10,
      finish_times: 0,
      has_right: 0,
      is_recharge: false,
      max_times: 1000,
      need_rev: true,
      piece: 4,
      show_text: '10',
      task_name: '消费1000钻1'
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

export const module2 = {
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
        nums: 20,
        show_text: '20',
        type: 'tool'
      },
      {
        id: 47,
        nums: 1,
        show_text: '1天',
        type: 'mic'
      }
    ],
    condition: 1,
    has_right: 0
  }
}

export const module3 = {
  pop_value: 0, // 人气值
  ticket_nums: 0, // 兑换券数
  ticket_process: {
    // 兑换券进度条
    finish_nums: 0, // 完成的进度
    max: 20000 // 进度条满值
  },
  award_list: [
    // 人气值达成奖励
    {
      name: '绿晶石',
      max_nums: 5000,
      type: 'tool',
      id: 2,
      nums: 100,
      text: '100',
      icon: 'ljs_120_120.png',
      key: 5000,
      finish_nums: 0,
      has_right: 0 // 状态：0-不可领取 1-可以领取 2-已领取
    },
    {
      name: '绿晶石',
      max_nums: 10000,
      type: 'tool',
      id: 2,
      nums: 200,
      text: '200',
      icon: 'ljs_120_120.png',
      key: 10000,
      finish_nums: 0,
      has_right: 0
    },
    {
      name: '绿晶石',
      max_nums: 15000,
      type: 'tool',
      id: 2,
      nums: 280,
      text: '280',
      icon: 'ljs_120_120.png',
      key: 15000,
      finish_nums: 0,
      has_right: 0
    }
  ],
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
        }
      ],
      condition: 100000,
      consume_nums: 0,
      has_right: 0,
      is_daily: true
    }
  }
}

export const module4 = {}

export const module5 = {}

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
  }
}
