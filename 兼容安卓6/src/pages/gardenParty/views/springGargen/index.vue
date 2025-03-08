<template>
  <div class="container4">
    <!-- 五日签到 -->
    <div class="fiveDaySignIn">
      <div class="inner">
        <div class="pinkTitle"></div>
        <div class="signArea" ref="Xlist">
          <div class="signItem" v-for="(item, index) in sign_list" :key="index">
            <div class="award">
              <img src="../../assets/mk4_3.png" alt="">
              <div class="num">x1</div>
              <div class="bottom">{{ item.date_text }}</div>
              <div class="overlay11" v-if="item.status == 2">
                <!-- <div class="overlay11" v-if="true"> -->

                <img src="../../assets/mk4_2.png" alt="">
              </div>
            </div>
            <div v-if="item.status == 2" class="btn">已签到</div>
            <div v-if="item.status == 1" class="btn notSign">即将开始</div>
            <div v-if="item.status == 0" class="btn">未签到</div>
          </div>
        </div>
        <div class="textcontainer">
          <div class="ruleKText">
            <p class="circle"></p>
            <p>活动期间，每日签到即可领取抽奖券1张</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>每充值30元也可获得抽奖券1张，自动发放无需手动领取</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>清空许愿池奖励即可解锁摩天轮抽奖资格</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>购买礼包、会员（含超值兑换中兑换会员）、活力
              卡不计算在内</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 许愿池摩天轮标题 -->
    <div class="awardPowlTitle">
      <div class="leftimg" @click="changeAwardPowl(1)">
        <img class="left" src="../../assets/mk4_9_1.png" alt="">
      </div>
      <div class="rightimg" @click="changeAwardPowl(2)">
        <img class="right" src="../../assets/mk4_8_1.png" alt="">
      </div>
      <div v-if="awardPowlFlag == 1" class="wishWell">
        <img src="../../assets/mk4_9.png" alt="">
      </div>
      <div v-else class="skywheel">
        <img src="../../assets/mk4_8.png" alt="">
      </div>
      <img src="../../assets/mk4_5.png" class="highTips" alt="" srcset="">
    </div>
    <!-- 许愿池 -->
    <div class="awardPowl" v-show="awardPowlFlag == 1">
      <div class="pLine">
        <p class="awardTicketP">
          拥有抽奖券
          <img src="../../assets/mk4_4.png" />
          ：<span>{{ ticket_nums }}</span>
        </p>
        <p class="awardTicketP2">
          已充值：<span class="special">{{ recharge_nums }}</span>
        </p>
      </div>
      <div class="awards">
        <div class="top">
          <div class="awardItem" v-for="(item, index) in simple_lottery_list.slice(1, 5)" :key="index">
            <div class="nums" v-if="item.number > 0">x{{ item.number }} </div>
            <img class="icon" :src="require('../../assets/' + item.icon)" alt="">
            <div class="bottomnums">{{ item.text }}</div>
            <div class="overlay" v-if="item.number == 0">
              <img src="../../assets/mk4_2.png" alt="">
            </div>
          </div>
        </div>
        <div class="center">
          <div class="left">
            <div class="awardItem" v-for="(item, index) in simple_lottery_list.slice(5, 7)" :key="index">
              <div class="nums" v-if="item.number > 0">x{{ item.number }}</div>
              <img class="icon" :src="require('../../assets/' + item.icon)" alt="">
              <div class="bottomnums">{{ item.text }}</div>

              <div class="overlay" v-if="item.number == 0">
                <img src="../../assets/mk4_2.png" alt="">
              </div>
            </div>
          </div>
          <div class="bigCycle" v-for="(item, index) in simple_lottery_list.slice(0, 1)" :key="index">
            <img class="icon" :src="require('../../assets/' + item.icon)" alt="">
            <div class="bottomnums">座驾+7天</div>
            <div class="overlay" v-if="item.number == 0">
              <img src="../../assets/mk4_2.png" alt="">
            </div>
          </div>
          <div class="right">
            <div class="awardItem" v-for="(item, index) in simple_lottery_list.slice(7, 9)" :key="index">
              <div class="nums" v-if="item.number > 0">x{{ item.number }}</div>
              <img class="icon" :src="require('../../assets/' + item.icon)" alt="">
              <div class="bottomnums">{{ item.text }}</div>

              <div class="overlay" v-if="item.number == 0">
                <img src="../../assets/mk4_2.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="awardItem" v-for="(item, index) in simple_lottery_list.slice(9, 13)" :key="index">
            <div class="nums" v-if="item.number > 0">x{{ item.number }}</div>
            <img class="icon" :src="require('../../assets/' + item.icon)" alt="">
            <div class="bottomnums">{{ item.text }}</div>

            <div class="overlay" v-if="item.number == 0">
              <img src="../../assets/mk4_2.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 许愿按钮 -->
      <img src="../../assets/mk4_13.png" class="congratulationTit" v-if="simple_count == 0" alt="">
      <div class="bottomBtn" v-else>
        <div class="leftbtn" @click="throttlewish(1)">
          <div class="top">许愿1次</div>
          <div class="bottom">
            消耗：<img src="../../assets/mk4_4.png" alt=""> x1
          </div>
        </div>
        <div class="rightbtn grey" v-if="simple_count < 5">
          <div class="top">许愿5次</div>
          <div class="bottom">
            消耗：<img src="../../assets/mk4_4.png" alt=""> x5
          </div>
        </div>
        <div class="rightbtn" v-else @click="throttlewish(2)">
          <div class="top">许愿5次</div>
          <div class="bottom">
            消耗：<img src="../../assets/mk4_4.png" alt=""> x5
          </div>
        </div>
      </div>
    </div>
    <!-- 摩天轮 -->
    <div class="ferrisWheel" v-show="awardPowlFlag != 1">
      <div class="pLine">
        <p class="awardTicketP">
          拥有抽奖券
          <img src="../../assets/mk4_4.png" />
          ：<span>{{ ticket_nums }}</span>
        </p>
        <p class="awardTicketP2">
          已充值：<span class="special">{{ recharge_nums }}</span>
        </p>
      </div>
      <!-- 摩天轮转轴 -->
      <div class="ferrisWheelCenter">
        <img src="../../assets/mk4_25.png" alt="" class="bottomChar">
        <div class="barContainer" :class="{ rotaryState: rotaryState }">
          <img src="../../assets/mk4_24.png" alt="" class="bar">
          <img src="../../assets/mk4_23.png" v-if="!is_locker" alt="" class="star">
          <img src="../../assets/mk4_22.png" v-if="is_locker" alt="" class="centerlock">
          <div class="char" v-for="(item, index) in senior_lottery_list" :key="index"
            :class="['char' + (index + 1), { retateChar: rotaryState }]">
            <div class="charimg">
              <img v-if="index != 3" :src="require('../../assets/' + item.icon)" class="awardimg" alt="">
              <div v-else class="lottie100"></div>
              <div class="limitTip" v-if="item.type == 'luck_key' && item.number != 0">
                <span>限量{{ item.number }}份</span>
              </div>
              <div class="limitTip" v-if="item.type == 'pretty_card' && item.number != 0">
                <span>限量{{ item.number }}份</span>
              </div>
              <div class="overlay2" v-if="item.type == 'luck_key' && item.number == 0">
                <!-- <div class="overlay2" v-if="true"> -->

                <img src="../../assets/mk4_2.png" alt="">
              </div>
              <div class="overlay2" v-if="item.type == 'pretty_card' && item.number == 0">
                <img src="../../assets/mk4_2.png" alt="">
              </div>
            </div>
            <p v-if="item.type == 'costume'" class="costume">{{ item.text }}</p>
            <p v-else>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <!-- 许愿按钮 -->
      <div class="bottomBtn" v-if="!is_locker">
        <div class="leftbtn" @click="rotate(1)">
          <div class="top">转动1次</div>
          <div class="bottom">
            消耗：<img src="../../assets/mk4_4.png" alt=""> x1
          </div>
        </div>
        <div class="rightbtn" @click="rotate(2)">
          <div class="top">转动10次</div>
          <div class="bottom">
            消耗：<img src="../../assets/mk4_4.png" alt=""> x10
          </div>
        </div>
      </div>
      <div class="lock" v-else>
        <div class="btn4">尚未解锁</div>
        <div class="greentip">清空许愿池奖励即可解锁</div>
      </div>

    </div>
    <!-- 恭喜获得  摩天轮大弹窗-->
    <van-overlay z-index="2023" class="commToast" :show="showFlag" @click="close">
      <div class="inCommToast" @click.stop>

        <img src="../../assets/tk_1.png" class="header" />
        <div class="awardContainer" :class="{
          center: awards.length <= 4,
        }">
          <div class="awardItem" v-for="(item, index) in awards" :key="index">
            <div class="img">
              <div class="lottie3" v-if="item.type == 'mic'"></div>
              <img v-else :src="require('../../assets/' + item.icon)" alt="">
            </div>
            <p v-if="item.type == 'costume'" class="costume">{{ item.text }}</p>
            <p v-if="item.type != 'costume'">{{ item.text }}</p>
          </div>
        </div>
        <div class="btn" @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'car'">
          立即装备</div>
        <div class="btn" @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'mic'">
          立即装扮</div>
        <div class="btn" @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'costume'">
          立即装扮</div>
        <div class="btn" @click="iknow" v-if="awards.length > 1">我知道了</div>
        <div class="btn" @click="iknow"
          v-if="awards.length == 1 && awards[0].type != 'car' && awards[0].type != 'mic' && awards[0].type != 'costume'">
          我知道了
        </div>
      </div>
    </van-overlay>
    <!-- 抽奖券不足，请充值 -->
    <van-overlay z-index="2023" class="commToast2" duration="0" :show="showFlag2" @click="cancel">
      <div class="inCommToast" @click.stop>
        <p>抽奖券不足，请充值</p>
        <div class="btns">
          <div class="btn1" @click="cancel">取消</div>
          <div class="btn2" @click="recharge">充值</div>
        </div>
      </div>
    </van-overlay>
    <!-- 恭喜获得小弹窗  摩天轮小弹窗-->
    <van-overlay z-index="2023" class="commToast3" :show="showFlag3" @click="close1">
      <div class="inCommToast" @click.stop>
        <img src="../../assets/tk_1.png" class="header" />
        <div class="awardContainer" :class="{
          center: awards.length < 4
        }">
          <div class="awardItem" v-for="(item, index) in awards" :key="index">
            <div class="img">
              <div class="lottie4" v-if="item.type == 'mic'"></div>
              <img v-else :src="require('../../assets/' + item.icon)" alt="">
            </div>
            <p v-if="item.type == 'costume'" class="costume">{{ item.text }}</p>
            <p v-if="item.type != 'costume'">{{ item.text }}</p>
          </div>
        </div>
        <div class="btn" @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'car'">
          立即装备</div>
        <div class="btn" @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'mic'">
          立即装扮</div>
        <div class="btn" @click="equip(awards[0].tool_id, awards[0].type)"
          v-if="awards.length == 1 && awards[0].type == 'costume'">
          立即装扮</div>
        <div class="btn" @click="close1" v-if="awards.length > 1">我知道了</div>
        <div class="btn" @click="close1"
          v-if="awards.length == 1 && awards[0].type != 'car' && awards[0].type != 'mic' && awards[0].type != 'costume'">
          我知道了
        </div>
      </div>
    </van-overlay>
    <!-- 签到小弹窗 -->
    <van-overlay z-index="2023" class="commToast3" :show="showFlag4" @click="close2">
      <div class="inCommToast1" @click.stop>
        <img src="../../assets/tk_1.png" class="header" />
        <div class="img">
          <img :src="require('../../assets/mk4_3.png')" alt="">
        </div>
        <p>抽奖券+1</p>
        <div class="btn" @click="close2">我知道了</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// 充值方法导入
import { recharge } from '../../utils/toApp'
// 引入返回监听
// import { handleBrowserGoBack } from '../../utils/popstate'
// import { removeBrowserBackListener } from '../../utils/popstate'
import { Toast } from 'vant'
// 导入请求
import { getDepositRebateData } from "../../api/depositRebate";
import { equipNow } from "../../api/equipNow";
// 引入lottie
import lottie from "lottie-web";
import hmxh from "../../assets/lottie/hmxh/data.json";
export default {
  // 奖励兑换
  name: 'springGargen',
  props: {},
  data() {
    return {
      wheelState: false,//摩天轮抽奖状态
      rotaryState: false,//摩天轮旋转状态
      showFlag: false,//弹窗Flag 控制弹窗显示隐藏 
      showFlag2: false,//弹窗Flag 控制（抽奖券不足）弹窗显示隐藏 
      showFlag3: false,//小弹窗
      showFlag4: false,
      awardPowlFlag: 1,
      isSign: false,
      "is_sign_in": false, //是否当日首次签到(true-是，false-不是）,首次签到需要弹框
      "ticket_nums": "0", //抽奖券数量
      "recharge_nums": 0, //已充值数量
      "is_locker": true, //摩天轮锁状态：true-锁状态，false-已解锁
      "simple_count": 27, //许愿池剩余可抽奖品数，如果小于10，则许愿10次按钮置灰
      "sign_list": [ //签到列表
        {
          "date": "20220307",
          "date_text": "03月07日",
          "status": 0 //签到状态：0-已过期，1-即将开始，2-已签到
        },
        {
          "date": "20220308",
          "date_text": "03月08日",
          "status": 0
        },
        {
          "date": "20220309",
          "date_text": "03月09日",
          "status": 0
        },
        {
          "date": "20220310",
          "date_text": "03月10日",
          "status": 0
        },
        {
          "date": "20220311",
          "date_text": "03月11日",
          "status": 0
        }
      ],
      "simple_lottery_list": [ //许愿池
        {
          "id": 1,
          "text": "座驾+7",
          "textAna": "浪漫单车座驾+7天",
          "type": "car",
          "tool_id": 1,
          "nums": 7,
          "icon": "mk4_27.png", //图标
          "number": 1, //商品剩余份数数
          "sort": 1 //排序
        },
        {
          "id": 2,
          "text": "+10",
          "textAna": "绿晶石+10",
          "type": "tool",
          "tool_id": 2,
          "nums": 10,
          "icon": "tk_dj_1.png",
          "number": 3,
          "sort": 2
        },
        {
          "id": 3,
          "text": "+2万",
          "textAna": "元宝+2万",
          "type": "property",
          "tool_id": "gamegold",
          "nums": 20000,
          "icon": "tk_dj_6.png",
          "number": 3,
          "sort": 3
        },
        {
          "id": 4,
          "text": "+1",
          "textAna": "OK绷+1",
          "type": "tool",
          "tool_id": 6,
          "nums": 1,
          "icon": "tk_dj_14.png",
          "number": 2,
          "sort": 4
        },
        {
          "id": 5,
          "text": "+1",
          "textAna": "神功丸+1",
          "type": "tool",
          "tool_id": 6,
          "nums": 1,
          "icon": "tk_dj_10.png",
          "number": 2,
          "sort": 5
        },
        {
          "id": 6,
          "text": "+1",
          "textAna": "口香糖+1",
          "type": "tool",
          "tool_id": 6,
          "nums": 1,
          "icon": "tk_dj_11.png",
          "number": 2,
          "sort": 6
        },
        {
          "id": 7,
          "text": "+1",
          "textAna": "魔术帽+1",
          "type": "tool",
          "tool_id": 5,
          "nums": 1,
          "icon": "tk_dj_13.png",
          "number": 2,
          "sort": 7
        },
        {
          "id": 8,
          "text": "+1",
          "textAna": "聚宝盆+1",
          "type": "tool",
          "tool_id": 7,
          "nums": 1,
          "icon": "tk_dj_12.png",
          "number": 2,
          "sort": 8
        },
        {
          "id": 9,
          "text": "+1万",
          "textAna": "元宝+1万",
          "type": "property",
          "tool_id": "gamegold",
          "nums": 10000,
          "icon": "tk_dj_6.png",
          "number": 2,
          "sort": 9
        },
        {
          "id": 10,
          "text": "+20",
          "textAna": "绿晶石+20",
          "type": "tool",
          "tool_id": 2,
          "nums": 20,
          "icon": "tk_dj_1.png",
          "number": 2,
          "sort": 10
        },
        {
          "id": 11,
          "text": "+3万",
          "textAna": "元宝+3万",
          "type": "property",
          "tool_id": "gamegold",
          "nums": 30000,
          "icon": "tk_dj_6.png",
          "number": 2,
          "sort": 11
        },
        {
          "id": 12,
          "text": "+15",
          "textAna": "绿晶石+15",
          "type": "tool",
          "tool_id": 2,
          "nums": 15,
          "icon": "tk_dj_1.png",
          "number": 2,
          "sort": 12
        },
        {
          "id": 13,
          "text": "+1",
          "textAna": "紫晶石+1",
          "type": "tool",
          "tool_id": 1,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": 2,
          "sort": 13
        }
      ],
      "senior_lottery_list": [ //摩天轮奖池
        {
          "id": 1,
          "text": "+3",
          "textAna": "紫晶石+3",
          "type": "tool",
          "tool_id": 1,
          "nums": 3,
          "icon": "tk_dj_5.png",
          "number": false, //奖品剩余数量：false-表示不限份数
          "sort": 1
        },
        {
          "id": 2,
          "text": "主页特效+1天",
          "textAna": "星芒闪耀主页特效+1天",
          "type": "costume",
          "tool_id": 7,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": false,
          "sort": 2
        },
        {
          "id": 3,
          "text": "+2",
          "textAna": "紫晶石+2",
          "type": "tool",
          "tool_id": 1,
          "nums": 2,
          "icon": "tk_dj_5.png",
          "number": false,
          "sort": 3
        },
        {
          "id": 4,
          "text": "+1",
          "textAna": "绘梦星河头饰+1天",
          "type": "mic",
          "tool_id": 65,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": false,
          "sort": 4
        },
        {
          "id": 5,
          "text": "+1",
          "textAna": "防爆石+1",
          "type": "tool",
          "tool_id": 9,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": false,
          "sort": 5
        },
        {
          "id": 6,
          "text": "+1",
          "textAna": "浪漫单车座驾+1",
          "type": "tool",
          "tool_id": 1,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": false,
          "sort": 6
        },
        {
          "id": 7,
          "text": "+1",
          "textAna": "幸运钥匙+1",
          "type": "luck_key",
          "tool_id": 0,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": 5,
          "sort": 7
        },
        {
          "id": 8,
          "text": "+1",
          "textAna": "靓号券+1",
          "type": "pretty_card",
          "tool_id": 0,
          "nums": 1,
          "icon": "tk_dj_5.png",
          "number": 10,
          "sort": 8
        }
      ],
      "awards": [  //抽奖返回奖励列表
        {
          "id": 3,
          "name": "元宝",
          "text": "+5万",
          "type": "property",
          "tool_id": "gamegold",
          "nums": 50000,
          "icon": "tk_dj_6.png"
        },
        {
          "id": 12,
          "name": "绿晶石",
          "text": "+35",
          "type": "tool",
          "tool_id": 2,
          "nums": 35,
          "icon": "tk_dj_1.png"
        },
        {
          "id": 12,
          "name": "绿晶石",
          "text": "主页特效+1天",
          "type": "costume",
          "tool_id": 2,
          "nums": 35,
          "icon": "tk_dj_16.png"
        },
        {
          "id": 12,
          "name": "绿晶石",
          "text": "头饰+1天",
          "type": "tool",
          "tool_id": 2,
          "nums": 35,
          "icon": "tk_dj_1.png"
        },
        {
          "id": 12,
          "name": "绿晶石",
          "text": "主页特效+1天",
          "type": "tool",
          "tool_id": 2,
          "nums": 35,
          "icon": "tk_dj_1.png"
        }
      ],
      toastlottieObj: null, //收集奖励弹窗的动画对象
      previous: 0, //时间戳记录
      timer11: null
    }
  },
  computed: {},
  watch: {
    //正常写法
    showFlag: {
      handler(newValue, oldValue) {
        if (!newValue) {
          setTimeout(() => {
            this.rotaryState = false
          }, 200);
        }
      }
    },
    showFlag3: {
      handler(newValue, oldValue) {
        if (!newValue) {
          setTimeout(() => {
            this.rotaryState = false
          }, 200);
        }
      }
    }
  },
  async created() {
    this.timer11 = setInterval(() => {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // 页面被挂起
          // console.log('hide')
        } else {
          // 页面呼出
          // 弹窗状态改变
          this.showFlag2 = false
          // 初始化数据
          this.init().then((res) => {
            console.log(res);
            this.is_sign_in = res.data.is_sign_in
            this.ticket_nums = res.data.ticket_nums
            this.is_locker = res.data.is_locker
            this.simple_lottery_list = res.data.simple_lottery_list
            this.simple_count = res.data.simple_count
            this.senior_lottery_list = res.data.senior_lottery_list
            this.sign_list = res.data.sign_list
            this.recharge_nums = res.data.recharge_nums
          });
        }
      })
    }, 200)
    this.showFlag2 = false
  },
  mounted() {
    // 初始化数据
    this.init().then((res) => {
      console.log(res);
      this.is_sign_in = res.data.is_sign_in
      this.ticket_nums = res.data.ticket_nums
      this.is_locker = res.data.is_locker
      this.simple_lottery_list = res.data.simple_lottery_list
      this.simple_count = res.data.simple_count
      this.senior_lottery_list = res.data.senior_lottery_list
      this.sign_list = res.data.sign_list
      this.recharge_nums = res.data.recharge_nums
      // 设置默认标签
      if (this.is_locker) {
        this.awardPowlFlag = 1
      } else {
        this.awardPowlFlag = 2
      }
      // 设置签到弹窗滑到最右边
      if (this.sign_list[this.sign_list.length - 1].status != 1) {
        this.$refs.Xlist.scrollLeft = this.$refs.Xlist.scrollWidth
      }
      // 首次签到需要弹框
      if (this.is_sign_in) {
        this.showFlag4 = true
      }
    });
    this.svgFun("lottie100", hmxh, "hmxh");
    // handleBrowserGoBack(() => {
    //   window.location.reload()
    // })
  },
  beforeDestroy() {
    // removeBrowserBackListener(() => {
    //   window.location.reload()
    // })
    clearInterval(this.timer11)
  },
  methods: {
    // 充值按钮
    recharge() {
      recharge()
      this.showFlag2 = false
    },
    // 展示lottie动画
    svgFun(location, animationData, type) {
      const params = {
        container: document.querySelectorAll("." + location)[0],
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
        assets: animationData.assets.forEach((item) => {
          item.u = "";
          if (item.w && item.h && !item.p.includes("/")) {
            item.p = `https://cdn-image.dandan818.com/activity/weekly/json/gardenParty/${type}/images/${item.p}`
          }
        })
      }
      return lottie.loadAnimation(params)
    },
    // 初始化数据方法
    init() {
      return new Promise((resolve, reject) => {
        getDepositRebateData({
          mark: "m4",
          type: "tab",
        }).then((res) => {
          if (res.errno != 0) {
            return this.$toast(res.errmsg)
          }
          if (res.errno == 0) {
            // 请求成功
            console.log(res)
          }
          resolve(res);
        });
      });
    },
    // 转动摩天轮
    rotate(mark) {
      if (mark == 1 && this.ticket_nums < 1) {
        this.showFlag2 = true
        return
      }
      if (mark == 2 && this.ticket_nums < 10) {
        this.showFlag2 = true
        return
      }
      if (this.wheelState) {
        console.log('手速太快了，稍后再试')
        return
      }
      this.wheelState = true
      getDepositRebateData({
        mark,
        type: "garden_party_senior_lottery",
      }).then((res) => {
        this.wheelState = false
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 摩天轮转动2.5秒
          this.rotaryState = true
          setTimeout(() => {
            if (this.rotaryState) {
              this.rotaryState = false
            }
          }, 2500);
          // 请求成功
          console.log(res)
          this.ticket_nums = res.data.ticket_nums
          this.awards = res.data.awards
          // this.temporaryList = res.data.awards
          let filterArr = this.awards
          setTimeout(() => {
            // this.showFlag = true
            if (this.awards.length > 2) {
              this.showFlag = true
              for (let i = 0; i < filterArr.length; i++) {
                // 如果类型为头像
                if (filterArr[i].type == 'mic') {
                  console.log(11111)
                  this.toastlottieObj = this.svgFun("lottie3", hmxh, "hmxh");
                }
              }
            } else {
              this.showFlag3 = true
              for (let i = 0; i < filterArr.length; i++) {
                // 如果类型为头像
                if (filterArr[i].type == 'mic') {
                  console.log(11111)
                  this.toastlottieObj = this.svgFun("lottie4", hmxh, "hmxh");
                }
              }
            }
          }, 800);

          // 刷新页面
          this.init().then((res) => {
            console.log(res);
            // 许愿池数据
            this.senior_lottery_list = res.data.senior_lottery_list
          });
        }
      });
    },
    // 装备
    equip(id, type) {
      if (this.showFlag) {
        this.showFlag = false
      }
      if (this.showFlag3) {
        this.showFlag3 = false
      }
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300);
      }
      equipNow({
        id,
        type,
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          console.log(res)
          Toast(res.errmsg)
        }
      });
    },
    iknow() {
      this.showFlag = false
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300);
      }
    },
    // 关闭弹窗
    close() {
      this.showFlag = false
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300);
      }
    },
    close1() {
      this.showFlag3 = false
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300);
      }
    },
    close2() {
      this.showFlag4 = false
    },
    // 关闭弹窗
    cancel() {
      this.showFlag2 = false
      if (this.toastlottieObj) {
        setTimeout(() => {
          this.toastlottieObj.destroy()
        }, 300);
      }
    },
    // 节流许愿
    throttlewish(mark) {
      if ((new Date() - this.previous) > 1000) {
        this.wish(mark)
        this.previous = new Date()
      } else {
        Toast('手速太快了')
        return
      }
    },
    // 许愿
    wish(mark) {
      if (mark == 1 && this.ticket_nums < 1) {
        this.showFlag2 = true
        return
      }
      if (mark == 2 && this.ticket_nums < 5) {
        this.showFlag2 = true
        return
      }
      getDepositRebateData({
        mark,
        type: "garden_party_comm_lottery",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          this.ticket_nums = res.data.ticket_nums
          this.is_locker = res.data.is_locker
          this.simple_count = res.data.simple_count
          this.awards = res.data.awards
          console.log(res)
          // this.showFlag = true
          if (this.awards.length > 2) {
            this.showFlag = true
          } else {
            this.showFlag3 = true
          }
          // 刷新页面
          this.init().then((res) => {
            console.log(res);
            // 许愿池数据
            this.simple_lottery_list = res.data.simple_lottery_list
          });
        }
      });
    },
    // 切换奖池
    changeAwardPowl(i) {
      // if (!this.is_locker) {
      this.awardPowlFlag = i
      // }
    },
  }
}
</script>

<style scoped lang="scss">
.container4 {
  display: flex;
  flex-direction: column;
  align-items: center;

  // 五日签到样式
  .fiveDaySignIn {
    width: 360px;
    border: 5px solid #D4EBA4;
    border-radius: 50px 50px 0px 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    ::-webkit-scrollbar {
      width: 0 !important;
    }

    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }

    ::-webkit-scrollbar {
      display: none;
      width: 0;
    }



    .inner {
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #FBFFF5, #FCFFF5);
      border-radius: 46px 46px 0px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .pinkTitle {
        width: 272px;
        height: 62px;
        margin-top: -22px;
        background-image: url('../../assets/mk4_1.png');
        background-size: 100% 100%;
      }

      .signArea {
        width: max-content;
        width: 100%;
        background: #E7F7D0;
        margin-top: 8px;
        display: flex;
        align-items: center;
        overflow-x: scroll;
        overflow-y: hidden;

        .signItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 4px;


          .award {
            width: 69px;
            height: 87px;
            background: linear-gradient(0deg, #FFFFFF, #FFFDCF);
            border: 2px solid #6BC2A2;
            border-radius: 10px;
            margin-top: 9px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            img {
              width: 55px;
              height: 44px;
              margin-top: 10px;
            }

            .num {
              position: absolute;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #4C9C8F;
              top: 51px;
              right: 5px;
            }

            .bottom {
              width: 100%;
              height: 21px;
              background: linear-gradient(-90deg, #57B8AE, #8BDC83);
              border-radius: 0px 0px 10px 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              margin-top: auto;
              margin-bottom: 0;
            }

            .overlay11 {
              position: absolute;
              width: 69px;
              height: 87px;
              background: rgba($color: #000000, $alpha: 0.6);
              opacity: 1;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 64px;
                height: 63px;
                margin-top: 0;
                z-index: 99;
              }
            }
          }

          .btn {
            width: 60px;
            height: 30px;
            background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
            border-radius: 15px;
            margin-top: 7px;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }

          .notSign {
            background: none;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #26957C;
          }
        }

        .signItem:first-child {
          margin-left: 7px;
        }

        .signItem:last-child {
          margin-right: 7px;
        }
      }

      .textcontainer {
        .ruleKText {
          display: flex;
          align-items: flex-start;
          margin-top: 11px;

          P {
            margin-right: 10px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #0E6946;
          }

          .circle {
            flex-shrink: 0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 3px;
            margin-left: 10px;
            margin-right: 9px;
            background-color: #FF9FD5;
          }
        }

        .ruleKText:first-child {
          margin-top: 18px;
        }

        .ruleKText:last-child {
          margin-bottom: 18px;
        }
      }
    }
  }

  // 许愿池摩天轮标题样式
  .awardPowlTitle {
    width: 275px;
    height: 53px;
    background: linear-gradient(180deg, #206760, #3B897C);
    border: 3px solid #4AAC9C;
    border-radius: 27px;
    margin-top: 30px;
    position: relative;
    display: flex;
    align-items: center;

    .leftimg,
    .rightimg {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .left,
    .right {
      width: 75px;
      height: 23px;
    }

    .wishWell,
    .skywheel {
      position: absolute;
      width: 145px;
      height: 70px;
      left: -5px;
      top: 44%;
      transform: translateY(-50%);
      background-image: url('../../assets/mk4_6.png');
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 71px;
        height: 22px;
        margin-top: 4px;
      }
    }

    .skywheel {
      right: -5px;
      left: auto;
    }

    .highTips {
      position: absolute;
      width: 71px;
      height: 30px;
      top: -14px;
      right: -27px;
    }
  }

  // 许愿池样式
  .awardPowl {
    width: 375px;
    height: 630px;
    background-image: url('../../assets/mk4_10.png');
    background-size: 100% 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .pLine {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 60px;

      .awardTicketP {
        width: 171px;
        height: 24px;
        background: #338D7B;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 33px;

        img {
          width: 22px;
          height: 18px;
          margin: 0 5px;
        }
      }

      .awardTicketP2 {
        width: 125px;
        height: 24px;
        background: #338D7B;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 11px;
        display: flex;
        align-items: center;
        justify-content: center;

        .special {
          color: #FFFAA6;
          line-height: 11px;
        }
      }
    }



    .awards {
      width: 327px;
      margin: 0 24px;
      margin-top: 20px;

      .awardItem {
        width: 76px;
        height: 76px;
        background: linear-gradient(0deg, #FFFFFF, #E3FFFC);
        border-radius: 10px;
        border: 2px solid #3590AE;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .nums {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 25px;
          height: 15px;
          background: #338D7B;
          border-radius: 0px 8px 0px 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 11px;
        }

        .icon {
          width: 44px;
          height: 41px;
          margin-top: 15px;
        }

        .bottomnums {
          margin-top: 4px;
          width: 40px;
          height: 14px;
          background: #D0F4F5;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #327B6C;
          line-height: 11px;
        }

        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba($color: #23493B, $alpha: 0.6);
          opacity: 1;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 64px;
            height: 63px;
          }
        }
      }

      .top {
        width: 327px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 3px;
      }

      .center {
        height: 163px;
        margin-bottom: 3px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bigCycle {
          width: 145px;
          height: 115px;
          background: linear-gradient(0deg, #FFFFFF, #FFF8C9);
          border: 2px solid #FFFFFF;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          .icon {
            width: 100px;
            height: 82px;
            margin-top: 7px;
          }

          .bottomnums {
            margin-top: 8px;
            width: 80px;
            height: 14px;
            background: #D0F4F5;
            border-radius: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #327B6C;
            line-height: 11px;
          }

          .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba($color: #23493B, $alpha: 0.6);
            opacity: 1;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 64px;
              height: 63px;
            }
          }
        }

        .right {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }

      .bottom {
        width: 327px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 3px;
      }
    }

    .bottomBtn {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .leftbtn,
      .rightbtn {
        width: 150px;
        height: 55px;
        background: linear-gradient(0deg, #FF7FCA, #FFDBF2);
        border: 2px solid #FFFFFF;
        border-radius: 28px;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
          font-size: 17px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 11px;
          margin-top: 11px;
        }

        .bottom {
          display: flex;
          align-items: center;
          margin-top: 7px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 11px;

          img {
            width: 22px;
            height: 18px;
            margin: 0 5px;
          }
        }
      }

      .rightbtn {
        width: 150px;
        height: 55px;
        background: linear-gradient(0deg, #F69421, #FFE96D);
        border: 2px solid #FFFFFF;
        border-radius: 28px;
        margin-right: 0;
      }

      .grey {
        background: linear-gradient(0deg, #9D9D9D, #CFCFCF);
      }
    }

    .congratulationTit {
      margin-top: 26px;
      width: 180px;
      height: 68px;
    }
  }

  // 摩天轮样式
  .ferrisWheel {
    width: 375px;
    height: 623px;
    overflow-x: hidden;
    background-image: url('../../assets/mk4_26.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    // 拥有抽奖券标题样式
    .pLine {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 60px;

      .awardTicketP {
        width: 171px;
        height: 24px;
        background: #5263CE;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 33px;

        img {
          width: 22px;
          height: 18px;
          margin: 0 5px;
        }
      }

      .awardTicketP2 {
        width: 125px;
        height: 24px;
        background: #5263CE;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 11px;
        display: flex;
        align-items: center;
        justify-content: center;

        .special {
          color: #FFFAA6;
          line-height: 11px;
        }
      }
    }

    // 摩天轮样式
    .ferrisWheelCenter {
      width: 366px;
      height: 366px;
      margin-top: 34px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      // 定义转动动画
      @keyframes myRotate {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes reverseRotate {
        0% {
          transform: rotate(360deg);
        }

        100% {
          transform: rotate(0);
        }
      }

      // 摩天轮旋转容器
      .barContainer {
        position: absolute;
        top: 69px;
        width: 236px;
        height: 236px;
        z-index: 1;
        display: flex;
        justify-content: center;

        // 摩天轮轮轴样式
        .bar {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        // 摩天轮中间星星样式
        .star {
          position: absolute;
          z-index: 3;
          width: 66px;
          height: 63px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .centerlock {
          position: absolute;
          z-index: 3;
          width: 119px;
          height: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        // 摩天轮小电视机样式
        .char {
          position: absolute;
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          // border: 1px solid red;

          .charimg {
            width: 105px;
            height: 94px;
            background-image: url('../../assets/mk4_21.png');
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;

            .awardimg {
              width: 50px;
              height: 50px;
              margin-top: 28px;
            }

            .lottie100 {
              margin-top: 27px;
              width: 48px;
              height: 48px;
            }

            .limitTip {
              position: absolute;
              top: 20px;
              right: 6px;
              width: 58px;
              height: 23px;
              background-image: url('../../assets/mk4_18.png');
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              font-size: 11px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              line-height: 11px;
              z-index: 99;

              span {
                margin-top: 5px;
              }
            }

            .overlay2 {
              position: absolute;
              top: 28px;
              width: 78px;
              height: 50px;
              background: #000;
              opacity: 0.6;
              border-radius: 20px 20px 10px 10px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 50px;
                height: 50px;
              }
            }
          }

          p {
            width: 75px;
            height: 18px;
            background: #EF9C55;
            border: 3px solid #FCDE82;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FEFEFF;
            margin-top: -16px;
            white-space: nowrap;
            z-index: 99;
          }

          .costume {
            width: 85px;
          }
        }

        .retateChar {
          animation: reverseRotate 2.5s linear infinite;
        }

        .char1 {
          top: -67px;
        }

        .char2 {
          top: -28px;
          right: -33px;
        }

        .char3 {
          top: 65px;
          right: -72px;
        }

        .char4 {
          bottom: -28px;
          right: -33px;
        }

        .char5 {
          bottom: -67px;
        }

        .char6 {
          left: -33px;
          bottom: -28px;
        }

        .char7 {
          top: 65px;
          left: -72px;
        }

        .char8 {
          top: -28px;
          left: -33px;
        }
      }

      .rotaryState {
        animation: myRotate 2.5s linear infinite;
      }

      // 摩天轮支架样式
      .bottomChar {
        width: 100%;
      }
    }

    // 底部按钮样式
    .bottomBtn {
      display: flex;
      align-items: center;
      margin-top: 20px;
      z-index: 2;

      .leftbtn,
      .rightbtn {
        width: 150px;
        height: 55px;
        background: linear-gradient(0deg, #FF7FCA, #FFDBF2);
        border: 2px solid #FFFFFF;
        border-radius: 28px;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
          font-size: 17px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 11px;
          margin-top: 11px;
        }

        .bottom {
          display: flex;
          align-items: center;
          margin-top: 7px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 11px;

          img {
            width: 22px;
            height: 18px;
            margin: 0 5px;
          }
        }
      }

      .rightbtn {
        width: 150px;
        height: 55px;
        background: linear-gradient(0deg, #F69421, #FFE96D);
        border: 2px solid #FFFFFF;
        border-radius: 28px;
        margin-right: 0;
      }
    }

    // . <div class="lock">
    //     <div class="btn4"></div>
    //     <div class="greentip">清空许愿池奖励即可解锁</div>
    //   </div>
    .lock {
      margin-top: 31px;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 99;

      .btn4 {
        width: 150px;
        height: 55px;
        background: linear-gradient(0deg, #9D9D9D, #CFCFCF);
        border: 2px solid #FFFFFF;
        border-radius: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 11px;
      }

      .greentip {
        margin-top: 3px;
        width: 303px;
        height: 31px;
        background: linear-gradient(90deg, rgba(98, 163, 95, 0), rgba(98, 163, 95, 0.99), rgba(98, 163, 95, 0));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 11px;
      }
    }
  }

  // 弹窗样式
  .commToast {
    .inCommToast {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 284px;
      background: linear-gradient(180deg, #9ED57E, #57B8AE);
      border: 4px solid #FFFFFF;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        width: 240px;
        height: 46px;
        position: absolute;
        transform: translateY(-50%);
      }

      .awardContainer {
        width: 300px;
        height: 180px;
        margin-top: 36px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        .awardItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 8px;
          position: relative;


          .img {
            width: 60px;
            height: 60px;
            // box-sizing: border-box;
            background: #FEFAEF;
            border: 2px solid #32A389;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 50px;
              height: 50px;
            }

            .lottie3 {
              width: 56px;
              height: 56px;
              box-sizing: border-box;
              background: #FEFAEF;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          p {
            position: absolute;
            height: 12px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            bottom: -20px;
            white-space: nowrap;
            line-height: 12px;
            // max-width: 50px;
            // letter-spacing: -1px;
          }

          .costume {
            height: 12px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            white-space: nowrap;
          }
        }

        .awardItem:nth-child(4n+1) {
          margin-left: 11px;
        }
      }

      .center {
        justify-content: center;
        margin-top: 36px;
        align-items: center;

        .awardItem:nth-child(4n+1) {
          margin-left: 0;
        }
      }

      .btn {
        margin-top: auto;
        margin-bottom: 23px;
        width: 160px;
        height: 36px;
        background: linear-gradient(0deg, #F69421, #FFE96D);
        border: 1px solid #FFFFFF;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }

  .commToast2 {
    .inCommToast {
      position: fixed;
      top: 277px;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 210px;
      height: 120px;
      background: linear-gradient(180deg, #9ED57E, #57B8AE);
      border: 4px solid #FFFFFF;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 32px;
      }

      .btns {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn1 {
          width: 86px;
          height: 36px;
          background: linear-gradient(0deg, #FBFFC1, #FFFFFF);
          border: 1px solid #FFFFFF;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #B28D2B;
          margin-right: 14px;
        }

        .btn2 {
          width: 86px;
          height: 36px;
          background: linear-gradient(0deg, #F69421, #FFE96D);
          border: 1px solid #FFFFFF;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  }

  .commToast3 {
    .inCommToast {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 240px;
      height: 230px;
      background: linear-gradient(180deg, #9ED57E, #57B8AE);
      border: 4px solid #FFFFFF;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        width: 240px;
        height: 46px;
        position: absolute;
        transform: translateY(-50%);
      }

      .awardContainer {
        margin-top: 56px;
        width: 240;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .awardItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 13px;
          position: relative;


          .img {
            width: 60px;
            height: 60px;
            box-sizing: border-box;
            background: #FEFAEF;
            border: 2px solid #32A389;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 50px;
              height: 50px;
            }

            .lottie4 {
              width: 56px;
              height: 56px;
              box-sizing: border-box;
              background: #FEFAEF;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          p {
            height: 12px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            bottom: -20px;
            position: absolute;
            white-space: nowrap;
          }

          .costume {
            width: 75px;
            height: 12px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            white-space: nowrap;
            // transform: scale(0.75);
          }
        }
      }

      .center {
        justify-content: center;
      }

      .btn {
        margin-top: auto;
        margin-bottom: 23px;
        width: 160px;
        height: 36px;
        background: linear-gradient(0deg, #F69421, #FFE96D);
        border: 1px solid #FFFFFF;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }

    .inCommToast1 {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 240px;
      height: 230px;
      background: linear-gradient(180deg, #9ED57E, #57B8AE);
      border: 4px solid #FFFFFF;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        width: 240px;
        height: 46px;
        position: absolute;
        transform: translateY(-50%);
      }

      .img {
        margin-top: 56px;
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 52px;
          height: 43px;
        }
      }

      p {
        height: 12px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 8px;
      }

      .btn {
        margin-top: auto;
        margin-bottom: 23px;
        width: 160px;
        height: 36px;
        background: linear-gradient(0deg, #F69421, #FFE96D);
        border: 1px solid #FFFFFF;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
}
</style>
