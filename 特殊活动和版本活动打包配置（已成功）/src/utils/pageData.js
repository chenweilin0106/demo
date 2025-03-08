// 心动兑奖默认数据
export const pointReward = {
  user_icon: '', // 用户头像
  credit_nums: 0,
  task_list: [
    {
      task_id: 'd1',
      task_name: '每日签到',
      award_nums: 1,
      finish_times: 1,
      max_times: 1,
      need_rev: true,
      has_right: 1,
      limit_type: 1
    },
    {
      task_id: 'd2',
      task_name: '收到5次祝福',
      award_nums: 5,
      finish_times: 0,
      max_times: 1,
      need_rev: true,
      has_right: 0,
      limit_type: 1
    },
    {
      task_id: 'd3',
      task_name: '赠送/收到一枚戒指',
      award_nums: 10,
      finish_times: 0,
      max_times: 1,
      need_rev: true,
      has_right: 0,
      limit_type: 1
    },
    {
      task_id: 'd4',
      task_name: '发出一次表白',
      award_nums: 2,
      finish_times: 0,
      max_times: 40,
      need_rev: true,
      has_right: 0,
      limit_type: 1
    },
    {
      task_id: 'd5',
      task_name: '赠送10个礼物',
      award_nums: 2,
      finish_times: 0,
      max_times: 40,
      need_rev: true,
      has_right: 0,
      limit_type: 1
    },
    {
      task_id: 'd6',
      task_name: '每充值10元获得',
      award_nums: 6,
      finish_times: 0,
      max_times: 0,
      need_rev: false,
      has_right: 0,
      limit_type: 0
    },
    {
      task_id: 'd7',
      task_name: '爱情小屋提升等级一次',
      award_nums: 99,
      finish_times: 0,
      max_times: 1,
      need_rev: true,
      has_right: 0,
      limit_type: 2
    }
  ],
  // #region
  exchange_list: [
    {
      goods_id: 1,
      type: 'tool',
      id: 2,
      nums: 5,
      price: 5,
      max_times: 0,
      name: '绿晶石',
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 2,
      type: 'tool',
      id: 123,
      nums: 5,
      price: 5,
      max_times: 0,
      name: '亲密糖果',
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 3,
      type: 'hero_tools',
      id: 4,
      nums: 1,
      price: 30,
      max_times: 10,
      name: '召唤石',
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 4,
      type: 'pretty_card',
      id: 0,
      nums: 1,
      price: 30,
      max_times: 10,
      name: '靓号券',
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 5,
      type: 'voice',
      id: 84,
      nums: 7,
      price: 80,
      max_times: 10,
      name: '声波甜蜜啵啵',
      finish_times: 0,
      has_right: 1
    },
    {
      goods_id: 6,
      type: 'ring',
      id: 1,
      nums: 1,
      price: 400,
      max_times: 3,
      name: '戒指恋恋之环',
      finish_times: 0,
      has_right: 1
    }
  ]
  // #endregion
}

// 爱意礼包
export const loveGiftBag = {
  gift_list: [
    {
      gift_id: 1,
      old_price: 891,
      new_price: 88,
      has_right: 1,
      max_times: 1,
      finish_times: 0,
      awards: [
        {
          id: 1,
          icon: 'xsjz_120_120.png',
          name: '心锁戒指',
          text: '+1',
          price: 99,
          type: 'jz'
        },
        {
          id: 2,
          icon: 'tmtg_120_120.png',
          name: '亲密糖果',
          text: '+66'
        }
      ]
    },
    {
      gift_id: 2,
      old_price: 1520,
      new_price: 499,
      has_right: 1,
      max_times: 5,
      finish_times: 0,
      awards: [
        {
          id: 1,
          icon: 'syzljz_120_120.png',
          price: 520,
          name: '四叶之恋戒指',
          text: '+1',
          type: 'jz'
        },
        { id: 2, icon: 'ljs_120_120.png', name: '绿晶石', text: '+100' }
      ]
    },
    {
      gift_id: 3,
      old_price: 6914,
      new_price: 1999,
      has_right: 1,
      max_times: 5,
      finish_times: 0,
      awards: [
        {
          id: 1,
          icon: 'xyjz_120_120.png',
          price: 1314,
          name: '心悦戒指',
          text: '+1',
          type: 'jz'
        },
        { id: 2, icon: 'ljs_120_120.png', name: '绿晶石', text: '+500' },
        { id: 3, icon: 'fbs_120_120.png', name: '防爆石', text: '+6' },
        { id: 4, icon: 'kxt_120_120.png', name: '口香糖', text: '+2' }
      ]
    },
    {
      gift_id: 4,
      old_price: 17751,
      new_price: 6699,
      has_right: 1,
      max_times: 5,
      finish_times: 0,
      awards: [
        {
          id: 1,
          icon: '',
          price: 5200,
          name: '璀璨钻戒',
          text: '+1',
          type: 'jz'
        },
        { id: 2, icon: 'ljs_120_120.png', name: '绿晶石', text: '+888' },
        { id: 3, icon: 'lhq_120_120.png', name: '靓号券', text: '+5' },
        { id: 4, icon: 'fbs_120_120.png', name: '防爆石', text: '+10' },
        { id: 5, icon: 'asqbt_120_120.png', name: '座驾', text: '+1天' },
        { id: 6, icon: 'tmpp_120_120.png', name: '气泡框', text: '+1天' }
      ]
    }
  ]
}

// 甜蜜榜单
export const sweetList = {
  // 榜单
  rankList: [
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 1
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 2
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 3
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 4
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 5
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 6
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 7
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 8
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 9
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 10
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 11
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 12
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 13
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 14
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 15
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 16
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 17
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 18
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 19
    },
    {
      uid: '',
      tuid: '',
      profile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      tprofile_image:
        'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png',
      username: '虚位以待',
      tusername: '虚位以待',
      num: '--',
      rank: 20
    }
  ],
  lover_rev_list: [
    {
      goods_id: 1,
      type: 'tool',
      id: 2,
      nums: 10,
      max: 4800000,
      name: '绿晶石',
      has_right: 2,
      finish_times: 9600000
    },
    {
      goods_id: 2,
      type: 'tool',
      id: 1,
      nums: 10,
      max: 9600000,
      name: '紫晶石',
      has_right: 2,
      finish_times: 9600000
    },
    {
      goods_id: 3,
      type: 'costume',
      id: 2,
      nums: 1,
      max: 14000000,
      name: '心动爱恋',
      has_right: 1,
      finish_times: 9600000
    },
    {
      goods_id: 4,
      type: 'hero_tools',
      id: 5,
      nums: 10,
      max: 24000000,
      name: '灵玉',
      has_right: 1,
      finish_times: 9600000
    },
    {
      goods_id: 5,
      type: 'hero_tools',
      id: 4,
      nums: 5,
      max: 36000000,
      name: '召唤石',
      has_right: 0,
      finish_times: 9600000
    },
    {
      goods_id: 6,
      type: 'property',
      id: 'gamegold',
      nums: 200000,
      max: 48000000,
      name: '元宝',
      has_right: 0,
      finish_times: 9600000
    }
  ]
}

// 按钮文本
export const ButtonTexts = {
  // 积分兑奖任务列表
  GoodsTask: {
    0: '未完成',
    1: '领取',
    2: '已领取'
  },
  // 积分兑奖兑换好礼
  chargeGoods: {
    1: '兑换',
    2: '已兑换'
  },
  // 积分兑奖弹框
  dialogRbtn: {
    title: '兑换并佩戴',
    mic: '兑换并装扮',
    voice: '兑换并装扮',
    car: '兑换并装备',
    keys: '兑2个',
    pretty_card: '兑2个',
    hero_tools: '兑换并使用'
  },
  // 充值返利
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
