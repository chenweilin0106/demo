<template>
  <PopupBox title="tab5@2x.png" @clickClose="clickClose">
    <div class="list flex align-center justify-center flex-wrap">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="award flex-column align-center"
      >
        <div
          class="icon w-100 position-relative"
          :class="`giftbag1_award_item${item.bg_type}`"
        >
          <img
            v-if="typeToNameMap[item.type]"
            :src="IconPath(typeToNameMap[item.type])"
            class="label position-absolute"
          />
          <div class="icon-main">
            <PublicImg
              :imgName="item.icon"
              :userAvatar="avatar"
              :class="item.type"
            />
          </div>
        </div>
        <div
          class="text w-100 flex align-center justify-center line-height-100 text-nowrap"
        >
          {{ item.nums == 2080 ? "绿晶石" + item.text : item.text }}
        </div>
      </div>
    </div>
    <div
      class="button position-relative flex align-center justify-center"
      @click="clickConfirm"
    ></div>
  </PopupBox>
</template>

<script>
/*
 <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @close="showCongratsGetPopup = false">
   <!--奖励需要使用json或者svga动画-->
   <--使用作用域插槽，根据type判断奖励图标是json或者svga-->
   <--（data是当前道具的信息，可以解构出type，id，icon等等）-->
   <template v-slot="{ data: { type } }">
     <public-json v-if="type == 'title'" jsonName="" :userAvatar="$store.getters.user_icon" />
     <public-svga v-else-if="type == 'mic'" svgaName="" :userAvatar="$store.getters.user_icon" />
   </template>
 </CongratsGetPopup>
 */
import PublicImg from "./PublicImg.vue";
import PopupBox from "./PopupBox.vue";
// import { nowEquip } from "../api/index";

export default {
  props: ["list", "avatar"],
  components: { PopupBox, PublicImg },
  data() {
    return {
      // list: [
      //   { icon: 'ljs_120_120.png', text: '+10', type: 'costume' }
      //   { icon: 'ljs_120_120.png', text: '+10' },
      //   { icon: 'ljs_120_120.png', text: '+10' }
      // ],
      typeToNameMap: Object.freeze({
        // title: "称号",
        mic: "pop_ts.png",
        // voice: "声波",
        // car: "座驾",
        costume: "pop_zytx.png",
        // chat_bubble: "气泡",
        // pst_privilege: "赠送权",
        ring: "pop_jz.png",
      }),
      typeToButtonTextMap: Object.freeze({
        title: "立即佩戴",
        mic: "立即装扮",
        voice: "立即装扮",
        car: "立即装备",
        costume: "立即装扮",
        chat_bubble: "立即装扮",
      }),
    };
  },
  computed: {
    // 是否装扮
    isEquip() {
      return (
        this.list.length == 1 && this.typeToButtonTextMap[this.list[0].type]
      );
    },
    // 按钮文案
    buttonText() {
      if (this.list.length >= 2) {
        return "我知道了";
      } else if (this.isEquip) {
        return this.typeToButtonTextMap[this.list[0].type];
      } else {
        return "我知道了";
      }
    },
  },
  methods: {
    async clickConfirm() {
      // if (this.isEquip) {
      //   const { type, tool_id = "", id = "" } = this.list[0];
      //   this.$toast((await nowEquip({ type, id: tool_id || id })).errmsg);
      // }
      this.clickClose();
    },
    clickClose() {
      this.$emit("clickClose");
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 332px;
  min-height: 204px;
}
::v-deep .main {
  padding-top: 50px;
  padding-bottom: 16px;
}
.list {
  width: 100%;
  .award {
    width: 60px;
    margin-left: 20px;
    margin-bottom: 6px;

    .icon {
      height: 60px;
      background-image: url("../assets/jl_bg_1.png");
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }
      .label {
        z-index: 1;
        position: absolute;
        width: auto;
        height: 12px;
        top: 0;
        right: 0;
      }
      .costume {
        width: 56px;
        height: 56px;
        border-radius: 8px;
      }
    }

    .text {
      margin-top: 7px;
      font-size: 14px;
      color: #ffffff;
    }

    /* 选择第2，5，8等元素 */
    //&:nth-child(3n + 2) {
    //  /* 样式规则 */
    //  margin-left: 35px;
    //}

    /* 选择第3，6，9等元素 */
    //&:nth-child(3n) {
    //  /* 样式规则 */
    //  margin-left: 35px;
    //}

    //&:nth-child(1) {
    //  /* 样式规则 */
    //  margin-left: 0;
    //}
    .giftbag1_award_item1 {
      background-image: url("../assets/jl_bg_1.png");
    }

    .giftbag1_award_item2 {
      background-image: url("../assets/jl_bg_2.png");
    }

    .giftbag1_award_item3 {
      background-image: url("../assets/jl_bg_4.png");
    }

    .giftbag1_award_item4 {
      background-image: url("../assets/jl_bg_3.png");
    }

    /* 选择第1，5，9等元素 */
    &:nth-child(4n + 1) {
      /* 样式规则 */
      margin-left: 0px;
    }
    ::v-deep .costume {
      .picImg {
        width: 56px;
        height: 56px;
        border-radius: 8px;
      }
    }
    ::v-deep .mic {
      .micAvatar {
        > img {
          width: 77%;
          height: 77%;
        }
      }
      .jsonBox {
        width: 90%;
        height: 90%;
      }
    }
  }
}

.button {
  margin: 23px auto 0;
  width: 122px;
  height: 39px;
  background-image: url("../assets/btn3_2@2x.png");
  background-size: 100% 100%;
}
</style>
