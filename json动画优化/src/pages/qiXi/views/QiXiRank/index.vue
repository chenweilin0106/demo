<template>
  <div class="QiXiRank">
    <div class="QiXiBox">
      <div class="head flex_across" :class="{ type2: list_flag == 2 }">
        <div class="left" @click="change(1)"></div>
        <div class="right" @click="change(2)"></div>
      </div>
      <div class="main">
        <!-- 日榜总榜切换tab -->
        <div class="dayOrTotal">
          <img v-if="day_flag == 1" :src="IconPath('mk6_2.png')" alt="">
          <img v-else :src="IconPath('mk6_2_1.png')" alt="">
          <div class="btns">
            <div class="left_btn" @click="select(1)"></div>
            <div class="right_btn" @click="select(2)"></div>
          </div>
          <!-- <img :src="IconPath('mk6_2_1.png')" alt=""> -->
        </div>
        <!-- 奖励展示标签 -->
        <div class="award_tip"></div>
        <!-- 奖励内容 -->
        <div class="award_content">
          <!-- 财富日榜奖励 -->
          <div class="award_line" v-if="list_flag == 1 && day_flag == 1">
            <div class="award_item">
              <div class="award_top">
                <div class="award_preview" @click="showFlag4 = true"></div>
              </div>
              <div class="award_bottom">礼物赠送权</div>
            </div>
            <div class="award_item">
              <div class="award_top">
                <img :src="IconPath('yb_120_120.png')" alt="">
              </div>
              <div class="award_bottom">元宝</div>
            </div>
          </div>
          <!-- 财富总榜奖励 -->
          <div class="wealth_all" v-if="list_flag == 1 && day_flag == 2">
            <div class="award_item">
              <div class="award_top">
                <img :src="IconPath('jnsjxyzjc_120_120.png')" alt="">
              </div>
              <div class="award_bottom">技能升级幸运值加成</div>
            </div>
          </div>
          <!-- CP榜日榜奖励 -->
          <div class="award_line CP_day" v-if="list_flag == 2 && day_flag == 1">
            <div class="award_item">
              <div class="award_top">
                <img :src="IconPath('mfmc_120_120.png')" alt="">
                <div class="award_preview" @click="showFlag5 = true"></div>
              </div>
              <div class="award_bottom">座驾</div>
            </div>
            <div class="award_item">
              <div class="award_top">
                <img :src="IconPath('ljs_120_120.png')" alt="">
              </div>
              <div class="award_bottom">绿晶石</div>
            </div>
          </div>
          <!-- CP榜总榜奖励 -->
          <div class="award_line CP_all" v-if="list_flag == 2 && day_flag == 2">
            <div class="award_item">
              <div class="award_top">
                <PublicJson class="lottie" :lottieJson_name="'ts_csll'" :lottieJson="ts_csll"
                  :userAvatar="$store.getters.user_icon" />
              </div>
              <div class="award_bottom">定制CP头饰</div>
            </div>
            <div class="award_item">
              <div class="award_top">
                <PublicJson class="lottie" :lottieJson_name="'ts_csll'" :lottieJson="ts_csll"
                  :userAvatar="$store.getters.user_icon" />
              </div>
              <div class="award_bottom">限定头饰</div>
            </div>
            <div class="award_item">
              <div class="award_top">
              </div>
              <div class="award_bottom">限定CP资料卡</div>
            </div>
          </div>
          <!-- 奖励详情 -->
          <div class="award_detail" @click="showAwardDetail"></div>
        </div>
        <!-- 排名前三 财富榜日榜-->
        <div class="top_three" v-if="list_flag == 1 && day_flag == 1">
          <div :class="{ second: index == 1, first: index == 0, third: index == 2 }"
            v-for="(item, index) in PageData.qixiRank.daily_rank.slice(0, 3)" :key="index">
            <div class="avatar" @click="toUserMain(item.uid)">
              <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_10.png') : item.profile_image"
                alt="">
            </div>
            <div class="name">{{ item.username }}</div>
          </div>
        </div>
        <!-- 排名前三 财富榜总榜-->
        <div class="top_three" v-if="list_flag == 1 && day_flag == 2">
          <div :class="{ second: index == 1, first: index == 0, third: index == 2 }"
            v-for="(item, index) in PageData.qixiRank.total_rank.slice(0, 3)" :key="index">
            <div class="avatar" @click="toUserMain(item.uid)">
              <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_10.png') : item.profile_image"
                alt="">
            </div>
            <div class="name">{{ item.username }}</div>
          </div>
        </div>
        <!-- 排名前三 CP榜日榜-->
        <div class="top_three" v-if="list_flag == 2 && day_flag == 1">
          <div :class="{ second: index == 1, first: index == 0, third: index == 2 }"
            v-for="(item, index) in PageData.cpList.daily_rank.slice(0, 3)" :key="index">
            <div class="avatar_list">
              <div class="left_avatar" @click="toUserMain(item.uid)">
                <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_10.png') : item.profile_image"
                  alt="">
              </div>
              <div class="right_avatar" @click="toUserMain(item.tuid)">
                <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_10.png') : item.tprofile_image"
                  alt="">
              </div>
            </div>
            <div class="names">
              <div class="top_name">{{ item.username }}</div>
              <div class="right_name">{{ item.tusername }}</div>
            </div>
            <div class="loveValue">
              <div class="tit">爱意值</div>
              <div class="num">{{ item.num }}</div>
            </div>
          </div>
        </div>
        <!-- 排名前三 CP榜总榜-->
        <div class="top_three" v-if="list_flag == 2 && day_flag == 2">
          <div :class="{ second: index == 1, first: index == 0, third: index == 2 }"
            v-for="(item, index) in PageData.cpList.total_rank.slice(0, 3)" :key="index">
            <div class="avatar_list">
              <div class="left_avatar" @click="toUserMain(item.uid)">
                <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_10.png') : item.profile_image"
                  alt="">
              </div>
              <div class="right_avatar" @click="toUserMain(item.tuid)">
                <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_10.png') : item.tprofile_image"
                  alt="">
              </div>
            </div>
            <div class="names">
              <div class="top_name">{{ item.username }}</div>
              <div class="right_name">{{ item.tusername }}</div>
            </div>
            <div class="loveValue">
              <div class="tit">爱意值</div>
              <div class="num">{{ item.num }}</div>
            </div>
          </div>
        </div>
        <!-- 财富榜第四名之后的容器 -->
        <div class="after_four_wealth" v-if="list_flag == 1">
          <template v-if="day_flag == 1">
            <div class="after_four_item" v-for="(item, index) in PageData.qixiRank.daily_rank.slice(3, 20)" :key="index">
              <div class="ranking">{{ index + 4 }}</div>
              <div class="avatar" @click="toUserMain(item.uid)">
                <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_11.png') : item.profile_image"
                  alt="">
              </div>
              <div class="name">{{ item.username }}</div>
            </div>
          </template>
          <template v-else>
            <div class="after_four_item" v-for="(item, index) in PageData.qixiRank.total_rank.slice(3, 30)" :key="index">
              <div class="ranking">{{ index + 4 }}</div>
              <div class="avatar" @click="toUserMain(item.uid)">
                <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_11.png') : item.profile_image"
                  alt="">
              </div>
              <div class="name">{{ item.username }}</div>
            </div>
          </template>
        </div>
        <!-- CP榜第四名之后的容器 -->
        <div class="after_four_CP" v-if="list_flag == 2">
          <template v-if="day_flag == 1">
            <div class="after_four_item" v-for="(item, index) in PageData.cpList.daily_rank.slice(3, 20)" :key="index">
              <div class="ranking">{{ index + 4 }}</div>
              <div class="user" @click="toUserMain(item.uid)">
                <div class="usericon">
                  <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_11.png') : item.profile_image"
                    alt="">
                </div>
                <div class="username">{{ item.username }}</div>
              </div>
              <div class="connect">&</div>
              <div class="user user2" @click="toUserMain(item.tuid)">
                <div class="usericon">
                  <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_11.png') : item.tprofile_image"
                    alt="">
                </div>
                <div class="username">{{ item.tusername }}</div>
              </div>
              <div class="love_value">
                <div class="love_num">{{ item.num }}</div>
                <div class="love_tit">爱意值</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="after_four_item" v-for="(item, index) in PageData.cpList.total_rank.slice(3, 20)" :key="index">
              <div class="ranking">{{ index + 4 }}</div>
              <div class="user" @click="toUserMain(item.uid)">
                <div class="usericon">
                  <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_11.png') : item.profile_image"
                    alt="">
                </div>
                <div class="username">{{ item.username }}</div>
              </div>
              <div class="connect">&</div>
              <div class="user user2" @click="toUserMain(item.tuid)">
                <div class="usericon">
                  <img :src="(item.uid == 0 || item.uid == '') ? require('../../assets/mk6_11.png') : item.tprofile_image"
                    alt="">
                </div>
                <div class="username">{{ item.tusername }}</div>
              </div>
              <div class="love_value">
                <div class="love_num">{{ item.num }}</div>
                <div class="love_tit">爱意值</div>
              </div>
            </div>
          </template>
        </div>
        <!-- 财富榜20名或30名之后 -->
        <div class="after_20_wealth" v-if="list_flag == 1">
          <div class="after_four_item">
            <!-- 日榜且不在排名 -->
            <div class="ranking" v-if="day_flag == 1 && findUid(PageData.qixiRank.daily_rank, $store.getters.uid) == -1">
              20+</div>
            <!-- 日榜在排名 -->
            <div class="ranking" v-if="day_flag == 1 && findUid(PageData.qixiRank.daily_rank, $store.getters.uid) != -1">
              {{
                findUid(PageData.qixiRank.daily_rank, $store.getters.uid) + 1 }}</div>
            <!-- 总榜且不在排名 -->
            <div class="ranking" v-if="day_flag == 2 && findUid(PageData.qixiRank.total_rank, $store.getters.uid) == -1">
              30+</div>
            <!-- 总榜在排名 -->
            <div class="ranking" v-if="day_flag == 2 && findUid(PageData.qixiRank.total_rank, $store.getters.uid) != -1">
              {{
                findUid(PageData.qixiRank.daily_rank, $store.getters.uid) + 1 }}</div>
            <div class="avatar" @click="toUserMain($store.getters.uid)">
              <img :src="PageData.qixiRank.my_profile_image" alt="">
            </div>
            <div class="name">{{ PageData.qixiRank.my_username }}</div>
          </div>
        </div>
        <!-- CP榜20名或30名之后 -->
        <div class="after_20_CP"
          v-if="PageData.cpList.self_daily_rank && list_flag == 2 && PageData.qixiRank.belong_server == server_flag">
          <div class="after_four_item">
            <!-- 日榜且不在排名 -->
            <div class="ranking" v-if="day_flag == 1">{{ PageData.cpList.self_daily_rank.rank }}</div>
            <!-- 总榜且不在排名 -->
            <div class="ranking" v-if="day_flag == 2">{{ PageData.cpList.self_total_rank.rank }}</div>
            <div class="user">
              <div class="usericon">
                <!-- 日榜 -->
                <img @click="toUserMain(PageData.cpList.self_daily_rank.uid)" v-if="day_flag == 1"
                  :src="PageData.cpList.self_daily_rank.profile_image" alt="">
                <!-- 总榜 -->
                <img @click="toUserMain(PageData.cpList.self_total_rank.uid)" v-else
                  :src="PageData.cpList.self_total_rank.profile_image" alt="">
              </div>
              <div @click="toUserMain(PageData.cpList.self_daily_rank.uid)" v-if="day_flag == 1" class="username">{{
                PageData.cpList.self_daily_rank.username }}</div>
              <div @click="toUserMain(PageData.cpList.self_total_rank.uid)" v-else class="username">{{
                PageData.cpList.self_total_rank.username }}</div>
            </div>
            <div class="connect">&</div>
            <div class="user user2" @click="toUserMain(item.tuid)">
              <div class="usericon">
                <img @click="toUserMain(PageData.cpList.self_daily_rank.tuid)" v-if="day_flag == 1"
                  :src="PageData.cpList.self_daily_rank.tprofile_image" alt="">
                <img @click="toUserMain(PageData.cpList.self_total_rank.tuid)" v-else
                  :src="PageData.cpList.self_total_rank.tprofile_image" alt="">
              </div>
              <div v-if="day_flag == 1" @click="toUserMain(PageData.cpList.self_daily_rank.tuid)" class="username">{{
                PageData.cpList.self_daily_rank.tusername }}</div>
              <div v-else @click="toUserMain(PageData.cpList.self_total_rank.tuid)" class="username">{{
                PageData.cpList.self_total_rank.tusername }}</div>
            </div>
            <div class="love_value" v-if="day_flag == 1">
              <div class="love_num">{{ PageData.cpList.self_daily_rank.num }}</div>
              <div class="love_tit">爱意值</div>
            </div>
            <div class="love_value" v-else>
              <div class="love_num">{{ PageData.cpList.self_total_rank.num }}</div>
              <div class="love_tit">爱意值</div>
            </div>
          </div>
        </div>
        <!-- 服务器列表 -->
        <div class="server_list" v-if="list_flag == 2">
          <div class="server_item" @click="changeServer(1)">
            <img :src="IconPath('mk6_14.png')" v-if="server_flag == 1" alt="">
            <img :src="IconPath('mk6_14_1.png')" v-else alt="">
          </div>
          <div class="server_item" @click="changeServer(2)">
            <img :src="IconPath('mk6_15.png')" v-if="server_flag == 2" alt="">
            <img :src="IconPath('mk6_15_1.png')" v-else alt="">
          </div>
          <div class="server_item" @click="changeServer(99)">
            <img :src="IconPath('mk6_16.png')" v-if="server_flag == 99" alt="">
            <img :src="IconPath('mk6_16_1.png')" v-else alt="">
          </div>
        </div>
        <!-- 说明文字 -->
        <div class="ThemeBox_BottomText">
          <ul>
            <li v-if="list_flag == 1">
              <div class="circle"></div>财富榜为活动期间<span class="special">累计充值</span>排行榜
            </li>
            <li v-else>
              <div class="circle"></div>爱意榜为<span class="special">活动绑定用户</span>双方互送<span class="special">钻石礼物和告白</span>累
              计【爱意值】，1钻石=1爱意值
            </li>
            <li v-if="list_flag == 1">
              <div class="circle"></div>日榜奖励次日发放，总榜奖励在活动结束后发放
            </li>
            <li v-else>
              <div class="circle"></div>同服绑定的用户进入本服榜单，跨服绑定的用户进 入异地恋榜单
            </li>
            <li>
              <div class="circle"></div><span class="special">详细榜单规则和奖励可查看页面【奖励详情】</span>
            </li>
            <li>
              <div class="circle"></div>活动期间收到钻石礼物，可获得双倍经验值和双倍基础魅力值，魅力值上限提高50%
            </li>
          </ul>
        </div>
      </div>
      <div class="foot"></div>
    </div>
    <!-- 财富榜奖励弹窗 -->
    <ThemeDialog :isShow="showDialog" class="dialog1" dialogMark="awardDetails"
      :titleIconObj="{ awardDetails: 'title_13.png' }" @closeDialog="
        showDialog = false
        ">
      <div class="dialog_cotent">
        <div class="tip1">财富榜日榜奖励</div>
        <div class="list1">
          <img :src="IconPath('tk_10.png')" alt="">
        </div>
        <div class="word">【鹊桥相会】礼物：价格为3344钻石</div>
        <div class="tip2">财富榜总榜奖励</div>
        <div class="list2">
          <img :src="IconPath('tk_11.png')" alt="">
        </div>
        <div class="word2">
          <div>技能等级加成：每次获得幸运值时，幸运值增长有加成。生效时间为8月23日00:00-8月25日23:59</div>
          <div>总榜奖励条件：累计充值达到2,000元且结算时达到获奖名次</div>
        </div>
      </div>
    </ThemeDialog>
    <!-- CP榜奖励弹窗 -->
    <ThemeDialog :isShow="showDialog1" class="dialog2" dialogMark="awardDetails"
      :titleIconObj="{ awardDetails: 'title_13.png' }" @closeDialog="
        showDialog1 = false
        ">
      <div class="dialog_cotent">
        <div class="tip1">爱意榜日榜奖励</div>
        <div class="list1">
          <img :src="IconPath('tk_12.png')" alt="">
        </div>
        <div class="tip2">爱意榜总榜奖励</div>
        <div class="list2">
          <img :src="IconPath('tk_13.png')" alt="">
        </div>
        <div class="word">总榜奖励条件：活动期间累计爱意值达到99,999且结算时达到获奖名次</div>
      </div>
    </ThemeDialog>
    <!-- 预览礼物弹窗 -->
    <ThemeDialog :isShow="showFlag4" class="wrapper4" @closeDialog="
      showFlag4 = false
      ">
      <div class="block">
        <div class="chatbg">
          <div class="lottie">
            <!-- <PublicJson :lottieJson_name="giftlottie.name" :lottieJson="giftlottie.obj" /> -->
          </div>
        </div>
        <div class="name">鹊桥相会·礼物赠送权</div>
        <div class="close" @click="showFlag4 = false"></div>
      </div>
    </ThemeDialog>
    <!-- 预览座驾弹窗 -->
    <ThemeDialog :isShow="showFlag5" class="wrapper4" @closeDialog="
      showFlag5 = false
      ">
      <div class="block">
        <div class="chatbg">
          <div class="lottie">
            <!-- <PublicJson :lottieJson_name="giftlottie.name" :lottieJson="giftlottie.obj" /> -->
          </div>
        </div>
        <div class="name">神圣王座·座驾</div>
        <div class="close" @click="showFlag5 = false"></div>
      </div>
    </ThemeDialog>
    <!--  -->
  </div>
</template>

<script>
import ThemeDialog from '../../components/Dialog/ThemeDialog'
// 默认数据
import { qixiRank } from '../../utils/pageData'
import { cpList } from '../../utils/pageData'
// json动画组件
import PublicJson from '../../components/PublicJson'
import ts_csll from '../../assets/lottie/ts_csll/data.json'
// 数据请求
import { getPageData } from '../../api/index'
import { toUserMain } from '../../utils/toApp'

export default {
  name: 'QiXiRank',
  components: {
    ThemeDialog,
    PublicJson
  },
  props: [],
  data() {
    return {
      ts_csll,
      list_flag: 1,//财富榜CP榜
      day_flag: 1,//日榜总榜 
      server_flag: 1,//服务器列表
      showDialog: false,
      showDialog1: false,
      showFlag4: false,
      showFlag5: false,
      PageData: {
        qixiRank: {

        },
        cpList: {

        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.PageData.qixiRank = qixiRank
    this.PageData.cpList = cpList
    this.updateList1()
  },
  mounted() { },
  methods: {
    //跳转用户主页
    toUserMain(id) {
      toUserMain(id)
    },
    // 查找uid位置
    findUid(arr, key) {
      const arr1 = []
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].uid == key) {
          arr1.push(index)
        }
      }
      if (arr1.length == 1) {
        return arr1[0]
      } else if (arr1.length == 0) {
        return -1
      } else {
        return arr1
      }
    },
    // 切换财富CP榜
    change(i) {
      if (this.list_flag == i) {
        return
      } else {
        this.list_flag = i
        // 更新财富榜
        if (i == 1) {
          this.updateList1()
        } else {
          this.day_flag = 1
          // 更新cp榜单
          this.updateList2()
        }
      }
    },
    // 更新财富榜
    updateList1() {
      getPageData(
        {
          type: 'tab',
          mark: 'm6'
        }
      ).then(res => {
        this.PageData.qixiRank = res.data
        this.server_flag = this.PageData.qixiRank.belong_server
      })
    },
    // 更新cp榜单
    updateList2() {
      getPageData(
        {
          type: 'lovecrown_top_info',
          mark: this.server_flag
        }
      ).then(res => {
        this.PageData.cpList = res.data
      })
    },
    // 切换日榜总榜
    select(i) {
      if (this.day_flag == i) {
        return
      } else {
        this.day_flag = i
      }
    },
    // 展示奖励详情
    showAwardDetail() {
      if (this.list_flag == 1) {
        this.showDialog = true
      } else {
        this.showDialog1 = true
      }
    },
    // 切换服务器
    changeServer(i) {
      if (this.server_flag == i) {
        return
      } else {
        this.server_flag = i
        // 更新cp榜单
        this.updateList2()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.QiXiRank {
  margin-bottom: 35px;

  .QiXiBox {
    display: flex;
    flex-direction: column;
    align-items: center;


    .head {
      width: 359px;
      height: 70px;
      background: url('../../assets/mk6_1.png') no-repeat top center/100% auto;
      margin-bottom: -17px;
      position: relative;
      z-index: 100;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-left: -4px;

      .left,
      .right {
        flex: 1;
        height: 100%;
      }
    }

    .type2 {
      background: url('../../assets/mk6_1_1.png') no-repeat top center/100% auto;
      margin-right: -8px;
    }

    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      // height: 790px;
      width: 355px;
      // justify-content: center;
      background: url('../../assets/mk1_3.png') no-repeat top center/100% 100%;
      flex-shrink: 0;
      position: relative;
      z-index: 99;

      div {
        flex-shrink: 0;
      }

      .dayOrTotal {
        width: 300px;
        height: 35px;
        margin-top: 28px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;


        .btns {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          right: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .left_btn,
          .right_btn {
            flex: 1;
            height: 100%;
          }

          .right_btn {}
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .award_tip {
        width: 285px;
        height: 21px;
        background-image: url('../../assets/mk6_3.png');
        background-size: 100% 100%;
        margin-top: 17px;
      }

      .award_content {
        width: 313px;
        height: 116px;
        background-image: url('../../assets/mk6_4.png');
        background-size: 100% 100%;
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .award_line {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 11px;

          .award_item {
            margin-right: 40px;
            width: 90px;
            height: 60px;
            background: linear-gradient(0deg, #FFFFFF, #FCDAFF);
            border: 2px solid #AE88E7;
            border-radius: 6px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;

            .award_top {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;

              .lottie {
                width: 46px;
                height: 46px;

                ::v-deep .micAvatar_img {
                  width: 84%;
                  height: 84%;
                }
              }

              .award_preview {
                background-image: url('../../assets/mk6_18.png');
                background-size: 100% 100%;
                width: 90px;
                height: 13px;
                position: absolute;
                bottom: 0;
              }

              img {
                position: absolute;
                height: 60px;
              }
            }

            .award_bottom {
              width: 85px;
              height: 17px;
              background: #8D64DA;
              border-radius: 9px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              margin-bottom: -9px;
            }
          }

          .award_item:nth-child(2) {
            margin-right: 0;
          }
        }

        .CP_all {
          .award_item {
            margin-right: 7px;
          }

          .award_item:nth-child(2) {
            margin-right: 7px;
          }

          .award_item:nth-child(3) {
            margin-right: 0;
          }
        }

        .wealth_all {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 11px;

          .award_item {
            width: 90px;
            height: 60px;
            background: linear-gradient(0deg, #FFFFFF, #FCDAFF);
            border: 2px solid #AE88E7;
            border-radius: 6px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;

            .award_top {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;

              .award_preview {
                background-image: url('../../assets/mk6_18.png');
                background-size: 100% 100%;
                width: 90px;
                height: 13px;
                position: absolute;
                bottom: 0;
              }

              img {
                position: absolute;
                height: 60px;
              }
            }

            .award_bottom {
              width: 128px;
              height: 17px;
              background: #8D64DA;
              border-radius: 9px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              margin-bottom: -9px;
            }
          }
        }

        .award_detail {
          margin-top: 17px;
          width: 49px;
          height: 15px;
          background-image: url('../../assets/mk6_17.png');
          background-size: 100% 100%;
        }
      }

      .top_three {
        margin-top: 5px;
        display: flex;
        align-items: flex-start;
        justify-content: center;

        .first,
        .second,
        .third {
          display: flex;
          flex-direction: column;
          align-items: center;

          .avatar {
            margin-top: 50px;
            width: 54px;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              height: 100%;
              border: 2px solid #F1EBFF;
              border-radius: 50%;
            }
          }

          .avatar_list {
            display: flex;
            align-items: center;
            margin-top: 46px;

            .left_avatar,
            .right_avatar {
              margin-right: 2px;
              width: 50px;
              height: 50px;
              background: #8F6ED7;
              border-radius: 50%;

              img {
                width: 100%;
                height: 100%;
                border: 2px solid #F1EBFF;
                border-radius: 50%;
              }
            }

            .right_avatar {
              margin-right: 0;

            }
          }

          .name {
            margin-top: 6px;
            height: 12px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #8365D7;
          }

          .names {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #8365D7;

            .top_name {
              margin-top: 6px;
            }

            .right_name {
              margin-top: 6px;
            }
          }

          .loveValue {
            margin-top: 23px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .tit {
              font-size: 9px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #A9A1BF;
            }

            .num {
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #F67BAF;
            }
          }
        }

        .second {
          margin-top: 29px;
          width: 116px;
          height: 180px;
          background-image: url(../../assets/mk6_7.png);
          background-size: 100% 100%;
          transform: translateX(-116px);
        }

        .first {
          width: 115px;
          height: 227px;
          background-image: url(../../assets/mk6_6.png);
          background-size: 100% 100%;
          transform: translateX(116px);
        }

        .third {
          margin-top: 29px;
          width: 116px;
          height: 180px;
          background-image: url(../../assets/mk6_8.png);
          background-size: 100% 100%;
        }
      }

      .after_four_wealth,
      .after_four_CP {
        margin-top: -58px;
        width: 335px;
        height: 225px;
        flex-shrink: 0;
        background: #A8A1FF;
        border-radius: 10px 10px 0px 0px;
        overflow: scroll;
        position: relative;
        // z-index: 999;

        .after_four_item {
          width: 335px;
          height: 45px;
          background: #A8A1FF;
          display: flex;
          align-items: center;
          position: relative;

          .ranking {
            position: absolute;

            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            left: 18px;
            transform: translateX(-50%);
          }

          .avatar {
            width: 30px;
            height: 31px;
            margin-left: 36px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .name {
            margin-left: 10px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFAA6;
          }
        }

        .after_four_item:nth-child(2n) {
          background: #937CF5;
        }
      }

      .after_four_CP {
        margin-top: 0;
        height: 319px;

        .after_four_item {
          height: 67px;
          align-items: flex-start;

          .ranking {
            position: absolute;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            left: 18px;
            top: 25px;
            transform: translate(-50%, -50%);
          }

          .user {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 34px;
            margin-top: 10px;
            min-width: 71px;

            .usericon {
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .username {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFAA6;
              margin-top: 6px;
              max-width: 71px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .user2 {
            margin-left: 0;
          }

          .connect {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 21px;
            // margin-left: 16px;
            // margin-right: 18px;
          }

          .love_value {
            margin-left: 30px;
            margin-top: 20px;
            width: 43px;
            height: 12px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            display: flex;
            align-items: center;
          }
        }
      }

      .after_20_wealth,
      .after_20_CP {
        width: 335px;
        height: 45px;
        background: linear-gradient(90deg, #7866FF, #F3A1FF);
        border-radius: 0px 0px 10px 10px;
        overflow: hidden;

        .after_four_item {
          width: 335px;
          height: 45px;
          background: linear-gradient(90deg, #7866FF, #F3A1FF);
          display: flex;
          align-items: center;
          position: relative;

          .ranking {
            position: absolute;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            left: 18px;
            transform: translateX(-50%);
          }

          .avatar {
            width: 30px;
            height: 31px;
            margin-left: 36px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .name {
            margin-left: 10px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFAA6;
          }
        }

        // flex-shrink: 0;
      }

      .after_20_CP {
        height: 67px;

        .after_four_item {
          height: 67px;
          align-items: flex-start;

          .ranking {
            position: absolute;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            left: 18px;
            top: 25px;
            transform: translate(-50%, -50%);
          }

          .user {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 34px;
            margin-top: 10px;
            min-width: 71px;


            .usericon {
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .username {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFAA6;
              margin-top: 6px;
              max-width: 71px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .user2 {
            margin-left: 0;
          }

          .connect {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 21px;
          }

          .love_value {
            margin-left: 30px;
            margin-top: 20px;
            width: 43px;
            height: 12px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            display: flex;
            align-items: center;
          }
        }
      }

      .server_list {
        margin-top: 14px;
        display: flex;
        align-items: center;

        .server_item {
          width: 117px;
          height: 44px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      // 下方说明字体样式
      .ThemeBox_BottomText {
        margin-left: 13px;
        margin-right: 8px;
        line-height: 25px;
        margin-top: 14px;

        li {
          font-size: 14px;
          position: relative;
          list-style-type: none;
          margin-left: 10px;
          padding-left: 3px;
          color: #6f59c3;

          img {
            position: relative;
            margin: 0 1px;
            width: 22px;
          }

          .circle {
            position: absolute;
            top: 9px;
            left: -10px;
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #fb97cd;
          }

          .special {
            color: #F775BB;
          }
        }
      }
    }

    .foot {
      width: 355px;
      height: 45px;
      background: url('../../assets/mk1_4.png') no-repeat top center/100% auto;
    }
  }

  // 弹窗
  .dialog1,
  .dialog2 {
    top: 50%;

    .dialog_cotent {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 450px;
      margin-bottom: 24px;
      overflow-y: scroll;

      div {
        flex-shrink: 0;
      }

      .tip1 {
        margin-top: 8px;
        width: 141px;
        height: 21px;
        background: #B966DB;
        border-radius: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }

      .list1 {
        margin-top: 10px;
        width: 278px;
        height: 165px;
        background: #DCC9FF;
        border-radius: 10px;


        img {
          width: 100%;
          height: 100%;
        }
      }

      .word {
        margin-left: 12px;
        height: 12px;
        margin-top: 10px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFF196;
        line-height: 19px;
        align-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .tip2 {
        margin-top: 13px;
        width: 141px;
        height: 21px;
        background: #6151C3;
        border-radius: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
      }

      .list2 {
        margin-top: 10px;
        width: 275px;
        height: 231px;
        background: #DCC9FF;
        border-radius: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .word2 {
        margin-left: 13px;
        width: 275px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFF196;
        line-height: 17px;

        div {
          margin-top: 13px;
          height: 29px;
          display: flex;
          align-items: center;
        }

        div:nth-child(2) {
          margin-top: 8px;
        }
      }
    }
  }

  .dialog2 {

    .dialog_cotent {
      height: 488px;
      overflow: hidden;
      margin-bottom: 18px;

      .tip2 {
        margin-top: 12px;
      }

      .list2 {
        margin-top: 10px;
        width: 278px;
        height: 199px;
        background: #DCC9FF;
        border-radius: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .word {
        margin-top: 13px;
        height: 29px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFF196;
        line-height: 17px;
        display: flex;
        align-items: center;
      }
    }
  }

  .wrapper4 {

    ::v-deep .ThemeDialog_bgc {
      padding-top: 0;
      height: 445px;
    }

    .block {
      display: flex;
      flex-direction: column;
      align-items: center;
      // border: 3px solid #fff;

      .close {
        position: absolute;
        top: -24px;
        right: -24px;
        width: 70px;
        height: 67px;
        background-image: url('../../assets/tk_9.png');
        background-size: 100% 100%;

      }

      .chatbg {
        width: 214px;
        height: 370px;
        background-image: url('../../assets/tk_bg_1.png');
        background-size: 100% 100%;
        margin-top: 19px;
        position: relative;



        .lottie {
          position: absolute;
          width: 90px;
          height: 90px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .name {
        margin-top: 13px;
        font-size: 12px;
        font-family: SourceHanSerifCN-Bold, SourceHanSerifCN;
        font-weight: bold;
        color: #FFE19F;
        line-height: 18px;
      }
    }
  }

}
</style>
