<template>
  <div class="TitleBack">
    <draw
      :pageData1="pageData"
      ref="draw"
      @showPro="showPro"
      @init="init"
      @showCongrat="showCongrat"
    ></draw>
    <exchangeAward
      :pageData1="pageData"
      @init="init"
      @showExchange="showExchange"
      @showCongrat="showCongrat"
    ></exchangeAward>
    <collectRewards
      :pageData1="pageData"
      @showSet="showSet"
      @showCongrat="showCongrat"
      @init="init"
    ></collectRewards>
    <exchangeTitle
      :pageData1="pageData"
      ref="exchangeTitle"
      @init="init"
    ></exchangeTitle>
    <titleSets ref="titleSets"></titleSets>
    <ProbabilityDeclaration ref="pro"></ProbabilityDeclaration>
    <congratsGetPrompt ref="congrat" :list="awardData">
      <template #default="{ data }">
        <div v-if="!data.icon" class="lottieContainer">
          <PublicSvga
            v-if="!data.icon && data.type == 'mic'"
            class="lottie"
            svgaName="ts_lxth"
            :userAvatar="$store.state.user_icon"
          />
          <img
            v-if="!data.icon && data.type == 'costume'"
            :src="IconPath('yhnn_120_120.png')"
            alt=""
          />
        </div>
      </template>
    </congratsGetPrompt>
  </div>
</template>

<script>
// 引入组件
import draw from './components/draw.vue'
import exchangeAward from './components/exchangeAward.vue'
import collectRewards from './components/collectRewards.vue'
import exchangeTitle from './components/dialog/exchangeTitle.vue'
import titleSets from './components/dialog/titleSets.vue'
import ProbabilityDeclaration from './components/dialog/ProbabilityDeclaration.vue'
import congratsGetPrompt from '../../components/congrats-get-prompt.vue'
import PublicSvga from '../../components/PublicSvga.vue'

// 引入默认数据
import { titleBack } from '../../utils/pageData'
// 引入接口
import { getPageData } from '../../api/index'

export default {
  name: 'TitleBack',
  data() {
    return {
      select_type: 1,
      pageData: {},
      awardData: [
        {
          type: 'tool',
          tool_id: 142,
          nums: 20,
          icon: 'fsjc_120_120.png',
          text: '+20',
          name: '精粹'
        }
      ]
    }
  },
  components: {
    draw,
    exchangeAward,
    collectRewards,
    exchangeTitle,
    titleSets,
    ProbabilityDeclaration,
    congratsGetPrompt,
    PublicSvga
  },
  computed: {},
  async created() {
    this.pageData = titleBack
    await this.init()
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
  },
  mounted() {},
  methods: {
    showCongrat(data) {
      this.awardData = data
      this.$refs.congrat.showPopup = true
    },
    // 刷新页面
    async init() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm6'
      })
      res.errno == 0 ? (this.pageData = res.data) : this.$toast(res.errmsg)
      return res
    },
    showPro() {
      this.$refs.pro.showPopup = true
    },
    showSet() {
      this.$refs.titleSets.showPopup = true
    },
    showExchange() {
      this.$refs.exchangeTitle.showPopup = true
    },
    changeSelectType(i) {
      console.log(i)
      if (this.select_type == i) {
        return
      }
      this.select_type = i
    }
  }
}
</script>

<style scoped lang="scss">
.TitleBack {
  position: relative;
  z-index: 5;
  margin-top: -139px;

  .lottieContainer {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .lottie {
    ::v-deep .micAvatar_img {
      width: 73%;
      height: 73%;
    }
  }
}
</style>
