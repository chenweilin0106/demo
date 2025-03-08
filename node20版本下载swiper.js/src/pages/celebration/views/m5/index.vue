<template>
  <div class="layout">
    <div class="tabs_box flex align-center flex-no-wrap position-relative justify-center">
      <div :class="['rankChosenBg',`status${rankChosen}`]" v-for="(item, index) in tabsArray" :key="index" @click="selectChosen(item.rank, 1, todaySelectDate)"></div>
    </div>
    <OutBox class="rankBox">
      <!-- 日榜、总榜切换 -->
      <div :class="['tagChosenBg',`status${tagChosen}`]">
        <div @click="selectChosen(rankChosen, 1, todaySelectDate)"></div>
        <div @click="selectChosen(rankChosen, 2)"></div>
      </div>
      <!--奖励列表-->
      <div class="rewardsTip"></div>
      <div :class="['rewardsShowArea']">
        <div :class="['rewardItem', rewardsList[`${rankChosen}${tagChosen}`].length<3?'marginDouble':null, item.isRedSp?'redSp':null]" v-for="(item) in rewardsList[`${rankChosen}${tagChosen}`]" :key="item.id" @click="previewImgCk(item)">
          <div :class="['rewardIcon', item.type=='title'?'titleSp':null]">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
          <div v-if="item.isDouble">
            <div :class="['additionBg', (todaySelectDate>=20241115&&todaySelectDate<=20241117)?'status1':(todaySelectDate>=20241118&&todaySelectDate<=20241121)?'status2':null]"></div>
          </div>
          <div :class="['rewardText', item.isRedSp?'redSp':null]">{{item.text}}</div>
          <div class="rewardPreview" v-if="item.previewImg"></div>
          <div class="rewardMark" v-if="item.mark">{{ item.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
        </div>
        <div class="rewardsDetail" @click="rewardsDetailCk"></div>
      </div>
      <div class="dateBg"></div>
      <!-- 日期选择 -->
      <div class="dateArea" v-if="tagChosen==1">
        <div :class="['dateItem',selectDate[rankChosen]==index?'active':null]" v-for="(item,index) in day_list" :key="index" @click="dateChoseCk(index)">{{item}}</div>
      </div>
      <!-- 高能时刻 -->
      <div class="highMomentArea" v-if="rankChosen == 2 && tagChosen == 1">
        <div class="highMomentTitle">高能时刻 20:00-00:00</div>
        <div class="highMomentText">
          <p>高能时刻前人气值进度达到17,777</p>
          <p>即可在高能时刻享受<i>1.5倍人气值加成</i></p>
          <p>加成上限{{highMomentTop}}（今日已加{{highMomentNow}}）</p>
        </div>
        <div class="highMomentProcess">
          <div class="highMomentProcessNow" :style="`width: ${(highMomentProcessNum/17777)*100}%`"></div>
          <div class="highMomentProcessText">高能进度：{{highMomentProcessNum}}/17,777</div>
        </div>
      </div>
      <!-- 榜单 -->
      <template>
        <div class="totalRankArea" ref="totalRankAreaRef">
          <div class="totalRankTop3">
            <div :class="['totalRankTop3Item', rankChosen == 2?'longSp':null]" v-for="(item,index) in rankListShow.slice(0,3)" :key="`${item.uid}+${index}`">
              <img class="tRIAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="goToUserMain(item.uid)" />
              <div class="tRIBg"></div>
              <div class="tRIName">{{item.username}}</div>
              <div :class="['tRICode', 'userPrettyCode']" v-if="rankChosen == 2">
                <div class="havenBg" v-if="item.pretty_type!=0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]"></PublicImg>
                </div>
                <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
                <span v-else class="noPrettyCode">ID:{{item.code}}</span>
              </div>
              <div class="tRITime" v-if="rankChosen == 2">
                <p>人气值</p>
                {{item.time}}
              </div>
            </div>
          </div>
          <div class="totalRankItem" v-for="(item,index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
            <div class="totalRankItemIcon">{{item.rank}}</div>
            <img class="totalRankItemAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="goToUserMain(item.uid)" />
            <div :class="['totalRankItemName', rankChosen == 1?'middleSp':null]">{{item.username}}</div>
            <div :class="['totalRankItemCode', 'userPrettyCode']" v-if="rankChosen == 2">
              <div class="havenBg" v-if="item.pretty_type!=0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]"></PublicImg>
              </div>
              <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
              <span v-else class="noPrettyCode">ID:{{item.code}}</span>
            </div>
            <div class="totalRankItemTime">
              <template v-if="rankChosen == 1">
                <p>距离上一名</p>
                <span>{{item.diff}}神壕值</span>
              </template>
              <template v-else>
                <span>{{item.time}}人气值</span>
              </template>
            </div>
          </div>
        </div>
        <div class="myTotalRankArea" v-if="userRankShow.uid">
          <div class="totalRankIcon">{{userRankShow.rank?userRankShow.rank:`${rankListShow.length}+`}}</div>
          <img class="totalRankAvatar" :src="IconPath(userRankShow.profile_image||avatarDefault)" @click="goToUserMain(userRankShow.uid)" />
          <div :class="['totalRankName', rankChosen == 1?'middleSp':null]">{{userRankShow.username}}</div>
          <div :class="['totalRankCode', 'userPrettyCode']" v-if="rankChosen == 2">
            <div class="havenBg" v-if="userRankShow.pretty_type!=0">
              <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.pretty_type]"></PublicImg>
            </div>
            <span v-if="userRankShow.pretty_type!=0" :class="['prettyCode', `color${userRankShow.pretty_type}`]">{{userRankShow.code}}</span>
            <span v-else class="noPrettyCode">ID:{{userRankShow.code}}</span>
          </div>
          <div class="isShowNameDiv" v-if="rankChosen == 1">
            <span>公开昵称</span>
            <div :class="['isShowBtn', userRankShow.isShowName?'statusShow':null]" @click="isShowBtnCk"></div>
          </div>
          <div :class="['totalRankTime', rankChosen == 2?'middleSp':null]">
            <span>{{userRankShow.time}}</span>
            <span v-if="rankChosen == 1">神壕值</span>
            <span v-else>人气值</span>
          </div>
        </div>
        <div class="rules-text">
          <ul v-if="rankChosen == 1">
            <li><span></span>最强神壕榜为活动期间<i>本服用户累计充值</i>排行榜，</li>
            <li>榜单分服统计</li>
            <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
            <li>卡不计算在内</li>
          </ul>
          <ul v-else>
            <li><span></span>超级巨星榜为活动期间<i>本服获赠钻石礼物总价值</i>排</li>
            <li>行榜，1钻石人气值，榜单分服统计</li>
          </ul>
        </div>
      </template>
    </OutBox>
    <div class="toTopBtn" v-show="isToTopBtnVisible" @click="toTopBtnCk"></div>
    <OutBox class="rewardsDetailBox" :title="rankChosen==1?tagChosen==1?'mk10_title_1.png':'mk10_title_2.png':tagChosen==1?'mk10_title_3.png':'mk10_title_4.png'">
      <div class="needWatchDiv" ref="needWatchRef"></div>
      <template v-if="rankChosen == 1 && tagChosen == 1">
        <div class="rewardsDetailTip1"></div>
        <div class="rewardsDetailTip2">
          <p><span></span>钻石奖励为激活奖励，达到对应名次及条件可获得</p>
        </div>
      </template>
      <template v-else-if="rankChosen == 1 && tagChosen == 2">
        <div class="rewardsDetailTip3">
          <div class="titlesDiv" v-for="(item) in 3" :key="item"></div>
          <div class="rewardsDetailTip3Text">称号定制权</div>
        </div>
      </template>
      <template v-else-if="rankChosen == 2 && tagChosen == 1">
        <div class="rewardsDetailTip4"></div>
        <div class="rewardsDetailTip2">
          <p><span></span>绿晶石奖励为激活奖励，达到对应名次及条件可获得</p>
        </div>
      </template>
      <div class="rewardsDetailArea">
        <div :class="['rewardsDivItem',((rankChosen == 1 && tagChosen == 1)?item.id<4:item.id<5)?'nSp':null]" v-for="(item) in rewardsDetailList[`${rankChosen}${tagChosen}`]" :key="item.id">
          <div :class="['nameDiv',item.id<4?'nSp':null]">{{item.name}}</div>
          <div class="rewardsShowDiv">
            <div :class="['reward', it.isSp?'spBordor':null]" v-for="(it,i) in item.rewards" :key="i">
              <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
              <div class="rewardItText" v-html="it.text"></div>
              <div class="rewardItActMark" v-if="it.isAct">激活奖励</div>
              <div class="rewardPriceMark" v-if="it.price">{{ it.price }}<img :src="IconPath('zs_27_20.png')" /></div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="rankChosen == 1 && tagChosen == 1">
        <div class="rewardsDetailTip2">
          <p><span></span>【为爱加冕】礼物：价值3344钻，仅钻石可赠送</p>
        </div>
      </template>
      <template v-else-if="rankChosen == 1 && tagChosen == 2">
        <div class="rewardsDetailTip2">
          <p><span></span>摸金符·二星：使用时间内每次寻宝额外加20%幸运</p>
          <p>值。摸金符需手动使用，获得后请前往背包查看和使</p>
          <p>用</p>
        </div>
      </template>
      <template v-else-if="rankChosen == 2 && tagChosen == 2">
        <div class="rewardsDetailTip2">
          <p><span></span>祥云结·大吉：可消耗此道具点亮一个已完成解锁条</p>
          <p>件的小吉、中吉或大吉奇遇</p>
        </div>
      </template>
    </OutBox>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
  </div>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { getPageData } from '@/api/index'
import PreviewPopup from './components/previewPopup.vue'

export default {
  name: 'm5Vue',
  components: {
    PreviewPopup
  },
  data() {
    return {
      avatarDefault: 'avatarDefault.png',
      tabsArray: Object.freeze([
        { rank: 1, tabName: '最强神壕', icon: 'mk10_tab1_1.png', actIcon: 'mk10_tab1.png' },
        { rank: 2, tabName: '超级巨星', icon: 'mk10_tab2_1.png', actIcon: 'mk10_tab2.png' }
      ]),
      rankChosen: 1, // 榜单 1:最强神壕 2:超级巨星
      tagChosen: 1, // 榜单选择: 1:日榜 2:总榜
      rewardsList: {
        11: [
          { id: 111, type: 'tool', icon: 'zs1_120_120.png', text: '5%当日充值钻石', isDouble: true },
          { id: 112, type: 'pst_privilege', icon: 'ljs_120_120.png', text: '礼物赠送权', isRedSp: true }
        ],
        12: [
          { id: 121, type: 'tool', icon: 'mjfex_120_120.png', text: '摸金符·二星', isRedSp: true },
          { id: 122, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' },
          { id: 123, type: 'title', icon: 'cbt_120_120.png', text: '定制称号', isRedSp: true }
        ],
        21: [
          { id: 211, type: 'car', icon: 'mp_tmr', text: '座驾', previewImg: 'ljs_120_120.png', previewTip1: '【琉璃雀羽】\n座驾' },
          { id: 212, type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石', isDouble: true }
        ],
        22: [
          { id: 221, type: 'tool', icon: 'xyjdj_120_120.png', text: '祥云结·大吉', isRedSp: true },
          { id: 222, type: 'tool', icon: 'yb_120_120.png', text: '元宝' },
          { id: 223, type: 'ring', icon: 'jz_hysy.svga', text: '戒指', mark: '19999' }
        ]
      }, // 榜单奖励列表
      day_list: {
        20241115: '10月15日',
        20241116: '10月16日',
        20241117: '10月17日',
        20241118: '10月18日',
        20241119: '10月19日',
        20241120: '10月20日',
        20241121: '10月21日',
        20241122: '10月22日',
        20241123: '10月23日',
        20241124: '10月24日',
        20241125: '10月25日'
      }, // 日期列表
      todaySelectDate: 0, // 当天日期
      selectDate: {
        1: 20241115,
        2: 20241115
      }, // 所选日期
      highMomentTop: 40000, // 高能时刻加成上限
      highMomentNow: 0, // 高能时刻当前加成
      highMomentProcessNum: 9000, // 高能时刻当前进度
      rankListShow: [
        { rank: 1, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 2, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 3, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 4, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 5, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 6, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 7, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 8, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 9, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 10, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 }
      ], // 展示榜单
      userRankShow: { uid: 10, code: 0, isShowName: false, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 }, // 个人排名展示
      isToTopBtnVisible: false, // 是否展示滚动顶部按钮
      rewardsDetailList: {
        11: [
          {
            id: 1,
            name: '第1名',
            rewards: [
              { type: 'tool', icon: 'zs1_120_120.png', text: '当日充值钻石5%\n<span class="spIText">条件：日充值\n金额3000元</span>', isAct: true },
              { type: 'pst_privilege', icon: 'ljs_120_120.png', text: '【为爱加冕】\n礼物赠送权\n+5天', isSp: true }
            ]
          }, {
            id: 2,
            name: '第2名',
            rewards: [
              { type: 'tool', icon: 'zs1_120_120.png', text: '当日充值钻石5%\n<span class="spIText">条件：日充值\n金额3000元</span>', isAct: true },
              { type: 'pst_privilege', icon: 'ljs_120_120.png', text: '【为爱加冕】\n礼物赠送权\n+3天', isSp: true }
            ]
          }, {
            id: 3,
            name: '第3名',
            rewards: [
              { type: 'tool', icon: 'zs1_120_120.png', text: '当日充值钻石5%\n<span class="spIText">条件：日充值\n金额3000元</span>', isAct: true },
              { type: 'pst_privilege', icon: 'ljs_120_120.png', text: '【为爱加冕】\n礼物赠送权\n+2天', isSp: true }
            ]
          }, {
            id: 4,
            name: '第4~5名',
            rewards: [
              { type: 'tool', icon: 'zs1_120_120.png', text: '当日充值钻石5%\n<span class="spIText">条件：日充值\n金额3000元</span>', isAct: true },
              { type: 'pst_privilege', icon: 'ljs_120_120.png', text: '【为爱加冕】\n礼物赠送权\n+1天', isSp: true }
            ]
          }, {
            id: 5,
            name: '第6~10名',
            rewards: [
              { type: 'pst_privilege', icon: 'ljs_120_120.png', text: '【为爱加冕】\n礼物赠送权\n+1天', isSp: true }
            ]
          }, {
            id: 6,
            name: '第11~20名',
            rewards: [
              { type: 'pst_privilege', icon: 'ljs_120_120.png', text: '【为爱加冕】\n礼物赠送权\n+1天', isSp: true }
            ]
          }
        ],
        12: [
          {
            id: 1,
            name: '第1名',
            rewards: [
              { type: 'tool', icon: 'mjfex_120_120.png', text: '摸金符·二星\n+3天', isSp: true },
              { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+10' },
              { type: 'title', icon: 'ljs_120_120.png', text: '【星河灿烂】\n定制称号\n+365天', isSp: true }
            ]
          }, {
            id: 2,
            name: '第2名',
            rewards: [
              { type: 'tool', icon: 'mjfex_120_120.png', text: '摸金符·二星\n+2天', isSp: true },
              { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+7' },
              { type: 'title', icon: 'ljs_120_120.png', text: '【星河灿烂】\n定制称号\n+180天', isSp: true }
            ]
          }, {
            id: 3,
            name: '第3名',
            rewards: [
              { type: 'tool', icon: 'mjfex_120_120.png', text: '摸金符·二星\n+1天', isSp: true },
              { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+5' },
              { type: 'title', icon: 'ljs_120_120.png', text: '【星河灿烂】\n定制称号\n+90天', isSp: true }
            ]
          }, {
            id: 4,
            name: '第4~5名',
            rewards: [
              { type: 'tool', icon: 'mjfex_120_120.png', text: '摸金符·二星\n+1天', isSp: true },
              { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+3' }
            ]
          }, {
            id: 5,
            name: '第6~10名',
            rewards: [
              { type: 'tool', icon: 'mjfex_120_120.png', text: '摸金符·二星\n+1天', isSp: true },
              { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+2' }
            ]
          }, {
            id: 6,
            name: '第11~20名',
            rewards: [
              { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+1' }
            ]
          }
        ],
        21: [
          {
            id: 1,
            name: '第1名',
            rewards: [
              { type: 'car', icon: 'zjs_120_120.png', text: '【琉璃雀羽】\n座驾\n+7天' },
              { type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石\n+1500\n<span class="spIText">人气值达到100000</span>', isAct: true }
            ]
          }, {
            id: 2,
            name: '第2名',
            rewards: [
              { type: 'car', icon: 'zjs_120_120.png', text: '【琉璃雀羽】\n座驾\n+5天' },
              { type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石\n+1200\n<span class="spIText">人气值达到100000</span>', isAct: true }
            ]
          }, {
            id: 3,
            name: '第3名',
            rewards: [
              { type: 'car', icon: 'zjs_120_120.png', text: '【琉璃雀羽】\n座驾\n+3天' },
              { type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石\n+1000\n<span class="spIText">人气值达到100000</span>', isAct: true }
            ]
          }, {
            id: 4,
            name: '第4~5名',
            rewards: [
              { type: 'car', icon: 'zjs_120_120.png', text: '【琉璃雀羽】\n座驾\n+2天' },
              { type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石\n+700\n<span class="spIText">人气值达到100000</span>', isAct: true }
            ]
          }, {
            id: 5,
            name: '第6~10名',
            rewards: [
              { type: 'car', icon: 'zjs_120_120.png', text: '【琉璃雀羽】\n座驾\n+2天' },
              { type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石\n+500\n<span class="spIText">人气值达到100000</span>', isAct: true }
            ]
          }, {
            id: 6,
            name: '第11~20名',
            rewards: [
              { type: 'car', icon: 'zjs_120_120.png', text: '【琉璃雀羽】\n座驾\n+1天' },
              { type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石\n+300\n<span class="spIText">人气值达到100000</span>', isAct: true }
            ]
          }
        ],
        22: [
          {
            id: 1,
            name: '第1名',
            rewards: [
              { type: 'tool', icon: 'xyjdj_120_120.png', text: '祥云结·大吉\n+1', isSp: true },
              { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+1000万' },
              { type: 'ring', icon: 'ljs_120_120.png', text: '【童话誓言】\n戒指\n+5', price: 19999 }
            ]
          }, {
            id: 2,
            name: '第2名',
            rewards: [
              { type: 'tool', icon: 'xyjdj_120_120.png', text: '祥云结·大吉\n+1', isSp: true },
              { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+800万' },
              { type: 'ring', icon: 'ljs_120_120.png', text: '【童话誓言】\n戒指\n+3', price: 19999 }
            ]
          }, {
            id: 3,
            name: '第3名',
            rewards: [
              { type: 'tool', icon: 'xyjdj_120_120.png', text: '祥云结·大吉\n+1', isSp: true },
              { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+500万' },
              { type: 'ring', icon: 'ljs_120_120.png', text: '【童话誓言】\n戒指\n+2', price: 19999 }
            ]
          }, {
            id: 4,
            name: '第4~5名',
            rewards: [
              { type: 'tool', icon: 'xyjdj_120_120.png', text: '祥云结·大吉\n+1', isSp: true },
              { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+300万' },
              { type: 'ring', icon: 'ljs_120_120.png', text: '【童话誓言】\n戒指\n+1', price: 19999 }
            ]
          }, {
            id: 5,
            name: '第6~10名',
            rewards: [
              { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+100万' },
              { type: 'ring', icon: 'ljs_120_120.png', text: '【童话誓言】\n戒指\n+1', price: 19999 }
            ]
          }, {
            id: 6,
            name: '第11~20名',
            rewards: [
              { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+50万' }
            ]
          }
        ]
      }, // 奖励详情列表

      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {}
    }
  },
  computed: {},
  created() {
    // this.getHomePage()
  },
  mounted() {
      this.observeElement()
  },
  beforeDestroy() {
    this.unobserveElement()
  },
  methods: {
    goToUserMain(uid) {
      if (this.rankChosen == 2) {
        console.log(uid)
        toUserMain(uid)
      }
    },
    /**
     * 获取页面数据
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.day_list = res.data.day_list
          this.todaySelectDate = Number(res.data.select_date)
          for (let index in this.selectDate) {
            // console.log(index)
            this.selectDate[index] = res.data.select_date
          }
          this.selectChosen(this.rankChosen, this.tagChosen, this.selectDate[this.rankChosen])
          if (this.rankChosen == 2 && this.tagChosen == 1) {
            this.highMomentTop = res.data.highMomentTop
            this.highMomentNow = res.data.highMomentNow
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowPreviewPopup = false
    },
    /**
     * 切换榜单
     */
    selectChosen(r, t, date) {
      // console.log(this.selectDate)
      this.rankChosen = r
      this.tagChosen = t
      if (this.tagChosen == 1) {
        getPageData({ type: 'honor_daily_top_rank', mark: { rank_type: this.rankChosen, date: date || this.todaySelectDate } }).then((res) => {
          if (res.errno == 0) {
            this.selectDate[this.rankChosen] = date || res.data.select_date
            this.rankListShow = res.data.rank_list
            this.userRankShow = res.data.user_info
            this.userRankShow.time = res.data.my_score
            for (let item of this.rankListShow) {
              if (item.uid == this.userRankShow.uid) {
                this.userRankShow.rank = item.rank
                break
              }
            }
            setTimeout(() => {
              if (this.$refs.totalRankAreaRef && this.$refs.totalRankAreaRef.scrollTop > 0) {
                this.$refs.totalRankAreaRef.scrollTo({ top: 0, behavior: 'instant' })
              }
              this.scrollHas()
            })
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (this.tagChosen == 2) {
        getPageData({ type: 'honor_tot_top_rank', mark: this.rankChosen }).then((res) => {
          if (res.errno == 0) {
            this.rankListShow = res.data.rank_list
            this.userRankShow = res.data.user_info
            this.userRankShow.time = res.data.my_score
            for (let item of this.rankListShow) {
              if (item.uid == this.userRankShow.uid) {
                this.userRankShow.rank = item.rank
                break
              }
            }
            setTimeout(() => {
              if (this.$refs.totalRankAreaRef && this.$refs.totalRankAreaRef.scrollTop > 0) {
                this.$refs.totalRankAreaRef.scrollTo({ top: 0, behavior: 'instant' })
              }
            })
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.previewImg) {
        console.log(item.previewImg)
        this.configPreviewPopup = {
          type: item.type,
          img: item.previewImg,
          tip1: item.previewTip1
        }
        this.isShowPreviewPopup = true
      }
    },
    /**
     * 奖励详情
     */
    rewardsDetailCk() {
      console.log('奖励详情')
      let targetDiv = this.$refs.needWatchRef
      if (targetDiv) {
        targetDiv.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        console.error('Target div not found')
      }
    },
    /**
     * 日期选择
     */
    dateChoseCk(index) {
      this.selectChosen(this.rankChosen, this.tagChosen, index)
    },
    /**
     * 滚动到当前日期
     */
    scrollHas() {
      let man = document.getElementsByClassName('dateArea')[0]
      // console.log(document.getElementsByClassName('dateArea')[0].clientWidth)
      if (man) {
        let scrollIndex = 0
        let i = 0
        for (let index in this.day_list) {
          // console.log(index)
          // console.log(this.selectDate[this.rankChosen])
          if (index == this.selectDate[this.rankChosen]) {
            scrollIndex = i
            break
          }
          i++
        }
        // console.log(scrollIndex)
        let len = document.getElementsByClassName('dateItem')[0].clientWidth * (scrollIndex - 2)
        // console.log(len)
        man.scrollTo({
          left: len,
          behavior: 'smooth'
        })
      }
    },
    /**
     * 切换是否公开昵称
     */
    isShowBtnCk() {
      this.userRankShow.isShowName = !this.userRankShow.isShowName
    },
    /**
     * 监听needWatchRef是否在视图
     */
    observeElement() {
      let needWatchRef = this.$refs.needWatchRef
      if (!needWatchRef) {
        console.error('needWatchRef element not found')
        return
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isToTopBtnVisible = true
              console.log('needWatchRef is visible')
            } else {
              this.isToTopBtnVisible = false
              console.log('needWatchRef is not visible')
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0 // 可以调整阈值，0 表示只要相交就触发，1 表示完全可见
        }
      )
      // console.log(observer)
      observer.observe(needWatchRef)
    },
    /**
     * 销毁监听
     */
    unobserveElement() {
      let needWatchRef = this.$refs.needWatchRef
      if (!needWatchRef) {
        console.error('needWatchRef element not found')
        return
      }
      const observer = new IntersectionObserver(() => {})
      observer.unobserve(needWatchRef)
    },
    /**
     * 页面滚到到顶部
     */
    toTopBtnCk() {
      console.log('页面滚到到顶部')
      let appDom = document.getElementById('app')
      appDom.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      if (this.$refs.totalRankAreaRef && this.$refs.totalRankAreaRef.scrollTop > 0) {
        this.$refs.totalRankAreaRef.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  $bannerHeight: 643px;

  .banner {
    width: 750px;
    height: $bannerHeight;
  }

  .tabs_box {
    margin-top: -271px; /*tab盒子距离banner的距离 蓝湖上是tab盒子距离页面顶部距离 - banner高度*/
    width: 750px;
    //height: 82px * 2 + 10;
    //align-content: space-between;
    //padding: 0 22px;

    .rankChosenBg{
      width: 225px;
      height: 218px;
      margin: 0 40px;
      &:nth-child(1) {
        &.status1{
          background: url('@/pages/celebration/assets/mk10_tab1.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk10_tab1_1.png') no-repeat left top/100% 100%;
        }
      }
      &:nth-child(2) {
        &.status1{
          background: url('@/pages/celebration/assets/mk10_tab2_1.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk10_tab2.png') no-repeat left top/100% 100%;
        }
      }
    }
  }
  .rankBox{
    position: relative;
    .tagChosenBg{
      width: 572px;
      height: 84px;
      margin: 0px auto 20px auto;
      display: flex;
      &.status1{
        background: url('@/pages/celebration/assets/mk10_1.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/celebration/assets/mk10_2.png') no-repeat left top/100% 100%;
      }
      :nth-child(n){
        width: 50%;
        height: 100%;
      }
    }
    .rewardsTip{
      width: 513px;
      height: 37px;
      background: url('@/pages/celebration/assets/mk10_3.png') no-repeat left top/100% 100%;
      margin: 30px auto 0 auto;
    }
    .rewardsShowArea{
      width: 625px;
      height: 187px;
      background: url('@/pages/celebration/assets/mk10_4.png') no-repeat left top/100% 100%;
      margin: 0px auto 0 auto;
      display: flex;
      justify-content: center;
      // align-items: center;
      flex-wrap: wrap;
      position: relative;
      padding: 20px 20px 60px 20px;
      .rewardItem{
        width: 148px;
        height: 128px;
        background: linear-gradient(0deg, #FFFFFF, #EECEFF);
        border-radius: 12px;
        border: 4px solid #BDA2FA;
        margin: 0px 20px;
        position: relative;
        &.marginDouble{
          margin: 0px 40px;
        }
        &.redSp{
          background: linear-gradient(0deg, #FFFFFF, #FFF3A1);
          border: 4px solid #FFC939;
        }
        .rewardIcon{
          width: 140px;
          height: 120px;
          position: absolute;
          left: 0;
          top: -0px;
          &.titleSp{
            height: 96px;
          }
        }
        .rewardText{
          min-width: 150px;
          height: 34px;
          background: #7954E4;
          border-radius: 17px;
          padding: 0 10px;
          font-size: 24px;
          color: #FFFFFF;
          text-align: center;
          line-height: 36px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 100px;
          &.redSp{
            background: #DF4329;
          }
        }
        .rewardPreview{
          width: 140px;
          height: 26px;
          background: url('@/pages/celebration/assets/mk10_25.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0px;
          top: 74px;
        }
        .rewardMark{
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 17px;
          font-size: 20px;
          color: #FFFFFF;
          padding: 4px 5px 4px 10px;
          position: absolute;
          right: -20px;
          top: 0;
          transform: translateY(-50%);
          img{
            width: 27px;
            height: 20px;
            margin: 0 0px 0 2px;
          }
        }
      }
      .additionBg{
        width: 167px * 0.7;
        height: 160px * 0.7;
        position: absolute;
        right: -60px;
        top: -40px;
        &.status1{
          background: url('@/pages/celebration/assets/mk10_8.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk10_9.png') no-repeat left top/100% 100%;
        }
      }
      .rewardsDetail{
        width: 153px;
        height: 52px;
        background: url('@/pages/celebration/assets/mk10_5.png') no-repeat left top/100% 100%;
        position: absolute;
        right: -62px;
        bottom: -20px;
      }
    }
    .dateBg{
      width: 687px;
      height: 742px;
      background: url('@/pages/celebration/assets/mk10_10.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 400px;
      pointer-events: none;
    }
    .dateArea{
      height: 220px;
      width: 660px;
      overflow-y: hidden;
      overflow-x: scroll;
      overscroll-behavior: none;
      margin: 20px auto 0 auto;
      position: relative;
      .dateItem{
        width: 152px;
        height: 152px;
        background: url('@/pages/celebration/assets/mk10_7.png') no-repeat left top/100% 100%;
        text-align: center;
        line-height: 140px;
        font-size: 22px;
        color: #D9CCFF;
        display: inline-block;
        position: relative;
        &.active{
          width: 161px;
          height: 160px;
          background: url('@/pages/celebration/assets/mk10_6.png') no-repeat left top/100% 100%;
          color: #fff;
        }
        &:nth-of-type(odd){
        }
        &:nth-of-type(even){
          top: 60px;
          margin: 0 -30px;
        }
      }
    }
    .highMomentArea{
      width: 644px;
      height: 333px;
      background: url('@/pages/celebration/assets/mk10_26.png') no-repeat left top/100% 100%;
      margin: 0 auto;
      position: relative;
      .highMomentTitle{
        font-weight: 800;
        font-size: 32px;
        color: #8E6CFD;
        background: linear-gradient(-90deg, #C663FF 2.1484375%, #9B5EFF 80.1513671875%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: absolute;
        left: 50%;
        top: 40px;
        transform: translate(-50%, -50%);
      }
      .highMomentText{
        font-weight: 400;
        font-size: 28px;
        color: #6E56E7;
        line-height: 44px;
        position: absolute;
        left: 50%;
        top: 170px;
        transform: translate(-50%, -50%);
        p{
          text-align: center;
        }
        i{
          color: #F552AE;
        }
      }
      .highMomentProcess{
        width: 559px;
        height: 36px;
        background: #8F77ED;
        border-radius: 15px;
        border: 3px solid #F2F1FF;
        position: absolute;
        left: 50%;
        top: 280px;
        transform: translate(-50%, -50%);
        .highMomentProcessNow{
          width: 556px;
          height: 30px;
          background: linear-gradient(0deg, #F951C8, #FFA6E9);
          border-radius: 12px;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .highMomentProcessText{
          font-weight: 400;
          font-size: 24px;
          color: #FFFFFF;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .totalRankArea{
      max-height: 1200px;
      overflow-x: hidden;
      overflow-y: scroll;
      // overscroll-behavior: none;
      .totalRankTop3{
        height: 500px;
        position: relative;
        .totalRankTop3Item{
          &:nth-of-type(1) {
            width: 266px;
            height: 482px;
            background: url('@/pages/celebration/assets/mk10_12.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 100px;
            &.longSp{
              background: url('@/pages/celebration/assets/mk10_12_1.png') no-repeat left top/100% 100%;
            }
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/pages/celebration/assets/mk10_11.png') no-repeat left top/100% 100%;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: -100px;
            }
            .tRIAvatar{
              width: 130px;
              height: 130px;
            }
            .tRIName{
              bottom: 320px;
            }
            .tRICode{
              bottom: 280px;
            }
            .tRITime{
              bottom: 220px;
            }
          }
          &:nth-of-type(2) {
            width: 266px;
            height: 482px;
            background: url('@/pages/celebration/assets/mk10_14.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 10px;
            top: 210px;
            &.longSp{
              background: url('@/pages/celebration/assets/mk10_14_1.png') no-repeat left top/100% 100%;
            }
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/pages/celebration/assets/mk10_13.png') no-repeat left top/100% 100%;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: -100px;
            }
          }
          &:nth-of-type(3) {
            width: 266px;
            height: 482px;
            background: url('@/pages/celebration/assets/mk10_16.png') no-repeat left top/100% 100%;
            position: absolute;
            right: 10px;
            top: 210px;
            &.longSp{
              background: url('@/pages/celebration/assets/mk10_16_1.png') no-repeat left top/100% 100%;
            }
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/pages/celebration/assets/mk10_15.png') no-repeat left top/100% 100%;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: -100px;
            }
          }
          .tRIBg{
            pointer-events: none;
          }
          .tRIAvatar{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 26px;
            transform: translate(-50%, -50%);
          }
          .tRIName{
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            font-size: 26px;
            color: #FFFFFF;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 340px;
          }
          .tRICode{
            color: #FFEF85;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 300px;
          }
          .tRITime{
            font-weight: 400;
            font-size: 20px;
            color: #7452D3;
            text-align: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 244px;
          }
        }
      }
      .totalRankItem{
        width: 664px;
        height: 143px;
        background: url('@/pages/celebration/assets/mk10_18.png') no-repeat left top/100% 100%;
        margin: 0 auto 10px auto;
        position: relative;
        .totalRankItemIcon{
          width: 68px;
          height: 68px;
          font-weight: 500;
          font-size: 26px;
          color: #FFE683;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: url('@/pages/celebration/assets/mk10_20.png') no-repeat left top/100% 100%;
        }
        .totalRankItemAvatar{
          width: 80px;
          height: 80px;
          border-radius: 50px;
          border: 3px solid #DBC1FF;
          position: absolute;
          left: 100px;
          top: 50%;
          transform: translateY(-50%);
        }
        .totalRankItemName{
          width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          font-size: 26px;
          position: absolute;
          left: 200px;
          top: 32px;
          &.middleSp{
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .totalRankItemCode{
          font-weight: 400;
          font-size: 22px;
          color: #FFEF85;
          line-height: 30px;
          position: absolute;
          left: 200px;
          bottom: 30px;
          img{
            width: 52px*0.6;
            height: 43px*0.6;
            margin-right: 4px;
            vertical-align: middle;
          }
        }
        .totalRankItemTime{
          font-size: 24px;
          color: #FFFFFF;
          line-height: 34px;
          text-align: right;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          p{
            font-weight: 400;
            font-size: 22px;
            color: #8E45E9;
          }
          img{
            width: 35px;
            height: 40px;
          }
        }
      }
    }
    .myTotalRankArea{
      width: 715px;
      height: 147px;
      background: url('@/pages/celebration/assets/mk10_19.png') no-repeat left top/100% 100%;
      margin-bottom: 10px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .totalRankIcon{
        width: 68px;
        height: 67px;
        font-weight: 500;
        font-size: 22px;
        color: #FFF2A9;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: url('@/pages/celebration/assets/mk10_21.png') no-repeat left top/100% 100%;
      }
      .totalRankAvatar{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        border: 3px solid #DBC1FF;
        position: absolute;
        left: 110px;
        top: 50%;
        transform: translateY(-50%);
      }
      .totalRankName{
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 26px;
        position: absolute;
        left: 210px;
        top: 35px;
        &.middleSp{
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .totalRankCode{
        font-weight: 400;
        font-size: 22px;
        color: #FFEF85;
        line-height: 30px;
        position: absolute;
        left: 210px;
        bottom: 30px;
        img{
          width: 37px*.8;
          height: 31px*0.8;
          vertical-align: middle;
          margin: 0 5px 0 0;
        }
      }
      .isShowNameDiv{
        font-weight: 400;
        font-size: 22px;
        color: #FFEF85;
        display: flex;
        position: absolute;
        right: 50px;
        top: 40px;
        .isShowBtn{
          width: 58px;
          height: 29px;
          background: url('@/pages/celebration/assets/mk10_22.png') no-repeat left top/100% 100%;
          &.statusShow{
            background: url('@/pages/celebration/assets/mk10_23.png') no-repeat left top/100% 100%;
          }
        }
      }
      .totalRankTime{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 36px;
        text-align: right;
        position: absolute;
        right: 50px;
        bottom: 35px;
        &.middleSp{
          top: 50%;
          transform: translateY(-50%);
        }
        p{
          font-weight: 400;
          font-size: 22px;
          color: #8E45E9;
        }
        img{
          width: 35px;
          height: 40px;
        }
      }
    }
  }
  .toTopBtn{
    width: 140px;
    height: 140px;
    background: url('@/pages/celebration/assets/mk10_24.png') no-repeat left top/100% 100%;
    position: fixed;
    position: -webkit-fixed;
    right: 0px;
    bottom: 140px;
    z-index: 10;
  }
  .rewardsDetailBox{
    position: relative;
    .needWatchDiv{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      pointer-events: none;
    }
    .rewardsDetailTip1{
      width: 555px;
      height: 309px;
      background: url('@/pages/celebration/assets/mk10_27.png') no-repeat left top/100% 100%;
      margin: 0 auto;
    }
    .rewardsDetailTip2{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20px auto 20px auto;
      p{
        font-size: 26px;
        color: #6E56E7;
        line-height: 38px;
        position: relative;
        width: 580px;
        white-space: nowrap;
        text-align: left;
        span{
          width: 12px;
          height: 12px;
          display: inline-block;
          background: #DDA3FF;
          border-radius: 50%;
          position: absolute;
          left: -24px;
          top: 50%;
          transform: translateY(-50%);
        }
        i{
          font-weight: bold;
        }
      }
    }
    .rewardsDetailTip3{
      width: 644px;
      height: 204px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 100px;
      margin: 20px auto 20px auto;
      display: flex;
      justify-content: center;
      position: relative;
      .titlesDiv{
        width: 166px;
        height: 110px;
        background: linear-gradient(0deg, #8A7AE9, #7B52E4);
        border-radius: 12px;
        border: 4px solid #BDA2FA;
        margin: 30px 10px 0 10px;
      }
      .rewardsDetailTip3Text{
        font-weight: bold;
        font-size: 26px;
        color: #6E56E7;
        line-height: 38px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 14px;
      }
    }
    .rewardsDetailTip4{
      width: 555px;
      height: 309px;
      background: url('@/pages/celebration/assets/mk10_28.png') no-repeat left top/100% 100%;
      margin: 0 auto;
    }
    .rewardsDetailArea{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      // justify-content: space-evenly;
      @supports (justify-content: space-evenly) {
        & {
          justify-content: space-evenly; /* 支持 space-evenly 的浏览器使用这个值 */
        }
      }
      margin: 20px auto 0px auto;
      padding: 0 20px;
      .rewardsDivItem{
        display: flex;
        flex-direction: column;
        align-items: center;
        &.nSp{
          margin: 0 80px;
        }
        .nameDiv{
          width: 150px;
          height: 42px;
          background: rgba(166, 94, 233, 0.7);
          border-radius: 21px;
          text-align: center;
          line-height: 42px;
          font-size: 26px;
          &.nSp{
            width: 200px;
          }
        }
        .rewardsShowDiv{
          display: flex;
          flex-direction: row;
          margin: 20px 10px 100px 10px;
          justify-content: center;
          .reward{
            width: 120px;
            height: 120px;
            background: linear-gradient(0deg, #FFFFFF, #EECEFF);
            border-radius: 12px;
            border: 4px solid #BDA2FA;
            position: relative;
            margin: 0px 10px;
            &.spBordor{
              background: linear-gradient(0deg, #FFFFFF, #FFF3A1);
              border: 4px solid #FFC939;
            }
            .rewardItText{
              font-size: 22px;
              color: #6E56E7;
              line-height: 30px;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 120px;
              white-space: pre;
              text-align: center;
            }
            .rewardItActMark{
              background: #FF5980;
              border-radius: 15px;
              font-size: 20px;
              color: #FFFFFF;
              padding: 4px 5px 4px 10px;
              position: absolute;
              right: -20px;
              top: 0;
              transform: translateY(-50%);
            }
            .rewardPriceMark{
              background: linear-gradient(-90deg, #75B9FF, #FF84F8);
              border-radius: 17px;
              font-size: 20px;
              color: #FFFFFF;
              padding: 4px 5px 4px 10px;
              position: absolute;
              right: -20px;
              top: 0;
              transform: translateY(-50%);
              img{
                width: 27px;
                height: 20px;
                margin: 0 0px 0 2px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.spIText{
  color: #F552AE;
}
</style>
