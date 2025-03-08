<template>
  <theme-box :is-show-top="true" class="TitleAward">
    <div class="title_award_main">
      <div class="title_award_main_left flex_vertical">
        <div class="top">
          <div class="label"><span>限男</span></div>
          <public-json jsonName="ch_shoppingns" />
        </div>
        <div class="bottom">
          <div class="label"><span>限女</span></div>
          <public-json jsonName="ch_shoppingnw" />
        </div>
      </div>
      <div class="title_award_main_right">
        <p>活动期间累计消耗{{ title_status.max }}钻石</p>
        <p>可领取<i class="speical_color">永久称号</i></p>
        <p>
          <i class="speical_color"
            >（{{ numLimit(title_status.finish_nums, title_status.max) }}/{{
              title_status.max
            }}）</i
          >
        </p>
        <div
          :class="ButtonStyle('GoodsTask', title_status.has_right)"
          class="theme_botton_undid title_award_btn"
          @click="onClick('GoodsTask')"
        >
          {{ ButtonText('GoodsTask', title_status.has_right) }}
        </div>
      </div>
    </div>
    <div class="title_award_tip flex_across">
      <div class="circle"></div>
      求婚时购买求婚物品的消费计算在内
    </div>
  </theme-box>
</template>

<script>
import PublicJson from '@/pages/1111/components/PublicJson.vue'

export default {
  name: 'TitleAward',
  components: {
    PublicJson
  },
  props: ['title_status'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClick() {
      if (this.title_status.has_right == 1) {
        this.$emit('onClick')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.TitleAward {
  //width: 360px;
  width: 100%;
  height: 200px;

  .title_award_main {
    display: flex;
    width: 100%;

    .title_award_main_left {
      margin-top: 17px;
      margin-left: 13px;
      width: 113px;
      height: 128px;
      border: 3px solid #c5eaeb;
      background-color: #fff;
      padding: 1px;
      border-radius: 10px;

      .top,
      .bottom {
        position: relative;
        flex: 1;
        width: 105px;
        height: 60px;
        background: linear-gradient(0deg, #3337aa, #212072);
        border-radius: 6px 6px 0px 0px;
        box-shadow: 0 0px 3px 2px #272784 inset;

        .label {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          width: 25px;
          height: 12px;
          background: linear-gradient(0deg, #4574e8, #4850c3);
          border-radius: 0 6px 0 6px;
          white-space: nowrap;

          > span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.83);
            font-size: 12px;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }

      .bottom {
        border-radius: 0 0 6px 6px;
        background: linear-gradient(0deg, #5544c8, #4157c1);
        box-shadow: 0 0px 3px 2px #3e3291 inset;

        .label {
          width: 25px;
          height: 12px;
          background: linear-gradient(0deg, #9571e1, #6d76e6);
          border-radius: 0 0px 0 6px;
        }
      }
    }

    .title_award_main_right {
      margin-left: 11px;
      padding-top: 25px;
      overflow: hidden;

      p {
        margin-bottom: 6px;
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;

        .speical_color {
          color: #fff99e;
        }

        &:nth-last-of-type(1) {
          margin-left: -5px;
        }
      }

      .title_award_btn {
        position: absolute;
        bottom: 52px;
        right: 17px;
        width: 92px;
        height: 32px;
        border-radius: 16px;
      }
    }
  }

  .title_award_tip {
    margin: 8px auto 0;
    justify-content: flex-start;
    width: 315px;
    height: 24px;
    background: #272783;
    font-size: 14px;
    color: #ffffff;

    .circle {
      margin: 0 7px;
      width: 6px;
      height: 6px;
      background: #fff99e;
      border-radius: 50%;
    }
  }
}
</style>
