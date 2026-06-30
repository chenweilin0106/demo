<template>
  <div ref="rankVue" class="rankVue">
    <div class="tabs_box flex position-relative justify-center margin-row-center" :class="`status${rankChosen}`">
      <div class="rankChosenBg h-100 flex-1" v-for="(item,index) in tabsArray" :key="index" @click="selectChosen(item.rank,1,todaySelectDate,true)"></div>
    </div>
    <!--<div class="needTopDiv" ref="needTopDivRef"></div>-->
    <OutBox class="rankBox position-relative">
      <div class="rankBoxBg position-absolute position-row-center pointer-none"></div>
      <!-- 日榜、总榜切换 -->
      <div :class="['tagChosenBg flex position-relative',`status${tagChosen}`]">
        <div class="flex-1 h-100" @click="selectChosen(rankChosen, 1, todaySelectDate)"></div>
        <div class="flex-1 h-100" @click="selectChosen(rankChosen, 2)"></div>
      </div>
      <!--奖励列表-->
      <div class="rewardsTip position-relative"></div>
      <div :key="`${rankChosen}_${tagChosen}`" :class="['rewardsShowArea flex align-center justify-center position-relative',`status${rankChosen}`]">
        <div class="rewardItem position-relative" :class="rewardsList[`${rankChosen}${tagChosen}`].length>=4?'smallMargin':''" v-for="(item) in rewardsList[`${rankChosen}${tagChosen}`]" :key="item.id" @click="previewImgCk(item)">
          <div :class="['rewardIcon position-absolute position-row-center', `${item.type}Sp`]">
            <PublicImg :imgName="item.icon" :imgType="item.type" />
          </div>
          <div class="rewardText radius-999 position-absolute position-row-center w-100 text-center line-height-1 flex align-center justify-center">{{item.text}}<img v-if="item.quality" :src="IconPath(item.quality)" class="qualityIcon" alt="" /></div>
          <div class="rewardPreview position-row-center position-absolute" v-if="item.previewImg"></div>
          <div class="rewardMark position-absolute radius-999" v-if="item.mark">{{item.mark}}<img :src="IconPath('zs_42_32.png')" alt="" /></div>
          <div v-if="item.mark1" class="doublePersonMark position-absolute"></div>
          <div v-if="item.isNew" class="newMark flex align-center justify-center position-absolute pointer-none">新</div>
        </div>
      </div>
      <!-- 日期选择 -->
      <div v-if="tagChosen==1" class="dayBox position-absolute flex-column align-center">
        <div class="rb_dateDiv justify-center flex align-center position-relative line-height-1" @click.stop="exchangeDateShow">
          <div v-for="(item, index) in day_list" :key="index + item">
            <span v-if="selectDate[rankChosen]==index">{{item}}</span>
          </div>
          <div :class="['rb_dateListsIcon position-absolute', `status${isShowDateList}`]"></div>
        </div>
        <div v-if="isShowDateList" class="rb_dateListArea flex position-relative justify-center">
          <div ref="rb_dateListDivRef" class="rb_dateListDiv position-relative flex-column align-center overflow-y-scroll overflow-x-hidden overscroll-none">
            <div v-for="(item, index) in day_list" :key="index + item" class="rb_dateListItem flex align-center justify-center line-height-1 flex-shrink-0 position-relative" @click.stop="selectChosen(rankChosen, tagChosen, index)">
              <span>{{item}}</span>
              <div class="rb_dateListItemChosen position-absolute" v-if="index==selectDate[rankChosen]"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 榜单 -->
      <div class="rulesBtn position-absolute" @click="isShowRulesPopup=true"></div>
       <RankCom1 v-if="rankChosen==1" ref="rankCom1Ref" :rankListShow="rankListShow" :userRankShow="userRankShow" :tagChosen="tagChosen" :rankChosen="rankChosen" @isShowBtnCk="isShowBtnCk" />
       <RankCom2 v-if="rankChosen==2" ref="rankCom2Ref" :rankListShow="rankListShow" :userRankShow="userRankShow" :tagChosen="tagChosen" :rankChosen="rankChosen" @isShowBtnCk="isShowBtnCk" />
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间绑定用户互送钻石礼物、表白、参与<img :src="IconPath('mk7_51.png')" class="icon2 position-absolute position-column-center" @click="routerJump('/gift')" /></li>
          <li>送出花盒可获得【宠爱值】，1钻石=1宠爱值</li>
          <li><span></span>日榜为每日新增宠爱值排行榜，总榜为活动期间累</li>
          <li>计宠爱值排行榜</li>
          <li><span></span>同服绑定的用户进入本服榜单，跨服绑定的用户进</li>
          <li>入跨服榜单</li>

          <!-- <li v-show="rankChosen==1"><span></span>荣誉社员榜为<i>活动期间赠送钻石礼物总价值排行榜</i>，</li> -->
          <!-- <li v-show="rankChosen==1">1钻石=10荣誉值，榜单分服统计</li> -->

          <!-- <li v-show="rankChosen==1"><span></span>人气榜日榜为用户获赠钻石礼物总价值排行榜，榜</li> -->
          <!-- <li v-show="rankChosen==1">单分服统计，自己赠送自己计算在内</li> -->

          <!-- <li v-show="rankChosen==1"><span></span>魔力榜日榜为每日用户单人/组队新增魔力值排行</li> -->
          <!-- <li v-show="rankChosen==1">榜，榜单分服统计</li> -->

          <!-- <li v-show="rankChosen==2"><span></span>风云榜为活动期间<i>本服用户赠送钻石礼物</i>排行榜，</li> -->
          <!-- <li v-show="rankChosen==2">榜单分服统计，自己赠送自己计算在内</li> -->

          <!-- <li v-show="rankChosen==2"><span></span>最强神豪榜为活动期间<i>本服用户累计充值</i>排行榜，</li> -->
          <!-- <li v-show="rankChosen==2">榜单分服统计</li> -->

          <!-- <li v-show="rankChosen==2"><span></span>神豪榜为活动期间<i>本服用户累计充值</i>排行榜，日榜为单日充</li> -->
          <!-- <li v-show="rankChosen==2">值排行榜，榜单分服统计</li> -->

          <!-- <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li> -->

          <!-- <li v-show="rankChosen==1"><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li> -->
          <!-- <li v-show="rankChosen==1">基础魅力值，魅力值上限提高50%</li> -->

          <!-- <li v-show="rankChosen==1"><span></span>活动期间收到钻石礼物，送收双方同享双倍经验值；收礼方</li> -->
          <!-- <li v-show="rankChosen==1">还可获双倍基础魅力值，魅力值上限提高50%（与其他活动</li> -->
          <!-- <li v-show="rankChosen==1">效果不叠加）</li> -->

          <!-- <li v-show="rankChosen==2"><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li> -->
          <!-- <li v-show="rankChosen==2">卡不计算在内</li> -->
        </ul>
      </div>
    </OutBox>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="isShowPreviewPopup = false" />
    <RulesPopup v-if="isShowRulesPopup" :rankChosen="rankChosen" @clickClose="isShowRulesPopup = false" />
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { scrollToHeight, _throttle } from '@/utils/tool'
import PreviewPopup from './previewPopup.vue'
import RulesPopup from './rulesPopup.vue'
import RankCom1 from './rankCom1.vue'
import RankCom2 from './rankCom2.vue'

export default {
  name: 'rankVue',
  components: { PreviewPopup, RulesPopup, RankCom1, RankCom2 },
  data() {
    return {
      tabsArray: Object.freeze([{ rank: 1, tabName: '人气榜' }, { rank: 2, tabName: '神豪榜' }]),
      rankChosen: 1, // 榜单 1-人气榜 2-神豪榜 用于数据请求/rewardsList（奖励列表）/selectDate（默认日期）/榜单滚动（榜单滚动需要同时配置rankCom${rankChosen}Ref）
      tagChosen: 1, // 榜单选择: 1:日榜 2:总榜
      rewardsList: Object.freeze({
        11: [
          // { id: 311, type: 'title', icon: 'ch_csjd', text: '称号', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 311, type: 'title', icon: 'ch_csjd', text: '属性称号', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 111, type: 'pst_privilege', icon: 'sjdw_120_120.png', text: '礼物赠送权', mark: '888', previewImg: 'gift_sjdw.png', previewTip1: '商界帝王·礼物赠送权', mark1: false, isNew: false },
          // { id: 121, type: 'costume', icon: 'qqjcl_120_120.png', text: '主页特效', mark: '', previewImg: 'zyp_qqjcl.svga', previewTip1: '千骑卷尘来·主页特效', mark1: '', isNew: false },
          // { id: 321, type: 'chat_bubble', icon: 'qp_xdsk_sc', text: '私聊气泡', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 421, type: 'chat_bubble_pub', icon: 'fhjb_120_120.png', text: '公屏气泡', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 111, type: 'world_msg_skins', icon: 'wysk_120_120.png', text: '世界消息皮肤', previewImg: 'tk_17.png', previewTip1: '无垠深空·世界消息皮肤', mark1: false, isNew: true }
          // { id: 121, type: 'voice', icon: 'sb_tyzd', text: '声波', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 121, type: 'car', icon: 'axcp_120_120.png', text: '座驾', mark: '', previewImg: 'car_axcp.svga', previewTip1: '爱心敞篷·双人座驾', mark1: true },
          // { id: 122, type: 'mic', icon: 'ts_llbw.svga', text: '头饰', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 121, type: 'ring', icon: 'jz_qqmx.svga', text: '戒指', mark: '', previewImg: 'jz_qqmx.svga', previewTip1: '奇趣萌行·戒指', mark1: true },
          // { id: 123, type: 'room_dec_suit', icon: 'ymmg_120_120.png', text: '房间装扮', mark: '', previewImg: '2025_520_tk_54.svga', previewTip1: '夜幕玫瑰·房间装扮' },
          // { id: 112, type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 122, type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 212, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 122, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          // { id: 123, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false }
          // { id: 223, type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false }
          // { id: 124, type: 'tool', icon: 'cplh_120_120.png', text: 'CP靓号', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false }
          { id: 111, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          { id: 112, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
        ],
        12: [
          { id: 121, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          { id: 122, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false }
        ],
        21: [
          { id: 211, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          { id: 212, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false }
        ],
        22: [
          { id: 221, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false },
          { id: 222, type: '', icon: '', text: '', mark: '', previewImg: '', previewTip1: '', mark1: false, isNew: false }
        ]
      }), // 榜单奖励列表
      day_list: { 20250516: '05月16日', 20250517: '05月17日', 20250518: '05月18日', 20250519: '05月19日', 20250520: '05月20日', 20250521: '05月21日', 20250522: '05月22日', 20250523: '05月23日' }, // 日期列表
      todaySelectDate: 20250516, // 当天日期
      selectDate: { 1: 20250516, 2: 20250516 }, // 所选日期
      isShowDateList: false, // 是否显示日期选择列表
      rankListShow: [
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 1, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 2, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 3, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 4, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 5, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 6, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 7, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 8, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 9, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 10, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 11, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 12, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 13, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 14, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 15, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 16, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 17, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 18, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 19, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 20, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1', time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } }
      ], // 展示榜单
      userRankShow: { uid: 0, code: 0, hide_name: false, is_show_name: 1, pretty_type: 0, tuid_pretty_type: 0, username: '虚位以待', profile_image: '', num: 0, tuid: 0, tusername: '虚位以待', tprofile_image: '', relation: 0, fans: { fans_uid: 0, fans_username: '虚位以待', fans_profile_image: '' }, time: 0, diff: 0, score: 0, pet_info: { id: 1, category: '1', subcategory: '1', quality: 0, current_stage: '0', feature_list: { change_one: '0', change_two: '0', change_three: '0' } } }, // 个人排名展示
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowRulesPopup: false // 规则弹窗
    }
  },
  created() {
    try {
      axios({ url: `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/car_qlpt.svga`, method: 'get', responseType: 'arraybuffer' })
    } catch (error) {
      console.log(error)
    }
    if (this.$route.query.rankChosen) this.rankChosen = this.$route.query.rankChosen
    if (this.$route.query.tagChosen) this.tagChosen = this.$route.query.tagChosen
    this.getHomePage()
  },
  mounted() {
    if (this.$route.query.scroll) scrollToHeight(this.$refs.rankVue.getBoundingClientRect().top)
  },
  methods: {
    routerJump(path) {
      scrollToHeight('top')
      this.$nextTick(() => this.$router.replace({ path }))
    },
    getScene(arr) {
      return arr.find(item => item.component_id == 4)?.small_icon
    },
    /**
     * 获取页面数据
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm8' }).then((res) => {
        if (res.errno == 0) {
          this.day_list = res.data.day_list
          this.todaySelectDate = Number(res.data.select_date)
          for (let index in this.selectDate) {
            this.selectDate[index] = res.data.select_date
          }
          this.selectChosen(this.rankChosen, this.tagChosen, this.selectDate[this.rankChosen])
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 切换榜单 新版本
     */
    selectChosen(r, t, date, isThinking = false) {
      this.isShowDateList = false
      if (isThinking) this.$thinking.track('WebClick', { module: '问鼎江山', element: this.tabsArray[r - 1].tabName })
      getPageData({ type: 'sweet_top_get_rank_list', mark: { type: t, category: r, date: date || this.todaySelectDate } }).then((res) => {
      // musicModFourApi({ type: 'get_rank', rank_category: r, rank_type: t, date: date || this.todaySelectDate }).then((res) => {
        if (res.errno) return this.$toast(res.errmsg)
        this.rankChosen = r
        this.tagChosen = t
        if (this.tagChosen == 1) this.selectDate[this.rankChosen] = date || res.data.select_date // 日榜 存储日期数据
        this.rankListShow = res.data.rank_list
        this.userRankShow = res.data.my_rank ? res.data.my_rank : { ...res.data.user_info, time: res.data.my_score }
        this.findUserRankInList() // 查找用户在榜单中的排名
        this.$nextTick(() => this.$refs[`rankCom${this.rankChosen}Ref`].scrollRank()) // 还原榜单滚动
      })
    },
    /**
     * 切换榜单 老版本
     */
    // selectChosen(r, t, date, isThinking = false) {
    //   this.isShowDateList = false
    //   const rankStrategies = {
    //     1: () => getPageData({ type: 'white_love_daily_rank', mark: { rank_type: r, date: date || this.todaySelectDate } }), // 日榜 多个榜单需要mark字段
    //     2: () => getPageData({ type: 'white_love_tot_rank', mark: r }) // 总榜 多个榜单需要mark字段
    //   }
    //   if (!rankStrategies[t]) return console.log('切换榜单数据错误')
    //   if (isThinking) this.$thinking.track('WebClick', { module: '问鼎江山', element: this.tabsArray[r - 1].tabName })
    //   rankStrategies[t]().then((res) => {
    //     if (res.errno) return this.$toast(res.errmsg)
    //     this.rankChosen = r
    //     this.tagChosen = t
    //     if (this.tagChosen == 1) this.selectDate[this.rankChosen] = date || res.data.select_date // 日榜 存储日期数据
    //     this.rankListShow = res.data.rank_list
    //     this.userRankShow = res.data.my_rank ? res.data.my_rank : { ...res.data.user_info, time: res.data.my_score }
    //     if (res.data.hide_name) this.userRankShow.hide_name = res.data.hide_name
    //     this.findUserRankInList() // 查找用户在榜单中的排名
    //     this.$nextTick(() => this.$refs[`rankCom${this.rankChosen}Ref`].scrollRank()) // 还原榜单滚动
    //   })
    // },
    /**
     * 在榜单中查找用户排名
     */
    findUserRankInList() {
      if (!this.userRankShow.uid) return console.log('未获取到用户uid')
      const list = this.rankListShow
      for (let i = 0; i < list.length; i++) {
        if (list[i].uid == this.userRankShow.uid) return (this.userRankShow.rank = list[i].rank)
      }
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.previewImg) {
        this.configPreviewPopup = { type: item.type, img: item.previewImg, tip1: item.previewTip1 }
        this.isShowPreviewPopup = true
      }
    },
    /**
     * 展示日期选择框
     */
    exchangeDateShow() {
      this.isShowDateList = !this.isShowDateList
      this.$nextTick(() => {
        if (this.isShowDateList === true) {
          let man = this.$refs.rb_dateListDivRef
          let i = 0
          for (let index in this.day_list) {
            i++
            if (this.selectDate[this.rankChosen] == index) break
          }
          let len = document.getElementsByClassName('rb_dateListItem')[0].clientHeight * (Number(i) - 3)
          man.scrollTo({ top: len, behavior: 'smooth' })
        }
      })
    },
    /**
     * 切换是否公开昵称 新版本
     */
    isShowBtnCk: _throttle(function() {
      getPageData({ type: 'white_love_top_name_set', mark: this.userRankShow.is_show_name == 1 ? '2' : '1' }).then((res) => {
      // getPageData({ type: 'set_name', mark: this.userRankShow.is_show_name == 1 ? '2' : '1' }).then((res) => {
        if (res.errno == 0) {
          this.selectChosen(this.rankChosen, this.tagChosen, this.selectDate[this.rankChosen])
        } else {
          this.$toast(res.errmsg)
        }
      })
    })
    /**
     * 切换是否公开昵称 老版本
     */
    // isShowBtnCk: _throttle(function() {
    //   getPageData({ type: 'white_love_top_name_set', mark: this.userRankShow.hide_name ? '2' : '1' }).then((res) => {
    //     if (res.errno == 0) {
    //       this.selectChosen(this.rankChosen, this.tagChosen, this.selectDate[this.rankChosen])
    //     } else {
    //       this.$toast(res.errmsg)
    //     }
    //   })
    // })
  }
}
</script>

<style scoped lang="scss">
.rankVue {
  .tabs_box {
    // margin-top: -70px;
    width: 507px;
    height: 123px;
    padding: 0 30px;
    transition: all 0.3s;
    &.status1{
      background: url('@/pages/618/assets/mk6_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/618/assets/mk6_2.png') no-repeat left top/100% 100%;
    }
  }
  .rankBox{
    margin-top: 4px;
    .rankBoxBg{
      width: 690px;
      height: 2094px;
      background: url('@/pages/520/assets/mk7_8.png') no-repeat left top/100% 100%;
      top: 15px;
    }
    .tagChosenBg{
      width: 526px;
      height: 59px;
      margin: 0 auto 20px;
      transition: all 0.3s;
      &.status1{
        background: url('@/pages/520/assets/mk7_3.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/520/assets/mk7_4.png') no-repeat left top/100% 100%;
      }
    }
    .rewardsTip{
      width: 513px;
      height: 37px;
      background: url('@/pages/520/assets/mk7_5.png') no-repeat left top/100% 100%;
      margin: 30px auto 20px;
    }
    .rewardsShowArea{
      margin: 0 auto;
      padding: 18px 0 27px;
      background: url('@/pages/520/assets/mk7_6.png') no-repeat left top/100% 100%;
      width: 625px;
      height: 193px;
      .rewardItem{
        width: 148px;
        height: 128px;
        background: linear-gradient(180deg, #FFE3CF, #FFFFFF);
        -webkit-background-origin: padding-box;
        -webkit-background-clip: padding-box;
        border-radius: 12px;
        border: 4px solid #F79A81;
        margin: 10px 20px;
        z-index: 1;
        &.smallMargin{
          /* width: 138px; */
          margin: 10px 8px;
        }
        .rewardIcon{
          top: 0;
          z-index: 1;
          width: 100%;
          height: 95px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          //&.micSp, &.titleSp, &.ringSp, &.voiceSp{
          //  width: 100%;
          //  height: 95px;
          //}
          .imgCompo {
            z-index: -1;
            width: 100%;
            height: 120px;
          }
        }
        .rewardText{
          z-index: 2;
          height: 34px;
          background: #D2635E;
          padding: 0 10px;
          font-size: 22px;
          color: #FFFFFF;
          top: 100px;
          .qualityIcon {
            width: auto;
            height: 28px;
            margin-left: 8px;
          }
        }
        .rewardPreview{
          z-index: 2;
          width: 140px;
          height: 26px;
          background: url('@/pages/520/assets/mk7_49.png') no-repeat left top/100% 100%;
          top: 69px;
        }
        .rewardMark {
          position: absolute;
          z-index: 2;
          right: -10px;
          top: 0;
          transform: translateY(-50%);
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 999999999px;
          font-size: 20px;
          font-weight: 500;
          color: #FFFFFF;
          padding: 6px 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          img{
            width: 27px;
            height: 20px;
            margin: 0 0 0 2px;
          }
        }
        .newMark {
          z-index: 2;
          top: -13px;
          left: -12px;
          width: 44px;
          height: 36px;
          background: linear-gradient(-90deg, #ff7fa6, #fd5ab6);
          border-radius: 18px 19px 0px 18px;
          font-weight: 500;
          font-size: 22px;
          color: #ffffff;
        }
        .doublePersonMark{
          z-index: 2;
          width: 56px;
          height: 32px;
          background: url('@/pages/520/assets/mk7_14.png') no-repeat left top/100% 100%;
          top: 0;
          transform: translateY(-50%);
          left: -4px;
        }
      }
    }
    .dayBox{
      top: 370px;
      left: -9px;
      z-index: 3;
      width: 220px;
      .rb_dateDiv{
        z-index: 2;
        padding-top: 1px;
        width: 220px;
        height: 75px;
        background: url('@/pages/springFestival/assets/mk6_9.png') no-repeat left top/100% 100%;
        font-weight: bold;
        font-size: 26px;
        color: #AD7E1A;
        .rb_dateListsIcon{
          width: 29px;
          height: 15px;
          right: 23px;
          top: 29px;
          &.statusfalse{
            background: url('@/pages/springFestival/assets/mk6_11.png') no-repeat left top/100% 100%;
          }
          &.statustrue{
            background: url('@/pages/springFestival/assets/mk6_10.png') no-repeat left top/100% 100%;
          }
        }
      }
      .rb_dateListArea{
        z-index: 1;
        margin-top: -11px;
        width: 168px;
        height: fit-content;
        border-radius: 20px;
        border: 8px solid transparent;
        border-top-width: 10px;
        border-bottom-width: 10px;
        background: linear-gradient(0deg, #FFF7D6, #FFFFFF), linear-gradient(0deg, #FFC62D, #FFC62D);
        background-origin: padding-box, border-box;
        background-clip: padding-box, border-box;
        box-shadow: 0 0 13px 0 #FFC62D;
        .rb_dateListDiv{
          z-index: 1;
          flex-shrink: 0;
          width: 220px;
          border-radius: 18px;
          height: fit-content;
          max-height: 279px;
          .rb_dateListItem{
            z-index: 1;
            width: 141px;
            height: 53px;
            padding-top: 2px;
            border-bottom: 2px solid #EFD48D;
            font-weight: bold;
            font-size: 26px;
            color: #AD7E1A;
            &:last-child{
              border-bottom: none;
            }
            .rb_dateListItemChosen{
              z-index: 2;
              top: 7px;
              right: -28px;
              width: 45px;
              height: 35px;
              background: url('@/pages/springFestival/assets/mk6_12.png') no-repeat left top/100% 100%;
            }
          }
        }
      }
    }
    .rulesBtn{
      z-index: 2;
      width: 70px;
      height: 185px;
      background: url('@/pages/520/assets/mk7_7.png') no-repeat left top/100% 100%;
      right: -11px;
      top: 198px;
    }
  }
  .rules-text{
    margin-top: 15px;
    .icon2{
      right: 0;
      transform: translateX(50%) translateY(-50%);
      width: 75px;
      height: 72px;
    }
  }
}
</style>
