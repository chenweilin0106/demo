<template>
  <div class="LoveName">
    <!-- 顶部提示文本 -->
    <!--<div class="top_title" data-html2canvas-ignore></div>-->
    <!-- 玩法规则 -->
    <div class="play_rule" @click="showRule" data-html2canvas-ignore></div>
    <!-- 拍照盒子 -->
    <photoBox
      :data-html2canvas-ignore="love_pictuer && true"
      ref="photoBox"
      :pair_info="pageData.pair_info"
      :intimacy="pageData.intimacy"
      :equip_info="equip_info"
      :dialogType="dialogType"
      :select_info="select_info"
      :my_words="pageData.my_words"
      @bindUser="bindUser"
      @showImage="showImage"
    />
    <div class="photo_btn" data-html2canvas-ignore>
      <div class="click-button" @click="showPhoto"></div>
    </div>
    <!-- 奖励盒子 -->
    <div class="award_box" data-html2canvas-ignore>
      <!-- 每一项 -->
      <div class="award_item" v-for="item in task_list" :key="item.goods_id">
        <!--TODO 右上角感叹号 气泡按钮-->
        <div
          v-if="item.goods_id == 9"
          class="bubble-button"
          @click="openBubble"
        >
          <div v-if="showBubble" class="bubble-main">
            <p>领取后增加【心动较量】</p>
            <p>的榜单值，助力冲榜！</p>
          </div>
        </div>
        <!-- TODO 价格角标 -->
        <div class="price_box flex-center" v-if="item.goods_id == 8">
          <span>价值15999</span><img :src="IconPath('zs_27_20.png')" />
        </div>
        <div class="item_img_boxs">
          <div class="item_img_box" @click="checked_mic_title(item, 1)">
            <img
              v-if="
                item.type !== 'mic' &&
                item.type !== 'title' &&
                item.type !== 'ring'
              "
              :src="IconPath(item.icon)"
            />
            <!--TODO 称号位置-->
            <lazy-component v-if="item.goods_id == 5" class="award_lottie">
              <public-json jsonName="ch_zzzs" />
              <!--<PublicJson-->
              <!--  :lottieJson_name="equip_data[5092].name"-->
              <!--  :lottieJson="equip_data[5092].data"-->
              <!--/>-->
            </lazy-component>
            <!--TODO 戒指和头饰-->
            <lazy-component
              v-if="item.goods_id == 3 || item.goods_id == 8"
              class="item_lottie_box"
            >
              <public-svga
                v-if="item.goods_id == 3"
                svgaName="ts_aqwy_01"
                :userAvatar="pageData.user_icon"
              />
              <!--<PublicJson-->
              <!--  v-if="item.goods_id == 3"-->
              <!--  :lottieJson_name="equip_data[103].name"-->
              <!--  :lottieJson="equip_data[103].data"-->
              <!--  :userAvatar="pageData.user_icon"-->
              <!--/>-->
              <!-- 比翼双飞戒指 -->
              <PublicSvga v-if="item.goods_id == 8" svgaName="jz_zays" />
            </lazy-component>
          </div>
          <!--TODO 头饰和和称号特有的第二个图标 变量 goods_id-->
          <div
            class="item_img_box"
            v-if="item.goods_id == 3 || item.goods_id == 5"
            @click="checked_mic_title(item)"
          >
            <!--TODO-->
            <div v-if="item.goods_id == 5" class="award_lottie">
              <!-- 称号 -->
              <public-json jsonName="ch_yzxl" />
            </div>
            <!--TODO-->
            <div v-if="item.goods_id == 3" class="item_lottie_box">
              <!-- TODO 头饰 -->
              <public-svga
                v-if="item.goods_id == 3"
                svgaName="ts_aqwy_02"
                :userAvatar="pageData.user_icon"
              />
              <!--<PublicJson-->
              <!--  v-if="item.goods_id == 3"-->
              <!--  :lottieJson_name="equip_data[104].name"-->
              <!--  :lottieJson="equip_data[104].data"-->
              <!--  :userAvatar="pageData.user_icon"-->
              <!--/>-->
            </div>
          </div>
          <!--TODO-->
          <van-radio-group
            :disabled="select_info[`uid_${item.type}_id`] ? true : false"
            class="micRadio"
            v-model="radioForm[item.type]"
            direction="horizontal"
            v-if="item.goods_id == 3 || item.goods_id == 5"
          >
            <!--TODO-->
            <van-radio :name="item.type === 'mic' ? '103' : '5092'">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? activeIcon : inactiveIcon"
                />
              </template>
            </van-radio>
            <!--TODO-->
            <van-radio :name="item.type === 'mic' ? '104' : '5093'">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? activeIcon : inactiveIcon"
                />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
        <!--TODO-->
        <div class="item_name">
          {{ item.goods_id == 9 ? '爱情能量' + item.name : item.name }}
        </div>
        <div class="item_num">{{ item.intimacy }}/{{ item.max_intimacy }}</div>
        <!-- 未完成 领取 添加 卸下 -->
        <div
          class="button-noFinish item_btn"
          :class="btnStyle(item.goods_id, item.has_right)"
          @click="awardBtnClick(item)"
        >
          {{ btnText(item.goods_id, item.has_right) }}
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <ThemeDialog
      data-html2canvas-ignore
      :isShow="showDialog"
      :dialogMark="dialogType"
      :titleIconObj="dialogTitle"
      :isSmall="smallDialog"
      @closeDialog="
        showDialog = false
        closeDialog()
      "
      :class="{ rule_dialog_top: dialogType === 'rule' }"
    >
      <!-- 普通弹框 -->
      <div class="white_border" v-if="dialogType != 'photo'">
        <!-- 领取奖励弹框 -->
        <div
          class="award_tk"
          v-if="dialogType == 'award' || dialogType == 'congrats_get'"
        >
          <div class="award_tk_topTitle" v-if="awardDetail.goods_id == 3">
            确认领取此头饰
          </div>
          <div class="award_tk_topTitle" v-if="awardDetail.goods_id == 5">
            确认领取此称号
          </div>
          <!--TODO-->
          <div class="award_tk_topTitle" v-if="awardDetail.goods_id == 9">
            爱情能量，助力冲榜
          </div>
          <div
            class="img-box"
            :class="[awardDetail.goods_id == 5 && 'img-box_title']"
          >
            <img v-if="awardDetail.icon" :src="IconPath(awardDetail.icon)" />
            <div v-else class="award_tk_lottie">
              <div
                v-if="awardDetail.goods_id == 3 || awardDetail.goods_id == 5"
                class="award_tk_lottie_title"
              >
                <public-json
                  v-if="awardDetail.goods_id == 5"
                  :jsonName="equip_data[awardDetail.id].name"
                />
                <!--<PublicJson-->
                <!--  :lottieJson_name="equip_data[awardDetail.id].name"-->
                <!--  :lottieJson="equip_data[awardDetail.id].data"-->
                <!--  :userAvatar="-->
                <!--    awardDetail.goods_id == 3 ? pageData.user_icon : ''-->
                <!--  "-->
                <!--/>-->
                <public-svga
                  v-if="awardDetail.goods_id == 3"
                  :svgaName="equip_data[awardDetail.id].name"
                  :userAvatar="$store.state.user_icon"
                />
              </div>
              <!--TODO-->
              <PublicSvga v-if="awardDetail.goods_id == 8" svgaName="jz_zays" />
            </div>
          </div>
          <p class="goods_name">{{ awardDetail.name }}</p>
          <div class="award_tk_btns">
            <div
              class="button-noFinish cancel"
              @click="handleCancel"
              v-if="awardDetail.goods_id == 3 || awardDetail.goods_id == 5"
            >
              取消
            </div>
            <div
              class="button-receive confirm"
              :class="{ know_btn: awardDetail.type == 'common_goods' }"
              @click="
                handleConfirm(
                  awardDetail.type,
                  awardDetail.id,
                  awardDetail.goods_id
                )
              "
            >
              {{
                awardDetail.type == 'costume'
                  ? '立即装扮'
                  : awardDetail.goods_id == 5
                  ? '领取并佩戴'
                  : awardDetail.goods_id == 3
                  ? '领取并装扮'
                  : '我知道了'
              }}
            </div>
          </div>
        </div>
        <!-- 绑定弹框 -->
        <div class="bind_tk" v-if="isBind">
          <div
            class="bind_top_title"
            v-if="dialogType === 'search' || dialogType === 'search_access'"
          >
            <p>绑定规则：用户两人互相输入对方ID，即可</p>
            <p>绑定参与活动</p>
          </div>
          <div class="bind_top_title" v-if="dialogType === 'await_user'">
            绑定已提交，请提醒对方前往活动页面提交
          </div>
          <div class="bind_top_title" v-if="dialogType === 'bind_fail'">
            绑定失效，对方已被绑定
          </div>
          <!-- 输入框 -->
          <input
            v-if="dialogType === 'search' || dialogType === 'search_access'"
            :readonly="dialogType === 'search_access'"
            type="text"
            class="bind_input"
            placeholder="点击输入对方ID"
            v-model="uid"
            maxlength="8"
            @input="handleInput"
          />
          <!-- 错误提示 -->
          <div class="error_message" v-if="dialogType === 'search'">
            {{ inputReg }}
          </div>
          <!-- 查找到的用户信息 dialogType === 'search_access' && tUserInfo.uid -->
          <div
            class="searchInfo flex-center"
            v-if="dialogType === 'search_access' && tUserInfo.uid"
          >
            <div class="search_userInfo flex-center">
              <img :src="tUserInfo.profile_image" />
              <div class="search_name">{{ tUserInfo.username }}</div>
            </div>
            <div class="search_userInfo_btns flex-center">
              <div
                class="button-receive search_btn"
                @click="handleBind(tUserInfo.uid)"
              >
                绑定
              </div>
              <div class="button-noFinish reSearch_btn" @click="handleReSearch">
                重新查找
              </div>
            </div>
          </div>
          <!-- 查找按钮 -->
          <div
            class="button-noFinish flex-center bind_search"
            v-if="dialogType === 'search'"
            @click="searchUserInfo"
          >
            查找
          </div>
          <!-- 绑定成功的用户信息 &&
              tUserInfo.uid -->
          <div
            class="bind_access_info"
            v-if="
              (dialogType === 'await_user' || dialogType === 'bind_fail') &&
              tUserInfo.uid
            "
          >
            <img :src="tUserInfo.profile_image" />
            <div class="bind_name">{{ tUserInfo.username }}</div>
          </div>
          <!-- 返回等待 取消绑定 -->
          <div
            class="bind_access_btns"
            v-if="dialogType === 'await_user' || dialogType === 'bind_fail'"
          >
            <div
              v-if="dialogType === 'await_user'"
              class="button-noFinish return_btn"
              @click="showDialog = false"
            >
              返回等待
            </div>
            <div class="button-receive cancel_btn" @click="cancelBind">
              {{ dialogType === 'bind_fail' ? '重新绑定' : '取消绑定' }}
            </div>
          </div>
          <!-- 底部文本说明 -->
          <div
            class="bind_bottom_title"
            v-if="dialogType === 'search' || dialogType === 'search_access'"
          >
            注：两人成功绑定后不可解绑
          </div>
          <div
            class="bind_bottom_title"
            v-if="dialogType === 'await_user' || dialogType === 'bind_fail'"
          >
            注：需双方输入对方的ID进行绑定
          </div>
        </div>
        <!-- 玩法说明弹框 -->
        <div class="rule_tk" v-if="dialogType === 'rule'">
          <!-- 玩法说明icon -->
          <div class="rule_tk_icon"></div>
          <div class="scroll-box">
            <!-- 效果展示 -->
            <div class="rule_contain"></div>
            <!-- 规则说明 -->
            <div class="rule-text">
              <ul>
                <li><span></span>玩家绑定好友后心动值达到指定进度可领取对</li>
                <li>应奖励并装扮页面，心动值由双方互送钻石礼</li>
                <li>物和表白获得，1钻石=1心动值</li>
                <li><span></span>此绑定只生效于本次活动。从双方均成功绑定</li>
                <li>定后开始统计心动值</li>
                <li><span></span>奖励中的素材奖励为玩法奖励，仅作用于活</li>
                <li>动玩法，活动结束后即失效</li>
              </ul>
            </div>
          </div>
          <!-- 去体验按钮 -->
          <div class="button-receive rule_btn" @click="showDialog = false">
            去体验
          </div>
        </div>
        <!-- 输入情话弹框 -->
        <div class="love_story" v-if="dialogType === 'love_story'">
          <div class="love_story_tips flex-center">
            确定后不支持修改，请谨慎输入（15字以内）
          </div>
          <!-- 输入框 -->
          <div class="love_story_input">
            <textarea
              @input="love_input"
              v-model.trim="love_story_text"
              maxlength="15"
            ></textarea>
            <!-- 输入框刷新按钮 -->
            <div class="refresh_btn flex-center" @click="randomLoveStory">
              <img :src="IconPath('tk_4.png')" />
            </div>
          </div>
          <div class="err_tip flex-center">{{ err_tip }}</div>
          <!-- 底部按钮 -->
          <div class="love_story_btns flex-center">
            <div class="left_btn flex-center" @click="showDialog = false">
              我再想想
            </div>
            <div class="right_btn flex-center" @click="submitLoveStory">
              确认提交
            </div>
          </div>
        </div>
      </div>
    </ThemeDialog>
    <!-- 拍照遮盖层 -->
    <van-overlay
      z-index="2000"
      :show="show"
      @click="
        show = false
        love_pictuer = null
        closeDialog()
      "
      :class="!hasBorder && 'has_border'"
    >
      <div ref="userPhoto" class="box">
        <!-- 拍照背景图 -->
        <div class="photo_bgi">
          <img :src="IconPath('tk_3.png')" />
        </div>
        <div class="picture_box flex-center">
          <img
            v-if="love_pictuer"
            :src="love_pictuer"
            @touchstart="handlerTouchstart"
            @touchend="handlerTouchend"
            @click.stop
          />
        </div>
      </div>

      <!-- 底部提示文字 -->
      <div
        v-if="love_pictuer"
        data-html2canvas-ignore
        class="bottom_title flex-center"
      >
        <!--长按图片保存这张情书-->
      </div>
    </van-overlay>
  </div>
</template>

<script>
// 生成图片库
import html2canvas from 'html2canvas'
// APP保存图片
import { commonShare } from '../../utils/toApp'
// 弹框组件
import ThemeDialog from './components/ThemeDialog.vue'
// svga组件
import PublicSvga from '../../components/PublicSvga'
// json组件
import PublicJson from '../../components/PublicJson'
// 拍照组件导入
import photoBox from './components/photoBox'
// 接口导入
import { getPageData, nowEquip, moduleFour } from '../../api/index'
// 默认数据
import { loveName } from '../../utils/pageData'
// // 以爱告白-粉色
// import female520 from '../../assets/lottie/female520/data.json'
// // 以爱告白-蓝色
// import male520 from '../../assets/lottie/male520/data.json'
// import ch_yyrbs from '../../assets/lottie/ch_yyrbs/data.json'
// import ch_zyrzl from '../../assets/lottie/ch_zyrzl/data.json'
export default {
  name: 'LoveName',
  components: {
    // 拍照组件
    photoBox,
    // 头饰组件
    PublicJson,
    // svga组件
    PublicSvga,
    // 弹框组件
    ThemeDialog
  },
  data() {
    return {
      bubbleTimer: null,
      // 气泡
      showBubble: false,
      show: false,
      // 查询得到的用户信息
      tUserInfo: {},
      // 用户信息查询失败结果
      inputReg: '',
      // 搜索用户框绑定
      uid: '',
      // 弹框标识
      dialogType: '',
      // 弹窗显隐
      showDialog: false,
      // 单选按钮
      radioForm: {
        mic: '',
        title: ''
      },
      // 弹框数据
      awardDetail: {},
      // 单选按钮样式
      activeIcon: Object.freeze(require('../../assets/mk4_19.png')),
      inactiveIcon: Object.freeze(require('../../assets/mk4_20.png')),
      // 装扮id对应资源
      equip_data: {
        5092: {
          name: 'ch_zzzs'
          // data: ch_yyrbs
        },
        5093: {
          name: 'ch_yzxl'
          // data: ch_zyrzl
        },
        103: {
          name: 'ts_aqwy_01'
          // data: female520
        },
        104: {
          name: 'ts_aqwy_02'
          // data: male520
        }
      },
      // 弹框标题图片
      dialogTitle: Object.freeze({
        rule: 'title_8.png',
        bind: 'title_9.png',
        search: 'title_9.png',
        search_access: 'title_9.png',
        await_user: 'title_9.png',
        bind_fail: 'title_9.png',
        award: 'title_10.png',
        congrats_get: 'title_7.png',
        love_story: 'title_11.png'
      }),
      // 生成照片
      love_pictuer: null,
      loop: null,
      // 自定义情话
      love_story_text: '',
      // 情话请求错误提示
      err_tip: ''
    }
  },
  computed: {
    // 绑定系列弹框判断
    isBind() {
      return (
        this.dialogType == 'bind' ||
        this.dialogType == 'search' ||
        this.dialogType == 'search_access' ||
        this.dialogType == 'await_user' ||
        this.dialogType == 'bind_fail'
      )
    },
    // 道具列表按钮样式
    btnStyle() {
      return (goods_id, has_right) => {
        // TODO
        if (goods_id == 9 && has_right == 2) return 'button-finish'
        const obj = {
          1: 'button-receive',
          2: 'item_btn_add',
          3: 'item_btn_unload'
        }
        return obj[has_right]
      }
    },
    // 道具列表按钮文本
    btnText() {
      return (goods_id, has_right) => {
        // TODO
        if (goods_id == 9 && has_right == 2) return '已领取'
        const obj = {
          0: '未完成',
          1: '领取',
          2: '添加',
          3: '卸下'
        }
        return obj[has_right]
      }
    },
    // 弹框大小逻辑
    smallDialog() {
      return (
        this.awardDetail.type !== 'mic' &&
        this.awardDetail.type !== 'title' &&
        !this.isBind &&
        this.dialogType !== 'love_story' &&
        this.dialogType !== 'rule'
      )
    },
    // 奖励列表
    task_list() {
      return this.pageData.task_list
    },
    // 已佩戴信息
    equip_info() {
      return this.pageData.equip_info
    },
    // 双方头饰称号领取信息
    select_info() {
      return this.pageData.select_info
    },
    // 判断当前是否有边框素材
    hasBorder() {
      return this.equip_info.hasOwnProperty(5)
    }
  },
  async created() {
    // 载入默认数据
    this.pageData = loveName
    // 请求页面数据
    await this.getPageData()
    this.$store.commit('getUserIcon', this.pageData.user_icon)
  },
  mounted() {
    if (this.pageData.is_sign_in) {
      this.dialogType = 'rule'
      this.showDialog = true
    }
  },
  methods: {
    openBubble() {
      if (!this.showBubble) {
        this.showBubble = true
        this.bubbleTimer = setTimeout(() => {
          this.showBubble = false
        }, 5000)
      } else {
        clearTimeout(this.bubbleTimer)
        this.bubbleTimer = null
        this.showBubble = false
      }
    },
    // click 点击头饰和称号动画来勾选
    checked_mic_title(data, num) {
      const { goods_id, type } = data
      if (goods_id != 3 && goods_id != 5) return
      // 已勾选,直接终止
      if (this.select_info[`uid_${type}_id`]) return
      const id =
        goods_id == 3 ? (num == 1 ? '103' : '104') : num == 1 ? '5092' : '5093'
      this.radioForm[type] = id
    },
    // input 用户清空自定义情话下方错误提示信息
    love_input() {
      this.err_tip && (this.err_tip = '')
    },
    // 生成图片
    async productImage() {
      this.$nextTick(async () => {
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        const canvas = await html2canvas(this.$refs.userPhoto, {
          backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
          useCORS: true // 支持图片跨域
        })
        // 把生成的base64位图片上传到服务器,生成在线图片地址
        const params = {
          shareImage: canvas.toDataURL('image/png'),
          type: 1
        }

        commonShare(params) // toDataURL: 图片格式转成 base64
      })
    },
    showImage(url) {
      // console.log(url)
      this.love_pictuer = url
      this.$toast.clear()
      this.dialogType = ''
      this.show = true
      this.$nextTick(() => {
        this.productImage()
      })
    },
    // 自定义情话提交
    async submitLoveStory() {
      if (!this.love_story_text) return (this.err_tip = '请输入内容')
      const res = await this.clickAwardBtn(4, 1, 0, this.love_story_text)
      this.$toast(res.errmsg)
      if (res.errno) return (this.err_tip = res.errmsg)
      this.showDialog = false
    },
    // 随机抽取情话
    randomLoveStory() {
      this.love_story_text =
        this.pageData.love_words[
          Math.floor(Math.random() * this.pageData.love_words.length)
        ]
      this.err_tip = ''
    },
    // 长按事件
    handlerTouchstart() {
      // clearTimeout(this.loop)
      // this.loop = setTimeout(() => {
      //   console.log('长按')
      //   this.loop = 0 // 执行长按要执行的内容
      //   this.productImage()
      // }, 1000) // 定时的时间
    },
    // 长按离开事件（清除定时器）
    handlerTouchend() {
      // // 清除定时器
      // console.log('清除定时器')
      // clearTimeout(this.loop)
      // this.loop = 0
    },
    // 输入uid格式验证
    handleInput(e) {
      const reg = /^[0-9]*$/
      if (!reg.test(e.target.value)) {
        this.uid = e.target.value.replace(/[^0-9]/g, '')
      }
      // 限制输入最大长度为8
      if (e.target.value.length > 8) {
        this.uid = e.target.value.slice(0, 8)
      }
      // 不允许输入空格
      if (e.target.value.indexOf(' ') >= 0) {
        this.uid = e.target.value.replace(/\s+/g, '')
      }
      // 清除错误提示
      this.inputReg && (this.inputReg = '')
    },
    // 绑定弹框--取消绑定按钮
    async cancelBind() {
      if (this.dialogType === 'bind_fail') {
        // 重新绑定
        this.dialogType = 'search'
        this.uid = ''
        this.tUserInfo = {}
        await this.reBindUser()
      } else {
        const res = await this.cancelBindUser()
        this.$toast(res.errmsg)
        this.showDialog = false
      }
    },
    // 绑定弹框--绑定用户按钮
    async handleBind(tuid) {
      const res = await this.getBindUser(tuid)
      if (res.errno === 0) {
        this.$toast(res.errmsg)
        this.showDialog = false
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 绑定弹框--重新查找
    async handleReSearch() {
      this.dialogType = 'search'
      this.uid = ''
      this.tUserInfo = {}
    },
    // 绑定弹框--查找用户按钮
    async searchUserInfo() {
      this.uid
        ? (async () => {
            const res = await this.searchUser(this.uid)
            if (res.errno !== 0) {
              this.inputReg = res.errmsg
            } else {
              this.tUserInfo = res.data
              this.dialogType = 'search_access'
              this.inputReg = ''
            }
          })()
        : (this.inputReg = '')
    },
    // 绑定用户弹框
    async bindUser() {
      // 先判断是否已绑定，已绑定无法再次绑定
      if (this.pageData.pair_status) return
      const { data } = await this.getUserBind()
      // 再次判断
      if (data.status == 2) return await this.getPageData()
      if (data.status == 1) {
        // 未绑定
        this.dialogType = 'search'
      } else if (data.status == 3 || data.status == 4) {
        // 已发送邀请
        if (data.status == 3) {
          this.dialogType = 'await_user'
        } else {
          this.dialogType = 'bind_fail'
        }
        this.tUserInfo = data.pair_user_info
      }
      this.showDialog = true
    },
    // 头饰和称号的确认按钮
    async handleConfirm(type, id, goods_id) {
      if (
        type != 'common_goods' &&
        (goods_id == 3 || goods_id == 5 || goods_id == 2)
      ) {
        if (goods_id != 2) {
          const result = await this.clickAwardBtn(
            goods_id,
            1,
            this.radioForm[type]
          )
          if (result.errno) {
            this.$toast(result.errmsg)
            return (this.showDialog = false)
          }
        }
        const res = await this.nowEquip(type, id)
        this.$toast(res.errmsg)
      }
      this.showDialog = false
    },
    // 头饰和称号的取消按钮
    async handleCancel() {
      this.showDialog = false
    },
    // 奖励按钮
    async awardBtnClick({ has_right: flag, goods_id, id, type, name }) {
      if (flag != 0) {
        if (flag == 1) {
          // 领取奖励
          // 如果是头饰或者称号，需要先判断是否勾选
          if (goods_id == 3 || goods_id == 5) {
            if (!this.radioForm[type]) {
              return this.$toast(
                `请选择想要的${type == 'mic' ? '头饰' : '称号'}`
              )
            }
            console.log(type)
            this.awardDetail = {
              type,
              id: this.radioForm[type],
              name,
              goods_id
            }
            this.dialogType = 'award'
            return (this.showDialog = true)
          } else if (goods_id == 4) {
            // 如果是自定义情话，打开输入情话弹框
            // 抽取情话
            this.randomLoveStory()
            this.dialogType = 'love_story'
            return (this.showDialog = true)
          } else {
            const { data } = await this.clickAwardBtn(goods_id, 1, id)
            this.awardDetail = data.award
          }
          this.dialogType = 'congrats_get'
          this.showDialog = true
        } else if (flag == 2) {
          if (goods_id == 9) return
          // 添加奖励
          !this.pageData.pair_status
            ? this.$toast('快去绑定好友吧！')
            : (async () => {
                const res = await this.clickAwardBtn(
                  goods_id,
                  2,
                  goods_id == 3 || goods_id == 5
                    ? this.select_info[`uid_${type}_id`]
                    : id
                )
                if (res.errno != 0) {
                  return this.$toast(res.errmsg)
                }
                await this.getPageData()
              })()
        } else if (flag == 3) {
          // 卸下奖励
          await this.clickAwardBtn(
            goods_id,
            3,
            goods_id == 3 || goods_id == 5
              ? this.select_info[`uid_${type}_id`]
              : id
          )
          await this.getPageData()
        }
      }
    },
    // 拍照弹框
    async showPhoto() {
      // this.dialogType = 'photo'
      // await this.$refs.photoBox.productImage()
      // 先判断是否已绑定，未绑定无法拍照
      !this.pageData.pair_status
        ? this.$toast('快去绑定好友吧！')
        : (async () => {
            // TODO
            this.track('分享心动')
            this.love_pictuer = null
            this.show = true
            setTimeout(async () => {
              this.dialogType = 'photo'
              this.$toast.loading({
                forbidClick: true,
                duration: 0
              })
              await this.$refs.photoBox.productImage()
            }, 300)
          })()
    },
    // 玩法说明弹框
    showRule() {
      this.dialogType = 'rule'
      this.showDialog = true
    },
    // 关闭弹框
    async closeDialog() {
      this.uid = ''
      this.inputReg = ''
      this.tUserInfo = {}
      this.awardDetail = {}
      this.dialogType != 'rule' && (await this.getPageData())
      this.dialogType = ''
      this.err_tip = ''
    },
    // 重新绑定接口
    async reBindUser() {
      // TODO
      const res = await moduleFour({
        type: 'pair_opt',
        mark: 5
      })
      return res
    },
    // 取消绑定接口
    async cancelBindUser() {
      // TODO
      const res = await moduleFour({
        type: 'pair_opt',
        mark: 3
      })
      return res
    },
    // 绑定用户接口
    async getBindUser(tuid) {
      // TODO
      const res = await moduleFour({
        type: 'pair_opt',
        mark: 2,
        tuid
      })
      return res
    },
    // 查询用户信息接口
    async searchUser(tuid) {
      // TODO
      const res = await moduleFour({
        type: 'pair_opt',
        mark: 1,
        tuid
      })
      return res
    },
    // 获取用户结对绑定信息接口
    async getUserBind() {
      // TODO
      const res = await moduleFour({
        type: 'pair_info'
      })
      return res
    },
    // 领取,添加，卸下接口封装
    async clickAwardBtn(goods_id, action_type, id, love_words) {
      // TODO
      const res = await moduleFour({
        type: 'award_rev',
        'mark[goods_id]': goods_id,
        'mark[action_type]': action_type,
        'mark[id]': id,
        'mark[love_words]': love_words
      })
      return res
    },
    // 页面数据接口
    async getPageData() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm4'
      })
      res.errno !== 0
        ? this.$toast(res.errmsg)
        : (() => {
            this.pageData = res.data
            this.radioForm.mic = this.select_info.uid_mic_id
            this.radioForm.title = this.select_info.uid_title_id
          })()
    },
    // 立即装扮
    async nowEquip(type, id) {
      const res = await nowEquip({
        type,
        id
      })
      return res
    },
    // 点击事件埋点
    track(element) {
      this.$thinking.track(
        'WebClick', // TODO 追踪事件的名称
        {
          element,
          module: '告白情歌'
        }
      )
    }
  },
  beforeDestroy() {
    clearTimeout(this.bubbleTimer)
    this.bubbleTimer = null
  }
}
</script>

<style scoped lang="scss">
.LoveName {
  margin-top: -43px;
  position: relative;
  z-index: 4;
  // 照片弹框
  .van-overlay {
    z-index: 2023;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    .box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 646px;
      height: 948px;
      margin: 0 auto;
    }

    .photo_bgi {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    .picture_box {
      position: relative;
      z-index: 1;
      width: 549px;
      height: 905px;
      margin: 0 auto;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    .bottom_title {
      position: absolute;
      z-index: 1;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 30px;
      //margin-top: -30px;
      font-size: 28px;
      color: #ffffff;
      text-shadow: 0px 0px 4px #bb61e2, 0px 0px 4px #bb61e2, 0px 0px 4px #bb61e2,
        0px 0px 4px #bb61e2;
    }
  }

  // 没有边框素材时候的照片位置和底部文字位置
  //.has_border {
  //  .picture_box {
  //    top: -10px;
  //
  //    > img {
  //      margin-left: 10px !important;
  //    }
  //  }
  //
  //  .bottom_title {
  //    margin-top: 10px;
  //  }
  //}

  // 弹框样式
  .van-dialog {
    ::v-deep .van-dialog__content {
      overflow: visible !important;

      .ThemeDialog_bgc {
        overflow: visible !important;
      }

      .white_border {
        color: #fff;

        .rule_tk,
        .bind_tk,
        .award_tk {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .award_tk {
          padding-bottom: 36px;

          .award_tk_topTitle {
            margin-top: 20px;
            font-size: 30px;
          }

          > .img-box {
            margin: 30px auto 10px;
            width: 128px;
            height: 128px;
            background: #fefaef;
            border: 4px solid #826dd7;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;

            > img {
              height: 100%;
            }

            .award_tk_lottie {
              width: 100%;
              height: 100%;

              .award_tk_lottie_title {
                width: 100%;
                height: 100%;

                .PublicSvga {
                  .micAvatar_img {
                    width: 80% !important;
                    height: 80% !important;

                    //> img {
                    //  border-radius: 50%;
                    //}
                  }
                }
              }
            }
          }

          .img-box_title {
            width: 188px !important;
          }

          .goods_name {
            margin: 16px 0 50px;
            font-size: 28px !important;
          }

          .addPhoto {
            width: 324px;
            height: 76px;
            font-size: 32px;
            margin-bottom: 40px;
            border-radius: 36px;
          }

          .award_tk_btns {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .cancel,
            .confirm {
              width: 248px;

              height: 72px;
              font-size: 32px;
              border-radius: 38px;
            }

            div:nth-child(2) {
              margin-left: 24px;
            }
          }

          .know_btn {
            width: 320px !important;
          }
        }

        // 玩法说明弹框
        .rule_tk {
          position: relative;

          .rule_tk_icon {
            position: absolute;
            top: 49px;
            left: -75px;
            width: 127px;
            height: 333px;
            background: url('../../assets/tk_1.png') no-repeat center top/100%
              auto;
            pointer-events: none;
          }

          .scroll-box {
            width: 100%;
            height: 839px;
            overflow-y: scroll;
            overflow-x: hidden;
            padding-top: 36px;
            // 效果展示
            .rule_contain {
              margin: 0 auto;
              width: 445px;
              height: 733px;
              background: url('../../assets/tk_21.png') no-repeat center
                top/100% 100%;
            }

            // 规则说明
            .rule-text {
              width: 540px;
              margin-top: 10px;
              margin-left: 56px;

              li {
                font-size: 26px;
                line-height: 38px;
                color: #fff;

                span {
                  background-color: #ffe9b9;
                }
              }
            }
          }

          // 点击去体验
          .rule_btn {
            width: 324px;
            height: 76px;
            font-size: 32px;
            border-radius: 38px;
            margin: 24px 0 37px;
          }
        }

        // 绑定弹框
        .bind_tk {
          padding: 0 28px 30px 36px;

          .bind_top_title {
            line-height: 50px;
            margin-bottom: 20px;
            white-space: nowrap;
            font-size: 28px;
            font-weight: 400;
            color: #ffffff;
          }

          // 输入框
          .bind_input {
            margin: 40px 0 0;
            width: 469px;
            height: 76px;
            background: #fefaef;
            border: 4px solid #d5a8ff;

            border-radius: 38px;
            text-align: center;
            font-size: 34px;
            line-height: 76px;
            color: #6a78e3;

            ::placeholder {
              font-size: 34px;
              font-weight: 500;
              color: #c2c4d6;
            }
          }

          // 查找到的用户信息
          .searchInfo {
            margin-top: 24px;
            width: 544px;
            height: 252px;
            background: rgba(162, 75, 223, 0.5);
            // opacity: 0.5;
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 20px;
            flex-wrap: nowrap;
            // 展示搜索到的用户头像和昵称
            .search_userInfo {
              flex-shrink: 0;
              flex-direction: column;
              margin-right: 70px;

              > img {
                width: 122px;
                height: 122px;
                background: #ffffff;
                border: 4px solid #d5a8ff;
                border-radius: 50%;
                object-fit: cover;
              }

              .search_name {
                margin-top: 20px;
                width: 186px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 30px;
              }
            }

            // 绑定按钮和重新查找按钮
            .search_userInfo_btns {
              flex-shrink: 0;
              flex-direction: column;

              .search_btn,
              .reSearch_btn {
                width: 176px;
                height: 70px;
                border-radius: 34px;
                font-size: 32px;
              }

              .reSearch_btn {
                margin-top: 36px;
              }
            }
          }

          // 错误提示
          .error_message {
            top: 300px;
            width: 100%;
            height: 26px;
            text-align: center;
            font-size: 26px;
            color: #d53f7f;
            margin: 10px 0;
          }

          // 查找按钮
          .bind_search {
            margin-bottom: 36px;
            width: 174px;
            height: 74px;

            border-radius: 36px;
            font-size: 32px;
          }

          // 绑定成功用户信息
          .bind_access_info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            > img {
              width: 120px;
              height: 120px;
              background: #ffffff;
              border: 4px solid #826dd7;
              border-radius: 50%;
            }

            .bind_name {
              margin: 28px 0;
              width: 186px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 30px;
            }
          }

          .bind_access_btns {
            display: flex;
            justify-content: center;
            align-items: center;

            .return_btn,
            .cancel_btn {
              width: 244px;
              height: 76px;
              font-size: 32px;
              border-radius: 36px;
            }

            .return_btn {
              margin-right: 20px;
            }
          }

          // 底部说明文本
          .bind_bottom_title {
            margin-top: 28px;
            font-size: 26px;
          }
        }

        // 输入情话弹框
        .love_story {
          position: relative;
          width: 100%;
          height: 100%;
          // 提示
          .love_story_tips {
            margin: 24px 0 36px;
            font-size: 28px;
            color: #ffffff;
            padding-left: 16px;
          }

          // 输入框
          .love_story_input {
            display: flex;
            justify-content: flex-start;
            position: relative;
            margin: 0 auto;
            width: 558px;
            height: 138px;
            background: #fefaef;
            border: 4px solid #d5a8ff;
            border-radius: 41px;
            // padding: 0 36px 0 0px;
            > textarea {
              width: 478px;
              height: 100%;
              padding: 20px 14px;
              // text-align: center;
              line-height: 50px;
              font-size: 32px;
              font-weight: 500;
              color: #7b6ae3;
              border-radius: 38px 0 0 38px;
              background: transparent;
              border: none;
              resize: none;
            }

            .refresh_btn {
              flex: 1;
              height: 100%;
              background: #d2d1ff;
              border-radius: 0 38px 38px 0;

              > img {
                width: 56px;
                height: auto;
              }
            }
          }

          .err_tip {
            width: 100%;
            height: 62px;
            font-size: 26px;
            color: #c91964;
            padding-top: 6px;
            align-items: flex-start;
          }

          // 底部两个按钮
          .love_story_btns {
            margin: 0 0 42px;

            .left_btn,
            .right_btn {
              width: 244px;
              height: 76px;
              border-radius: 40px;
              font-size: 32px;
            }

            .left_btn {
              border: 2px solid #ffffff;
              color: #4d7ddd;
              background: linear-gradient(0deg, #cae7ff, #ffffff);
            }

            .right_btn {
              margin-left: 18px;
              border: 2px solid #ffffff;
              color: #a9792c;
              background: linear-gradient(0deg, #fff9d1, #ffffff);
            }
          }
        }
      }
    }
  }

  // 规则弹框时，弹框位置
  .rule_dialog_top {
    //margin-top: 110px;
    width: 628px;

    ::v-deep .van-dialog__header {
      z-index: 2;
    }

    ::v-deep .ThemeDialog_bgc {
      padding-top: 0;
    }
  }

  // 顶部提示文本
  .top_title {
    width: 283px;
    height: 94px;
    margin: 0 auto;
    background: url('../../assets/title_5.png') no-repeat center top/100% auto;
  }

  // 玩法规则
  .play_rule {
    position: absolute;
    z-index: 20;
    top: 228px;
    right: 0;
    width: 54px;
    height: 146px;
    background: url('../../assets/mk4_1.png') no-repeat left top/100% 100%;
  }

  // 奖励盒子
  .award_box {
    position: relative;
    z-index: 2;
    margin: -30px 0 36px;
    padding: 55px 16px 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
  }

  // 每一项
  .award_item {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 190px;
    height: 309px;
    border-radius: 20px;
    padding: 14px 0 0;
    margin-bottom: 22px;
    color: #fff;
    background-color: rgba(135, 72, 249, 0.8);

    &:nth-last-child(1) {
      overflow: visible;

      .item_num {
        font-size: 23px;
      }
    }

    .bubble-button {
      position: absolute;
      top: 22px;
      right: 26px;
      width: 28px;
      height: 28px;
      background: url('@/pages/valentineDay/assets/mk4_30.png') no-repeat left
        top/100% 100%;

      .bubble-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        z-index: 2;
        top: -100px;
        left: -193px;
        width: 249px;
        height: 86px;
        background: url('@/pages/valentineDay/assets/mk4_31.png') no-repeat left
          top/100% 100%;
        padding-top: 10px;

        p {
          width: 207px;
          font-size: 20px;
          color: #ffffff;
          line-height: 28px;
          white-space: nowrap;
        }
      }
    }

    &:nth-child(3) {
      width: 310px !important;
      position: relative;

      .micRadio {
        position: absolute;
        width: 100%;
        top: 108px;
        left: 108px;

        .van-radio {
          width: 48px;
          height: 48px;

          ::v-deep .van-radio__icon {
            width: 100%;
            height: 100%;

            > img {
              width: 100%;
            }
          }
        }

        .van-radio:nth-child(2) {
          margin-left: 78px;
        }
      }

      .item_lottie_box {
        .PublicJson {
        }

        ::v-deep .PublicSvga {
          .micAvatar_img {
            width: 80%;
            height: 80%;
          }
        }
      }
    }

    &:nth-child(5) {
      width: 517px !important;
      //margin-left: 28px;
      //margin-right: 24px;
      position: relative;

      .item_img_boxs {
        .item_img_box:nth-of-type(2) {
          margin-left: 28px;
        }
      }

      .item_img_box {
        width: 228px !important;
        height: 138px !important;
      }

      .micRadio {
        position: absolute;
        width: 344px;
        top: 108px;
        left: 204px;

        .van-radio {
          width: 48px;
          height: 48px;

          ::v-deep .van-radio__icon {
            width: 100%;
            height: 100%;

            > img {
              width: 100%;
            }
          }
        }

        .van-radio:nth-child(2) {
          margin-left: 184px;
        }
      }
    }

    .item_img_boxs {
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px 3px;
      overflow: hidden;
    }

    .item_img_box {
      width: 138px;
      height: 138px;
      background: linear-gradient(0deg, #7845a4, #452b6f);
      border: 4px solid #d6beff;
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        height: 100%;
      }

      .item_lottie_box {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:nth-child(2) {
        margin-left: 12px;
      }
    }

    .item_name {
      margin: 12px 0 8px;
      font-size: 26px;
    }

    .item_num {
      margin-bottom: 10px;
      font-size: 24px;
      color: #fff68f;
    }

    .item_btn {
      width: 134px;
      height: 52px;
      border-radius: 52px;
      font-size: 26px;
    }

    // 添加
    .item_btn_add {
      background: linear-gradient(0deg, #fec9ff, #ffffff) !important;
      color: #dd4bab !important;
    }

    // 卸下
    .item_btn_unload {
      background: linear-gradient(0deg, #d7bdff, #ffffff) !important;
      color: #9447f3 !important;
    }

    // 价值角标
    .price_box {
      position: absolute;
      right: 9px;
      top: 0;
      width: 139px;
      height: 34px;
      background: linear-gradient(-90deg, #75b9ff, #ff84f8);
      border-radius: 20px;
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;

      > img {
        width: 27px;
        height: 20px;
      }
    }

    &:nth-last-child(-n + 4) {
      width: 174px;
    }

    &:nth-last-child(3) {
      .item_img_box {
        img {
          width: 100%;
          height: auto;
        }
      }
    }

    &:nth-last-child(2),
    &:nth-last-child(1) {
      .item_name {
        font-size: 23px;
        white-space: nowrap;
        font-weight: 400;
      }

      //margin-left: -16px;
      //margin-right: -16px;
    }
  }
}

.photo_btn {
  margin: -18px auto 0;
  width: 640px;
  height: 219px;
  background: url('@/pages/valentineDay/assets/mk4_18.png') no-repeat left
    top/100% 100%;
  overflow: hidden;

  .click-button {
    margin-top: 50px;
    margin-left: 160px;
    width: 320px;
    height: 90px;
    //background-color: #fff;
    opacity: 1;
    border-radius: 93px;
  }
}
</style>
