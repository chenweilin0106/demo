<template>
  <div class="container5">
    <!-- 立即抽奖 -->
    <div class="outComm">
      <div class="inComm">
        <div class="awardPool">
          <div v-for="(item, index) in awards1" :key="index" :class="{
            centerAwardItem: index == 4,
            awardItem: index != 4
          }">
            <img :src="require('../../assets/' + item.awards.icon)" alt="" v-if="index != 4">
            <div class="tit" v-if="index != 4">{{ item.awards.text }}</div>
            <img src="../../assets/mk5_9.png" v-show="selectFlag == (index + 1) && index != 4" alt="" class="selected">
            <div v-if="index == 4" class="residueTit">剩余抽奖次数</div>
            <div v-if="index == 4" class="residue">{{ lottery_ticket }}</div>
          </div>
        </div>
        <div class="hasconsum">已消费：{{ consume }}钻</div>
        <div class="label">
          <div class="dark" @click="() => { drawTimes = 1 }">抽一次
            <div class="pointer" v-show="drawTimes == 1"> <span>抽一次</span> </div>
          </div>
          <div class="dark" @click="() => { drawTimes = 10 }">抽十次
            <div class="pointer" v-show="drawTimes == 10"><span>抽十次</span> </div>
          </div>
          <div class="dark" @click="() => { drawTimes = 100 }">抽百次
            <div class="pointer" v-show="drawTimes == 100"><span>抽百次</span> </div>
          </div>
          <!-- <img class="pointer" src="../../assets/mk5_10.png" alt=""> -->
        </div>
        <div class="drawBtn" @click="drawNow(drawTimes)">
        </div>
        <div class="textcontainer">
          <div class="ruleKText">
            <p class="circle"></p>
            <p>活动期间<span class="special">每消费200钻石</span>可得一次抽奖机会</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p> 抽奖获得的礼物道具魅力加成同钻石礼物，使用可
              触发特效</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p> 求婚时选择规模和信物的消费不计算在内</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 兑换大奖 -->
    <div class="outComm exchange">
      <div class="inComm">
        <img src="../../assets/title_4.png" class="titleImg" alt="">
        <p class="awardTicketP">
          我的礼券
          <img src="../../assets/mk5_12.png" />
          ：<span>{{ gift_ticket }}</span>
        </p>
        <p class="readme">每抽一次可得1张<img src="../../assets/mk5_12.png" /> ，<span class="special">每100张</span> <img
            src="../../assets/mk5_12.png" /> 可兑换一份大奖</p>
        <div class="titlecontainer">
          <div class="toppart">
            <div class="titleItem" v-for="(item, index) in title_pool" :key="index">
              <div class="imgcontainer">
                <img :src="gifList[index]" alt="" class="gif" v-if="index < 8">
                <img src="../../assets/tk_dj_1.png" class="normal" alt="" v-else>
                <div class="forever" v-if="index < 8">永久称号</div>
                <div class="forever" v-else>绿晶石+500</div>
              </div>
              <div class="hasTitle" v-if="item.is_owned || item.status == 1">已拥有</div>
              <div class="hasTitle" v-if="!item.limit">不限兑换次数</div>
              <div class="hasTitle" v-if="item.limit && !item.status == 1 && !item.is_owned">限兑: 0/1</div>
              <!-- 灰显已兑换 -->
              <div class="titleBtn grey" v-if="item.status == 1">已兑换</div>
              <!-- 灰显兑换 -->
              <div class="titleBtn grey" v-if="item.status == 0 && item.is_owned">兑换</div>
              <!-- 兑换 -->
              <div class="titleBtn" v-if="item.status == 0 && !item.is_owned" @click="exchange(item.id)">兑换</div>
            </div>
          </div>
          <div class="colletTit">
            <div class="line"></div>
            <div class="tit">收集奖励</div>
            <div class="line line2"></div>
          </div>
          <p class="yellowP">收集返场称号达到指定数量可获得收集奖励</p>
          <div class="colletAward">
            <div class="collectAwardItem" v-for="(item, index) in collect_awards" :key="index">
              <div class="img">
                <div class="lottie" v-if="index == 2"></div>
                <img src="../../assets/zyp_czwy.jpg" alt="" v-else>
              </div>
              <div class="tit">{{ item.text }}</div>
              <div class="progress">{{ item.finish_nums }} /{{ item.max_nums }}</div>
              <div class="btn" :class="'btn' + item.has_right" v-if="item.has_right == 0">未完成</div>
              <div class="btn" :class="'btn' + item.has_right" v-if="item.has_right == 1" @click="getCollet(item.key)">领取
              </div>
              <div class="btn" :class="'btn' + item.has_right" v-if="item.has_right == 2">已领取</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 兑换奖励 -->
    <van-overlay z-index="2023" class="commToast" :show="showFlag1" @click="close(1)">
      <div class="inCommToast" @click.stop>
        <!-- 兑换奖励 -->
        <img src="../../assets/tk_2.png" class="header" />
        <p class="p1">剩余礼券 <img src="../../assets/mk5_12.png" alt=""> ：{{ gift_ticket }}</p>
        <div class="img2" v-if="goods_info.id != 9">
          <img :src="gifList[findid(title_pool, goods_info.id)]" alt="">
        </div>
        <img src="../../assets/mk5_4.png" alt="" v-if="goods_info.id == 9" class="img3">
        <p class="p2" v-if="goods_info.id == 9">绿晶石+500</p>
        <p class="p2" v-if="goods_info.id != 9">永久称号</p>
        <p class="p3">消耗<img src="../../assets/mk5_12.png" alt=""> ：100</p>
        <div class="btns" v-if="goods_info.id != 9">
          <div class="leftbtn" @click="toastExchange(goods_info.id)">兑换</div>
          <div class="rightbtn" @click="wear(goods_info.id)">兑换并佩戴</div>
          <!-- <div v-if="gift_ticket < 100" class="rightbtn grey" @click="wear(goods_info.id)">兑换并佩戴</div> -->
        </div>
        <div v-if="goods_info.id == 9" class="oneBtn" @click="toastExchange(goods_info.id)">兑换</div>
      </div>
    </van-overlay>
    <!-- 恭喜获得 -->
    <van-overlay z-index="2023" class="commToast2" :show="showFlag2" @click="close(2)">
      <div class="inCommToast" @click.stop>
        <img src="../../assets/tk_1.png" class="header" />
        <div class="awardContainer" :class="{
          center: awards.length < 4
        }">
          <div class="awardItem" v-for="(item, index) in awards" :key="index">
            <div class="img">
              <img :src="require('../../assets/' + item.awards.icon)" alt="">
            </div>
            <p>+{{ item.awards.nums }}</p>
          </div>
        </div>
        <div class="btn" @click="close(2)">我知道了</div>
      </div>
    </van-overlay>
    <!-- 恭喜获得小窗口(单次抽奖窗口) -->
    <van-overlay z-index="2023" class="commToast2" :show="showFlag4" @click="close(4)">
      <div class="inCommToast1" @click.stop>
        <img src="../../assets/tk_1.png" class="header" />
        <div class="awardContainer" :class="awards.length >= 2 ? 'more' : ''">
          <div class="awardItem" v-for="(item, index) in awards" :key="index">
            <div class="img">
              <img :src="require('../../assets/' + item.awards.icon)" alt="">
            </div>
            <p>+{{ item.awards.nums }}</p>
          </div>
        </div>
        <div class="btn" @click="close(4)">我知道了</div>
      </div>
    </van-overlay>
    <!-- 恭喜获得小窗口 -->
    <van-overlay z-index="2023" class="commToast2" :show="showFlag3" @click="close(3)">
      <div class="inCommToast1" @click.stop>
        <img src="../../assets/tk_1.png" class="header" />
        <div class="img2" v-if="award.type != 'mic'">
          <img :src="require('../../assets/zyp_czwy.jpg')" alt="">
        </div>
        <div class="img1" v-else>
          <div class="lottie2"></div>
        </div>
        <p>{{ award.text }}</p>
        <div class="btn" @click="equipNow(award.id, award.type)">立即装扮</div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { _throttle } from '../../utils/ThrottleAndDebounce'
// 充值方法导入
import { Toast } from 'vant'
// 导入请求
import { getDepositRebateData } from "../../api/depositRebate";
import { equipNow } from "../../api/equipNow";
// 引入lottie
import lottie from "lottie-web";
import zytc from "../../assets/lottie/zytc/data.json";
export default {
  // 奖励兑换
  name: 'titleBack',
  components: {

  },
  props: {},
  data() {
    return {
      gifList: [
        require('../../assets/gif/ic_ch_fyrw.gif'),
        require('../../assets/gif/ic_ch_jsws.gif'),
        require('../../assets/gif/ic_ch_gcmj.gif'),
        require('../../assets/gif/ic_ch_mlox.gif'),
        require('../../assets/gif/ic_ch_hblq.gif'),
        require('../../assets/gif/ic_ch_htygy.gif'),
        require('../../assets/gif/ic_ch_fhzm.gif'),
        require('../../assets/gif/ic_ch_zrbf_1.gif'),
      ],
      showFlag4: false,
      showFlag3: false,
      showFlag2: false,
      showFlag1: false,//弹窗Flag 控制弹窗显示隐藏
      drawTimes: 1,//抽奖次数
      drawState: false,//抽奖状态 true-抽奖中 false-未抽奖
      selectFlag: null,//当前抽奖奖池闪烁的item
      "lottery_ticket": 0, // 抽奖次数
      "gift_ticket": 0, // 礼券数量
      "consume": 0, // 已消费
      "title_pool": [
        {
          "id": 1, // 商品id 兑换时mark值
          awards: { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_fyrw.gif'),
            "name": "风云人物"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": true, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        },
        {
          "id": 1, // 商品id 兑换时mark值
          awards: { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_jsws.gif'),
            "name": "举世无双"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": true, // 是否已拥有 true-已拥有 false-未拥有
          "status": 1, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_gcmj.gif'),
            "name": "功成名就"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_mlox.gif'),
            "name": "魅力偶像"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_hblq.gif'),
            "name": "壕不留情"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_htygy.gif'),
            "name": "花它一个亿"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_fhzm.gif'),
            "name": "风华正茂"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_zrbf_1.gif'),
            "name": "卓尔不凡"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }, {
          "id": 1, // 商品id 兑换时mark值
          "awards": { // 商品内容
            "type": "title",
            "id": 4757,
            "nums": false, // 数量 false为永久
            "icon": require('../../assets/gif/ic_ch_zrbf_1.gif'),
            "name": "风云人物"
          },
          "limit": 1, // 兑换次数限制 false为无限制
          "id_advance": true, // 是否为进阶称号
          "is_owned": false, // 是否已拥有 true-已拥有 false-未拥有
          "status": 0, // 兑换状态 1-已兑换 0-未兑换
          "is_lock": false
        }
        // ...
      ],
      "collect_awards": [ //收集奖励列表
        {
          "key": 1, //用于领取该奖励时mark传值
          "name": "春之物语",
          "type": "costume",
          "id": "",
          icon: require('../../assets/zyp_czwy.jpg'),
          "nums": 3,
          "text": "主页特效+3天",
          "max_nums": 3,
          "finish_nums": 0,
          "has_right": 0
        },
        {
          "key": 2,
          "name": "春之物语",
          "type": "costume",
          "id": "",
          icon: require('../../assets/zyp_czwy.jpg'),
          "nums": 7,
          "text": "主页特效+7天",
          "max_nums": 6,
          "finish_nums": 0,
          "has_right": 0
        },
        {
          "key": 3,
          "name": "纸鸢探春",
          "type": "mic",
          "id": "",
          icon: require('../../assets/zyp_czwy.jpg'),
          "nums": 15,
          "text": "头饰+15天",
          "max_nums": 8,
          "finish_nums": 0,
          "has_right": 0
        }
      ],
      "awards": [  //抽奖内容
        {
          "id": 2,
          "awards": {
            "type": "tool",
            "tool_id": 1,
            "nums": 1,
            "icon": "mk5_1.png",
            "text": "防爆石+1",
            "name": "防爆石"
          },
          "weight": 8
        },
        {
          "id": 6,
          "awards": {
            "type": "tool",
            "tool_id": 45,
            "nums": 1,
            "icon": "mk5_2.png",
            "text": "紫晶石+1",
            "name": "紫晶石"
          },
          "weight": 5
        },
        {
          "id": 3,
          "awards": {
            "type": "tool",
            "tool_id": 23,
            "nums": 1,
            "icon": "mk5_3.png",
            "text": "千纸鹤+1",
            "name": "千纸鹤"
          },
          "weight": 10
        },
        {
          "id": 3,
          "awards": {
            "type": "tool",
            "tool_id": 23,
            "nums": 1,
            "icon": "mk5_4.png",
            "text": "绿晶石+5",
            "name": "绿晶石"
          },
          "weight": 10
        },
        {
          "id": 2,
          "awards": {
            "type": "tool",
            "tool_id": 23,
            "nums": 1,
            "icon": "mk5_4.png",
            "text": "绿晶石+5",
            "name": "绿晶石"
          },
          "weight": 8
        },
        // {
        //   "id": 3,
        //   "awards": {
        //     "type": "tool",
        //     "tool_id": 23,
        //     "nums": 1,
        //     "icon": "mk5_4.png",
        //     "text": "绿晶石+3",
        //     "name": "绿晶石"
        //   },
        //   "weight": 10
        // },
        // {
        //   "id": 8,
        //   "awards": {
        //     "type": "tool",
        //     "tool_id": 19,
        //     "nums": 5,
        //     "icon": "mk5_5.png",
        //     "text": "比心+1",
        //     "name": "比心"
        //   },
        //   "weight": 5
        // },
        // {
        //   "id": 4,
        //   "awards": {
        //     "type": "tool",
        //     "tool_id": 2,
        //     "nums": 5,
        //     "icon": "mk5_6.png",
        //     "text": "棒棒糖+1",
        //     "name": "棒棒糖"
        //   },
        //   "weight": 5
        // },
        // {
        //   "id": 4,
        //   "awards": {
        //     "type": "tool",
        //     "tool_id": 2,
        //     "nums": 5,
        //     "icon": "mk5_7.png",
        //     "text": "玫瑰+5",
        //     "name": "玫瑰"
        //   },
        //   "weight": 5
        // }
      ],
      "awards1": [  //抽奖内容
        {
          "id": 2,
          "awards": {
            "type": "tool",
            "tool_id": 1,
            "nums": 1,
            "icon": "mk5_1.png",
            "text": "防爆石+1",
            "name": "防爆石"
          },
          "weight": 8
        },
        {
          "id": 6,
          "awards": {
            "type": "tool",
            "tool_id": 45,
            "nums": 1,
            "icon": "mk5_2.png",
            "text": "紫晶石+1",
            "name": "紫晶石"
          },
          "weight": 5
        },
        {
          "id": 3,
          "awards": {
            "type": "tool",
            "tool_id": 23,
            "nums": 1,
            "icon": "mk5_3.png",
            "text": "千纸鹤+1",
            "name": "千纸鹤"
          },
          "weight": 10
        },
        {
          "id": 3,
          "awards": {
            "type": "tool",
            "tool_id": 23,
            "nums": 1,
            "icon": "mk5_4.png",
            "text": "绿晶石+5",
            "name": "绿晶石"
          },
          "weight": 10
        },
        {
          "id": 2,
          "awards": {

          },
          "weight": 8
        },
        {
          "id": 3,
          "awards": {
            "type": "tool",
            "tool_id": 23,
            "nums": 1,
            "icon": "mk5_4.png",
            "text": "绿晶石+3",
            "name": "绿晶石"
          },
          "weight": 10
        },
        {
          "id": 8,
          "awards": {
            "type": "tool",
            "tool_id": 19,
            "nums": 5,
            "icon": "mk5_5.png",
            "text": "比心+1",
            "name": "比心"
          },
          "weight": 5
        },
        {
          "id": 4,
          "awards": {
            "type": "tool",
            "tool_id": 2,
            "nums": 5,
            "icon": "mk5_6.png",
            "text": "棒棒糖+1",
            "name": "棒棒糖"
          },
          "weight": 5
        },
        {
          "id": 4,
          "awards": {
            "type": "tool",
            "tool_id": 2,
            "nums": 5,
            "icon": "mk5_7.png",
            "text": "玫瑰+5",
            "name": "玫瑰"
          },
          "weight": 5
        }
      ],
      horseTimer: null, //跑马灯定时器
      "goods_info": { //商品详情
        "id": 1, //商品id
        "awards": { //称号详情
          "type": "title",
          "tool_id": 4731,
          "nums": false,
          "icon": "",
          "name": "风云人物",
          "text": "永久称号"
        },
        "limit": 1,
        "is_advance": false,
        "is_lock": true
      },
      "award": { //奖励内容，用于弹框数据展示
        "name": "甜蜜暴击",
        "type": "mic",
        "id": 10,
        "icon": "mk5_2.png",
        "nums": 7,
        "text": "头饰+15天"
      },
      toastlottieObj: null, //收集奖励弹窗的动画对象
    }
  },
  computed: {},
  watch: {},
  async created() {

  },
  mounted() {
    // 初始化数据
    this.init().then((res) => {
      console.log(res);
    });
    this.svgFun("lottie", zytc, "zytc");
    // if (this.awards.length > 2) {
    //   this.showFlag2 = true
    // } else {
    //   this.showFlag4 = true
    // }
  },
  beforeDestroy() {
    clearInterval(this.horseTimer)
  },
  methods: {
    // 立即装扮
    equipNow(id, type) {
      equipNow({
        id, type
      }).then((res) => {
        console.log(res)
        this.close(3)
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
    // 查询id
    findid(arr, id) {
      return arr.findIndex(item => item.id == id);
    },
    // 兑换并佩戴
    wear(mark) {
      console.log(mark)
      if (this.gift_ticket < 100) {
        Toast('礼券不足')
        this.showFlag1 = false
        return
      }
      // 请求兑换并佩戴接口
      getDepositRebateData({
        mark,
        type: "title_convert_equip",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          console.log(res)
          Toast(res.errmsg)
          this.showFlag1 = false
          // 初始化数据 
          this.init().then((res) => {
            console.log(res);
          });
        }
      });
    },
    // 关闭弹窗
    close(i) {
      this["showFlag" + i] = false;
      if (i == 3) {
        if (this.toastlottieObj) {
          setTimeout(() => {
            this.toastlottieObj.destroy()
          }, 300);
        }
      }
    },
    //立即抽奖
    drawNow(mark) {
      if (this.drawState) {
        return
      } {
        console.log('抽奖' + mark + '次')
        // 拦截快速点击
        this.drawState = true
        getDepositRebateData({
          mark,
          type: "title_lottery_multi",
        }).then((res) => {
          console.log(res)
          if (res.errno != 0) {
            this.drawState = false
            return this.$toast(res.errmsg)
          }
          if (res.errno == 0) {
            // 请求成功
            console.log(res)
            this.awards = res.data.awards
            this.gift_ticket = res.data.gift_ticket
            this.lottery_ticket = res.data.lottery_ticket
            this.horselight(80)
          }
        });
      }
    },
    // 抽奖跑马灯
    horselight(speed) {
      clearInterval(this.horseTimer)
      let nums = 0
      this.selectFlag = 1
      this.horseTimer = setInterval(() => {
        switch (this.selectFlag) {
          case 1:
            this.selectFlag++
            break;
          case 2:
            this.selectFlag++
            break;
          case 3:
            this.selectFlag = 6
            break;
          case 4:
            if (nums >= 1) {
              this.selectFlag = null
              clearInterval(this.horseTimer)
              this.drawState = false
              if (this.awards.length > 2) {
                this.showFlag2 = true
              } else {
                this.showFlag4 = true
              }
            } else {
              nums = nums + 1
              this.selectFlag = 1
            }
            break;
          case 6:
            this.selectFlag = 9
            break;
          case 7:
            this.selectFlag = 4
            break;
          case 8:
            this.selectFlag = 7
            break;
          case 9:
            this.selectFlag = 8
            break;
          default:
            break;
        }
      }, speed);
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
            // item.p = require('../../assets/lottie/zytc/images/' + item.p)
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
          mark: "m5",
          type: "tab",
        }).then((res) => {
          if (res.errno != 0) {
            return this.$toast(res.errmsg)
          }
          if (res.errno == 0) {
            // 请求成功
            console.log(res)
            this.lottery_ticket = res.data.lottery_ticket
            this.gift_ticket = res.data.gift_ticket
            this.consume = res.data.consume
            this.title_pool = res.data.title_pool
            this.collect_awards = res.data.collect_awards
          }
          resolve(res);
        });
      });
    },
    // 兑换获取称号详情弹窗
    exchange(mark) {
      // 请求称号详情
      getDepositRebateData({
        mark,
        type: "title_detail",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          this.goods_info = res.data.goods_info
          this.gift_ticket = res.data.gift_ticket
          // 请求成功
          console.log(res)
          // 打开称号详情弹窗
          this.showFlag1 = true
        }
      });
    },
    // 弹窗中兑换
    toastExchange(mark) {
      if (this.gift_ticket < 100) {
        Toast('礼券不足')
        this.showFlag1 = false
        return
      }
      getDepositRebateData({
        mark,
        type: "title_convert",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          console.log(res)
          Toast(res.errmsg)
          this.showFlag1 = false
          // 初始化数据
          this.init().then((res) => {
            console.log(res);
          });
        }
      });
    },
    //领取收集奖励
    getCollet(mark) {
      getDepositRebateData({
        mark,
        type: "title_collect_award",
      }).then((res) => {
        console.log(res)
        if (res.errno != 0) {
          return this.$toast(res.errmsg)
        }
        if (res.errno == 0) {
          // 请求成功
          console.log(res)
          this.award = res.data.award
          this.showFlag3 = true
          if (this.award.type == 'mic') {
            this.$nextTick(() => {
              this.toastlottieObj = this.svgFun("lottie2", zytc, "zytc");
            })
          }
          // 初始化数据
          this.init().then((res1) => {
            console.log(res1);
          });
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.container5 {
  .outComm {
    border: 5px solid #D4EBA4;
    box-sizing: border-box;
    width: 360px;

    .inComm {
      width: 100%;
      background: linear-gradient(180deg, #FBFFF5, #FCFFF5);
      display: flex;
      flex-direction: column;
      align-items: center;

      .awardPool {
        width: 340px;
        height: 342px;
        background: linear-gradient(180deg, #A4DD83, #57B8AE);
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        margin-top: 13px;

        .awardItem {
          width: 100px;
          height: 100px;
          background: linear-gradient(0deg, #51A789, #349F6E);
          border: 1px solid #FFFFFF;
          box-sizing: border-box;
          border-radius: 6px;
          margin-right: 8px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          img {
            width: 50px;
            height: 50px;
            margin-top: auto;
            margin-bottom: 10px;
          }

          .selected {
            position: absolute;
            width: 125%;
            height: 125%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .tit {
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 0;
            margin-bottom: 9px;
          }
        }

        .centerAwardItem {
          width: 100px;
          height: 100px;
          box-sizing: border-box;
          margin-right: 10px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .residueTit {
            margin-top: 30px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #0E6946;
          }

          .residue {
            height: 22px;
            line-height: 22px;
            margin-top: 15px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFF36C;
          }
        }

        .awardItem:nth-child(3n+1) {
          margin-left: 10px;
        }

        .awardItem:nth-child(7) {
          margin-bottom: 10px;
        }
      }

      .hasconsum {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0E6946;
        margin-top: 6px;
      }

      .label {
        width: 240px;
        height: 24px;
        background: #39774E;
        border-radius: 12px;
        margin-top: 9px;
        display: flex;
        align-items: center;

        .dark {
          width: 33%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          position: relative;

          .pointer {
            width: 84px;
            height: 30px;
            position: absolute;
            top: 0;
            background-image: url('../../assets/mk5_10.png');
            background-size: 100% 100%;
            display: flex;
            justify-content: center;

            span {
              height: 13px;
              margin-top: 4px;
            }
          }
        }
      }

      .drawBtn {
        margin-top: 9px;
        width: 223px;
        height: 56px;
        background-image: url('../../assets/mk5_11.png');
        background-size: 100% 100%;
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

            .special {
              color: #F67BAF;
            }
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

  .exchange {
    margin-top: 45px;
    margin-bottom: 12px;
    height: auto;
    position: relative;

    .inComm {
      .titleImg {
        position: absolute;
        transform: translateY(-50%);
        width: 258;
        height: 48px;
      }

      .awardTicketP {
        width: 160px;
        height: 24px;
        background: #5A9F67;
        border-radius: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 31px;

        img {
          width: 20px;
          height: 17px;
          margin: 0 5px;
          margin-top: 2px;
        }
      }

      .readme {
        margin-top: 12px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0E6946;
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 17px;
          margin: 0 2px;
        }

        .special {
          color: #F67BAF;
        }
      }

      .titlecontainer {
        width: 340px;
        background: linear-gradient(180deg, #A4DD83, #57B8AE);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 9px;
        margin-bottom: 20px;

        .toppart {
          width: 320px;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          .titleItem {
            width: 100px;
            margin-bottom: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .imgcontainer {
              width: 100px;
              height: 90px;
              background: linear-gradient(180deg, #FEFFC8, #FFFFFF);
              border: 2px solid #80CC97;
              border-radius: 6px;
              display: flex;
              flex-direction: column;
              align-items: center;

              img {
                width: 87px;
                height: 41px;
                margin-top: 13px;
              }

              .normal {
                margin-top: 3px;
                width: 70px;
                height: 63px;
              }

              .forever {
                margin-top: auto;
                margin-bottom: 0;
                width: 100%;
                height: 23px;
                background: #39916B;
                border-radius: 0px 0px 4px 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
              }
            }

            .hasTitle {
              margin-top: 10px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #0E6946;
            }

            .titleBtn {
              width: 60px;
              height: 30px;
              background: linear-gradient(0deg, #FBFFC1, #FFFFFF);
              border: 1px solid #FFFFFF;
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #B28D2B;
              margin-top: 10px;
            }

            .grey {
              background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
              color: #FFFFFF;
            }
          }
        }

        .colletTit {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 16px;

          .line {
            width: 90px;
            height: 3px;
            background: linear-gradient(90deg, #FFFFFF, rgba(255, 255, 255, 0));
            transform: rotateY(180deg);
          }

          .tit {
            margin: 0 12px;
            font-size: 19px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
          }

          .line2 {
            transform: rotateY(180deg);
            transform: rotateX(0);
          }
        }

        .yellowP {
          margin-top: 14px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFF68F;
        }

        .colletAward {
          width: 304px;
          margin-top: 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .collectAwardItem {
            display: flex;
            flex-direction: column;
            align-items: center;

            .img {
              width: 80px;
              height: 80px;
              background: linear-gradient(0deg, #51A789, #349F6E);
              border: 1px solid #FFFFFF;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                width: 57px;
                height: 57px;
              }

              .lottie {
                width: 70px;
                height: 67px;
              }
            }

            .tit {
              margin-top: 10px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
            }

            .progress {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFF475;
              margin-top: 6px;
            }

            .btn {
              width: 60px;
              height: 30px;
              background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
              border: 1px solid #FFFFFF;
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              margin-top: 8px;
              margin-bottom: 24px;
            }

            .btn0 {
              background: linear-gradient(0deg, #FBFFC1, #FFFFFF);
              color: #B28D2B;
            }

            .btn1 {
              background: linear-gradient(0deg, #F69421, #FFE96D);
            }

            .btn2 {
              background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
            }
          }
        }
      }
    }
  }

  .commToast {

    .inCommToast {
      width: 300px;
      height: 257px;
      background: linear-gradient(180deg, #9ED57E, #57B8AE);
      border: 4px solid #FFFFFF;
      border-radius: 12px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;


      .header {
        width: 252px;
        height: 49px;
        // margin-top: -25px;
        position: absolute;
        transform: translateY(-50%);
      }

      .p1 {
        height: 16px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        margin-top: 39px;

        img {
          width: 20px;
          height: 17px;
          margin: 0 2px;
          margin-top: 3px;
        }
      }

      .p2 {
        margin-top: 12px;
        height: 13px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }

      .p3 {
        margin-top: 11px;
        height: 15px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 17px;
          margin: 0 2px;
          margin-top: 3px;
        }
      }

      .img2 {
        width: 90px;
        height: 60px;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 83px;
          height: 38px;
        }
      }

      .img3 {
        width: 60px;
        height: 60px;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 60px;
          height: 60px;
        }
      }

      .btns {
        margin-top: 23px;
        display: flex;
        align-items: center;

        .leftbtn {
          width: 120px;
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
          margin-right: 10px;
        }

        .rightbtn {
          width: 120px;
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

        .grey {
          background: linear-gradient(0deg, #A3A3A3, #DDDDDD);
        }
      }

      .oneBtn {
        margin-top: 23px;
        width: 120px;
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
        margin-right: 10px;
      }
    }
  }

  .commToast2 {
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

      .img1 {
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 56px;

        .lottie2 {
          width: 52px;
          height: 43px;
        }
      }

      .awardContainer {
        width: 300px;
        height: 180px;
        margin-top: 36px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .awardItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 13px;


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
          }

          p {
            height: 12px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 8px;
          }
        }
      }

      .center {
        justify-content: center;
      }

      .btn {
        margin-bottom: 23px;
        margin-top: auto;
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

      .awardContainer {
        width: 240px;
        margin-top: 56px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .awardItem {
          display: flex;
          flex-direction: column;
          align-items: center;


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
          }

          p {
            height: 12px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-top: 10px;
          }
        }
      }

      .more {
        .awardItem:first-child {
          margin-right: 12px;
        }
      }

      .img1 {
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 56px;

        .lottie2 {
          width: 52px;
          height: 43px;
        }
      }

      .img2 {
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        background: #FEFAEF;
        border: 2px solid #32A389;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 56px;

        img {
          width: 57px;
          height: 57px;
        }
      }

      p {
        height: 12px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: 10px;
      }

      .btn {
        margin-bottom: 23px;
        margin-top: auto;
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
