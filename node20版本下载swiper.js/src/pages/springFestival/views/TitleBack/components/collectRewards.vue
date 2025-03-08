!
<template>
  <out-box class="collectRewards" title="title_6.png">
    <div
      class="award_item"
      v-for="(item, index) in pageData1.collect_awards"
      :key="index"
    >
      <div class="left">
        <div class="award_top">
          <div class="icon">
            <img
              v-if="item.type == 'costume'"
              :src="IconPath('yhnn_120_120.png')"
              alt=""
            />
            <PublicSvga
              class="lottie"
              v-if="item.type == 'mic'"
              :svgaName="'ts_lxth'"
              :userAvatar="$store.state.user_icon"
            />
          </div>
        </div>
        <div class="award_bottom">{{ item.text }}</div>
      </div>
      <div class="right">
        <div class="task_name">{{ item.task_name }}</div>
        <div class="task_progress">
          {{ index == 0 ? '所有称号' : ''
          }}<i>({{ item.finish_nums }}/{{ item.max_nums }})</i>
        </div>
        <div
          class="question"
          v-show="index == 0"
          @click="$emit('showSet')"
        ></div>
        <div class="task_btn" v-if="item.has_right == 0">未完成</div>
        <div
          class="task_btn canget"
          @click="receiveCollect(item.goods_id)"
          v-if="item.has_right == 1"
        >
          领取
        </div>
        <div class="task_btn hasget" v-if="item.has_right == 2">已领取</div>
      </div>
    </div>
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
  </out-box>
</template>

<script>
// 引入接口
import { getPageData } from '../../../api/index'

import PublicSvga from '../../../components/PublicSvga.vue'
import congratsGetPrompt from '../../../components/congrats-get-prompt.vue'

export default {
  props: ['pageData1'],
  components: { PublicSvga, congratsGetPrompt },
  data() {
    return {
      awardData: []
    }
  },
  mounted() {},
  methods: {
    async receiveCollect(mark) {
      const res = await getPageData({
        type: 'title_collect_award',
        mark
      })
      console.log(res)
      if (res.errno == 0) {
        const arr = []
        arr.push(res.data.award)
        this.awardData = arr
        this.$emit('showCongrat', this.awardData)
        this.$emit('init')
      } else {
        this.$toast(res.errmsg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collectRewards {
  width: 710px;
  height: 469px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 148px;
  padding-top: 69px;
  .award_item {
    width: 660px;
    height: 168px;
    background: linear-gradient(90deg, #e55d3e, #f5b93a);
    border: 4px solid #ffe6a3;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    div {
      flex-shrink: 0;
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 240px;
      height: 100%;
      .award_top {
        width: 100%;
        height: 124px;
        background: linear-gradient(180deg, #ffe28a, #fffae1);
        border-radius: 12px 0px 0px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
          width: 113px;
          height: 113px;
          margin-top: 5px;
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
      .award_bottom {
        width: 240px;
        height: 36px;
        background: #c7341b;
        border-radius: 0px 0px 0px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .right {
      width: 420px;
      height: 160px;
      position: relative;
      padding-left: 24px;
      .task_name {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-top: 32px;
      }
      .task_progress {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-top: 20px;
        i {
          width: 65px;
          height: 27px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffea88;
        }
      }
      .question {
        position: absolute;
        top: 29px;
        right: 37px;
        background-image: url('../../../assets/mk6_10.png');
        background-size: 100% 100%;
        width: 32px;
        height: 32px;
      }
      .task_btn {
        position: absolute;
        width: 120px;
        height: 48px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 3px solid #ffffff;
        border-radius: 24px;
        bottom: 20px;
        right: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4d7ddd;
      }
      .canget {
        background: linear-gradient(0deg, #fff5b0, #ffffff);
        color: #a9792c;
      }
      .hasget {
        background: linear-gradient(0deg, #9d9d9d, #e7e7e7);
        color: #ffffff;
      }
    }
  }
}
</style>
