// 蓝之声
import blue from '../assets/lottie/blue/data.json'
// 金之声
import gold from '../assets/lottie/gold/data.json'
// 橙之声
import orange from '../assets/lottie/orange/data.json'
// 粉之声
import pink from '../assets/lottie/pink/data.json'
// 紫之声
import purple from '../assets/lottie/purple/data.json'
// 赤之声
import red from '../assets/lottie/red/data.json'
// 青之声
import syan from '../assets/lottie/syan/data.json'

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
      goods_id: 4942,
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
      goods_icon: 'kxt_120_120.png',
      goods_icon_t: 'kxt_120_120.png',
      goods_id: 6,
      goods_name: '口香糖',
      goods_num: 1,
      goods_num_text: '口香糖+1',
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
      goods_id: 11,
      goods_name: '嗨起来',
      goods_num: 7,
      goods_num_text: '头饰+7天',
      goods_type: 'mic',
      has_right: 1,
      is_lock: false,
      is_owned: false,
      max_times: 1,
      price: 100,
      price_text: '100',
      type: 'mic_hql'
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
          icon: 'yb_60_60.png',
          id: 'gamegold',
          name: '元宝',
          nums: 45000,
          text: '4.5万',
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
      days_cond: '3',
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
          nums: 90000,
          text: '9万',
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
      days_cond: '3',
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
          nums: 120000,
          text: '12万',
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
      days_cond: '3',
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
          nums: 180000,
          text: '18万',
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
      days_cond: '3',
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
          nums: 300000,
          text: '30万',
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

// 幸运闯关
export const luckyEnter = {
  // 声波数据
  color_sonic: {
    secret_status: 2,
    owned_ids: []
  },
  // 用户是否首次闯关
  is_first: false,
  // 页面闯关状态
  gamer_status: false,
  recharge_nums: 0,
  user_icon: '',
  voice_tickets: '0',
  package: {
    // 关卡
    step: 1,
    // 一键通关状态
    is_one_touch: false,
    is_devil: false, // 当前关卡是否有大魔王
    // 魔王剩余时间
    devil_time: false,
    // 大魔王数量
    devil_nums: 0,
    // 消灭魔王所需钻石数量
    kill_spend: 0,
    // 当前关卡卡牌状态
    card_list: {
      1: {
        id: 1,
        award_id: 0
      },
      2: {
        id: 2,
        award_id: 0
      },
      3: {
        id: 3,
        award_id: 0
      },
      4: {
        id: 4,
        award_id: 0
      }
    },
    // 当前奖池状态
    awards_pool: {},
    // 限定奖励状态
    special_awards: {
      // 限定奖励key
      1: {
        type: 'car',
        id: 57,
        name: '爱神丘比特',
        nums: 15,
        cond: 150,
        text: '座驾+15天',
        icon: 'qbt_120_120.png',
        limit: false,
        // 合成状态（1-已合成 0-未合成）
        status: 0
      },
      2: {
        type: 'mic',
        id: 47,
        name: '蝶海梦花',
        nums: 15,
        cond: 150,
        text: '头饰+15天',
        icon: '',
        limit: false,
        status: 0
      },
      6: {
        type: 'voice_ticket',
        id: 0,
        name: '',
        nums: 1,
        cond: 300,
        text: '声波自选券+1',
        icon: 'sbzxq_160_160.png',
        limit: false,
        status: 0
      }
    },
    // 当前翻开的奖励
    award: {
      type: 'property',
      id: 'gamegold',
      text: '元宝',
      icon: 'yb_132_132.png',
      icon_s: 'mk4_dj_3_12.png',
      icon_b: 'mk4_dj_2_12.png',
      key: 2,
      nums: 2000
    },
    // 一键通关总奖励
    awards: {
      1: {
        type: 'piece',
        id: 1,
        text: '幸运碎片',
        icon: 'mk4_dj_1_1.png',
        icon_s: 'mk4_dj_3_1.png',
        icon_b: 'mk4_dj_2_1.png',
        nums: 20
      },
      2: {
        type: 'property',
        id: 'gamegold',
        text: '元宝',
        icon: 'yb_132_132.png',
        icon_s: 'mk4_dj_3_12.png',
        icon_b: 'mk4_dj_2_12.png',
        nums: 7000
      },
      3: {
        type: 'tool',
        id: 2,
        text: '绿晶石',
        icon: 'mk4_dj_1_8.png',
        icon_s: 'mk4_dj_3_9.png',
        icon_b: 'ljs_60_60.png',
        nums: 28
      },
      6: {
        type: 'tool',
        id: 19,
        text: '礼物道具',
        icon: 'mk4_dj_1_6.png',
        icon_s: 'mk4_dj_3_6.png',
        icon_b: 'mk4_dj_2_6.png',
        nums: 1
      },
      8: {
        type: 'tool',
        id: 44,
        text: '礼物道具',
        icon: 'mk4_dj_1_4.png',
        icon_s: 'mk4_dj_3_4.png',
        icon_b: 'mk4_dj_2_4.png',
        nums: 1
      },
      12: {
        type: 'tool',
        id: 23,
        text: '礼物道具',
        icon: 'mk4_dj_1_2.png',
        icon_s: 'mk4_dj_3_2.png',
        icon_b: 'qzh_60_60.png',
        nums: 2
      }
    },
    // 闯关币数量
    currency: 0,
    // 幸运碎片数量
    piece: 0,
    // 闯关次数（true-已经闯关过 false-未闯关）
    yet_played: false,
    // 抽奖次数
    lottery_ticket: 0,
    // 通关次数（每10次重置）
    pass_times: 0,
    // 已消费钻石数
    consume: 0
  }
}

// 最佳买手
export const bestBuyer = {
  gender: '0',
  user_icon: '',
  title_status: {
    type: 'title',
    tool_id: 0,
    nums: false,
    icon: '',
    name: 'shopping男神',
    text: '永久称号',
    finish_nums: 0,
    max: 26000,
    has_right: 0
  },
  gifts_list: [
    {
      name: '琳琅玉石',
      icon: 'mk5_2.png',
      list: [
        {
          gift_id: 1,
          gift_name: '礼包一',
          price: 300,
          org_price: 1400,
          discount: '2.1',
          max: 20,
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
          finish_times: 0,
          has_right: 1
        },
        {
          gift_id: 2,
          gift_name: '礼包二',
          price: 1950,
          org_price: 7500,
          discount: '2.6',
          max: false,
          awards: [
            {
              id: 2,
              type: 'tool',
              icon: 'ljs_120_120.png',
              nums: 500,
              name: '绿晶石',
              text: '+500'
            },
            {
              id: 1,
              type: 'tool',
              icon: 'zjs_120_120.png',
              nums: 50,
              name: '紫晶石',
              text: '+50'
            },
            {
              id: 9,
              type: 'tool',
              icon: 'fbs_120_120.png',
              nums: 10,
              name: '防爆石',
              text: '+10'
            }
          ],
          finish_times: 0,
          has_right: 1
        }
      ]
    },
    {
      name: '天神下凡',
      icon: 'mk5_5.png',
      list: [
        {
          gift_id: 3,
          gift_name: '礼包一',
          price: 300,
          org_price: 1900,
          discount: '1.6',
          max: 20,
          awards: [
            {
              id: 4,
              type: 'hero_tools',
              icon: 'zhs_120_120.png',
              nums: 3,
              name: '召唤石',
              text: '+3'
            },
            {
              id: 1,
              type: 'hero_tools',
              icon: 'sjwnsp_120_120.png',
              nums: 1,
              name: '天神万能碎片',
              text: '+1'
            }
          ],
          finish_times: 0,
          has_right: 1
        },
        {
          gift_id: 4,
          gift_name: '礼包二',
          price: 1200,
          org_price: 6000,
          discount: '2.0',
          max: false,
          awards: [
            {
              id: 4,
              type: 'hero_tools',
              icon: 'zhs_120_120.png',
              nums: 10,
              name: '召唤石',
              text: '+10'
            },
            {
              id: 1,
              type: 'hero_tools',
              icon: 'sjwnsp_120_120.png',
              nums: 3,
              name: '天神万能碎片',
              text: '+3'
            }
          ],
          finish_times: 0,
          has_right: 1
        }
      ]
    },
    {
      name: '属我最靓',
      icon: 'mk5_6.png',
      list: [
        {
          gift_id: 5,
          gift_name: '礼包一',
          price: 200,
          org_price: 300,
          discount: '6.7',
          max: 20,
          awards: [
            {
              id: 0,
              type: 'pretty_card',
              icon: 'lhq_120_120.png',
              nums: 3,
              name: '靓号券',
              text: '+3'
            }
          ],
          finish_times: 0,
          has_right: 1
        },
        {
          gift_id: 5,
          gift_name: '礼包二',
          price: 750,
          org_price: 1000,
          discount: '7.5',
          max: 20,
          awards: [
            {
              id: 0,
              type: 'pretty_card',
              icon: 'lhq_120_120.png',
              nums: 10,
              name: '靓号券',
              text: '+10'
            }
          ],
          finish_times: 0,
          has_right: 1
        }
      ]
    }
  ],
  star_nums: 0,
  gift_buy_nums: 0,
  star_award: {
    type: 'pst_privilege',
    id: 0,
    icon: '',
    text: '礼物赠送权+7天',
    nums: 7,
    max: 30,
    has_right: 0,
    finish_times: 0
  },
  today: '',
  free_users: []
}

// 幸运闯关声波数据
export const voiceData = [
  {
    id: 1,
    name: 'red',
    data: red,
    voice_id: '64',
    text: '赤之声'
  },
  {
    id: 2,
    name: 'syan',
    data: syan,
    voice_id: '66',
    text: '青之声'
  },
  {
    id: 3,
    name: 'orange',
    data: orange,
    voice_id: '61',
    text: '橙之声'
  },
  {
    id: 4,
    name: 'purple',
    data: purple,
    voice_id: '60',
    text: '紫之声'
  },
  {
    id: 5,
    name: 'blue',
    data: blue,
    voice_id: '70',
    text: '蓝之声'
  },
  {
    id: 6,
    name: 'gold',
    data: gold,
    voice_id: '71',
    text: '金之声'
  },
  {
    id: 7,
    name: 'pink',
    data: pink,
    voice_id: '69',
    text: '粉之声'
  }
]

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
