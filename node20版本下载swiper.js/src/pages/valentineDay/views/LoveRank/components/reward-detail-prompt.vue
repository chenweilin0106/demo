<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_16.png')" />
      <div class="inner">
        <div ref="scrollList" class="scroll-list">
          <div class="title-1 flex-center">
            <img :src="IconPath('tk_8.png')" class="side-icon" />
            <span>日榜奖励</span>
            <img :src="IconPath('tk_9.png')" class="side-icon" />
          </div>
          <img :src="IconPath('tk_10.png')" class="form-1" />
          <div class="title-2 flex-center">
            <img :src="IconPath('tk_8.png')" class="side-icon" />
            <span>总榜奖励</span>
            <img :src="IconPath('tk_9.png')" class="side-icon" />
          </div>
          <div class="subtitle flex-center">
            限定奖励
            <img :src="IconPath('tk_11.png')" class="side-icon" />
          </div>
          <div class="top-1-reward flex-center">
            <img :src="IconPath('tk_12.png')" />
          </div>
          <p class="top-1-reward-text-1">爱情至上CP靓号</p>
          <p class="top-1-reward-text-2">爱情能量达到500万及以上可选</p>
          <div class="subtitle flex-center margin-bottom-20">第一名</div>
          <div class="list flex-center">
            <div class="reward-item margin-right-20 size-1">
              <div class="icon flex-center">
                <img :src="IconPath('tk_16.png')" class="bottom-icon" />
                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_13.png')" />
              </div>
              <div class="text">
                <p>纪念日CP靓号</p>
                <p class="flex-center">
                  达到300万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
            <div class="reward-item margin-right-20 size-1">
              <div class="icon flex-center">
                <img :src="IconPath('tk_16.png')" class="bottom-icon" />

                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_14.png')" />
              </div>
              <div class="text">
                <p>生生世世CP靓号</p>
                <p class="flex-center">
                  达到180万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
            <div class="reward-item size-1">
              <div class="icon flex-center">
                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_15.png')" />
              </div>
              <div class="text">
                <p>爱你久久CP靓号</p>
                <p class="flex-center">
                  达到180万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="list flex-center">
            <div class="reward-item margin-right-42 size-2">
              <div class="icon flex-center">
                <div class="bottom-label flex-center">展示爱情宣言</div>
                <img :src="IconPath('lmby_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">CP资料卡(定制版)</p>
                <p class="fs-22">+180天</p>
              </div>
            </div>
            <div class="reward-item margin-right-42 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('hjcbt_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">黄金藏宝图+3</p>
              </div>
            </div>
            <div class="reward-item size-2">
              <div class="icon flex-center">
                <img :src="IconPath('ljs_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">绿晶石+3000</p>
              </div>
            </div>
          </div>
          <div class="subtitle flex-center margin-bottom-20">第二名</div>
          <div class="list flex-center">
            <div class="reward-item margin-right-20 size-1">
              <div class="icon flex-center">
                <img :src="IconPath('tk_16.png')" class="bottom-icon" />
                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_14.png')" />
              </div>
              <div class="text">
                <p>生生世世CP靓号</p>
                <p class="flex-center">
                  达到180万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
            <div class="reward-item size-1">
              <div class="icon flex-center">
                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_15.png')" />
              </div>
              <div class="text">
                <p>爱你久久CP靓号</p>
                <p class="flex-center">
                  达到180万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="list flex-center">
            <div class="reward-item margin-right-42 size-2">
              <div class="icon flex-center">
                <div class="bottom-label flex-center">展示爱情宣言</div>
                <img :src="IconPath('lmby_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">CP资料卡(定制版)</p>
                <p class="fs-22">+90天</p>
              </div>
            </div>
            <div class="reward-item margin-right-42 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('hjcbt_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">黄金藏宝图+2</p>
              </div>
            </div>
            <div class="reward-item size-2">
              <div class="icon flex-center">
                <img :src="IconPath('ljs_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">绿晶石+1500</p>
              </div>
            </div>
          </div>
          <div class="subtitle flex-center margin-bottom-20">第三名</div>
          <div class="list flex-center">
            <div class="reward-item margin-right-20 size-1">
              <div class="icon flex-center">
                <img :src="IconPath('tk_16.png')" class="bottom-icon" />
                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_14.png')" />
              </div>
              <div class="text">
                <p>生生世世CP靓号</p>
                <p class="flex-center">
                  达到180万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
            <div class="reward-item size-1">
              <div class="icon flex-center">
                <div class="label flex-center">激活奖励</div>
                <img :src="IconPath('tk_15.png')" />
              </div>
              <div class="text">
                <p>爱你久久CP靓号</p>
                <p class="flex-center">
                  达到180万<img
                    class="aqnl"
                    :src="IconPath('aqnl_120_120.png')"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="list flex-center">
            <div class="reward-item margin-right-42 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('lmby_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">CP资料卡(限定版)</p>
                <p class="fs-22">+60天</p>
              </div>
            </div>
            <div class="reward-item margin-right-42 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('hjcbt_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">黄金藏宝图+1</p>
              </div>
            </div>
            <div class="reward-item size-2">
              <div class="icon flex-center">
                <img :src="IconPath('ljs_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">绿晶石+1000</p>
              </div>
            </div>
          </div>
          <div class="title-list margin-bottom-20">
            <div class="subtitle flex-center margin-right-42">第四~五名</div>
            <div class="subtitle flex-center">第六~十名</div>
          </div>
          <div class="list flex-center">
            <div class="reward-item margin-right-20 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('lmby_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">CP资料卡</p>
                <p class="fs-22">(限定版)+30天</p>
              </div>
            </div>
            <div class="reward-item margin-right-20 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('cbt_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">藏宝图+15</p>
              </div>
            </div>
            <div class="reward-item margin-right-20 size-2">
              <div class="icon flex-center">
                <img :src="IconPath('lmby_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">CP资料卡</p>
                <p class="fs-22">(限定版)+15天</p>
              </div>
            </div>
            <div class="reward-item size-2">
              <div class="icon flex-center">
                <img :src="IconPath('cbt_120_120.png')" />
              </div>
              <div class="text">
                <p class="fs-22">藏宝图+8</p>
              </div>
            </div>
          </div>
          <div class="rule-text">
            <ul>
              <li class="margin-bottom-20">
                <span></span>
                总榜前10上榜条件：爱情能量达到99,999
              </li>
              <li>激活奖励：</li>
              <li class="margin-left-0">
                <span></span
                ><i class="focus-color">【生生世世】CP靓号</i>：7位，例如
              </li>
              <li>3344123&3344789（不可为520、521）</li>
              <li class="margin-left-0">
                <span></span
                ><i class="focus-color">【爱你久久】CP靓号</i>：7位，例如
              </li>
              <li>2099123&2099789 （不可为520、521）</li>
              <li class="margin-left-0">
                <span></span
                ><i class="focus-color">【纪念日】CP靓号</i
                >：7位，例如5200123&5211234
              </li>
              <li>（不可为1314、3344）</li>
              <li class="margin-left-0">
                <span></span
                ><i class="focus-color">【爱情至上】CP靓号</i
                >：6位，例如520888&520999
              </li>
              <li>后三位可根据喜好选择（不可为520、521）</li>
              <li>
                <span></span>若未达到对应爱情能量但达到对应名次<i
                  class="focus-color"
                  >可获得其他</i
                >
              </li>
              <li><i class="focus-color">奖励</i>，不可获得靓号</li>
              <li>
                <span></span>若同时达到多种激活奖励条件，可自选其中<i
                  class="focus-color"
                  >任一款</i
                >
              </li>
              <li class="margin-bottom-20">
                <i class="focus-color">式</i>靓号
              </li>
              <li><span></span>注：靓号ABCD各数字不可相同，可以为纪念日、</li>
              <li>
                生日。获奖时需<i class="focus-color">与官方确认</i
                >可选范围内的号段。若
              </li>
              <li>与其他分组获奖玩家意向号码相同，则优先爱情能</li>
              <li>量高的玩家进行选号</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.$emit('close')
      document.querySelector('html').style.overflow = 'auto'
    },
    // 打开弹框
    openPrompt() {
      this.showPopup = true
      document.querySelector('html').style.overflow = 'hidden'
      this.$nextTick(() => {
        if (this.$refs.scrollList) {
          this.$refs.scrollList.scrollTop = 0
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 955px;
  background-color: rgba(236, 211, 255, 0.5);
  border-radius: 50px;
  pointer-events: auto;
  padding: 6px;

  .inner {
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #ed96fd, #866ae0);
    border: 4px solid #fff;
    border-radius: 44px;
    overflow: hidden;
  }

  .scroll-list {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 68px;
    border-radius: 40px;
    padding-bottom: 20px;

    .title-1 {
      width: fit-content;
      margin: 0 auto;
      font-size: 30px;
      font-weight: 500;
      color: #ffffff;

      .side-icon {
        width: 140px;
        height: 26px;
      }

      span {
        margin: 0 35px;
      }
    }

    .form-1 {
      display: block;
      margin: 21px auto;
      width: 554px;
      height: 367px;
    }

    .title-2 {
      width: fit-content;
      margin: 0 auto;
      font-size: 30px;
      font-weight: 500;
      color: #ffffff;

      .side-icon {
        width: 140px;
        height: 26px;
      }

      span {
        margin: 0 35px;
      }
    }

    .subtitle {
      margin: 25px auto 0;
      position: relative;
      z-index: 2;
      width: 199px;
      height: 42px;
      background: rgba(85, 50, 149, 0.7);
      border-radius: 21px;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;

      .side-icon {
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 262px;
        height: 29px;
        background: url('@/pages/valentineDay/assets/tk_11.png') no-repeat left
          top/100% 100%;
      }
    }

    .top-1-reward {
      margin: 16px auto 0;
      width: 228px;
      height: 128px;
      background: linear-gradient(0deg, #9a57d3, #6237a9);
      border: 4px solid #ffe58a;
      border-radius: 16px;

      > img {
        width: 193px;
        height: 63px;
      }
    }

    .top-1-reward-text-1 {
      margin: 10px auto 0px;
      width: fit-content;
      font-size: 24px;
      color: #ffffff;
    }

    .top-1-reward-text-2 {
      margin: 0 auto;
      width: fit-content;
      font-size: 22px;
      color: #ffe670;
    }
  }
}

.title-image {
  width: 515px;
  height: 199px;
  position: absolute;
  z-index: 3;
  top: -126px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.list {
  width: 100%;
  flex-wrap: nowrap;
  //padding-top: 24px;
  align-items: flex-start;
}

.reward-item {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  width: 168px;
  flex-shrink: 0;
  white-space: nowrap;

  .bottom-icon {
    position: absolute;
    z-index: 2;
    bottom: -8px;
    right: -43px;
    width: 60px !important;
    height: 60px !important;
  }

  .icon {
    position: relative;
    width: 168px;
    height: 128px;
    background: #ffffff;
    border: 4px solid #d6beff;
    border-radius: 16px;

    > img {
      width: 90%;
      //height: auto;
    }

    .label {
      position: absolute;
      top: -12px;
      right: -8px;
      width: 90px;
      height: 30px;
      background: #ed7bfb;
      border-radius: 15px;
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .text {
    p:nth-child(1) {
      margin-top: 10px;
      text-align: center;
      font-size: 24px;
      color: #ffffff;
    }

    p:nth-child(2) {
      text-align: center;

      font-size: 18px;
      color: #ffe670;
    }
  }

  .bottom-label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 30px;
    background: linear-gradient(90deg, #3f68ff, #ca68ff);
    border-radius: 0px 0px 12px 12px;
    font-size: 18px;
    color: #ffffff;
  }
}

.margin-bottom-20 {
  margin-bottom: 20px !important;
}

.margin-right-20 {
  margin-right: 22px;
}

.margin-right-42 {
  margin-right: 42px;
}

.size-1 {
  width: 168px;

  .icon {
    width: 168px;
    height: 128px;
  }
}

.size-2 {
  width: 128px;

  .icon {
    width: 128px;
    height: 128px;
  }
}

.fs-22 {
  font-size: 22px !important;
  color: #fff !important;
}

.title-list {
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
  }
}

.rule-text {
  margin-left: 40px;
  width: 535px;

  span {
    background-color: rgba(255, 233, 185, 1);
  }

  li {
    color: #fff;
    font-size: 24px;
  }

  .focus-color {
    color: rgba(255, 230, 112, 1);
  }
}
.aqnl {
  margin-left: -5px;
  width: 40px;
  height: 40px;
}

.margin-left-0 {
  margin-left: -15px;

  span {
    left: -13px;
  }
}
</style>
