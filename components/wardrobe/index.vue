<template>
  <div class="wardrobe">
    <WheelDisc :config="{ticket_nums,is_free,invite_red_point,half_card,task_point_st}" :configPreviewPopup="configPreviewPopup" @update="getPageData" />
    <OutBox title="title_9.png" class="bind position-relative">
      <div class="tip flex justify-center line-height-1">单人/组队达到进度即可领取奖励</div>
      <div class="lookRank position-absolute" @click="toRank"></div>
      <div class="usersBox margin-row-center position-relative" :class="`status${intimate_type}`">
        <div class="user1 flex-column align-center position-absolute position-column-center">
          <div class="avatarBox">
            <img class="radius-50 fit-cover block avatar" :src="pair_info[0]?.profile_image||IconPath('avatarDefault.png')" @error="imgAtError" @click="toUserMain(pair_info[0]?.id)" />
          </div>
          <div class="username text-center ellipsis">{{pair_info[0]?.username}}</div>
        </div>
        <div class="user2 flex-column align-center position-absolute position-column-center">
          <div class="avatarBox" @click="bind">
            <div v-if="!pair_status" class="add"></div>
            <img v-else class="radius-50 fit-cover block avatar" :src="pair_info[1]?.profile_image||IconPath('avatarDefault.png')" @error="imgAtError" @click.stop="toUserMain(pair_info[1]?.id)" />
          </div>
          <div class="username text-center ellipsis">{{pair_status?pair_info[1].username:'邀请好友绑定'}}</div>
        </div>
      </div>
      <div class="nums radius-999 ellipsis text-center line-height-1 width-fit margin-row-center">累计魔力值：{{tot_magic}}</div>
      <StepProgress :tot_num="tot_magic" :tot_list="tot_awards" @openReceivePopup="openReceivePopup" />
    </OutBox>
    <div class="dating position-relative">
      <img :src="IconPath('title_10.png')" class="titleIcon pointer-none position-absolute" />
      <div class="datingIcon position-absolute pointer-none"></div>
      <!--提示文本-->
      <p class="p1 flex align-center justify-center text-center">活动结束后系统将保留玩家在活动中获取的<br>形象部件，未来的装扮活动仍可使用</p>
      <!--尝鲜礼包-->
      <div class="giftBtn position-absolute" @click="openGiftPopup"></div>
      <!--tab-->
      <div class="tabs flex position-absolute" :class="`status${pictureMode}`">
        <div class="flex-1" @click="pictureMode=1"></div>
        <div class="flex-1" @click="pictureMode=2"></div>
      </div>
      <!--轮播图-->
      <template v-if="!my_virtual_status">
        <van-swipe class="my-swipe" :autoplay="2000" :touchable="false" :show-indicators="false" lazy-render>
          <van-swipe-item v-for="(item,index) in configPreviewPopup" :key="index"><img v-lazy="IconPath(item.icon)" class="w-100 h-100" /></van-swipe-item>
        </van-swipe>
        <!--立即创建按钮-->
        <div class="createBtn position-absolute position-row-center" @click="createVirtual"></div>
      </template>
      <!--场景-->
      <lazy-component v-else class="scene margin-row-center position-relative">
        <Back :config="pictureMode==2?my_virtual_info:local_virtual_info" />
        <!--人物显示范围限制-->
        <div class="restrict overflow-hidden position-absolute">
          <div :class="`person1 position-absolute ${pictureMode==2&&pair_virtual_status?'both':''}`"><Person :config="pictureMode==2?my_virtual_info:local_virtual_info" :animation="!isTaking" eyes /></div>
          <keep-alive>
            <div v-if="pictureMode==2&&pair_virtual_status" class="person2 position-absolute"><Person :config="pair_virtual_info" :animation="!isTaking" eyes /></div>
          </keep-alive>
        </div>
        <!--用户信息侧边栏-->
        <div class="leftSide position-absolute line-height-1 flex-column align-center overflow-hidden">
          <!--当前用户-->
          <div class="userInfo flex-column align-center">
            <div class="avatarBox overflow-hidden">
              <img class="radius-50 fit-cover block avatar" :src="pair_info[0]?.profile_image||IconPath('avatarDefault.png')" @error="imgAtError" crossorigin="anonymous" @click="toUserMain(pair_info[0]?.id)" />
            </div>
            <div v-if="pair_info[0]?.username" class="username w-100 text-center flex-shrink-0">{{textLengthLimit(pair_info[0]?.username,4)}}</div>
          </div>
          <template v-if="pictureMode==2">
            <!--类型-->
            <div class="friendType margin-row-center">
              <img v-if="pair_status" :src="IconPath(friendTypeMap[intimate_type])" crossorigin="anonymous" class="w-100 h-100" />
            </div>
            <!--绑定用户-->
            <div class="userInfo flex-column align-center friend">
              <div class="avatarBox overflow-hidden">
                <img class="radius-50 fit-cover block avatar" crossorigin="anonymous" :src="IconPath(pair_status?pair_info[1]?.profile_image||'avatarDefault.png':'mk6_44.png')" @error="imgAtError" @click="toUserMain(pair_info[1]?.id)" />
              </div>
              <div class="username w-100 text-center">{{pair_status?textLengthLimit(pair_info[1]?.username,4):'当前未组队'}}</div>
            </div>
          </template>
        </div>
        <!--右侧菜单-->
        <div class="rightMenu position-absolute line-height-1 flex-column align-center overflow-hidden" data-html2canvas-ignore>
          <div v-show="pictureMode==1" class="resetBtn" :class="isDisabledRest?'':'disabled'" @click="isShowResetPopup=true"></div>
          <div v-show="pictureMode==1" class="saveBtn" :class="isDisabledSave?'':'disabled'" @click="save"></div>
          <div class="shareBtn" @click="productImage"></div>
        </div>
      </lazy-component>
      <!--提示文本-->
      <p class="p2 line-height-1 position-absolute position-row-center">{{pictureMode==1?'创造你的虚拟形象，来记录这个美好春天吧！':'与最默契的TA，一起合拍吧！'}}</p>
      <!-- <p class="p2 line-height-1 position-absolute position-row-center flex align-center">
        <template v-if="pictureMode==1">创造你的虚拟形象，来记录这个"520"吧！</template>
        <template v-if="pictureMode==2">
          <template v-if="pair_status">与最宠爱的TA，一起合拍吧！</template>
          <template v-else>你还没有绑定活动CP，快去绑定吧！<PublicButton class="jumpBtn" hasRight="9" @click="routerJump('/manual')">前往绑定</PublicButton></template>
        </template>
      </p> -->
      <!--衣柜tab-->
      <div v-show="pictureMode==1" class="wardrobeTabs position-relative">
        <!--<div v-if="tabsArr.length" class="scrollBox position-absolute position-column-center h-100 flex align-center">-->
        <div v-for="(item,index) in tabsArr" :key="index" class="flex align-center justify-center line-height-1 flex-shrink-0" :class="item.component_id==wardrobeMode?'active':''" @click="wardrobeMode=item.component_id">
          {{item.name}}</div>
        <!--</div>-->
      </div>
      <!--衣柜背包-->
      <div v-show="pictureMode==1" class="backpack">
        <!--提示文本-->
        <p class="p3 text-center">点击已获得的元素即可进行装扮/取消装扮，<br>已经装扮好的搭配，记得保存哦~</p>
        <!--列表-->
        <div class="clothesList position-relative overflow-y-scroll overflow-x-hidden flex flex-wrap">
          <div v-for="(item,index) in allObject[wardrobeMode].list" :key="`${item.part_type}_${item.material_id}_${index}`" class="clothe flex-shrink-0 position-relative flex justify-center line-height-1" :class="[`status_${item.has_right}`,`${my_virtual_status?'':'noCreate'}`,item.has_right!=0?`quality_${item.quality}`:'']" @click="chooseClothe(item)">
            <template v-if="item.part_type!='empty'&&item.material_id!='empty'">
              <div class="icon position-relative"><img v-lazy="IconPath(item.icon)" class="" /></div>
              <div class="text position-absolute position-row-center">{{item.material_name}}</div>
            </template>
          </div>
        </div>
      </div>
      <!--合照底部提示文本-->
      <div v-show="pictureMode==2" class="p4 position-relative flex align-center">
        <div class="rules-text">
          <ul>
            <li><span></span>双方均保存形象后即可合拍</li>
            <li><span></span>合拍背景及元素为玩家本人的效果</li>
          </ul>
        </div>
      </div>
    </div>
    <Buy ref="buy" :config="configBuy" @update="getPageData" />
    <BindPopup v-if="isShowBindPopup" :config="configBindPopup" @update="getPageData" @clickClose="isShowBindPopup=false" />
    <ResetPopup v-if="isShowResetPopup" @confirm="reset" @clickClose="isShowResetPopup=false" />
    <PicturePopup v-if="isShowPicturePopup" :config="configPicturePopup" @clickClose="isShowPicturePopup=false;configPicturePopup=null" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toUserMain } from '@/utils/toApp'
import { imgAtError, textLengthLimit, getStorage, setStorage, _throttle } from '@/utils/tool'
import { getPageData } from '@/api'
import html2canvas from 'html2canvas'
import Buy from './components/buy.vue'
import WheelDisc from './components/wheelDisc.vue'
import StepProgress from './components/stepProgress.vue'
import Person from './components/person.vue'
import Back from './components/back.vue'
import ResetPopup from './components/resetPopup.vue'
import PicturePopup from './components/picturePopup.vue'
import ReceivePopup from './components/receivePopup.vue'
import BindPopup from './components/bindPopup.vue'

export default {
  name: 'wardrobeVue',
  props: [''],
  components: { Buy, ReceivePopup, PicturePopup, Back, ResetPopup, StepProgress, WheelDisc, Person, BindPopup },
  data() {
    return {
      money: 0, // 现金余额
      bug_gift_list: [{ gift_id: 6, price: 6, apple_id: 'new_active_6', goods_type: 'active_bingo', status: 1 }],
      gender: '0',
      user_icon: '',
      username: '',
      task_point_st: false, // 每日任务小红点
      invite_red_point: false, // 邀请小红点
      is_free: true,
      consume: 0,
      ticket_nums: 0,
      half_card: false,
      intimate_type: 0, // 亲密关系
      pair_status: false,
      pair_info: [{ username: '虚位以待', uid: 0, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,h_100,m_fill' }],
      tot_magic: 0,
      tot_awards: [
        { id: 170, need_num: 170, award: { id: 0, type: 'half_rate_card', nums: 1, name: '首次10连5折券', unit: '', icon: 'scslzkq_120_120.png' }, has_right: 0 },
        { id: 410, need_num: 410, award: { id: 0, type: 'luck_key', nums: 1, name: '钥匙', unit: '', icon: 'xyys_120_120.png' }, has_right: 0 },
        { id: 625, need_num: 625, award: { id: 0, type: 'pretty_card', nums: 5, name: '靓号券', unit: '天', icon: 'lhq_120_120.png' }, has_right: 0 },
        { id: 1270, need_num: 1270, award: { id: 142, type: 'tool', nums: 600, name: '精粹', unit: '', icon: 'fsjc_120_120.png' }, has_right: 0 },
        { id: 1920, need_num: 1920, award: { id: 158, type: 'tool', nums: 15, name: '藏宝图', unit: '', icon: 'cbt_120_120.png' }, has_right: 0 },
        { id: 2350, need_num: 2350, award: { id: 5170, type: 'title', nums: 7, name: '【甜蜜双排】属性称号', unit: '', icon: 'mp_tmsp' }, has_right: 0 }
      ],
      my_virtual_status: false, // 当前用户是否开启虚拟形象
      my_virtual_info: getStorage(`my_virtual_info_${this.$store.state.uid}`) || [], // 当前用户虚拟形象数组
      pair_virtual_status: false, // 绑定用户是否开启虚拟形象
      pair_virtual_info: getStorage(`pair_virtual_info_${this.$store.state.uid}`) || [], // 绑定用户虚拟形象数组
      material_list: getStorage(`material_list_${this.$store.state.uid}`) || {
        1: { component_id: '1', name: '面容', list: [] },
        2: { component_id: '2', name: '服装', list: [] },
        3: { component_id: '3', name: '鞋袜', list: [] },
        4: { component_id: '4', name: '场景', list: [] },
        5: { component_id: '5', name: '配饰', list: [] }
      },
      isTaking: false, // 是否生成图片中
      friendTypeMap: Object.freeze({ 1: 'mk6_29.png', 2: 'mk6_31.png', 3: 'mk6_32.png', 4: 'mk6_30.png', 5: 'mk6_33.png', 6: 'mk6_53.png' }), // 绑定类型 1=>"挚爱CP",2=>"贴心闺蜜",3=>"硬核兄弟",4=>"游戏搭子",5=>"灵魂知己",6=>"宠爱CP"（一次性）
      tabsArr: [], // 衣柜分类列表
      defaultArr: [], // 默认素材数组
      local_virtual_info: [], // 本地虚拟形象数据
      localList: Object.freeze(['material_list', 'my_virtual_info', 'pair_virtual_info']), // 本地存储key
      pictureMode: 1, // 1：我的形象 2：开启合照
      wardrobeMode: 'all', // all-全部 其他参考material_list中的component_id
      configPreviewPopup: Object.freeze([
        { icon: 'dpscxgt_010.png', text: '套装·星芒华庭', qualityIcon: 'tk_48.png' },
        { icon: 'dpscxgt_008.png', text: '套装·童话森林', qualityIcon: 'tk_49.png' },
        { icon: 'dpscxgt_009.png', text: '套装·萌趣乐园', qualityIcon: 'tk_49.png' }
      ]),
      isShowPicturePopup: false, // 生成图片弹框
      configPicturePopup: null,
      isShowResetPopup: false, // 确认重置弹框
      isShowBindPopup: false, // 绑定弹框
      configBindPopup: {},
      isShowReceivePopup: false, // 是否显示恭喜获得弹窗
      configReceivePopup: [], // 恭喜获得配置
      configBuy: {
        money: 0,
        goods: {},
        cashApi: (goods) => getPageData({ type: 'magic_closet_money_buy', mark: goods.gift_id }),
        inApi: (goods) => getPageData({ type: 'magic_closet_bug_before', mark: goods.gift_id }),
        inPollApi: (goods) => getPageData({ type: 'magic_closet_buy_poll', mark: goods.gift_id })
      } // 购买配置
    }
  },
  async created() {
    this.executeAtTime({ targetHour: 0, callback: this.getPageData })
    await this.getPageData()

    this.local_virtual_info = JSON.parse(JSON.stringify(this.my_virtual_info)) // 克隆虚拟形象用于显示

    this.tabsArr = Object.freeze([{ component_id: 'all', name: '全部' }, ...Object.values(this.material_list).map(item => { return { component_id: item.component_id, name: item.name } })]) // 获取衣柜tab列表

    for (const objKey in this.material_list) this.material_list[objKey].list.forEach(item => { if (item.is_default == 2) this.defaultArr.push(item) }) // 获取必选素材数组
  },
  computed: {
    ...mapState(['uid']),
    // 全部素材对象 比material_list多一个all key list是所有list的集合
    allObject() {
      const cloneList = JSON.parse(JSON.stringify(this.material_list))
      const all = { component_id: 'all', name: '全部', list: [] }
      all.list = Object.values(cloneList).reduce((list, category) => {
        list.push(...category.list)
        return list
      }, [])
      all.list = all.list.reduce((acc, item) => {
        acc[item.has_right > 0 ? 0 : 1].push(item)
        return acc
      }, [[], []]).flat() // 已获得/已装扮-放前面 未获得-放后面 只需排列all 其余列表后端排序
      const res = { all, ...cloneList }
      const emptyItem = { component_id: 'empty', material_id: 'empty', has_right: 'empty' }
      Object.values(res).forEach(category => {
        if (category.list.length < 8) category.list.push(...Array(8 - category.list.length).fill(emptyItem))
      })
      return res
    },
    // 是否能重置
    isDisabledRest() {
      return !this.local_virtual_info.every(item => item.is_default == 2) // 如果是全都是默认状态 返回false
    },
    // 是否能保存
    isDisabledSave() {
      if (this.local_virtual_info.every(item => item.is_default == 2)) return false // 如果是全都是默认状态 返回false
      if (this.my_virtual_info.length != this.local_virtual_info.length) return true // 如果长度不同 返回true
      return !this.local_virtual_info.every(item => this.my_virtual_info.find(it => it.component_id == item.component_id && it.material_id == item.material_id))
    }
  },
  watch: {
    pictureMode(value) {
      this.thinkingTrack(value == 1 ? '我的形象' : '开启合拍')
    }
  },
  methods: {
    // routerJump(path) {
    //   scrollToHeight('top')
    //   this.$nextTick(() => this.$router.replace({ path }))
    // },
    // 打开抢鲜礼包弹窗
    openGiftPopup() {
      this.configBuy.money = this.money
      this.configBuy.goods = { ...this.bug_gift_list[0], list: [{ id: 1, icon: 'zs_120_120.png', text: '+60', name: '钻石', nums: '1', type: 'tool', unit: '', has_right: 0 }, { id: 2, icon: 'https://cdn-image.dandan818.com/activity/normal/virtual/ornament/pssc_017_120_120.png', text: '配饰·兔子气球', nums: '1', type: 'tool', unit: '', has_right: 0 }] }
      this.$refs.buy.openGiftPopup()
    },
    // 生成图片
    productImage: _throttle(async function() {
      const res = await this.save()
      if (res) return
      this.isTaking = true
      this.thinkingTrack(`分享${this.pictureMode == 1 ? '我的' : '合拍'}`)
      this.$nextTick(async () => {
        this.$toast.loading({ duration: 0, message: '图片生成中...', forbidClick: true, closeOnClick: true })
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        const element = document.querySelector('.scene')
        const head = document.querySelector('head')
        const canvas = await html2canvas(element, {
          ignoreElements: (e) => {
            if ((e.contains(element) || element.contains(e))) return false // 保留画布
            if ((e.contains(head) || head.contains(e))) return false // 保留样式
            return true
          },
          backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
          useCORS: true // 支持图片跨域
        })
        this.$toast.clear()
        this.configPicturePopup = Object.freeze(canvas.toDataURL('image/png'))
        this.isShowPicturePopup = true
        this.isTaking = false
      })
    }),
    // 重置
    reset() {
      this.thinkingTrack('重置')
      const res = this.local_virtual_info.map(item => { return { ...item, has_right: 2 } })
      res.forEach(item => this.chooseClothe(item, 'reset'))
    },
    // 保存
    save: _throttle(async function() {
      const mark = this.local_virtual_info.map(item => `${item.component_id}:${item.material_id}`)
      const res = await getPageData({ type: 'virtual_save', mark })
      this.$toast(res.errmsg)
      if (res.errno) return res.errno
      this.thinkingTrack(`保存${this.pictureMode == 1 ? '我的' : '合拍'}`)
      this.getPageData()
      return 0
    }),
    // 卸下/装扮 type字段目前只用于数据埋点判断 与业务逻辑无关
    chooseClothe(param, type) {
      if (type != 'reset') this.thinkingTrack(param.material_name) // 只用于数据埋点判断 与业务逻辑无关
      if (param.has_right == 2 && param.is_default == 2) return
      const needDressArr = JSON.parse(JSON.stringify(this.local_virtual_info)) // 需要装扮的数组
      const dischargeArr = [] // 需要卸下的数组
      param.part_type.split(',').forEach(partItem => {
        needDressArr.forEach((it, index) => {
          if (!it.part_type.split(',').includes(partItem)) return
          dischargeArr.push(it)
          needDressArr.splice(index, 1)
        })
      })
      if (param.has_right == 1) needDressArr.push(param)
      this.defaultArr.forEach(item => {
        const res = needDressArr.find(it => it.part_type.split(',').some(it1 => item.part_type.split(',').includes(it1)))
        if (!res) needDressArr.push(item)
      })
      this.local_virtual_info = needDressArr // 更新虚拟形象信息数组
      dischargeArr.forEach(item => this.updateMaterialList(item, 1)) // 更新卸下
      needDressArr.forEach(item => this.updateMaterialList(item, 2)) // 更新装扮
    },
    /**
     * 更新material_list
     * @param {string} component_id 部位id
     * @param {string} material_id 素材id
     * @param {1|2} has_right 状态 1-未装扮 2-已装扮
     */
    updateMaterialList({ component_id, material_id }, has_right) {
      if (component_id == 0) return // 通用身体不在列表中
      this.material_list[component_id].list.find(item => item.material_id == material_id).has_right = has_right
    },
    // 创建虚拟形象
    async createVirtual() {
      const res = await getPageData({ type: 'virtual_create' })
      if (res.errno) return this.$toast(res.errmsg)
      this.thinkingTrack('立即创建')
      await this.getPageData()
      this.local_virtual_info = JSON.parse(JSON.stringify(this.my_virtual_info)) // 克隆虚拟形象用于显示
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceivePopup(arr) {
      if (this.isShowReceivePopup) this.isShowReceivePopup = false
      this.$nextTick(() => {
        this.configReceivePopup = arr
        this.isShowReceivePopup = true
        this.getPageData()
      })
    },
    // 跳转排行榜
    toRank() {
      this.$router.replace({ path: 'rank', query: { scroll: true } })
    },
    // 绑定好友
    async bind() {
      const res = await getPageData({ type: 'magic_closet_pair_user_info' })
      if (res.errno) return this.$toast(res.errmsg)
      if (res.data.status == 2) {
        this.$toast('绑定成功')
        return this.getPageData()
      }
      this.configBindPopup = res.data
      this.isShowBindPopup = true
    },
    // 本地缓存数据
    setLocal() {
      this.localList.forEach(item => setStorage(`${item}_${this.uid}`, this[item]))
    },
    // 获取页面数据
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm7' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
      this.setLocal()
    },
    /**
     * 在指定的时间执行回调函数
     *
     * @param {Object} options - 参数对象
     * @param {number} [options.targetHour=0] - 要执行回调的目标小时（0-23），默认为0
     * @param {number} [options.targetMinute=0] - 要执行回调的目标分钟（0-59），默认为0
     * @param {number} [options.targetSecond=1] - 要执行回调的目标秒（0-59），默认为1
     * @param {Function} [options.callback=() => {}] - 在目标时间执行的回调函数，必传
     */
    executeAtTime({ targetHour = 0, targetMinute = 0, targetSecond = 1, callback = () => {} }) {
      const now = new Date()
      let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, targetSecond)
      if (targetTime - now < 0) targetTime.setDate(targetTime.getDate() + 1) // 如果目标时间已经过去，则将目标时间设置为第二天的同一时间
      const diff = targetTime - now
      let timer = setTimeout(() => { callback(); clearTimeout(timer) }, diff) // 设置定时器
      this.$once('hook:beforeDestroy', () => { clearTimeout(timer); timer = null }) // 在组件销毁时清除定时器
    },
    // 数数点击埋点
    thinkingTrack(element) {
      this.$thinking.track('WebClick', { module: '爱的衣橱', sub_module: '约会搭配', element }) // 数数点击埋点
    },
    textLengthLimit,
    toUserMain,
    imgAtError
  }
}
</script>

<style lang="scss" scoped>
.wardrobe{
  .bind{
    .tip{
      font-size: 28px;
      color: #C34C79;
      margin-bottom: 16px;
    }
    .usersBox{
      z-index: 1;
      width: 532px;
      height: 210px;
      margin-bottom: 19px;
      background: url('@/pages/gardenParty/assets/mk5_12.png') no-repeat left top/100% 100%;
      .user1,.user2{
        left: 73px;
        .avatarBox{
          width: 116px;
          height: 116px;
          background: linear-gradient(#757DD5, #757DD5), linear-gradient(#BCC1FF, #BCC1FF);
          padding: 4px;
          background-clip: content-box, padding-box;
          background-origin: content-box, padding-box;
          border-radius: 50%;
          .avatar{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
          .add{
            position: absolute;
            top: 31px;
            left: 55px;
            width: 54px;
            height: 54px;
            background: url('@/pages/gardenParty/assets/mk5_39.png') no-repeat left top/100% 100%;
          }
        }
        .username{
          margin-top: 5px;
          font-size: 24px;
          color: #FFFFFF;
          width: 166px;
          height: 46px;
          background: url('@/pages/gardenParty/assets/mk5_13.png') no-repeat left top/100% 100%;
          line-height: 46px;
        }
      }
      .user2{
        left: auto;
        right: 73px;
      }
      &.status1{
        background: url('@/pages/gardenParty/assets/mk5_14.png') no-repeat left top/100% 100%;
        .username{
          background: url('@/pages/gardenParty/assets/mk5_15.png') no-repeat left top/100% 100%;
        }
      }
      &.status2{
        background: url('@/pages/gardenParty/assets/mk5_18.png') no-repeat left top/100% 100%;
        .username{
          background: url('@/pages/gardenParty/assets/mk5_19.png') no-repeat left top/100% 100%;
        }
      }
      &.status3{
        background: url('@/pages/gardenParty/assets/mk5_20.png') no-repeat left top/100% 100%;
        .username{
          background: url('@/pages/gardenParty/assets/mk5_21.png') no-repeat left top/100% 100%;
        }
      }
      &.status4{
        background: url('@/pages/gardenParty/assets/mk5_16.png') no-repeat left top/100% 100%;
        .username{
          background: url('@/pages/gardenParty/assets/mk5_17.png') no-repeat left top/100% 100%;
        }
      }
      &.status5{
        background: url('@/pages/gardenParty/assets/mk5_22.png') no-repeat left top/100% 100%;
        .username{
          background: url('@/pages/gardenParty/assets/mk5_23.png') no-repeat left top/100% 100%;
        }
      }
    }
    .lookRank{
      z-index: 2;
      top: 105px;
      right: 4px;
      width: 178px;
      height: 68px;
      background: url('@/pages/gardenParty/assets/mk5_11.png') no-repeat left top/100% 100%;
    }
    .nums{
      max-width: 650px;
      padding: 9px 45px;
      background: #EA8BAF;
      font-size: 26px;
      color: #FFFFFF;
    }
  }
  .dating{
    margin-top: 123px;
    .titleIcon {
      z-index: 2;
      top: -115px;
      // left: 108px;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      height: 174px;
    }
    .datingIcon {
      z-index: 2;
      top: -285px;
      right: 0;
      width: 213px;
      height: 292px;
      background: url('@/pages/520/assets/back_4.png') no-repeat left top/100% 100%;
    }
    .p1{
      position: relative;
      z-index: 1;
      margin-left: 18px;
      width: 726px;
      height: 180px;
      background: url('@/pages/520/assets/mk5_1.png') no-repeat left top/100% 100%;
      font-size: 28px;
      color: #FC7949;
      line-height: 40px;
      // transform: translateY(-10px);
      margin-bottom: 10px;
    }
    .giftBtn{
      z-index: 5;
      top: 96px;
      right: 5px;
      width: 141px;
      height: 150px;
      background: url('@/pages/520/assets/mk6_33.png') no-repeat left top/100% 100%;
    }
    .tabs{
      z-index: 4;
      top: 154px;
      left: 127px;
      width: 488px;
      height: 91px;
      &.status1{
        background: url('@/pages/520/assets/mk6_30.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/520/assets/mk6_31.png') no-repeat left top/100% 100%;
      }
    }
    .my-swipe{
      z-index: 1;
      width: 745px;
      height: 946px;
      //background-color: #fff;
      //color: #000;
    }
    .scene{
      z-index: 1;
      width: 745px;
      height: 946px;
      .restrict{
        z-index: 2;
        top: 30px;
        left: 30px;
        width: 685px;
        height: 885px;
        .person1{
          top: 0;
          left: 0;
          z-index: 1;
          &.both{
            left: -125px;
          }
        }
        .person2{
          z-index: 2;
          right: -125px
        }
      }
      .leftSide{
        z-index: 50;
        left: 26px;
        top: 182px;
        width: 116px;
        min-height: 163px;
        // max-height: 506px;
        background: rgba(255,255,255,0.8);
        border-radius: 58px;
        padding: 6px 0 0;
        .userInfo{
          &.friend{
            margin-bottom: 35px;
          }
          .avatarBox{
            width: 98px;
            height: 98px;
            border: 4px solid #BCC1FF;
            background-image: linear-gradient(#fff, #fff), linear-gradient(#BCC1FF, #BCC1FF);
            background-clip: content-box, border-box;
            background-origin: content-box, border-box;
            border-radius: 50%;
            .avatar{
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .username{
            width: 100px;
            margin-top: 12px;
            font-weight: 500;
            font-size: 20px;
            color: #6D9DFF;
          }
        }
        .friendType{
          width: 81px;
          height: 81px;
        }
      }
      .rightMenu{
        z-index: 50;
        right: 25px;
        bottom: 265px;
        width: 116px;
        min-height: 191px;
        background: rgba(255,255,255,0.8);
        border-radius: 58px;
        padding: 20px 0;
        >div{
          width: 146px;
          &:nth-child(1){
            height: 147px;
            background: url('@/pages/520/assets/mk6_37.png') no-repeat left top/100% 100%;
          }
          &:nth-child(2){
            height: 146px;
            margin: -20px 0;
            background: url('@/pages/520/assets/mk6_36.png') no-repeat left top/100% 100%;
          }
          &:nth-child(3){
            height: 147px;
            background: url('@/pages/520/assets/mk6_35.png') no-repeat left top/100% 100%;
          }
        }
        .disabled{
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }
    .p2{
      top: 251px;
      z-index: 2;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      text-shadow: #FC7949 0 0 5px,#FC7949 0 0 5px,#FC7949 0 0 5px,#FC7949 0 0 5px;
      height: 43px;
      .jumpBtn{
        width: 127px;
        height: 43px;
        text-shadow: none;
      }
    }
    .createBtn{
      z-index: 2;
      top: 900px;
      width: 303px;
      height: 120px;
      background: url('@/pages/520/assets/mk6_34.png') no-repeat left top/100% 100%;
    }
    .wardrobeTabs{
      z-index: 2;
      margin-top: -58px;
      width: 750px;
      height: 80px;
      background: #F6F8FF;
      box-shadow: 0px 3px 6px 0px rgba(255,96,141,0.27);
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      //padding-left: 6px;
      //.scrollBox{
        //padding-right: 6px;
        //display: flex;
        >div{
          width: calc((750px - 12px) / 6);
          height: 69px;
          font-weight: bold;
          font-size: 28px;
          color: #F7AF93;
          transition: all 0.3s;
          &.active{
            color: #fff;
            background: url('@/pages/520/assets/mk6_43.png') no-repeat left top/100% 100%;
          }
        }
      //}
    }
    .backpack{
      width: 750px;
      height: 525px;
      background: rgba(246,248,255,0.6);
      border-radius: 40px;
      padding-top: 17px;
      .p3{
        font-size: 26px;
        color: #EB8057;
        line-height: 40px;
      }
      .clothesList{
        height: 400px;
        padding: 0 31px;
        .clothe{
          margin-top: 10px;
          width: 159px;
          height: 159px;
          // border-radius: 24px;
          // border: 4px solid transparent;
          margin-right: calc((100% - 159px * 4) / 3);
          background: no-repeat left top/100% 100%;
          padding-top: 4px;
          &:nth-child(4n){
            margin-right: 0;
          }
          .icon{
            z-index: 1;
            width: 130px;
            height: 130px;
            >img{
              width: 100%;
              height: auto;
            }
          }
          .text{
            z-index: 2;
            height: fit-content;
            bottom: 10px;
            font-weight: bold;
            font-size: 22px;
            color: #FFFFFF;
          }
          &.status_0{
            background-image: url('@/pages/520/assets/mk6_56.png');
            pointer-events: none;
            .icon{
              opacity: 0.5;
            }
            .text{
              text-shadow: 1px 0 #B7B7B7, -1px 0 #B7B7B7, 0 1px #B7B7B7, 0 -1px #B7B7B7, 1px 1px #B7B7B7, -1px -1px #B7B7B7, 1px -1px #B7B7B7, -1px 1px #B7B7B7;
            }
          }
          &.noCreate{
            pointer-events: none;
          }
          &.status_2{
            &::before{
              content: '';
              z-index: 3;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              background: url('@/pages/520/assets/mk6_38.png') no-repeat left top/100% 100%;
            }
          }
          &.status_empty{
            width: 158px;
            height: 158px;
            background: linear-gradient(0deg, #FFDECC, #FFDECC);
            border-radius: 24px;
            border: 4px solid #F2F4FF;
            pointer-events: none;
          }
          // 1-R 2-SR 3-SSR 4-UR 5-SP
          &.quality_1{
            text-shadow: 1px 0 #809DF1, -1px 0 #809DF1, 0 1px #809DF1, 0 -1px #809DF1, 1px 1px #809DF1, -1px -1px #809DF1, 1px -1px #809DF1, -1px 1px #809DF1;
            background-image: url('@/pages/520/assets/mk6_57.png');
          }
          &.quality_2{
            text-shadow: 1px 0 #AD7FE6, -1px 0 #AD7FE6, 0 1px #AD7FE6, 0 -1px #AD7FE6, 1px 1px #AD7FE6, -1px -1px #AD7FE6, 1px -1px #AD7FE6, -1px 1px #AD7FE6;
            background-image: url('@/pages/520/assets/mk6_55.png');
          }
          &.quality_3{
            text-shadow: 1px 0 #E79912, -1px 0 #E79912, 0 1px #E79912, 0 -1px #E79912, 1px 1px #E79912, -1px -1px #E79912, 1px -1px #E79912, -1px 1px #E79912;
            background-image: url('@/pages/520/assets/mk6_54.png');
          }
        }
      }
    }
    .p4{
      z-index: 2;
      margin-top: -58px;
      width: 750px;
      height: 116px;
      background: #F6F8FF;
      box-shadow: 0 3px 6px 0 rgba(255, 96, 141, 0.27);
      border-radius: 58px;
      li{
        color: #EB8057;
      }
    }
  }
}
</style>
