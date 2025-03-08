<template>
  <div class="AwardItem">
    <!--图标和名称-->
    <div
      class="AwardItem_icon"
      :style="{ opacity: award.has_right == 2 ? '0.5' : '1' }"
    >
      <!--价格label-->
      <div v-if="award.label" class="label flex_across">
        <span>{{ award.label }}</span
        ><img :src="IconPath('mk1_11.png')" />
      </div>
      <!--图标-->
      <div class="icon_out_box" @click="$emit('clickPreview')">
        <div class="icon_main">
          <slot
            ><img
              :style="{ opacity: award.has_right == 2 ? '0.5' : '1' }"
              v-if="award.icon"
              :src="IconPath(award.icon)"
          /></slot>
        </div>
        <!--点击预览-->
        <div
          class="icon_preview flex_across"
          v-if="[6, 10].includes(award.goods_id)"
        >
          <span>点击预览</span>
        </div>
      </div>
      <!--名称-->
      <div
        class="name"
        :style="{
          color: special_color[award.goods_id] || '#ccb2ff',
          transform: `scale(${award.type == 'pst_privilege' ? '0.83' : '0.91'})`
        }"
        @click="$emit('clickPreview')"
      >
        {{ award.text }}
      </div>
    </div>
    <!--奖励id-->
    <div
      class="AwardItem_index flex_across"
      :class="[1, 2].includes(award.has_right) && 'AwardItem_index_active'"
    >
      {{ award.goods_id }}
    </div>
    <!--按钮-->
    <div
      :class="{
        already_exchange: award.has_right == 2,
        not_unlock: award.has_right == 0
      }"
      class="AwardItem_btn flex_across"
      @click="$emit('sweetsExchange')"
    >
      <template v-if="award.has_right == 1">
        <div class="nums">
          <span>{{ award.price }}</span
          ><img :src="IconPath('mk1_4.png')" />
        </div>
        <div class="btn_txt">兑换</div>
      </template>
      <template v-if="award.has_right == 2">已兑换</template>
      <template v-if="award.has_right == 0">未解锁</template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AwardItem',
  components: {},
  props: ['award'],
  data() {
    return {
      special_color: Object.freeze({
        9: '#FFBC2B',
        4: '#FFBC2B',
        10: '#EE3118',
        6: '#EE3118'
      })
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.AwardItem {
  position: relative;
  width: 150px;
  height: 321px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .label {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    width: 121px;
    height: 34px;
    background: #5283cc;
    border-radius: 17px;
    opacity: 1;

    > span {
      margin-right: -6px;
      display: block;
      font-weight: 500;
      font-size: 24px;
      color: #ffffff;
      white-space: nowrap;
      transform: scale(0.83);
    }

    > img {
      position: relative;
      top: 1px;
      width: 27px;
      height: 20px;
    }
  }

  .AwardItem_icon {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 178px;
    background: #2d1e51;
    border-radius: 20px;
    overflow: hidden;

    .icon_out_box {
      position: relative;
      margin: 11px auto 8px;
      width: 120px;
      height: 120px;
      background-color: #8657e7;
      padding: 4px;
      border-radius: 20px;

      .icon_main {
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #c4a6ff, #5b36a3);
        border-radius: 16px;

        > img {
          width: 100%;
        }
      }

      .icon_preview {
        position: absolute;
        bottom: 4px;
        left: 4px;
        width: 113px;
        height: 26px;
        background: #7e45ff;
        border-radius: 0px 0px 16px 16px;

        > span {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #d3bdff;
          transform: scale(0.75);
        }
      }
    }

    .name {
      width: fit-content;
      white-space: nowrap;
      font-size: 24px;
      color: #ccb2ff;
    }
  }

  .AwardItem_index {
    margin: 7px 0 0px;
    width: 58px;
    height: 58px;
    background: url('../assets/mk1_5.png') no-repeat left top/100% 100%;
    font-size: 26px;
    font-weight: 500;
    color: #9473df;
  }

  .AwardItem_index_active {
    background-image: url('../assets/mk1_6.png') !important;
    color: #ffec70 !important;
  }

  //领取
  .AwardItem_btn {
    margin-top: 17px;
    width: 144px;
    height: 60px;
    background: linear-gradient(0deg, #ff803b, #ffc046);
    border: 2px solid #ffffff;
    border-radius: 30px;

    .nums {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: fit-content;

      > span {
        margin-bottom: -5px;
        font-size: 20px !important;
        font-weight: 500 !important;
        color: #ffffff !important;
        transform: scale(0.83);
      }

      > img {
        width: 42px;
        height: 30px;
      }
    }

    .btn_txt {
      margin-left: 5px;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
    }
  }

  //  已兑换
  .already_exchange {
    background: linear-gradient(0deg, #6b6b6b, #969696);
    border-color: #a3a3a3;
    font-size: 26px;
    font-weight: 500;
    color: #b4b4b5;
  }

  //  未解锁
  .not_unlock {
    margin-top: 19px !important;
    width: 140px !important;
    height: 56px !important;
    border-color: transparent !important;
    background: #2d1e51 !important;
    border-radius: 28px !important;
    font-size: 26px;
    font-weight: 500;
    color: #735da5 !important;
  }
}
</style>
