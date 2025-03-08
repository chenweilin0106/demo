<template>
  <div class="WuLin">
    <!-- 技能规则组件 -->
    <SkillRules />
    <!-- 技能礼包列表组件 -->
    <SkillGiftList
      :skill_gifts="skill_gifts"
      :hot_gift="hot_gift"
      @exchargeSkillGift="exchargeSkillGift"
    />
  </div>
</template>

<script>
// 技能礼包列表组件
import SkillGiftList from './components/SkillGiftList'
// 技能礼包规则组件
import SkillRules from './components/SkillRules'
// 请求接口导入
import { getPageData } from '../../api/index'
import { wuLin } from '../../utils/pageData'

export default {
  name: 'WuLin',
  created() {
    this.pageData = wuLin
    this.getPageData({
      type: 'tab',
      mark: 'm4'
    })
  },
  components: {
    SkillRules,
    SkillGiftList
  },
  computed: {
    // 我的积分
    skill_gifts() {
      return this.pageData.skill_gifts
    },
    // 技能礼包列表
    hot_gift() {
      return this.pageData.hot_gift
    }
  },
  methods: {
    // 兑换技能礼包
    async exchargeSkillGift(params) {
      const res = await this.SkillGift(params)
      this.$toast(res.errmsg)
      res.errno == 0 && (this.pageData.skill_gifts = res.hots)
    },
    // 兑换技能礼包请求
    async SkillGift(mark) {
      return await getPageData({
        mark,
        type: 'hot_gift'
      })
    }
  }
}
</script>
