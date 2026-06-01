<template>
  <PopupBox title="奖励橱窗" @clickClose="clickClose">
    <div class="box titleContainer">
      <img :src="IconPath('tk_51.png')" class="boxTitle block margin-row-center" alt="" />
      <div class="titleContainerList flex align-center justify-center flex-wrap">
        <lazy-component v-for="(title, tIndex) in titleList" :key="tIndex" class="titleAwardBox flex align-center justify-center flex-shrink-0 position-relative">
          <div class="topLabel flex align-center justify-center line-height-1 position-absolute" :class="title.label.includes('\n') ? 'status1' : ''">{{ title.label }}</div>
          <PublicImg :imgName="title.icon" imgType="title" />
        </lazy-component>
      </div>
    </div>
    <div class="box giftContainer">
      <!-- <p class="text-center">八周年活动限定礼物来啦！<br />活动期间，以下礼物中奖概率大幅提升！</p> -->
      <img :src="IconPath('tk_53.png')" class="boxTitle block margin-row-center" alt="" />
      <div class="giftContainerList flex align-center justify-center flex-wrap">
        <div v-for="(gift, gIndex) in giftList" :key="gIndex" class="giftAwardBox flex-column align-center justify-between flex-shrink-0 position-relative">
          <div class="topLabel flex align-center justify-center line-height-1 position-absolute" :class="gift.label.includes('\n') ? 'status1' : ''">{{ gift.label }}</div>
          <lazy-component class="giftIcon flex align-center justify-center position-relative">
            <div v-if="gift.date" class="date position-absolute line-height-1 flex justify-center">{{ gift.date }}</div>
            <PublicImg :imgName="gift.icon" imgType="gift" />
            <img v-if="gift.giftLabel" :src="IconPath(gift.giftLabel)" class="giftLabel position-absolute" />
          </lazy-component>
          <p class="line-height-1 flex justify-center">{{ gift.name }}</p>
          <div v-if="gift.price" class="price flex align-center justify-center line-height-1">{{ gift.price }}<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
        </div>
      </div>
    </div>
    <div class="box ringContainer">
      <img :src="IconPath('tk_55.png')" class="boxTitle block margin-row-center" alt="" />
      <div class="ringContainerList flex align-center justify-center flex-wrap">
        <div v-for="(ring, rIndex) in ringList" :key="rIndex" class="ringAwardBox flex-column align-center justify-between flex-shrink-0 position-relative">
          <div class="topLabel flex align-center justify-center line-height-1 position-absolute" :class="ring.label.includes('\n') ? 'status1' : ''">{{ ring.label }}</div>
          <lazy-component class="ringIcon flex align-center justify-center">
            <PublicImg :imgName="ring.icon" imgType="ring" />
          </lazy-component>
          <p class="line-height-1 flex justify-center">{{ ring.name }}</p>
          <div class="price flex align-center justify-center line-height-1">{{ ring.price }}<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
        </div>
      </div>
    </div>
    <div class="box costumeContainer">
      <img :src="IconPath('tk_56.png')" class="boxTitle block margin-row-center" alt="" />
      <div class="costumeContainerList flex align-center justify-center flex-wrap">
        <div v-for="(costume, cIndex) in costumeList" :key="cIndex" class="costumeAwardBox flex-column align-center justify-between flex-shrink-0 position-relative">
          <div class="topLabel flex align-center justify-center line-height-1 position-absolute" :class="costume.label.includes('\n') ? 'status1' : ''">{{ costume.label }}</div>
          <lazy-component class="costumeIcon position-relative flex align-center justify-center">
            <PublicImg :imgName="costume.icon" :imgType="costume.type" />
          </lazy-component>
          <p class="line-height-1 flex justify-center">{{ costume.name }}</p>
          <div class="typeText flex align-center justify-center line-height-1">{{ costume.typeText }}</div>
        </div>
      </div>
    </div>
  </PopupBox>
</template>

<script>

export default {
  data() {
    return {
      titleList: Object.freeze([
        { label: '双节回馈', icon: 'ch_mmm' }
      ]), // 称号
      giftList: Object.freeze([
        { label: '粽夏安康\n榜上有名', icon: 'sjdw_120_120.png', name: '商界帝王', price: '888', giftLabel: '' }
      ]), // 礼物
      ringList: Object.freeze([
        { label: '粽夏安康\n咸甜争霸', icon: 'znak_120_120.png', name: '粽纳安康', price: '999' },
        { label: '粽夏安康\n榜上有名', icon: 'jz_ytjl.svga', name: '瑶台金缕', price: '18888' }
      ]), // 戒指
      costumeList: Object.freeze([
        // { label: '香槟兑奖', icon: 'ts_fyj.svga', name: '【放映机】', typeText: '头饰', type: 'mic' },
        // { label: '充值有礼', icon: 'ts_8zn_01.png', name: '【八周年】普通版', typeText: '头饰', type: 'mic' },
        // { label: '蛋糕烘焙', icon: 'sy_45.png', name: '【焰舞华裾】', typeText: '时装', type: 'clothe' },
        { label: '咸甜争霸', icon: 'cfzl_120_120.png', name: '【咸甜争霸】', typeText: '公屏气泡', type: 'chat_bubble_pub' },
        // { label: '见习天使', icon: 'ts_8zn_02.svga', name: '【八周年】至臻版', typeText: '头饰', type: 'mic' },
        { label: '咸甜争霸', icon: 'zxnn_120_120.png', name: '【粽香袅袅】', typeText: '世界消息皮肤', type: 'world_msg_skins' },
        { label: '榜上有名', icon: 'qlpt_120_120.png', name: '【青龙破涛】', typeText: '座驾', type: 'car' }
        // { label: '天使契约', icon: 'sy_43.png', name: '【我们相爱】', typeText: 'cp资料卡', type: 'CP_card' },
        // { label: '星光争夺', icon: 'sy_47.png', name: '【卡拉永远ok】', typeText: '房间装扮', type: 'room_dec_suit' }
      ]) // 装扮
    }
  },
  async created() {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent.popupContent {
  .main {
    height: 60vh;
    max-height: 800px;
    .topLabel {
      z-index: 3;
      top: 0;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      width: 156px;
      height: 36px;
      background: url('@/pages/618/assets/tk_52.png') no-repeat left top/100% 100%;
      font-size: 20px;
      color: #FFFFFF;
      white-space: pre-wrap;
      &.status1 {
        width: 156px;
        height: 56px;
        line-height: 24px;
        background: url('@/pages/618/assets/tk_54.png') no-repeat left top/100% 100%;
      }
    }
    .box {
      margin: 0 auto 19px;
      width: 540px;
      background: rgba(116, 66, 27, 0.4);
      border-radius: 12px;
      padding: 23px 0 26px;
      .boxTitle {
        width: auto;
        height: 27px;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .titleContainer {
      .titleAwardBox {
        margin: 36px 8px 0;
        width: 178px;
        height: 118px;
        background: linear-gradient(180deg, #74421B, #74421B);
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        border-radius: 16px;
        border: 4px solid #D3AB6D;
      }
    }
    .ringContainer,.giftContainer {
      //>p{
      //  font-size: 26px;
      //  color: #FFFFFF;
      //  line-height: 36px;
      //}
      .ringAwardBox,.giftAwardBox {
        margin: 46px 8px 0;
        width: 208px;
        height: 268px;
        background: linear-gradient(0deg, #B49250, #986D37);
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        border-radius: 16px;
        border: 4px solid rgba(211,171,109,0.8);
        padding: 16px 0 16px;
        .ringIcon,.giftIcon {
          width: 148px;
          height: 148px;
          background: linear-gradient(180deg, #74421B, #74421B);
          -webkit-background-clip: padding-box, border-box;
          -webkit-background-origin: padding-box, border-box;
          border-radius: 16px;
          border: 4px solid  rgba(211,171,109,0.5);
          //.date {
          //  z-index: 2;
          //  top: 2px;
          //  left: 50%;
          //  transform: translateX(-50%);
          //  width: 145px;
          //  height: 36px;
          //  background: rgba(106, 75, 255, 0.8);
          //  border-radius: 20px 20px 0 0;
          //  font-size: 18px;
          //  color: #FFF95D;
          //  padding-top: 15px;
          //}
          //.giftLabel {
          //  bottom: 0;
          //  right: 0;
          //  width: 56px;
          //  height: 32px;
          //}
        }
        p {
          font-size: 22px;
          color: #FFFFFF;
        }
        .price {
          width: 120px;
          height: 35px;
          background: #FFFFFF;
          border-radius: 18px;
          font-weight: 500;
          font-size: 22px;
          color: #C97009;
          >img {
            margin-left: 5px;
            width: 28px;
          }
        }
      }
      //.giftAwardBox:nth-child(1) {
      //  justify-content: flex-start;
      //  p {
      //    margin-top: 10px;
      //  }
      //}
    }
    .costumeContainerList {
      .costumeAwardBox {
        margin: 36px 14px 0;
        width: 148px;
        .costumeIcon {
          width: 148px;
          height: 148px;
          background: linear-gradient(180deg, #74421B, #74421B);
          -webkit-background-clip: padding-box, border-box;
          -webkit-background-origin: padding-box, border-box;
          border-radius: 16px;
          border: 4px solid  rgba(211,171,109,0.5);
          .avatar {
            width: 80%;
            height: 80%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
        p {
          margin: 10px 0;
          font-size: 24px;
          color: #FFFFFF;
        }
        .typeText {
          font-size: 24px;
          color: #FFE569;
        }
      }
    }
  }
}
</style>
