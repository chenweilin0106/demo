<template>
  <theme-box theme-title-img="title_13.png" class="FreeBill">
    <div class="rule_btn" @click="$emit('showRule')"></div>
    <!--消费情况-->
    <div
      v-if="showUserIndex == currentFreeIndex && freeStatus == 0"
      class="cosume_status"
    >
      <div v-if="!spend_masonry" class="scroll_box_tip">
        购买任意双十一礼包，获得参与资格
      </div>
      <div v-else class="scroll_box_tip">
        今日免单可返<img :src="IconPath('zs_60_60.png')" />：{{ spend_masonry }}
      </div>
      <div class="theme_botton_undid scroll_box_btn" @click="scrollFn">
        {{ spend_masonry ? '继续累加' : '去完成' }}
      </div>
    </div>
    <!--日期标题-->
    <div class="date_title flex_across">
      <img v-if="showUserInfo?.icon" :src="IconPath(showUserInfo.icon)" />
      <!--前一天-->
      <div v-if="showUserIndex != 0" class="pre_day" @click="onPre"></div>
      <!--后一天-->
      <div
        v-if="showUserIndex != 2 && free_users.length"
        class="next_day"
        @click="onNext"
      ></div>
    </div>
    <!--头像-->
    <div
      v-if="showUserIndex == 0 || showUserInfo?.free_user?.length == 0"
      class="avatar_box"
    >
      <img
        v-if="showUserInfo?.free_user?.length"
        :src="showUserInfo?.free_user[0]?.profile_image"
        @click.stop="toUserMain(showUserInfo.free_user[0].uid)"
      />
      <img v-else :src="IconPath('mk5_19.png')" />
    </div>
    <!--倒计时-->
    <van-count-down
      v-if="showUserInfo?.count_down"
      :time="showUserInfo?.count_down * 1000"
      @finish="$emit('finish')"
    >
      <template #default="timeData">
        <span class="block">{{ timeData.hours }}</span>
        <span class="colon">时</span>
        <span class="block">{{ timeData.minutes }}</span>
        <span class="colon">分</span>
        <span class="block">{{ timeData.seconds }}</span>
        <span class="colon">秒</span>
      </template>
    </van-count-down>
    <div v-if="showUserInfo?.count_down" class="count_down_tip">后公布</div>
    <div
      v-if="showUserIndex == currentFreeIndex && freeStatus == 1"
      class="count_down_tip"
    >
      数据统计中，稍后公示
    </div>
    <!--单个用户获奖信息-->
    <div
      v-if="
        (showUserIndex == 0 &&
          showUserIndex == currentFreeIndex &&
          freeStatus == 2) ||
        (showUserIndex == 0 && showUserIndex != currentFreeIndex)
      "
      class="only_user_info flex_vertical"
    >
      <template v-if="showUserInfo?.free_user?.length == 1">
        <p @click.stop="toUserMain(showUserInfo.free_user[0].uid)">
          {{ showUserInfo.free_user[0].username }}
        </p>
        <p>ID：{{ showUserInfo.free_user[0].uid }}</p>
        <p class="flex_across">
          免单钻石<img :src="IconPath('zs_60_60.png')" />：{{
            showUserInfo.free_user[0].nums
          }}
        </p>
      </template>
      <template v-else>
        <p>参与免单活动人数不足</p>
      </template>
    </div>

    <!--第二天和第三天没有用户中奖-->
    <div
      v-if="
        (showUserIndex != currentFreeIndex &&
          showUserIndex != 0 &&
          showUserInfo.free_user.length == 0) ||
        (showUserIndex == currentFreeIndex &&
          showUserIndex != 0 &&
          freeStatus == 2 &&
          showUserInfo.free_user.length == 0)
      "
      class="no_user_info flex_across"
    >
      参与免单活动人数不足
    </div>

    <!--多个用户获奖信息-->
    <div
      v-if="showUserIndex >= 1 && showUserInfo?.free_user?.length >= 1"
      class="more_user_info_list"
    >
      <div
        v-for="(item, index) in showUserInfo.free_user"
        :key="index"
        class="more_user_info"
      >
        <div class="more_user_info_avatar" @click.stop="toUserMain(item.uid)">
          <img v-if="item.profile_image" :src="item.profile_image" />
        </div>
        <div class="more_user_info_text flex_vertical">
          <p>
            <i @click.stop="toUserMain(item.uid)">{{ item.username }}</i
            ><span>(ID：{{ item.uid }})</span>
          </p>
          <p class="flex_across">
            免单钻石<img :src="IconPath('zs_60_60.png')" />：{{ item.nums }}
          </p>
        </div>
      </div>
      <div
        v-for="item in +showUserIndex + 1 - showUserInfo.free_user.length"
        :key="item * 5"
        class="more_user_info"
      >
        <div class="more_user_info_avatar">
          <img :src="IconPath('mk5_19.png')" />
        </div>
        <div class="more_user_info_text flex_vertical">
          <p>虚位以待</p>
        </div>
      </div>
    </div>
    <!--免单得主-->
    <div
      v-if="showUserInfo?.date == today && freeStatus != 2"
      class="free_bill_tip flex_across"
    >
      <div class="circle"></div>
      免单得主说明：11.10抽取1位，11.11抽取2位，11.12抽取3位
    </div>
  </theme-box>
</template>

<script>
import { toUserMain } from '../../../utils/toApp'

export default {
  name: 'FreeBill',
  components: {},
  props: [
    'gift_buy_nums',
    'free_users',
    'today',
    'spend_masonry',
    'freeStatus'
  ],
  data() {
    return {
      showUserInfo: {},
      showUserIndex: ''
    }
  },
  computed: {
    currentFreeIndex() {
      return this.free_users.findIndex((item) => item.date == this.today)
    }
  },
  watch: {
    free_users(newVal) {
      if ([0, 1, 2].includes(this.showUserIndex)) {
        this.showUserInfo = newVal[this.showUserIndex]
      }
    }
  },
  methods: {
    showCurrent() {
      this.showUserIndex = this.currentFreeIndex
      this.showUserInfo = this.free_users[this.currentFreeIndex]
    },
    toUserMain,
    onPre() {
      if (this.showUserIndex == 0) return
      this.showUserIndex = this.showUserIndex - 1
      this.showUserInfo = this.free_users[this.showUserIndex]
      if (this.showUserIndex == this.currentFreeIndex) {
        this.$emit('update')
      }
    },
    onNext() {
      if (this.showUserIndex == 2) return
      const num = this.showUserIndex + 1
      if (this.free_users[num]) {
        this.showUserIndex = num
        // console.log(this.showUserIndex)
        this.showUserInfo = this.free_users[this.showUserIndex]
        // console.log(this.showUserInfo)
      } else {
        this.$toast('时间未到，明日再来~')
      }
      if (this.showUserIndex == this.currentFreeIndex) {
        this.$emit('update')
      }
    },
    scrollFn() {
      this.$nextTick(() => {
        const element = document.querySelector('#discount_gift')
        const head = document.querySelector('#discount_gift .ThemeBox_head')
        const scrollTop = element.offsetTop - head.offsetHeight / 2
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.FreeBill {
  width: 360px;
  //min-height: 390px;
  height: fit-content;

  ::v-deep .ThemeBox_main {
    min-height: 340px;
    height: fit-content;
    padding-top: 28px;
  }

  .rule_btn {
    position: absolute;
    top: 16px;
    right: 15px;
    width: 30px;
    height: 30px;
    background: url('../../../assets/mk5_1.png') no-repeat left top/100% 100%;
  }

  .cosume_status {
    //margin: 43px auto 0;
    margin: 15px auto 0;
    display: flex;
    align-items: center;
    width: 330px;
    height: 32px;
    background: #272783;
    padding: 0 10px;

    .scroll_box_tip {
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;

      > img {
        margin: 0 -3px;
        height: 30px;
      }
    }

    .scroll_box_btn {
      margin-left: auto;
      min-width: 47px;
      width: fit-content;
      padding: 0 7px;
      height: 20px;
      border-radius: 10px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  .date_title {
    position: relative;
    margin: 22px auto 0;
    width: 308px;
    height: 17px;

    > img {
      height: 100%;
    }

    .pre_day {
      position: absolute;
      top: 32px;
      left: -7px;
      width: 68px;
      height: 20px;
      background: url('../../../assets/mk5_17.png') no-repeat left top/100% 100%;
    }

    .next_day {
      position: absolute;
      top: 32px;
      right: -7px;
      width: 68px;
      height: 20px;
      background: url('../../../assets/mk5_18.png') no-repeat left top/100% 100%;
    }
  }

  .avatar_box {
    position: relative;
    margin: 23px auto 13px;
    width: 112px;
    height: 112px;
    background: linear-gradient(0deg, #b97ce9, #9aa4ff);
    padding: 1px;
    border-radius: 50%;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .van-count-down {
    //opacity: 0;
    margin: 0 auto;
    font-size: 16px;
    color: #ffffff;

    .colon {
      margin: 0 5px;
      color: #fff99e;
    }
  }

  .no-current {
    position: absolute;
    opacity: 0;
  }

  .count_down_tip {
    margin: 0 auto 0;
    font-size: 16px;
    color: #ffffff;
  }

  .only_user_info {
    margin: 0 auto;

    p:nth-of-type(1) {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }

    p:nth-of-type(2) {
      margin: 6px 0;
      font-size: 14px;
      color: #ffffff;
    }

    p:nth-of-type(3) {
      margin-bottom: 42px;
      min-width: 200px;
      width: fit-content;
      height: 32px;
      padding: 0 26px;
      background: #272783;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;

      > img {
        height: 35px;
        margin: 0 -3px;
      }
    }
  }

  .no_user_info {
    margin: 0 auto;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
  }

  .more_user_info_list {
    .more_user_info {
      display: flex;
      align-items: center;
      margin: 0 auto 2px;
      width: 330px;
      height: 80px;
      background: #272783;

      .more_user_info_avatar {
        margin: 0 7px 0 10px;
        width: 62px;
        height: 62px;
        background: linear-gradient(0deg, #b97ce9, #9aa4ff);
        padding: 1px;
        border-radius: 50%;

        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .more_user_info_text {
        flex: 1;
        height: 100%;
        align-items: flex-start;
        justify-content: center;

        p:nth-of-type(1) {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;

          > span {
            margin: 0 3px;
            font-size: 14px;
            font-weight: 400;
          }
        }

        p:nth-of-type(2) {
          justify-content: flex-start;
          margin-top: 10px;
          min-width: 240px;
          padding: 0 13px;
          width: fit-content;
          height: 24px;
          background: #4c65d1;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          white-space: nowrap;

          > img {
            height: 35px;
            margin: 0 -5px;
          }
        }
      }

      &:nth-child(1) {
        margin-top: 43px !important;
      }

      &:nth-last-of-type(1) {
        //margin-top: 0;
        margin-bottom: 26px;
      }
    }
  }

  .free_bill_tip {
    position: relative;
    margin: 17px auto 9px;
    justify-content: flex-start;
    width: 315px;
    height: 53px;
    background: #272783;
    font-size: 14px;
    color: #ffffff;
    padding-left: 20px;

    .circle {
      position: absolute;
      top: 14px;
      left: 10px;
      //margin: 0 7px;
      width: 6px;
      height: 6px;
      background: #fff99e;
      border-radius: 50%;
    }
  }
}
</style>
