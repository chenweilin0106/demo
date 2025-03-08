<template>
  <div class="priorityExperience">
    <div class="signUp" v-if="gameWarmupData.status == 0">
      <div class="signUp_time">
        <img src="../../assets/line.png" alt="" />
        <p>招募时间</p>
        <img src="../../assets/line.png" alt="" />
      </div>
      <p>即日起开始报名</p>
      <div class="signUp_btn" @click="signUp"></div>
    </div>
    <div class="signUp fail" v-if="gameWarmupData.status == 4">
      <div class="signUp_time">您的体验账号已失效</div>
      <p>新玩法即将上线，敬请期待</p>
    </div>
    <div class="signUp fail pass" v-if="gameWarmupData.status == 2">
      <div class="signUp_time">
        恭喜您通过蛋蛋部落体验服第一轮招募申请,请加入QQ群获取安装包
      </div>
      <p>
        <i>群号：</i><i id="groupNumber">552607582</i
        ><span
          data-clipboard-target="#groupNumber"
          ref="copyBtn"
          @click="copyLink"
          >复制</span
        >
      </p>
      <div class="account">
        您的体验账号是<span>{{ gameWarmupData.account_info.username }}</span
        >，初始密码是<span>{{ gameWarmupData.account_info.password }}</span
        >,请牢记您的账号密码并注意保密。
      </div>
    </div>
    <div
      class="signUp not_reviewed"
      v-if="gameWarmupData.status == 1 || gameWarmupData.status == 3"
    >
      <div class="signUp_time">
        <p>亲爱的玩家，</p>
        <p>您的来信已收到！</p>
      </div>
      <p>千山万水，无数黑夜，只为与你相遇</p>
    </div>
    <div class="end-text-box">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import { getGameWarmup } from '../../api/index'
export default {
  name: 'priorityExperience',
  components: {},
  props: {},
  data() {
    return {
      copyBtn: null, // 剪贴板按钮
      gameWarmupData: {
        apply_link: '', // 体验服报名链接
        status: 0, // 体验账号申请状态：0-未申请，1-未审核，2-通过，3-拒绝，4-已失效
        account_info: {
          // 体验账号信息，只有申请通过status=2时才有具体账号详情，默认空
          username: 'TYF5398327',
          password: '123456'
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$store.commit(
      'user/getUidAndAccess_token',
      window.location.search.substring(1)
    )
    this.getGameWarmup()
  },
  mounted() {},
  methods: {
    copyLink() {
      if (this.$refs.copyBtn) {
        this.copyBtn = new this.$clipboard(this.$refs.copyBtn)
        const clipboard = this.copyBtn
        clipboard.on('success', () => {
          this.$toast('已复制至剪贴板')
        })
        clipboard.on('error', () => {
          this.$toast('复制失败')
        })
      }
    },
    signUp(e) {
      this.$sensors.quick('trackAllHeatMap', e.target, {
        activity_date: '20230420',
        element: '立即报名'
      })
      if (this.gameWarmupData.apply_link) {
        window.location.href = this.gameWarmupData.apply_link
      }
    },
    // 封装页面数据请求
    async getGameWarmup() {
      const res = await getGameWarmup({
        mark: 'm2'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      } else {
        this.gameWarmupData = res.data
      }
    }
  }
}
</script>

<style scoped lang="scss">
.priorityExperience {
  position: relative;
  margin-top: -130px;
  width: 100%;
  height: 2070px;
  background: url('../../assets/bg2.png') no-repeat;
  background-size: 100%;
  overflow: hidden;
  .signUp {
    margin-top: 245px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .signUp_time {
      width: 100%;
      margin-top: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 18px;
      font-family: Source Han Sans CN;
      color: #cb7325;
      > p {
        width: 90px;
        text-align: center;
      }
      img {
        height: 9px;
        // margin: 0 5px;
        &:nth-child(1) {
          transform: rotate(180deg);
        }
      }
    }
    > p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-family: Source Han Sans CN;
      color: #cb7325;
      margin: 10px 0 54px;
    }
    .signUp_btn {
      width: 156px;
      height: 48px;
      background: url('../../assets/btn_signup.png') no-repeat;
      background-size: 100%;
    }
  }
  .fail {
    .signUp_time {
      margin-top: 16px;
      color: #5a92b0;
    }
    > p {
      margin-top: 8px;
    }
  }
  .pass {
    .signUp_time {
      width: 270px;
      font-size: 14px;
      line-height: 20px;
    }
    > p {
      margin-top: 5px;
      margin-bottom: 40px;
      > span {
        display: inline-block;
        margin-left: 5px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        color: #dd509f;
        text-decoration: underline;
      }
    }
    .account {
      width: 290px;
      background: #2c7faa;
      opacity: 0.8;
      border-radius: 5px;
      font-size: 13px;
      font-family: Source Han Sans CN;
      line-height: 20px;
      color: #ffffff;
      text-align: center;
      padding: 4px 10px;
      > span {
        color: #ffd7b0;
      }
    }
  }
  .not_reviewed {
    .signUp_time {
      margin: 0;
      flex-direction: column;
      width: 100%;
      text-align: center;
      > p {
        width: 100%;
      }
    }
    > p {
      margin: 5px 0 0;
      font-size: 16px;
      color: #5a92b0;
    }
  }
  .end-text-box {
    position: absolute;
    bottom: 15px;
    width: 100%;
    p {
      font-size: 13px;
      text-align: center;
      color: #faf3dd;
    }
  }
}
</style>
