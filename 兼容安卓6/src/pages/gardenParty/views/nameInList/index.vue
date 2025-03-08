<template>
  <div class="container6">
    <div class="outComm">
      <div class="inComm">
        <!-- 赠送榜和获赠榜标题 -->
        <div class="giveGetTitle">
          <div class="leftimg" @click="changeList(1)">
            <img class="left" src="../../assets/mk6_1_1.png" alt="">
          </div>
          <div class="rightimg" @click="changeList(2)">
            <img class="right" src="../../assets/mk6_2_1.png" alt="">
          </div>
          <div v-if="listFlag == 1" class="givelist">
            <img src="../../assets/mk6_1.png" alt="">
          </div>
          <div v-else class="getlist">
            <img src="../../assets/mk6_2.png" alt="">
          </div>
        </div>
        <!-- 第一名 -->
        <div class="first">
          <div class="firtit">第1名</div>
          <div class="awards">
            <div class="awardItem">
              <img src="../../assets/tk_dj_1.png" alt="">
              <div class="bottom">+1000</div>
            </div>
            <div class="awardItem">
              <img src="../../assets/tk_dj_8.png" class="ticket" alt="">
              <div class="bottom">+3</div>
            </div>
          </div>
        </div>
        <!-- 第2名 第3名 -->
        <div class="second">
          <div class="secondItem">
            <div class="itemTit">第2名</div>
            <div class="awards">
              <div class="awardItem">
                <img src="../../assets/tk_dj_1.png" alt="">
                <div class="bottom">+800</div>
              </div>
              <div class="awardItem">
                <img src="../../assets/tk_dj_8.png" class="ticket" alt="">
                <div class="bottom">+2</div>
              </div>
            </div>
          </div>
          <div class="secondItem">
            <div class="itemTit">第3名</div>
            <div class="awards">
              <div class="awardItem">
                <img src="../../assets/tk_dj_1.png" alt="">
                <div class="bottom">+600</div>
              </div>
              <div class="awardItem">
                <img src="../../assets/tk_dj_8.png" class="ticket" alt="">
                <div class="bottom">+1</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 第4-10名 幸运奖 -->
        <div class="third">
          <div class="secondItem">
            <div class="itemTit">第4-10名</div>
            <div class="award">
              <img src="../../assets/tk_dj_1.png" alt="">
              <div class="bottom">+300</div>
            </div>
          </div>
          <div class="secondItem">
            <div class="itemTit">幸运奖</div>
            <div class="award">
              <img src="../../assets/tk_dj_6.png" class="gold" alt="">
              <div class="bottom">+20万</div>
            </div>
          </div>
        </div>
        <!-- 赠送榜 -->
        <div class="list" ref="list" v-if="listFlag == 1">
          <div class="listItem" v-for="(item, index) in send_present_top" :key="index" :class="{
            lucky_prize: lucky_ranks_index.indexOf(index + 1) != -1,
            after10: (index + 1) > 10
          }">
            <img src="../../assets/mk6_6.png" v-if="index == 0" class="rank rank1" alt="">
            <img src="../../assets/mk6_7.png" v-if="index == 1" class="rank rank2" alt="">
            <img src="../../assets/mk6_8.png" v-if="index == 2" class="rank rank3" alt="">
            <div class="leftrank" v-if="index > 2">{{ index + 1 }}</div>
            <div class="rightPart">
              <div class="avatar" @click="toUserMain(item.uid)">
                <img :src="item.profile_image" alt="">
              </div>
              <div class="right">
                <div class="top" @click="toUserMain(item.uid)">
                  {{ item.username }}
                </div>
                <div class="bottom">
                  赠送价值(钻）{{ item.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 获赠榜 -->
        <div class="list2" ref="list" v-else>
          <div class="listItem" v-for="(item, index) in present_top" :key="index" :class="{
            lucky_prize: lucky_ranks_index.indexOf(index + 1) != -1,
            after10: (index + 1) > 10
          }">
            <img src="../../assets/mk6_6.png" v-if="index == 0" class="rank rank1" alt="">
            <img src="../../assets/mk6_7.png" v-if="index == 1" class="rank rank2" alt="">
            <img src="../../assets/mk6_8.png" v-if="index == 2" class="rank rank3" alt="">
            <div class="leftrank" v-if="index > 2">{{ index + 1 }}</div>
            <div class="rightPart">
              <div class="avatar" @click="toUserMain(item.uid)">
                <img :src="item.profile_image" alt="">
              </div>
              <div class="right">
                <div class="top" @click="toUserMain(item.uid)">
                  {{ item.username }}
                </div>
                <div class="bottom">
                  获赠价值(钻) {{ item.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 50+ 赠送榜 -->
        <div class="more" v-if="listFlag == 1">
          <div class="rank" v-if="findUid(this.send_present_top, uid) == -1">50+</div>
          <div v-else class="rank">{{ findUid(this.send_present_top, uid) + 1 }}</div>
          <div class="avatar">
            <img :src="my_profile_image" alt="" srcset="">
          </div>
          <div class="right">
            <div class="top">
              {{ my_username }}
            </div>
            <div class="bottom">
              赠送价值(钻){{ my_send_present }}
            </div>
          </div>
        </div>
        <!-- 50+ 获赠榜 -->
        <div class="more" v-if="listFlag == 2">
          <div class="rank" v-if="findUid(this.present_top, uid) == -1">50+</div>
          <div v-else class="rank">{{ findUid(this.present_top, uid) + 1 }}</div>
          <div class="avatar">
            <img :src="my_profile_image" alt="" srcset="">
          </div>
          <div class="right">
            <div class="top">
              {{ my_username }}
            </div>
            <div class="bottom">
              获赠价值(钻) {{ my_present }}
            </div>
          </div>
        </div>
        <div class="textcontainer">
          <div class="ruleKText">
            <p class="circle"></p>
            <p>活动期间，每日<span class="special">赠送和获赠钻石礼物价值</span>最高的前
              10名玩家可获得排名奖励</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>第11名-50名中结算时名次<span class="special">尾数为3和7</span>的用户可获得幸运奖</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>榜单<span class="special">每日重置</span>，奖励会在次日发放</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>每个ID只能获得一个榜单的奖励，按最大名次派发当送出钻石礼物为盲盒礼物时，赠送榜数据以<span class="special">盲盒本身</span>的钻石价值计算，获赠榜数据以盲盒
              <span class="special">拆出礼物</span>的钻石价值计算
            </p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>活动期间赠送钻石礼物，可获得<span class="special">双倍经验值和双倍
                基础魅力值，魅力值上限提高50%</span></p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 导入请求
import { getDepositRebateData } from "../../api/depositRebate";
// 跳转用户主页
import { toUserMain } from "../../utils/toApp"
export default {
  // 奖励兑换
  name: 'nameInList',
  data() {
    return {
      listFlag: 1,//赠送榜和获赠榜状态
      "my_present": 0,
      "my_send_present": 0,
      "my_username": "20013",
      "my_profile_image": "http://cdn-image.dandan818.com/app/head/head_block_1.png",
      "uid": "20013",
      "lucky_ranks_index": [ //幸运奖名次列表
        13,
        17,
        23,
        27,
        33,
        37,
        43,
        47
      ],
      "present_top": [ //收礼榜
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        }
      ],
      "send_present_top": [
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "20013",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        },
        {
          "uid": "",
          "profile_image": "https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png",
          "username": "虚位以待",
          "time": "--"
        }
      ]
    }
  },
  computed: {},
  watch: {
    //正常写法
    listFlag: {
      // immediate:true, //初始化时让handler调用一下
      //deep: true,//深度监视
      handler(newValue) {
        this.$refs.list.scrollTop = 0
      }
    }
  },
  async created() {

  },
  mounted() {
    // 初始化数据
    this.init().then((res) => {
      console.log(res);
      this.my_present = res.data.my_present
      this.my_send_present = res.data.my_send_present
      this.my_username = res.data.my_username
      this.my_profile_image = res.data.my_profile_image
      this.uid = res.data.uid
      this.lucky_ranks_index = res.data.lucky_ranks_index
      this.present_top = res.data.present_top
      this.send_present_top = res.data.send_present_top
    });
  },
  methods: {
    // 跳转用户主页
    toUserMain(uid) {
      toUserMain(uid)
    },
    // 查找uid位置
    findUid(arr, key) {
      let arr1 = []
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
    // 切换奖池
    changeList(i) {
      this.listFlag = i
    },
    // 初始化数据方法
    init() {
      return new Promise((resolve, reject) => {
        getDepositRebateData({
          mark: "m6",
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
    }
  }
}
</script>

<style scoped lang="scss">
.container6 {
  .outComm {
    border: 5px solid #D4EBA4;
    box-sizing: border-box;
    width: 360px;
    height: 1399px;
    border-radius: 50px 50px 0px 0px;
    margin-bottom: 15px;
    margin-top: 53px;

    .inComm {
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #FBFFF5, #FCFFF5);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      border-radius: 46px 46px 0px 0px;

      .giveGetTitle {
        width: 275px;
        height: 53px;
        background: linear-gradient(180deg, #206760, #3B897C);
        border: 3px solid #4AAC9C;
        border-radius: 27px;
        position: relative;
        display: flex;
        align-items: center;
        position: absolute;
        transform: translateY(-50%);
        z-index: 1;


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

        .givelist,
        .getlist {
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
          }
        }

        .getlist {
          right: -5px;
          left: auto;
        }
      }

      .first {
        margin-top: 56px;
        width: 350px;
        // height: 100px;
        background: linear-gradient(90deg, rgba(212, 235, 164, 0.5), rgba(212, 235, 164, 0.99), rgba(212, 235, 164, 0.5));
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .firtit {
          position: absolute;
          transform: translateY(-50%);
          width: 113px;
          height: 25px;
          background-image: url('../../assets/mk6_3.png');
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 18px;
        }

        .awards {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          margin-bottom: 10px;

          .awardItem {
            width: 80px;
            height: 69px;
            background: linear-gradient(180deg, #FEFFC8, #FFFFFF);
            border: 2px solid #80CC97;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;

            img {
              width: 48px;
              height: 48px;
            }

            .ticket {
              position: absolute;
              width: 60px;
              height: 60px;
              top: -2px;
            }

            .bottom {
              width: 100%;
              margin-top: auto;
              margin-bottom: 0;
              height: 21px;
              background: #5FA46C;
              border-radius: 0px 0px 5px 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #F5F5F8;
            }
          }

          .awardItem:first-child {
            margin-right: 19px;
          }
        }
      }

      .second {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;


        .secondItem {
          width: 172px;
          background: #E3F3C3;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;

          .itemTit {
            position: absolute;
            transform: translateY(-50%);
            width: 103px;
            height: 25px;
            background-image: url('../../assets/mk6_4.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 18px;
          }

          .awards {
            margin-top: 23px;
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            justify-content: center;

            .awardItem {
              width: 75px;
              height: 69px;
              background: linear-gradient(180deg, #FEFFC8, #FFFFFF);
              border: 2px solid #80CC97;
              border-radius: 6px;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;

              img {
                width: 48px;
                height: 48px;
              }

              .ticket {
                position: absolute;
                width: 60px;
                height: 60px;
                top: -2px;
              }

              .bottom {
                width: 75px;
                height: 19px;
                background: #5FA46C;
                border-radius: 0px 0px 5px 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #F5F5F8;
                margin-top: auto;
                margin-bottom: 0;
              }
            }

            .awardItem:first-child {
              margin-right: 4px;
            }
          }
        }
      }

      .third {
        margin-top: 21px;
        display: flex;
        justify-content: center;

        .secondItem {
          width: 133px;
          background: linear-gradient(90deg, rgba(221, 223, 216, 0.5), rgba(221, 223, 216, 0.99), rgba(221, 223, 216, 0.5));
          border-radius: 10px;
          position: relative;
          display: flex;
          justify-content: center;

          .itemTit {
            position: absolute;
            transform: translateY(-50%);
            width: 103px;
            height: 25px;
            background-image: url('../../assets/mk6_4.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 18px;
          }

          .award {
            width: 75px;
            height: 69px;
            background: linear-gradient(180deg, #FEFFC8, #FFFFFF);
            border: 2px solid #80CC97;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 22px;
            margin-bottom: 10px;

            img {
              width: 48px;
              height: 48px;
            }

            .gold {
              width: 48px;
              height: 48px;
            }

            .bottom {
              width: 100%;
              height: 19px;
              background: #5FA46C;
              border-radius: 0px 0px 4px 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #F5F5F8;
              margin-top: auto;
              margin-bottom: 0;
            }
          }
        }

        .secondItem:first-child {
          margin-right: 22px;
        }
      }

      .list,
      .list2 {
        width: 330px;
        height: 669px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        overflow: scroll;

        .listItem {
          width: 330px;
          height: 62px;
          background: linear-gradient(-90deg, #A5DD83, #57B8AE);
          box-shadow: 0px 3px 0px 0px #FFED94;
          border-radius: 6px;
          margin-bottom: 9px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          position: relative;

          .rank {
            position: absolute;
            left: 9px;
            top: 0;
            width: 35px;
            height: 45px;
          }

          .leftrank {
            position: absolute;
            left: 23px;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 12px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #A8EDE6;
          }

          .rightPart {
            margin-left: 54px;
            display: flex;
            align-items: center;

            .avatar {
              width: 41px;
              height: 41px;
              background: #5EBC94;
              border-radius: 50%;
              margin-left: 15px;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .right {
              margin-left: 7px;

              .top {
                font-size: 15px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                margin-bottom: 8px;
                margin-left: 4px;
              }

              .bottom {
                width: 141px;
                height: 18px;
                background: #1F6E51;
                border-radius: 9px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFF99E;
                line-height: 32px;
              }
            }
          }
        }

        .after10 {
          background: linear-gradient(-90deg, #8DCEAE, #6DAFC5);
          .rightPart {
            .right {
              margin-left: 7px;
              .bottom {
                background: #40859C;
              }
            }
          }
        }

        .lucky_prize {
          background: linear-gradient(-90deg, #E8BFEA, #6DAFC5);

          .leftrank {
            color: #FFF38B;
          }
        }

        .listItem:nth-child(1) {
          background: linear-gradient(-90deg, #FFE467, #57B8AE);
        }

        .listItem:nth-child(2) {
          background: linear-gradient(-90deg, #BEC9D3, #57B8AE);
        }

        .listItem:nth-child(3) {
          background: linear-gradient(-90deg, #C5ABA4, #57B8AE);
        }
      }

      .more {
        width: 350px;
        height: 62px;
        background: #39916B;
        display: flex;
        align-items: center;

        .rank {
          width: 28px;
          height: 13px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #A8EDE6;
          margin-left: 19px;
        }

        .avatar {
          width: 41px;
          height: 41px;
          background: #5EBC94;
          border-radius: 50%;
          margin-left: 15px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .right {
          margin-left: 7px;

          .top {
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            margin-bottom: 8px;
            margin-left: 4px;
          }

          .bottom {
            width: 141px;
            height: 18px;
            background: #1F6E51;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFF99E;
            line-height: 32px;
          }
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

          .special {
            color: #FE8AB1;
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
}
</style>
