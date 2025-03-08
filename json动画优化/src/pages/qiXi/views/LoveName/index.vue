<template>
  <div class="LoveName">
    <!-- 顶部提示文本 -->
    <div class="top_title" data-html2canvas-ignore></div>
    <!-- 玩法规则 -->
    <div class="play_rule" @click="showRule" data-html2canvas-ignore></div>
    <!-- 拍照盒子 -->
    <photoBox
      :data-html2canvas-ignore="show"
      ref="photoBox"
      :pair_info="pageData.pair_info"
      :intimacy="pageData.intimacy"
      @bindUser="bindUser"
      @showPhoto="showPhoto"
      @showImage="showImage"
      :equip_info="equip_info"
      :dialogType="dialogType"
      :select_info="select_info"
      :my_words="pageData.my_words"
    />
    <!-- 奖励盒子 -->
    <div class="award_box" data-html2canvas-ignore>
      <!-- 每一项 -->
      <div class="award_item" v-for="item in task_list" :key="item.goods_id">
        <!-- 价格角标 -->
        <div class="price_box flex_across" v-if="item.text">
          <span>{{ item.text }}</span
          ><img :src="IconPath('zs_60_60.png')" />
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
            <lazy-component v-if="item.goods_id == 4" class="award_lottie">
              <PublicJson :jsonName="equip_data[4975].name" />
            </lazy-component>
            <lazy-component
              v-if="item.goods_id == 3 || item.goods_id == 7"
              class="item_lottie_box"
            >
              <PublicJson
                v-if="item.goods_id == 3"
                :jsonName="equip_data[18].name"
                :userAvatar="pageData.user_icon"
              />
              <!-- 比翼双飞戒指 -->
              <PublicSvga v-if="item.goods_id == 7" svgaName="jz_bysf" />
            </lazy-component>
          </div>
          <div
            class="item_img_box"
            v-if="item.goods_id == 3 || item.goods_id == 4"
            @click="checked_mic_title(item)"
          >
            <div v-if="item.goods_id == 4" class="award_lottie">
              <!-- 称号 -->
              <PublicJson :jsonName="equip_data[4976].name" />
            </div>
            <div v-if="item.goods_id == 3" class="item_lottie_box">
              <!-- 头饰 -->
              <PublicJson
                v-if="item.goods_id == 3"
                :jsonName="equip_data[17].name"
                :userAvatar="pageData.user_icon"
              />
            </div>
          </div>
          <van-radio-group
            :disabled="select_info[`uid_${item.type}_id`] ? true : false"
            class="micRadio"
            v-model="radioForm[item.type]"
            direction="horizontal"
            v-if="item.goods_id == 3 || item.goods_id == 4"
          >
            <van-radio :name="item.type === 'mic' ? '18' : '4975'">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? activeIcon : inactiveIcon"
                />
              </template>
            </van-radio>
            <van-radio :name="item.type === 'mic' ? '17' : '4976'">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? activeIcon : inactiveIcon"
                />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
        <div class="item_name">{{ item.name }}</div>
        <div class="item_num">{{ item.intimacy }}/{{ item.max_intimacy }}</div>
        <!-- 未完成 领取 添加 卸下 -->
        <div
          class="theme_botton_undid item_btn"
          :class="btnStyle(item.has_right)"
          @click="awardBtnClick(item)"
        >
          {{ btnText(item.has_right) }}
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
          <div class="award_tk_topTitle" v-if="awardDetail.goods_id == 4">
            确认领取此称号
          </div>
          <div
            class="img-box"
            :class="[awardDetail.goods_id == 4 && 'img-box_title']"
          >
            <img v-if="awardDetail.icon" :src="IconPath(awardDetail.icon)" />
            <div v-else class="award_tk_lottie">
              <div
                v-if="awardDetail.goods_id == 3 || awardDetail.goods_id == 4"
                class="award_tk_lottie_title"
              >
                <PublicJson
                  :jsonName="equip_data[awardDetail.id].name"
                  :userAvatar="
                    awardDetail.goods_id == 3 ? pageData.user_icon : ''
                  "
                />
              </div>
              <PublicSvga v-if="awardDetail.goods_id == 7" svgaName="jz_bysf" />
            </div>
          </div>
          <p class="goods_name">{{ awardDetail.name }}</p>
          <div class="award_tk_btns">
            <div
              class="theme_botton_undid cancel"
              @click="handleCancel"
              v-if="awardDetail.goods_id == 3 || awardDetail.goods_id == 4"
            >
              取消
            </div>
            <div
              class="theme_botton_did confirm"
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
                  : awardDetail.goods_id == 4
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
            绑定规则：用户两人互相输入对方ID，即可绑定参与活动
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
            class="searchInfo"
            v-if="dialogType === 'search_access' && tUserInfo.uid"
          >
            <div class="search_userInfo">
              <img :src="tUserInfo.profile_image" />
              <div class="search_name">{{ tUserInfo.username }}</div>
            </div>
            <div class="search_userInfo_btns">
              <div
                class="theme_botton_did search_btn"
                @click="handleBind(tUserInfo.uid)"
              >
                绑定
              </div>
              <div
                class="theme_botton_undid reSearch_btn"
                @click="handleReSearch"
              >
                重新查找
              </div>
            </div>
          </div>
          <!-- 查找按钮 -->
          <div
            class="theme_botton_undid flex_across bind_search"
            v-if="dialogType === 'search'"
            @click="searchUserInfo"
          >
            查找
          </div>
          <!-- 绑定成功的用户信息 -->
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
              class="theme_botton_undid return_btn"
              @click="showDialog = false"
            >
              返回等待
            </div>
            <div class="theme_botton_did cancel_btn" @click="cancelBind">
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
          <!-- 效果展示 -->
          <div class="rule_contain"></div>
          <!-- 规则说明 -->
          <div class="rule_bottom_text">
            <p>
              <span></span>
              与绑定好友新增亲密度达到指定进度可领取对应奖励并装扮情书
            </p>
            <p>
              <span></span>
              此绑定只生效于本次活动。从双方均成功绑定后开始统计新增亲密度
            </p>
            <p>
              <span></span>
              奖励中的素材奖励为玩法奖励，仅作用于活动玩法，活动结束后即失效
            </p>
          </div>
          <!-- 去体验按钮 -->
          <div class="theme_botton_did rule_btn" @click="showDialog = false">
            去体验
          </div>
        </div>
        <!-- 输入情话弹框 -->
        <div class="love_story" v-if="dialogType === 'love_story'">
          <div class="love_story_tips flex_across">
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
            <div class="refresh_btn flex_across" @click="randomLoveStory">
              <img :src="IconPath('tk_7.png')" />
            </div>
          </div>
          <div class="err_tip flex_across">{{ err_tip }}</div>
          <!-- 底部按钮 -->
          <div class="love_story_btns flex_across">
            <div class="left_btn flex_across" @click="showDialog = false">
              我再想想
            </div>
            <div class="right_btn flex_across" @click="submitLoveStory">
              确认提交
            </div>
          </div>
        </div>
      </div>
    </ThemeDialog>
    <!-- 拍照遮盖层 -->
    <van-overlay
      :data-html2canvas-ignore="!show"
      ref="userPhoto"
      :show="show"
      @click="
        show = false
        closeDialog()
      "
      :class="!hasBorder && 'has_border'"
    >
      <!-- 拍照背景图 -->
      <div class="photo_bgi">
        <img :src="IconPath('tk_14.png')" />
      </div>
      <div class="picture_box">
        <img
          v-if="love_pictuer"
          :src="love_pictuer"
          @touchstart="handlerTouchstart"
          @touchend="handlerTouchend"
          @click.stop
        />
      </div>
      <!-- 底部提示文字 -->
      <div data-html2canvas-ignore class="bottom_title flex_across">
        长按图片保存这张情书
      </div>
    </van-overlay>
  </div>
</template>

<script>
// 生成图片库
import html2canvas from 'html2canvas'
// APP保存图片
import { saveImage } from '../../utils/toApp'
// 弹框组件
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// svga组件
import PublicSvga from '../../components/PublicSvga'
// json组件
import PublicJson from '../../components/PublicJson'
// 拍照组件导入
import photoBox from './components/photoBox'
// 接口导入
import { getPageData, nowEquip } from '../../api/index'
// 默认数据
import { loveName } from '../../utils/pageData'
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
      activeIcon: Object.freeze(require('../../assets/tk_1.png')),
      inactiveIcon: Object.freeze(require('../../assets/tk_2.png')),
      // 装扮id对应资源
      equip_data: {
        4975: {
          name: 'ch_yyrbs'
        },
        4976: {
          name: 'ch_zyrzl'
        },
        18: {
          name: 'female520'
        },
        17: {
          name: 'male520'
        }
      },
      // 弹框标题图片
      dialogTitle: Object.freeze({
        rule: 'title_7.png',
        bind: 'title_8.png',
        search: 'title_8.png',
        search_access: 'title_8.png',
        await_user: 'title_8.png',
        bind_fail: 'title_8.png',
        award: 'title_6.png',
        congrats_get: 'title_9.png',
        love_story: 'title_10.png'
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
      return (has_right) => {
        const obj = {
          1: 'theme_botton_did',
          2: 'item_btn_add',
          3: 'item_btn_unload'
        }
        return obj[has_right]
      }
    },
    // 道具列表按钮文本
    btnText() {
      return (has_right) => {
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
        this.awardDetail.type == 'common_goods' ||
        this.awardDetail.type == 'costume'
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
  },
  mounted() {
    if (this.pageData.is_sign_in) {
      this.dialogType = 'rule'
      this.showDialog = true
    }
  },
  methods: {
    // click 点击头饰和称号动画来勾选
    checked_mic_title(data, num) {
      const { goods_id, type } = data
      if (goods_id != 3 && goods_id != 4) return
      // 已勾选,直接终止
      if (this.select_info[`uid_${type}_id`]) return
      const id =
        goods_id == 3 ? (num == 1 ? '18' : '17') : num == 1 ? '4975' : '4976'
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
        this.saveImage(canvas.toDataURL('image/png')) // toDataURL: 图片格式转成 base64
      })
    },
    showImage(url) {
      this.love_pictuer = url
      this.show = true
    },
    // 自定义情话提交
    async submitLoveStory() {
      if (!this.love_story_text) return (this.err_tip = '请输入内容')
      const res = await this.clickAwardBtn(6, 1, 0, this.love_story_text)
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
      clearTimeout(this.loop)
      this.loop = setTimeout(() => {
        console.log('长按')
        this.loop = 0 // 执行长按要执行的内容
        this.productImage()
      }, 1000) // 定时的时间
    },
    // 长按离开事件（清除定时器）
    handlerTouchend() {
      // 清除定时器
      console.log('清除定时器')
      clearTimeout(this.loop)
      this.loop = 0
    },
    saveImage,
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
        // this.track('绑定')
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
      if (type != 'common_goods') {
        let result = null
        if (goods_id == 3 || goods_id == 4) {
          result = await this.clickAwardBtn(goods_id, 1, this.radioForm[type])
        }
        if (result.errno) {
          this.$toast(result.errmsg)
          return (this.showDialog = false)
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
          if (goods_id == 3 || goods_id == 4) {
            if (!this.radioForm[type]) {
              return this.$toast(
                `请选择想要的${type == 'mic' ? '头饰' : '称号'}`
              )
            }
            this.awardDetail = {
              type,
              id: this.radioForm[type],
              name,
              goods_id
            }
            this.dialogType = 'congrats_get'
            return (this.showDialog = true)
          } else if (goods_id == 6) {
            // 如果是自定义情话，打开输入情话弹框
            // 抽取情话
            this.randomLoveStory()
            this.dialogType = 'love_story'
            return (this.showDialog = true)
          } else {
            const { data } = await this.clickAwardBtn(goods_id, 1, id)
            this.awardDetail = data.award
          }
          this.dialogType = 'award'
          this.showDialog = true
        } else if (flag == 2) {
          // 添加奖励
          !this.pageData.pair_status
            ? this.$toast('快去绑定好友吧！')
            : (async () => {
                const res = await this.clickAwardBtn(
                  goods_id,
                  2,
                  goods_id == 3 || goods_id == 4
                    ? this.select_info[`uid_${type}_id`]
                    : id
                )
                if (res.errno != 0) {
                  return this.$toast(res.errmsg)
                }
                // this.track(`添加${name}`)
                await this.getPageData()
              })()
        } else if (flag == 3) {
          // 卸下奖励
          await this.clickAwardBtn(
            goods_id,
            3,
            goods_id == 3 || goods_id == 4
              ? this.select_info[`uid_${type}_id`]
              : id
          )
          await this.getPageData()
        }
      }
    },
    // 拍照弹框
    async showPhoto() {
      // 先判断是否已绑定，未绑定无法拍照
      !this.pageData.pair_status
        ? this.$toast('快去绑定好友吧！')
        : (async () => {
            this.track('拍照')
            this.dialogType = 'photo'
            await this.$refs.photoBox.productImage()
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
      const res = await getPageData({
        type: 'lovename_pair_opt',
        mark: 4
      })
      return res
    },
    // 取消绑定接口
    async cancelBindUser() {
      const res = await getPageData({
        type: 'lovename_pair_opt',
        mark: 3
      })
      return res
    },
    // 绑定用户接口
    async getBindUser(tuid) {
      const res = await getPageData({
        type: 'lovename_pair_opt',
        mark: 2,
        tuid
      })
      return res
    },
    // 查询用户信息接口
    async searchUser(tuid) {
      const res = await getPageData({
        type: 'lovename_pair_opt',
        mark: 1,
        tuid
      })
      return res
    },
    // 获取用户结对绑定信息接口
    async getUserBind() {
      const res = await getPageData({
        type: 'lovename_pair_info'
      })
      return res
    },
    // 领取,添加，卸下接口封装
    async clickAwardBtn(goods_id, action_type, id, love_words) {
      const res = await getPageData({
        type: 'lovename_award_rev',
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
        'WebClick', // 追踪事件的名称
        {
          element,
          module: '以纸传情'
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.LoveName {
  position: relative;
  // 照片弹框
  .van-overlay {
    z-index: 2023;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    .photo_bgi {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .picture_box {
      position: relative;
      top: 30px;
      z-index: 1;
      > img {
        width: 355px;
        // margin-left: -20px;
      }
    }
    .bottom_title {
      position: relative;
      top: 0px;
      z-index: 1;
      width: 100%;
      height: 15px;
      // margin-top: -55px;
      font-size: 14px;
      color: #ffffff;
      text-shadow: -1px 0px 5px #f882ee, 1px 0px 5px #f882ee,
        0px 1px 5px #f882ee, 0px -1px 5px #f882ee;
    }
  }
  // 没有边框素材时候的照片位置和底部文字位置
  .has_border {
    .picture_box {
      top: -10px;
      > img {
        margin-left: 10px !important;
      }
    }
    // .bottom_title {
    //   // margin-top: 15px;
    // }
  }
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
          padding-bottom: 18px;
          .award_tk_topTitle {
            margin-top: 10px;
            font-size: 15px;
          }
          > .img-box {
            margin: 15px auto 5px;
            width: 64px;
            height: 64px;
            background: #fefaef;
            border: 2px solid #826dd7;
            border-radius: 6px;
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
                .PublicJson {
                  .micAvatar_img {
                    width: 46px !important;
                    height: 46px !important;
                    > img {
                      border-radius: 50%;
                    }
                  }
                }
              }
            }
          }
          .img-box_title {
            width: 94px !important;
          }
          .goods_name {
            margin: 8px 0 25px;
            font-size: 14px !important;
          }
          .addPhoto {
            width: 162px;
            height: 38px;
            font-size: 16px;
            margin-bottom: 20px;
            border-radius: 18px;
          }
          .award_tk_btns {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .cancel,
            .confirm {
              width: 124px;
              height: 40px;
              font-size: 16px;
              border-radius: 18px;
              margin-right: 12px;
            }
          }
          .know_btn {
            width: 160px !important;
          }
        }
        // 玩法说明弹框
        .rule_tk {
          position: relative;
          .rule_tk_icon {
            position: absolute;
            top: 42px;
            left: -17px;
            width: 30px;
            height: 123px;
            background: url('../../assets/tk_4.png') no-repeat center top/100%
              auto;
          }
          // 效果展示
          .rule_contain {
            margin-top: -20px;
            margin-left: -20px;
            width: 304.5px;
            height: 379px;
            background: url('../../assets/tk_5.png') no-repeat center top/100%
              auto;
          }
          // 规则说明
          .rule_bottom_text {
            width: 270px;
            margin-top: 5px;
            margin-left: 13px;
            > p {
              position: relative;
              line-height: 20px;
              font-size: 13px;
              > span {
                position: absolute;
                top: 4px;
                left: -13px;
                width: 6px;
                height: 6px;
                background: #ffe9b9;
                border-radius: 50%;
              }
            }
          }
          // 点击去体验
          .rule_btn {
            width: 162px;
            height: 38px;
            font-size: 16px;
            border-radius: 19px;
            margin: 10px 0 13px;
          }
        }
        // 绑定弹框
        .bind_tk {
          padding: 0 14px 15px 18px;
          .bind_top_title {
            line-height: 25px;
            margin-bottom: 10px;
          }
          // 输入框
          .bind_input {
            margin: 20px 0 0;
            width: 248px;
            height: 38px;
            background: #fefaef;
            border: 2px solid #826dd7;

            border-radius: 19px;
            text-align: center;
            font-size: 17px;
            line-height: 38px;
            color: #6a78e3;
            ::placeholder {
              font-size: 17px;
              font-weight: 500;
              color: #c2c4d6;
            }
          }
          // 查找到的用户信息
          .searchInfo {
            margin-top: 12px;
            width: 272px;
            height: 126px;
            background: rgba(115, 108, 216, 0.5);
            // opacity: 0.5;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 10px;
            // 展示搜索到的用户头像和昵称
            .search_userInfo {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              > img {
                width: 61px;
                height: 61px;
                background: #ffffff;
                border: 2px solid #826dd7;
                border-radius: 50%;
              }
              .search_name {
                margin-top: 10px;
                width: 93px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 15px;
              }
            }
            // 绑定按钮和重新查找按钮
            .search_userInfo_btns {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              .search_btn,
              .reSearch_btn {
                width: 88px;
                height: 35px;
                border-radius: 17px;
                font-size: 16px;
              }
              .reSearch_btn {
                margin-top: 18px;
              }
            }
          }
          // 错误提示
          .error_message {
            top: 155px;
            width: 100%;
            height: 13px;
            text-align: center;
            font-size: 13px;
            color: #d53f7f;
            margin: 5px 0;
          }
          // 查找按钮
          .bind_search {
            margin-bottom: 18px;
            width: 87px;
            height: 37px;

            border-radius: 18px;
            font-size: 16px;
          }
          // 绑定成功用户信息
          .bind_access_info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            > img {
              width: 60px;
              height: 60px;
              background: #ffffff;
              border: 2px solid #826dd7;
              border-radius: 50%;
            }
            .bind_name {
              margin: 14px 0;
              width: 93px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 15px;
            }
          }
          .bind_access_btns {
            display: flex;
            justify-content: center;
            align-items: center;
            .return_btn,
            .cancel_btn {
              width: 122px;
              height: 38px;
              font-size: 16px;
              border-radius: 18px;
            }
            .return_btn {
              margin-right: 10px;
            }
          }
          // 底部说明文本
          .bind_bottom_title {
            margin-top: 14px;
            font-size: 13px;
          }
        }
        // 输入情话弹框
        .love_story {
          position: relative;
          width: 100%;
          height: 100%;
          // 提示
          .love_story_tips {
            margin: 12px 0 18px;
            font-size: 14px;
            color: #ffffff;
            padding-left: 8px;
          }
          // 输入框
          .love_story_input {
            display: flex;
            justify-content: flex-start;
            position: relative;
            margin: 0 auto;
            width: 279px;
            height: 69px;
            background: #fefaef;
            border: 2px solid #826dd7;
            border-radius: 21px;
            // padding: 0 36px 0 0px;
            > textarea {
              width: 239px;
              height: 100%;
              padding: 10px 7px;
              text-align: center;
              line-height: 25px;
              font-size: 16px;
              font-weight: 500;
              color: #7b6ae3;
              border-radius: 19px 0 0 19px;
              background: transparent;
              border: none;
              resize: none;
            }
            .refresh_btn {
              flex: 1;
              height: 100%;
              background: #d2d1ff;
              border-radius: 0 19px 19px 0;
              > img {
                width: 28px;
                height: auto;
              }
            }
          }
          .err_tip {
            width: 100%;
            height: 31px;
            font-size: 13px;
            color: #c91964;
            padding-top: 3px;
            align-items: flex-start;
          }
          // 底部两个按钮
          .love_story_btns {
            margin: 0 0 21px;
            .left_btn,
            .right_btn {
              width: 124px;
              height: 40px;
              border-radius: 20px;
              font-size: 16px;
            }
            .left_btn {
              border: 2px solid #ffffff;
              color: #4d7ddd;
              background: linear-gradient(0deg, #cae7ff, #ffffff);
            }
            .right_btn {
              margin-left: 9px;
              border: 1px solid #ffffff;
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
    margin-top: 55px;
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
    top: 5px;
    right: 0;
    width: 27px;
    height: 73px;
    background: url('../../assets/mk4_1.png') no-repeat;
    background-size: 100%;
  }
  // 奖励盒子
  .award_box {
    margin: -30px 0 36px;
    padding: 55px 0px 10px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
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
    width: 95px;
    height: 155px;
    background: rgba(175, 111, 255, 0.3);
    box-shadow: inset 0 0 5px 2px rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 7px 0 0;
    margin-bottom: 11px;
    color: #fff;
    &:nth-child(3) {
      width: 155px !important;
      position: relative;
      .micRadio {
        position: absolute;
        width: 100%;
        top: 54px;
        left: 54px;
        .van-radio {
          width: 24px;
          height: 24px;
          ::v-deep .van-radio__icon {
            width: 100%;
            height: 100%;
            > img {
              width: 100%;
            }
          }
        }
        .van-radio:nth-child(2) {
          margin-left: 39px;
        }
      }
      .item_lottie_box {
        .PublicJson {
          ::v-deep .micAvatar_img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
    &:nth-child(4) {
      width: 259px !important;
      margin-left: 14px;
      margin-right: 12px;
      position: relative;
      .item_img_boxs {
        .item_img_box:nth-of-type(2) {
          margin-left: 14px;
        }
      }
      .item_img_box {
        width: 114px !important;
        height: 69px !important;
      }
      .micRadio {
        position: absolute;
        width: 172px;
        top: 54px;
        left: 102px;
        .van-radio {
          width: 24px;
          height: 24px;
          ::v-deep .van-radio__icon {
            width: 100%;
            height: 100%;
            > img {
              width: 100%;
            }
          }
        }
        .van-radio:nth-child(2) {
          margin-left: 92px;
        }
      }
    }
    .item_img_boxs {
      width: 155px;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px 3px;
    }
    .item_img_box {
      width: 69px;
      height: 69px;
      background: linear-gradient(0deg, #7845a4, #452b6f);
      border: 2px solid #d6beff;
      border-radius: 12px;
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
        margin-left: 6px;
      }
    }
    .item_name {
      margin: 6px 0 4px;
      font-size: 13px;
    }
    .item_num {
      margin-bottom: 5px;
      font-size: 12px;
      color: #fff68f;
    }
    .item_btn {
      width: 67px;
      height: 26px;
      border-radius: 26px;
      font-size: 13px;
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
      right: 0;
      top: 0;
      width: 80px;
      height: 17px;
      color: #fff;
      background: linear-gradient(-90deg, #75b9ff, #ff84f8);
      border-radius: 0px 10px 0px 10px;
      > img {
        position: relative;
        top: 0px;
        width: auto;
        height: 16px;
      }
      > span {
        font-size: 12px;
        transform: scale(0.95);
      }
    }
    &:nth-last-child(-n + 3) {
      width: 100px;
    }
    &:nth-last-child(2) {
      margin-left: -8px;
      margin-right: -8px;
    }
  }
}
</style>
