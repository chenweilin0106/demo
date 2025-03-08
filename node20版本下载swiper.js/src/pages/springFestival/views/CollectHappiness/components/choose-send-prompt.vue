<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content choose-send">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_11.png')" />
      <div class="inner-content">
        <div class="main-content">
          <!-- 图片根据用户选择赠送的卡片显示 不是写死 -->
          <div class="send-text-1 flex-center">
            赠送1张
            <img :src="IconPath(cardInfo.icon)" class="send-text-1-icon" />
            给好友
          </div>
          <div ref="friendsList" class="friends-list">
            <!-- 偶数 #CB5623 奇数 #DB722D -->
            <div
              v-for="(item, index) in list"
              :key="index"
              class="friends"
              :style="{
                backgroundColor: index % 2 == 0 ? '#CB5623' : '#DB722D'
              }"
            >
              <div
                class="check-button"
                :class="{ 'disable-click': item.checked == 2 }"
                @click="handleCheck(item)"
              >
                <img v-if="item.checked == 1" :src="IconPath('tk_8.png')" />
              </div>
              <!-- 点击进入用户主页 -->
              <img
                :src="IconPath(item.profile_image)"
                class="avatar"
                @click="toUserMain(item.uid)"
              />
              <div class="info">
                <div class="nick-name text-hidden">{{ item.username }}</div>
                <div class="uid flex-center">
                  <img
                    v-if="item.is_pretty"
                    :src="IconPath('mk8_14.png')"
                    class="uid-icon"
                  />
                  ID：{{ item.is_pretty ? item.code : item.uid }}
                </div>
              </div>
              <!-- 夫妻 tk_6.png 师徒 tk_7.png -->
              <img
                v-if="item.user_type == 1"
                :src="IconPath('tk_6.png')"
                class="label"
              />
              <img
                v-else-if="item.user_type == 2"
                :src="IconPath('tk_7.png')"
                class="label"
              />
              <img
                v-else-if="item.user_type == 3"
                :src="IconPath('tk_7_1.png')"
                class="label"
              />
            </div>
            <div v-if="!list.length" class="no-data flex-center">暂无好友</div>
            <!--<div v-if="false" class="no-more">已经到底了~</div>-->
          </div>
          <div
            class="search-input"
            @click="() => isChecked && (errTip = '请先取消已勾选的好友')"
          >
            <!-- @blur="inputBlur"-->
            <!-- @focus="inputFocus" -->
            <input
              v-model="uid"
              :readonly="isChecked"
              type="text"
              placeholder="输入ID"
              class="input flex-center"
              @input="handleInput"
              @focus="inputFocus"
              @blur="inputBlur"
            />
            <img
              :src="IconPath('tk_10.png')"
              class="search-icon"
              @click="inputSearch"
            />
          </div>
          <div class="err-tip">{{ errTip }}</div>
          <div class="buttons flex-center">
            <div class="cancel button-noFinish" @click="showPopup = false">
              我再想想
            </div>
            <div class="send button-receive" @click="handleSend">立即赠送</div>
          </div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
import { toUserMain } from '@/pages/springFestival/utils/toApp'
import { getPageData } from '@/pages/springFestival/api'

export default {
  props: {},
  data() {
    return {
      isNumber: /^[0-9]*$/,
      noNumber: /[^0-9]/g,
      uid: '',
      showPopup: false,
      errTip: '',
      list: [],
      cardInfo: {}
    }
  },
  computed: {
    // 检测是否有单选框选中
    isChecked() {
      return this.list.some((item) => item.checked == 1)
    }
  },
  watch: {},
  methods: {
    /**
     * 单选按钮
     * 如果是禁用状态 return
     * 如果是选中状态 选中样式改为未选中
     * 如果是未选中状态 选中样式改为选中
     */
    handleCheck({ uid, checked }) {
      console.log(uid, checked)
      if (checked == 2) return
      if (checked == 1) {
        this.list.forEach((item) => (item.checked = 0))
        // 清除错误提示
        if (this.errTip) this.errTip = ''
      } else {
        this.list.forEach((item) => {
          if (item.uid == uid) {
            item.checked = 1
          } else {
            item.checked = 2
          }
        })
      }
    },
    /**
     * 立即赠送按钮
     * 如果有单选框被选中 就直接使用list中的数据 打开确认发送弹框
     * 如果没有单选框被选中 就发送请求验证uid
     */
    handleSend() {
      if (this.isChecked) {
        const result = this.list.find((item) => item.checked == 1)
        const params = {
          cardInfo: this.cardInfo,
          userInfo: result
        }
        if (this.errTip) this.errTip = ''
        this.$emit('confirmSend', params)
      } else {
        this.testUid()
      }
    },
    /**
     * 输入框右边搜索按钮
     * if (this.isChecked) return (因为父元素已经监听了)
     * 调用this.handleSend()
     */
    async inputSearch() {
      if (this.isChecked) return
      this.testUid()
    },
    /**
     * 验证uid
     * uid为空 return
     * 发送请求
     * 请求异常 return this.errTip = res.errmsg
     * 请求正常 关闭选择好友弹框 this.$emit('confirmSend', params) 打开确认赠送弹框 传输数据：卡片图标 卡片id 用户昵称，靓号id，头像，uid
     */
    async testUid() {
      if (this.uid) {
        if (this.uid == this.$store.state.uid) {
          return (this.errTip = '福卡无法赠送给自己')
        }
        this.errTip = ''
        const res = await getPageData({ type: 'user_info', tuid: this.uid })
        if (res.errno) return (this.errTip = res.errmsg)
        const params = {
          cardInfo: this.cardInfo,
          userInfo: res.data
        }
        this.$emit('confirmSend', params)
      }
    },
    handleInput(e) {
      if (!this.isNumber.test(e.target.value)) {
        this.uid = e.target.value.replace(this.noNumber, '')
      }
      // 限制输入最大长度为8
      if (e.target.value.length > 8) {
        this.uid = e.target.value.slice(0, 8)
      }
      // 不允许输入空格
      if (e.target.value.indexOf(' ') >= 0) {
        this.uid = e.target.value.replace(/\s+/g, '')
      }
      if (!this.uid) {
        this.list.forEach((item) => (item.checked = 0))
      } else {
        this.list.forEach((item) => (item.checked = 2))
      }
      // 清除错误提示
      if (this.errTip) this.errTip = ''
    },
    /**
     * 输入框聚焦回调
     * 输入框聚焦 将所有单选按钮设置为2
     */
    inputFocus() {
      // if (this.isChecked) return
      // let flag = false
      // if (
      //   (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) &&
      //   window.screen.width >= 500
      // ) {
      //   flag = true
      // }
      // if (!(isIOS() || window.navigator.userAgent.indexOf('Safari') === -1)) {
      //   flag = true
      // }
      // if (flag) {
      //   console.log('滚动弹框')
      //   // console.log('安卓')
      //   setTimeout(() => {
      //     console.log(document.activeElement.tagName)
      //     if (document.activeElement.tagName == 'INPUT') {
      //       this.$nextTick(() => {
      //         const dialogHeight = document.querySelector('.choose-send')
      //         dialogHeight.style.top = '20%'
      //       })
      //     }
      //   })
      // }
    },
    /**
     * 输入框失去焦点回调
     * 如果输入框内有内容 return
     * 如果输入框没有内容 将所有单选按钮设置为1
     */
    inputBlur() {
      if (this.uid) return
      this.list.forEach((item) => (item.checked = 0))
      if (this.errTip) this.errTip = ''
      // this.$nextTick(() => {
      //   const dialogHeight = document.querySelector('.choose-send')
      //   dialogHeight.style.top = '50%'
      // })
    },
    /**
     * 选择赠送好友弹框
     * params：icon 卡片图标 card_id 卡片id num 卡片数量
     * 保存卡片数据
     * 请求好友列表
     */
    async openPrompt(params) {
      this.cardInfo = params
      this.friendListApi()
    },
    /**
     * 关闭弹框后
     * 清空uid
     */
    clickClose() {
      this.$emit('close')
      this.uid = ''
      this.errTip = ''
      document.querySelector('html').style.overflow = 'auto'
    },
    /**
     * 获取好友列表
     * res.data:{list: [{profile_image, username, user_id, uid, code, is_pretty, user_type}]}
     * code：靓号
     * is_pretty：是否靓号
     * user_type：1 cp 2 师徒 3 结拜团 4 好友
     * 设置checked属性
     */
    async friendListApi() {
      const res = await getPageData({ type: 'comm_friends', mark: 100 })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list = res.data.list.map((item) => {
          item.checked = 0
          return item
        })
        this.showPopup = true
        document.querySelector('html').style.overflow = 'hidden'
        this.$nextTick(() => {
          if (this.$refs.friendsList) {
            this.$refs.friendsList.scrollTop = 0
          }
        })
      }
    },
    closePrompt() {
      this.showPopup = false
    },
    toUserMain
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
  //top: 50%;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 627px;
  //height: 930px;
  height: 680px;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  //border-bottom: none;
  border-radius: 60px;
  background-color: transparent;

  .inner-content {
    width: 100%;
    height: 100%;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;

    .main-content {
      position: relative;
      z-index: 4;
      width: 100%;
      height: 100%;
      padding-bottom: 20px;
      padding-top: 26px;
    }

    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      pointer-events: none;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .title-image {
    width: 598px;
    height: 188px;
    position: absolute;
    top: -143px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
}

.send-text-1 {
  margin: 0 auto;
  width: fit-content;
  //height: 27px;
  font-size: 28px;
  color: #ffffff;
  white-space: nowrap;
  flex-wrap: nowrap;

  .send-text-1-icon {
    margin: 0 -5px;
    width: 92px;
    height: 91px;
  }
}

.friends-list {
  margin-top: 1px;
  //height: 554px;
  height: 340px;
  //background-color: pink;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 2px solid #ffdc7a;
  border-left: 0;
  border-right: 0;

  .friends {
    position: relative;
    display: flex;
    align-items: center;
    height: 110px;

    .check-button {
      position: relative;
      margin-left: 37px;
      width: 39px;
      height: 39px;
      background: #ad4816;
      border: 3px solid #f9a048;
      border-radius: 50%;

      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .disable-click {
      background: #8b8b8b;
      border-color: #cacaca;
    }

    .avatar {
      margin: 0 14px 0 22px;
      width: 74px;
      height: 74px;
      background: #ffffff;
      border-radius: 50%;
      object-fit: cover;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: 100%;

      .nick-name {
        font-size: 28px;
        color: #ffffff;
        width: 240px;
        margin-bottom: 3px;
      }

      .uid {
        .uid-icon {
          margin-right: 7px;
          width: 47px;
          height: 39px;
        }

        font-size: 24px;
        color: #ffea80;
        white-space: nowrap;
      }
    }

    .label {
      position: absolute;
      top: 50%;
      right: 35px;
      transform: translateY(-50%);
      width: 72px;
      height: 34px;
    }
  }

  .no-data {
    width: 100%;
    height: 100%;
    font-size: 28px;
    color: #ffffff;
  }
}

.search-input {
  position: relative;
  margin: 15px auto 8px;
  width: fit-content;

  input {
    position: relative;
    z-index: 1;
    width: 509px;
    height: 59px;
    background: #ad4816;
    border-radius: 30px;
    padding-left: 21px;
    padding-right: 40px;
    font-size: 28px;
    color: #ffffff;

    &::placeholder {
      font-size: 28px;
      color: #ffb555;
    }
  }

  .search-icon {
    position: absolute;
    z-index: 2;
    top: 50%;
    right: 19px;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
  }
}

.err-tip {
  width: fit-content;
  min-height: 26px;
  margin: 0 auto 5px;
  font-size: 22px;
  color: #ffffff;
}

.buttons {
  .cancel,
  .send {
    width: 244px;
    height: 76px;
    border-radius: 38px;
    font-size: 32px;
  }

  .send {
    margin-left: 33px;
  }
}
</style>
