<template>
  <div class="travelsTwo-page">
    <!-- 上方盒子 -->
    <div class="travelsTwo-top-box">
      <!-- 白色边框 -->
      <div
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          padding: 0 0 14px;
          box-sizing: border-box;
        "
      >
        <div class="travelsTwo-top">
          <!-- 用户框 -->
          <div class="user-box" v-if="travelsTwoData.pair_info">
            <div class="avatar-box">
              <div>
                <img :src="travelsTwoData.pair_info[0].profile_image" alt="" />
              </div>
            </div>
            <div class="nickname-box">
              {{ travelsTwoData.pair_info[0].username }}
            </div>
          </div>
          <!-- 亲密度 -->
          <div class="love-num">
            <p>{{ travelsTwoData.intimacy }}</p>
          </div>
          <!-- 用户框 -->
          <div class="user-box" v-if="travelsTwoData.pair_info">
            <div class="avatar-box" @click="getUserInfo">
              <div>
                <img
                  v-if="travelsTwoData.pair_info[1]"
                  :src="travelsTwoData.pair_info[1].profile_image"
                  alt=""
                />
              </div>
            </div>
            <div class="nickname-box">
              {{
                travelsTwoData.pair_info[1]
                  ? travelsTwoData.pair_info[1].username
                  : '虚位以待'
              }}
            </div>
          </div>
        </div>
        <div class="travelsTwo-body">
          <p class="body-title">
            与绑定好友<span>新增亲密度达52000</span>可领取永久称号1个
          </p>
          <div class="body-content">
            <div
              class="content-item"
              @click="handleChooseTitle(key)"
              v-for="(item, key) in travelsTwoData.pair_award?.award_info"
              :key="item.id"
            >
              <div class="img-box">
                <div v-if="item.id === 4921" class="lottieXylx"></div>
                <div v-if="item.id === 4920" class="lottieXylx"></div>
              </div>
              <div class="text-box">永久称号</div>
              <div
                class="flag-box"
                :class="{ 'flag-box-active': item.checked }"
              ></div>
            </div>
          </div>
          <div
            @click="handleGetTitle"
            class="body-button"
            :class="{
              'body-button-get': travelsTwoData.pair_award?.has_right == 1
            }"
          >
            {{
              travelsTwoData.pair_award?.has_right == 0
                ? '领取'
                : travelsTwoData.pair_award?.has_right == 1
                ? '已领取'
                : ''
            }}
          </div>
        </div>
        <div class="travelsTwo-bottom">
          <!-- 说明文字 -->
          <ul>
            <li>此绑定只生效于本次活动。绑定成功后，不可解除</li>
            <li>从双方均成功绑定后开始统计新增亲密度</li>
            <li>
              活动期间收到钻石礼物，可获得双倍经验值和双倍
              基础魅力值，魅力值上限提高50%
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 下方盒子 -->
    <div class="travelsTwo-bottom-box">
      <!-- 白色边框 -->
      <div
        class="border-box"
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          padding: 0 0 14px;
          box-sizing: border-box;
        "
      >
        <!-- 兑换好礼标题 -->
        <div class="img-box" style="text-align: center">
          <img src="../../assets/title_3.png" alt="" />
        </div>
        <div class="travelsTwo-bottom-body">
          <div
            v-for="(item, key) in travelsTwoData.consume_status"
            :key="key"
            class="bottom-body-item"
          >
            <div class="img-box">
              <div class="img-top">
                <img src="../../assets/mk2_1.png" alt="" />
              </div>
              <div class="text-bottom">+{{ item.gamegold_text }}</div>
            </div>
            <div class="text-box">
              <p>
                累计消费<span>{{ key }}钻</span>
              </p>
              <p>
                <span>({{ item.consume_nums }}/{{ key }})</span>
              </p>
            </div>
            <div
              @click="handleGet(item.has_right, key)"
              class="button-box-toDid"
              :class="{
                'button-box-did': item.has_right === 1,
                'button-box-get': item.has_right === 2
              }"
            >
              {{
                item.has_right === 0
                  ? '未完成'
                  : item.has_right === 1
                  ? '领取'
                  : item.has_right === 2
                  ? '已领取'
                  : ''
              }}
            </div>
            <!-- 每日重置 -->
            <div class="reset" v-if="item.is_daily">
              <img src="../../assets/mk2_4.png" alt="" />
            </div>
          </div>
          <div class="travelsTwo-bottom-text">
            <!-- 说明文字 -->
            <ul>
              <li>求婚时选择规模和信物的消费不计算在内</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 最佳玩伴 -->
    <div class="playmate-list">
      <!-- 白色边框 -->
      <div
        class="border-box"
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          padding: 0 0 14px;
          box-sizing: border-box;
        "
      >
        <div class="img-box" style="text-align: center">
          <img
            src="../../assets/title_4.png"
            alt=""
            style="width: 262px; height: 46px"
          />
        </div>
        <div class="playmate-top">
          <div class="playmate-one" v-if="travelsTwoData.pair_rank">
            <playmateItem
              :rankingSrc="theFirst"
              :profile_image="imgUrl(travelsTwoData.pair_rank[0].profile_image)"
              :tprofile_image="
                imgUrl(travelsTwoData.pair_rank[0].tprofile_image)
              "
              :nickname1="travelsTwoData.pair_rank[0].username"
              :nickname2="travelsTwoData.pair_rank[0].tusername"
              :loveNum="travelsTwoData.pair_rank[0].num"
            ></playmateItem>
          </div>
          <div class="playmate-two-and-three" v-if="travelsTwoData.pair_rank">
            <playmateItem
              :rankingSrc="theSecond"
              :profile_image="imgUrl(travelsTwoData.pair_rank[1].profile_image)"
              :tprofile_image="
                imgUrl(travelsTwoData.pair_rank[1].tprofile_image)
              "
              :nickname1="travelsTwoData.pair_rank[1].username"
              :nickname2="travelsTwoData.pair_rank[1].tusername"
              :loveNum="travelsTwoData.pair_rank[1].num"
            ></playmateItem>
            <playmateItem
              :rankingSrc="thethird"
              :profile_image="
                imgUrl(travelsTwoData.pair_rank[2].tprofile_image)
              "
              :tprofile_image="
                imgUrl(travelsTwoData.pair_rank[2].tprofile_image)
              "
              :nickname1="travelsTwoData.pair_rank[2].username"
              :nickname2="travelsTwoData.pair_rank[2].tusername"
              :loveNum="travelsTwoData.pair_rank[2].num"
            ></playmateItem>
          </div>
        </div>
        <!-- 奖励图标 -->
        <img
          @click="showGoodsList"
          class="jiangli"
          src="../../assets/mk3_11.png"
          alt=""
        />
        <div class="playmate-contain">
          <div class="playmate-body" v-if="travelsTwoData.pair_rank">
            <div
              v-for="(item, index) in travelsTwoData.pair_rank.slice(3)"
              :key="item.rank"
              class="playmate-body-item"
              :class="{ 'playmate-body-item-bc': index % 2 !== 0 }"
            >
              <div class="ranking-left">{{ item.rank }}</div>
              <div class="user-box">
                <div class="user">
                  <div class="user-avatar">
                    <img src="" alt="" />
                  </div>
                  <p>{{ item.username }}</p>
                </div>
                <p>&</p>
                <div class="user">
                  <div class="user-avatar">
                    <img src="" alt="" />
                  </div>
                  <p>{{ item.tusername }}</p>
                </div>
              </div>
              <div class="loveNum">新增{{ item.num }}亲密度</div>
            </div>
          </div>
          <div
            class="playmate-body-item playmate-body-item-bc20"
            v-if="travelsTwoData.pair_rank"
          >
            <div class="ranking-left">{{ travelsTwoData.self_rank.rank }}</div>
            <div class="user-box">
              <div class="user">
                <div class="user-avatar">
                  <img :src="travelsTwoData.self_rank.profile_image" alt="" />
                </div>
                <p>{{ travelsTwoData.self_rank.username }}</p>
              </div>
              <p>&</p>
              <div class="user">
                <div class="user-avatar">
                  <img :src="travelsTwoData.self_rank.tprofile_image" alt="" />
                </div>
                <p>{{ travelsTwoData.self_rank.tusername }}</p>
              </div>
            </div>
            <div class="loveNum">
              新增{{ travelsTwoData.self_rank.num }}亲密度
            </div>
          </div>
        </div>
        <div class="playmate-bottom-text">
          <!-- 说明文字 -->
          <ul>
            <li>
              活动期间新增亲密度<span>排名前20</span>的绑定用户，双方可获得活动限定头饰最佳玩伴
            </li>
            <li>
              <span>倾国倾城和情深意长两服分别排名</span>
            </li>
            <li>
              跨服绑定的玩家可查看双方在各自所在服的排名，结算时以两服排名中最高的为准，发放对应的名次奖励
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <van-dialog
      v-model="showDialog"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
      @closed="closeDialog"
    >
      <!-- 标题 -->
      <template #title v-if="true">
        <img
          v-if="dailogType === 'toBind'"
          src="../../assets/tk_3.png"
          alt=""
        />
        <img
          v-if="dailogType === 'getTitle'"
          src="../../assets/tk_4.png"
          alt=""
        />
        <img
          v-if="dailogType === 'showGoods'"
          src="../../assets/tk_5.png"
          alt=""
        />
      </template>
      <p
        class="tk-title"
        v-if="dailogType === 'toBind' && this.tuidStatus === 1"
      >
        绑定规则：用户两人互相输入对方ID，即可绑定参与活动
      </p>
      <p
        class="tk-title"
        v-if="dailogType === 'toBind' && this.tuidStatus === 3"
      >
        绑定已提交，请提醒对方前往活动页面提交
      </p>
      <p class="tk-title" v-if="this.tuidStatus === 4">
        绑定失效，对方已被绑定
      </p>
      <p class="tk-title" v-if="dailogType === 'getTitle'">确认领取此称号</p>
      <input
        type="text"
        class="search-input"
        placeholder="点击输入对方ID"
        v-if="dailogType === 'toBind' && this.tuidStatus === 1"
        v-model.trim="tuid"
        :disabled="pair_user_info.uid"
      />
      <p v-if="verify" class="input-tip">{{ verify }}</p>
      <div
        class="tk-botton"
        v-if="
          dailogType === 'toBind' &&
          this.tuidStatus === 1 &&
          !this.pair_user_info.uid
        "
        @click="onClickSearch"
      >
        查找
      </div>
      <!-- 绑定--重新查找 -->
      <div class="bind_box" v-if="pair_user_info.uid && this.tuidStatus === 1">
        <div class="user_box">
          <div class="img_box">
            <img src="../../assets/mk3_2.png" alt="" />
            <img :src="pair_user_info.profile_image" alt="" />
          </div>
          <div class="nick_name">{{ pair_user_info.username }}</div>
        </div>
        <div class="button_box">
          <button class="bind_button" @click="onBindUser(pair_user_info.tuid)">
            绑定
          </button>
          <div
            class="re_search"
            @click="
              pair_user_info = {}
              tuid = ''
            "
          >
            重新查找
          </div>
        </div>
      </div>
      <!-- 领取称号 -->
      <div class="getTitle" v-if="dailogType === 'getTitle'">
        <div class="img_box">
          <div class="top_img">
            <div class="tkLottieXylx"></div>
          </div>
          <div class="title">永久称号</div>
        </div>
        <div class="bottom_button">
          <div class="cancel_button" @click="showDialog = false">取消</div>
          <div class="confirm_button" @click="onConfirm">确认</div>
        </div>
      </div>
      <!-- 返回等待---取消绑定 -->
      <div
        class="tk_button_two"
        v-if="dailogType === 'toBind' && this.tuidStatus === 3"
      >
        <!-- 用户框 -->
        <div class="user_box">
          <div class="img_box">
            <img src="../../assets/mk3_2.png" alt="" />
            <img :src="pair_user_info.profile_image" alt="" />
          </div>
          <div class="nick_name">{{ pair_user_info.username }}</div>
        </div>
        <div
          v-if="dailogType === 'toBind' && this.tuidStatus === 3"
          class="button_box"
        >
          <div class="return" @click="handleReturn">返回等待</div>
          <div class="cancel" @click="handleCancel">取消绑定</div>
        </div>
        <!-- 重新绑定 -->
        <div v-if="tuidStatus === 4" class="re_bind" @click="reBind">
          重新绑定
        </div>
      </div>
      <div
        class="tk-bottom-text"
        v-if="dailogType === 'toBind' && this.tuidStatus !== 3"
      >
        注：两人成功绑定后不可解绑
      </div>
      <div
        class="tk-bottom-text"
        v-if="
          (dailogType === 'toBind' && pair_user_info.uid) ||
          pair_user_info.uid === 4
        "
      >
        注：需双方输入对方的ID进行绑定
      </div>
      <!-- 排名奖励 -->
      <div v-if="dailogType === 'showGoods'" class="rank_reward">
        <div class="rank_top">
          <div class="lottieXylx"></div>
        </div>
        <div class="rank_body">
          <div class="adj_box">
            <img src="../../assets/tk_10.png" alt="" />
            <img src="../../assets/tk_11.png" alt="" />
          </div>
          <div class="tb_list">
            <div
              class="tb_item"
              v-for="item in 4"
              :key="item"
              :class="{ tb_item_bgc: item % 2 === 0 }"
            >
              <p>第一名</p>
              <p>头饰+30天</p>
            </div>
          </div>
        </div>
        <div class="rank_text">
          活动期间新增亲密度<span>排名前20</span>的绑定用户，双方可获得活动限定头饰最佳玩伴
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 弹框组件导入
import { Dialog } from 'vant'
// json动画导入
import { svgFun } from '../../utils/json'
import xylxFen from '../../assets/lottie/xylx_fen/data.json'
import xylxZi from '../../assets/lottie/xylx_zi/data.json'
import zjwb from '../../assets/lottie/zjwb/data.json'
// 第一名
import theFirst from '../../assets/mk3_13.png'
// 第二名
import theSecond from '../../assets/mk3_14.png'
// 第三名
import thethird from '../../assets/mk3_15.png'
// 请求导入
import { getTravelsTwoData } from '../../api/travelsTwo'
import playmateItem from './components/playmateItem.vue'
export default {
  name: 'travelsTwo',
  components: {
    playmateItem,
    [Dialog.Component.name]: Dialog.Component
  },
  props: {},
  data() {
    return {
      // 弹框显示隐藏
      showDialog: false,
      // 弹框类型
      dailogType: 'toBind',
      // 图标导入
      theFirst,
      theSecond,
      thethird,
      epithetFlag: true,
      // 页面数据
      travelsTwoData: {},
      tuid: '',
      verify: '',
      pair_user_info: {},
      tuidStatus: '',
      titleMark: '',
      tkLottieXylx: {}
    }
  },
  computed: {
    imgUrl() {
      return (url) => {
        return url.split('/')[0] === 'static' ? url.split('/').pop() : url
      }
    }
  },
  watch: {},
  async created() {
    await this.getTravelsTwoData()
    this.$nextTick(() => {
      svgFun(0, xylxFen, 'xylxFen', '.lottieXylx')
      svgFun(1, xylxZi, 'xylxZi', '.lottieXylx')
    })
  },
  methods: {
    // 展示奖励
    showGoodsList() {
      this.dailogType = 'showGoods'
      this.$nextTick(() => {
        this.svgFun(2, zjwb)
      })
      this.showDialog = true
    },
    // 封装累计消费领取接口
    async getSpendReard(mark) {
      const res = await getTravelsTwoData({
        type: 'consume_reward',
        mark
      })
      return res
    },
    // 累计消费返利领取
    async handleGet(flag, mark) {
      if (flag === 1) {
        const res = await this.getSpendReard(mark)
        this.$toast(res.errmsg)
        await this.getTravelsTwoData()
      }
    },
    // 封装领取称号接口
    async getTitle(mark) {
      const res = await getTravelsTwoData({
        type: 'pairgame_pair_award',
        mark
      })
      return res
    },
    // 单选按钮--选择称号
    handleChooseTitle(mark) {
      for (const key in this.travelsTwoData.pair_award.award_info) {
        this.travelsTwoData.pair_award.award_info[key].checked = false
      }
      if (this.titleMark) {
        if (this.titleMark !== mark) {
          this.titleMark = mark
          this.travelsTwoData.pair_award.award_info[mark].checked =
            !this.travelsTwoData.pair_award.award_info[mark].checked
        } else {
          this.titleMark = ''
          for (const key in this.travelsTwoData.pair_award.award_info) {
            this.travelsTwoData.pair_award.award_info[key].checked = false
          }
        }
      } else {
        this.titleMark = mark
        this.travelsTwoData.pair_award.award_info[mark].checked =
          !this.travelsTwoData.pair_award.award_info[mark].checked
      }
    },
    // 点击确认领取称号
    async onConfirm() {
      const res = await this.getTitle(this.titleMark)
      console.log(res)
    },
    // 打开领取称号弹框
    async handleGetTitle() {
      if (!this.travelsTwoData.pair_info[1].id) {
        return this.$toast('请先绑定')
      }
      if (this.travelsTwoData.intimacy !== 52000) {
        return this.$toast('新增请亲密度不够')
      }
      if (!this.titleMark) {
        return this.$toast('请选择称号')
      }
      // 弹框
      this.dailogType = 'getTitle'
      this.$nextTick(() => {
        if (this.titleMark === '1') {
          this.tkLottieXylx = svgFun(0, xylxFen, 'xylxFen', '.tkLottieXylx')
        } else {
          this.tkLottieXylx = svgFun(0, xylxZi, 'xylxZi', '.tkLottieXylx')
        }
      })
      this.showDialog = true
    },
    // 重新绑定按钮
    async reBind() {
      const res = await this.getReBind(this.pair_user_info.uid)
      this.$toast(res.errmsg)
      await this.getTravelsTwoData()
      this.showDialog = false
    },
    // 封装重新绑定接口
    async getReBind(tuid) {
      const res = await getTravelsTwoData({
        type: 'pairgame_pair_opt',
        mark: 4,
        tuid
      })
      return res
    },
    // 点击绑定按钮
    async onBindUser() {
      const res = await this.toBind(this.pair_user_info.uid)
      this.$toast(res.errmsg)
      this.showDialog = false
    },
    // 封装绑定用户接口
    async toBind(tuid) {
      const res = await getTravelsTwoData({
        type: 'pairgame_pair_opt',
        mark: 2,
        tuid
      })
      console.log(res)
      return res
    },
    // 查找用户按钮
    async onClickSearch() {
      if (this.tuid) {
        const res = await this.searchUid()
        if (res.errmsg !== '查询成功') {
          return (this.verify = res.errmsg)
        }
        this.verify = ''
        this.pair_user_info = res.data
        console.log(this.pair_user_info)
        await this.getTravelsTwoData()
      } else {
        console.log('不能为空')
      }
    },
    // 封装查找用户接口
    async searchUid() {
      const res = await getTravelsTwoData({
        type: 'pairgame_pair_opt',
        mark: 1,
        tuid: this.tuid
      })
      return res
    },
    // 封装获取伙伴信息接口
    async getFriendInfo() {
      const { data } = await getTravelsTwoData({
        type: 'pairgame_pair_info'
      })
      return data
    },
    // 封装取消绑定接口
    async cancelBind(tuid) {
      const res = await getTravelsTwoData({
        type: 'pairgame_pair_opt',
        mark: 3,
        tuid
      })
      return res
    },
    // 取消绑定
    async handleCancel() {
      const res = await this.cancelBind(this.pair_user_info.uid)
      this.$toast(res.errmsg)
      await this.getTravelsTwoData()
      this.showDialog = false
    },
    // 返回等待
    handleReturn() {
      this.showDialog = false
    },
    // 获取伙伴信息
    async getUserInfo() {
      const data = await this.getFriendInfo()
      if (data.status === 1) {
        this.tuidStatus = data.status
        await this.getTravelsTwoData()
        this.dailogType = 'toBind'
        this.showDialog = true
      } else if (data.status === 3 || data.status === 4) {
        this.tuidStatus = data.status
        this.pair_user_info = data.pair_user_info
        await this.getTravelsTwoData()
        this.dailogType = 'toBind'
        this.showDialog = true
      } else if (data.status === 2) {
        console.log('已经绑定')
      }
    },
    // 关闭弹窗触发的事件
    closeDialog() {
      this.tkLottieXylx.destroy()
      this.pair_user_info = {}
      this.dailogType = ''
      this.tuidStatus = ''
    },
    // 获取页面数据
    async getTravelsTwoData() {
      const { data } = await getTravelsTwoData({
        mark: 'm3',
        type: 'tab'
      })
      this.travelsTwoData = data
    }
  }
}
</script>
<style scoped lang="scss">
.travelsTwo-page {
  // 弹框样式
  ::v-deep .van-dialog {
    width: 300px;

    color: #ffffff;
    background-color: transparent !important;
    // 标题
    .van-dialog__header {
      position: relative;
      top: 25px;
      height: 45px;
      z-index: 5;
      > img {
        width: 300px;
      }
    }
    .van-dialog__content {
      padding: 25px 10px 15px;
      margin: 0 auto;
      background: linear-gradient(180deg, #a7c4ff, #828be2);
      border: 8px solid #edf2ff;
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      position: relative;
      .tk-title {
        line-height: 25px;
      }
      input::-ms-input-placeholder {
        font-size: 17px;
        font-weight: 500;
        color: #c2c4d6;
        text-align: center;
      }
      input::-webkit-input-placeholder {
        font-size: 17px;
        font-weight: 500;
        color: #c2c4d6;
        text-align: center;
      }
      .search-input {
        width: 247px;
        height: 37px;
        background: #fefaef;
        border: 3px solid #6e7bda;
        border-radius: 19px;
        font-size: 19px;
        font-weight: 500;
        color: #6a78e3;
        margin-top: 15px;
        margin-bottom: 30px;
        text-align: center;
      }
      .input-tip {
        font-size: 13px;
        color: #d53f7f;
        text-align: center;
        position: absolute;
        top: 140px;
        left: 105px;
      }
      .tk-botton {
        width: 86px;
        height: 36px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 2px solid #ffffff;
        border-radius: 18px;
        color: #4d7ddd;
        font-size: 16px;
        text-align: center;
        line-height: 37px;
        margin-bottom: 20px;
      }
      .bind_box {
        width: 100%;
        height: 126px;
        background: #6c71d8;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 10px;
        .user_box {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          .img_box {
            width: 84px;
            height: 84px;
            border-radius: 50%;
            position: relative;
            img:nth-child(1) {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 4;
              width: 100%;
            }
            img:nth-child(2) {
              width: 60px;
              position: absolute;
              top: 11px;
              left: 11px;
              z-index: 3;
              border-radius: 50%;
            }
          }
          .nick_name {
            font-size: 15px;
          }
        }
        .button_box {
          height: 100%;
          font-size: 16px;
          text-align: center;
          line-height: 33px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          .bind_button {
            width: 86px;
            height: 33px;
            background: linear-gradient(0deg, #fff9d1, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 17px;
            color: #a9792c;
          }
          .re_search {
            width: 86px;
            height: 33px;
            background: linear-gradient(0deg, #cae7ff, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 17px;
            color: #4d7ddd;
          }
        }
      }
      .tk_button_two {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-size: 16px;

        text-align: center;
        line-height: 36px;
        > .user_box {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          .img_box {
            width: 84px;
            height: 84px;
            position: relative;
            img:nth-child(1) {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 4;
              width: 100%;
            }
            img:nth-child(2) {
              width: 60px;
              position: absolute;
              top: 11px;
              left: 11px;
              z-index: 3;
              border-radius: 50%;
            }
          }
          .nick_name {
            font-size: 15px;
          }
        }
        > .button_box {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin-bottom: 15px;
          .return {
            width: 120px;
            height: 36px;
            background: linear-gradient(0deg, #cae7ff, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 18px;
            color: #4d7ddd;
          }
          .cancel {
            width: 120px;
            height: 36px;
            background: linear-gradient(0deg, #fff9d1, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 18px;
            color: #a9792c;
          }
        }
        > .re_bind {
          width: 120px;
          height: 36px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 36px;
          font-size: 16px;

          color: #a9792c;
          text-align: center;
          line-height: 36px;
          margin-bottom: 10px;
        }
      }
      > .getTitle {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        > .img_box {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          margin: 10px 0;
          > .top_img {
            width: 90px;
            height: 60px;
            background: #fefaef;
            border: 3px solid #6e7bda;
            border-radius: 6px;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            align-content: center;
            > .lottie_title {
              height: 100%;
            }
          }
          > .title {
            color: #ffffff;
          }
        }
        > .bottom_button {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          font-size: 16px;

          text-align: center;
          line-height: 36px;
          margin-bottom: 10px;
          > .cancel_button {
            width: 86px;
            height: 36px;
            background: linear-gradient(0deg, #cae7ff, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 18px;
            color: #4d7ddd;
          }
          > .confirm_button {
            width: 86px;
            height: 36px;
            background: linear-gradient(0deg, #fff9d1, #ffffff);
            border: 1px solid #ffffff;
            border-radius: 18px;
            color: #a9792c;
          }
        }
      }
      .tk-bottom-text {
        font-size: 13px;
      }
      // 排名奖励
      .rank_reward {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .rank_top {
          width: 93px;
          height: 91px;
          .lottie {
            width: 100%;
          }
        }
        .rank_body {
          width: 233px;
          height: 132px;
          border: 2px solid #ffffff;
          border-radius: 10px;
          position: relative;
          margin: 10px 0;
          .adj_box {
            width: 100%;
            height: 21px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            top: -11px;
            left: 0;
            img {
              height: 100%;
            }
          }
          .tb_list {
            overflow: hidden;
            width: 100%;
            border-radius: 10px;
            .tb_item {
              width: 100%;
              height: 33px;
              background: #dde7ff;
              display: flex;
              text-align: center;
              line-height: 33px;

              font-weight: 500;
              p:nth-child(1) {
                flex: 1;
                background-color: #adc1fa;
                font-size: 13px;
                color: #ffffff;
              }
              p:nth-child(2) {
                background-color: #dde7ff;
                flex: 2;
                font-size: 13px;
                color: #595ec3;
              }
            }
            .tb_item_bgc {
              p:nth-child(1) {
                background-color: #8d9ceb;
              }
              p:nth-child(2) {
                background-color: #b7ccff;
              }
            }
          }
        }
        .rank_text {
          width: 100%;
          font-size: 12px;

          color: #ffffff;
          line-height: 20px;
          span {
            color: #fff4a7;
          }
        }
      }
    }
  }
  .travelsTwo-top-box {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    box-sizing: border-box;
    margin-bottom: 38px;
    .travelsTwo-top {
      position: relative;
      width: 100%;
      padding: 39px 5px 0;
      margin-bottom: 19px;
      box-sizing: border-box;
      background: url('../../assets/mk3_1.png') no-repeat;
      background-size: 100%;
      display: flex;
      justify-content: space-between;
      .user-box {
        position: relative;
        z-index: 2;
        // background-color: red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .avatar-box {
          width: 96px;
          height: 96px;
          background: url('../../assets/mk3_4.png') no-repeat;
          background-size: 100% 100%;
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          > div {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            bottom: 2px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .nickname-box {
          width: 139px;
          height: 38px;
          background: url('../../assets/mk3_7.png') no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 38px;

          color: #ffffff;
        }
      }
      .user-box:nth-child(1) {
        position: relative;
        left: 4px;
      }
      .user-box:nth-child(3) {
        position: relative;
        right: 4px;
      }
      // 亲密度
      .love-num {
        z-index: 1;
        position: absolute;
        top: 57px;
        left: 108px;
        width: 131px;
        height: 65px;
        background: url('../../assets/mk3_5.png') no-repeat;
        background-size: 100%;
        p {
          font-size: 13px;

          font-weight: 500;
          color: #ee669e;
          margin: 45px auto 0;
          width: 78px;
          height: 15px;
          background: url('../../assets/mk3_6.png') no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 15px;
        }
      }
    }
    .travelsTwo-body {
      width: 330px;
      height: 176px;
      background: linear-gradient(-90deg, #a7c4ff, #828be2);
      border-radius: 10px;
      margin: 0 10px;
      padding-bottom: 8px;
      overflow: hidden;
      .body-title {
        margin-top: 17px;

        color: #ffffff;
        text-align: center;
        span {
          color: #fff2ac;
        }
      }
      .body-content {
        display: flex;
        justify-content: space-around;
        margin: 13px 0 10px;
        .content-item {
          width: 124px;
          height: 79px;
          border-radius: 6px;
          box-sizing: border-box;
          background: url('../../assets/mk4_11.png') no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          .img-box {
            width: 96px;
            height: 44px;
            box-sizing: border-box;
            .lottie {
              height: 100%;
            }
          }
          .text-box {
            width: 116px;
            height: 18px;
            background: #6b77e1;
            border-radius: 0 0 10px 10px;

            color: #f5f5f8;
            text-align: center;
            line-height: 18px;
            position: relative;
            top: 6px;
          }
          // 右上角选择框
          .flag-box {
            position: absolute;
            right: -4px;
            top: -2px;
            width: 26px;
            height: 26px;
            background: url('../../assets/mk3_8.png') no-repeat;
            background-size: 100%;
          }
          .flag-box-active {
            background: url('../../assets/mk3_9.png') no-repeat !important;
            background-size: 100% !important;
          }
        }
      }
      // 上方盒子领取按钮
      .body-button {
        width: 144px;
        height: 40px;
        margin: 0 auto;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;
        color: #a9792c;
        text-align: center;
        line-height: 40px;
        border-radius: 40px;
        font-size: 16px;

        color: #a9792c;
      }
      // 已领取
      .body-button-get {
        background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
        color: #fff !important;
      }
    }
    .travelsTwo-bottom {
      margin-left: 18px;

      color: #595ec3;
      padding: 0 10px 0 12px;
      box-sizing: border-box;
      margin-top: 14px;
      line-height: 25px;
    }
  }

  .travelsTwo-bottom-box {
    position: relative;
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    // padding: 14px 10px;
    box-sizing: border-box;
    margin-bottom: 38px;
    // 兑换好礼图片标题
    .border-box {
      > .img-box {
        position: absolute;
        width: 100%;
        top: -25px;
        left: -1px;
        img {
          width: 262px;
        }
      }
    }
    .travelsTwo-bottom-body {
      box-sizing: border-box;
      padding: 34px 10px 0;
      .bottom-body-item {
        width: 330px;
        height: 66px;
        background: linear-gradient(-90deg, #a7c4ff, #828be2);
        box-shadow: 0px 3px 0px 0px #ffffff;
        border-radius: 6px;
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 15px;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
      // 图片样式
      .img-box {
        width: 48px;
        height: 48px;
        background: #fefaef;
        border: 2px solid #d5e5ff;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .img-top {
          width: 100%;
          background: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
        // 图片下方字体样式
        .text-bottom {
          text-align: center;
          font-size: 12px;

          font-weight: 500;
          color: #ffffff;
          width: 100%;
          height: 18px;
          line-height: 16px;
          background: #6771cb;
          border-radius: 0px 0px 0px 5px;
        }
      }
      // 中间字体样式
      .text-box {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 13px;

        font-weight: 500;
        span {
          color: #fffaa6;
        }
        p {
          color: #ffffff;
          font-size: 12px;
        }
      }
      // 按钮样式
      // 去完成
      .button-box-toDid {
        position: absolute;
        top: 24px;
        right: 12px;
        width: 64px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        border-radius: 34px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 2px solid #ffffff;

        color: #4d7ddd;
      }
      // 领取
      .button-box-did {
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        color: #a9792c;
      }
      // 已领取
      .button-box-get {
        background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
        color: #fff !important;
      }
      // 每日充值
      .reset {
        position: absolute;
        width: 61px;
        height: 34px;
        top: 0;
        right: 0;
        img {
          width: 100%;
        }
      }
      .travelsTwo-bottom-text {
        margin-left: 10px;

        color: #595ec3;
        // padding-top: 8px;
        // padding-left: 15px;
        padding: 8px 10px 0 12px;
        box-sizing: border-box;
        margin-top: 14px;
      }
    }
  }
  .playmate-list {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background: linear-gradient(0deg, #e2efff, #f5d1fb);
    box-sizing: border-box;
    margin-bottom: 38px;
    position: relative;
    // overflow: hidden;
    .jiangli {
      position: absolute;
      width: 61px;
      right: 0;
      top: 0;
    }
    .border-box {
      position: relative;
      > .img-box {
        position: absolute;
        left: 45px;
        top: -25px;
      }
    }
    .playmate-top {
      background: url('../../assets/mk3_10.png') no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 33px;
      .playmate-one {
        ::v-deep .avatar-item {
          width: 84px;
          height: 84px;
          img {
            position: absolute;
            z-index: 2;
            top: 10px;
            left: 14px;
            width: 60px;
            height: 60px;
          }
        }
      }
      .playmate-two-and-three {
        display: flex;
        justify-content: space-around;
        ::v-deep .avatar-item {
          width: 70px;
          height: 70px;
          img {
            position: absolute;
            z-index: 2;
            top: 10px;
            left: 12px;
            width: 46px;
            height: 46px;
          }
        }
      }
    }
    .playmate-contain {
      width: 335px;
      height: 386px;
      margin: 5px 8px;
      border-radius: 10px;
      padding-bottom: 67px;
      overflow: hidden;
      position: relative;
      display: inline-flex;
      flex-direction: column;
      .playmate-body-item-bc20 {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        height: 67px;
        background: linear-gradient(-90deg, #dcb6ee, #9785ee) !important;
        height: 67px;
        background-color: #a5baf6;
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        color: #fff;

        > .ranking-left {
          width: 25px;
          margin: 20px 0 0 20px;
        }
        > .loveNum {
          width: 115px;
          margin: 20px 0 0 13px;
        }
        .user-box {
          display: flex;
          height: 100%;
          align-items: center;
          > p {
            position: relative;
            top: -8px;
          }
          .user {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 100%;
            .user-avatar {
              width: 30px;
              height: 30px;
              background: #7783ea;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
            > p {
              color: #fffaa6;
            }
          }
        }
      }
      .playmate-body {
        overflow-y: scroll;
        height: 100%;
        .playmate-body-item-bc {
          background-color: #828ded !important;
        }
        > .playmate-body-item {
          display: flex;
          justify-content: space-around;
          > .ranking-left {
            width: 25px;
            margin: 20px 0 0 20px;
          }
          > .loveNum {
            width: 115px;
            margin: 20px 0 0 18px;
          }
          height: 67px;
          background-color: #a5baf6;
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          color: #fff;

          .user-box {
            display: flex;
            height: 100%;
            align-items: center;
            > p {
              position: relative;
              top: -8px;
            }
            .user {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              height: 100%;
              .user-avatar {
                width: 30px;
                height: 30px;
                background: #7783ea;
                border-radius: 50%;
              }
              > p {
                color: #fffaa6;
              }
            }
          }
        }
      }
    }
    .playmate-bottom-text {
      padding: 5px 12px 0 26px;
      box-sizing: border-box;

      color: #595ec3;
      line-height: 25px;
      span {
        color: #fe8ab1;
      }
    }
  }
}
</style>
