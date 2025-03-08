<template>
  <div class="tribe" @click.stop>
    <!--奇遇先机-->
    <OutBox class="firstAwards" title="title_5.png">
      <div class="awards flex">
        <div class="desc" style="color: #3A1CA5">每天被点亮的前6类奇遇<br>对应首个点亮人获得奖励<br><i style="color: #B07708;margin-left: -0.5em">（自动获得）</i></div>
        <!--点亮奖励-->
        <div class="list flex align-center">
          <div v-for="(item, index) in lightAwards" :key="index" class="box flex-column align-center">
            <div class="icon flex align-center justify-center margin-row-center position-relative"><PublicImg :imgName="item.icon" :imgType="item.type" :user-avatar="head" /></div>
            <div class="name line-height-100 text-nowrap text-center">{{ item.text }}</div>
          </div>
        </div>
      </div>
      <!--日期列表-->
      <div ref="dateList" class="dateList flex flex-no-wrap overflow-y-hidden overflow-x-scroll position-relative">
        <div v-for="(date, index) in date_list" :key="index" :ref="currentDate && currentDate == date.date && 'active'" class="position-relative dateItem flex-shrink-0 flex align-center justify-center line-height-100 text-nowrap" :class="currentDate && currentDate == date.date && 'active'">
          {{ date.show_date }}<div class="clickBox position-absolute" @click="switchDate(date.date)"></div>
        </div>
      </div>
      <!--点亮信息列表-->
      <div class="lightList flex align-center flex-wrap justify-center">
        <div v-for="(item, index) in lightList" :key="index" class="lightItem position-relative flex-shrink-0 flex-column align-center">
            <!--虚位以待-->
            <img :src="IconPath(item.icon)" class="bg position-absolute w-100 h-100" />
            <!--正常展示-->
            <template v-if="item.uid">
              <div  class="title position-absolute flex align-center justify-center text-nowrap">{{ item.desc }}</div>
              <div class="avatar position-relative radius-50"><img :src="item.head" class="w-100 h-100 radius-50 fit-cover" @error="imgAtError" @click="toUserMain(item.uid)" /></div>
              <div class="username position-relative w-100 line-height-100 text-center ellipsis">{{ item.username }}</div>
              <div class="desc position-relative line-height-100 text-center text-nowrap">全服首个点亮</div>
              <div class="date position-relative line-height-100 text-center text-nowrap">{{ item.created_time }}</div>
            </template>
        </div>
      </div>
      <div class="tip line-height-100 text-nowrap text-center">小提示：抽取【机缘签】有机会提升奇遇点亮几率哦~</div>
      <img :src="IconPath('mk2_26.png')" class="toMuseum block margin-row-center" @click="jumpMuseum" />
    </OutBox>
    <!--榜单-->
    <div class="rank overflow-hidden position-relative">
      <img :src="IconPath('mk2_27.png')" class="topBg position-absolute" />
      <img :src="IconPath('title_6.png')" class="title position-relative" />
      <img :src="IconPath('mk2_28.png')" class="text_1 block" />
      <img :src="IconPath('mk2_29.png')" class="awardsDetail position-absolute" @click="showAwardsDetailPopup = true" />
      <div class="rankAwards position-relative margin-row-center flex justify-center">
        <div v-for="(item, index) in rankAwards" :key="index" class="awardBox flex justify-center position-relative">
          <PublicImg :imgName="item.icon" :imgType="item.type" :user-avatar="head" /><div class="awardName line-height-100 text-nowrap flex align-center justify-center position-absolute">{{ item.text }}</div>
        </div>
      </div>
      <div class="totalRankArea position-relative overflow-x-hidden overflow-y-scroll">
        <!--1-3-->
        <div class="totalRankTop3 position-relative">
          <div class="totalRankTop3Item position-absolute" v-for="(item,index) in rank_list.slice(0,3)" :key="`${item.uid}+${index}`">
            <img class="tRIAvatar position-absolute" :src="item.head" @click="toUserMain(item.uid)" @error="imgAtError" />
            <div class="tRIBg position-absolute pointer-none position-row-center"></div>
            <div class="tRIName position-absolute position-row-center text-nowrap">{{ item.username }}</div>
            <div class="tRICode position-absolute position-row-center line-height-100 flex align-center justify-center"><img v-if="item.is_pretty" :src="IconPath('mk2_31.png')" /><span>ID:{{ item.show_code }}</span></div>
             <div class="tRITime position-absolute position-row-center text-nowrap">{{ item.clan_value }}</div>
          </div>
        </div>
        <!--4-30-->
        <div class="rankList width-fit">
          <div class="totalRankItem position-relative" v-for="(item,index) in rank_list.slice(3)" :key="`${item.uid}+${index}`">
            <div class="totalRankItemIcon position-absolute position-column-center flex align-center justify-center">{{ item.rank }}</div>
            <img class="totalRankItemAvatar position-absolute position-column-center" :src="item.head" @error="imgAtError" @click="toUserMain(item.uid)" />
            <div class="totalRankItemName text-nowrap text-nowrap position-absolute">{{ item.username }}</div>
            <div class="totalRankItemCode line-height-100 position-absolute align-center flex justify-center"><img v-if="item.is_pretty" :src="IconPath('mk2_31.png')" /><span>ID:{{ item.show_code }}</span></div>
            <div class="totalRankItemTime position-absolute position-column-center">{{ item.clan_value }}繁荣度</div>
          </div>
        </div>
      </div>
      <!--当前用户-->
      <div class="myTotalRankArea">
        <div class="totalRankIcon flex align-center justify-center position-absolute position-column-center">{{ my_rank_list.rank }}</div>
        <img class="totalRankAvatar position-absolute position-column-center" :src="my_rank_list.head" @error="imgAtError"  @click="toUserMain(my_rank_list.uid)" />
        <div class="totalRankName text-nowrap position-absolute">{{ my_rank_list.username }}</div>
        <div class="totalRankCode position-absolute line-height-100 flex align-center justify-center"><img v-if="my_rank_list.is_pretty" :src="IconPath('mk2_31.png')" /><span>ID:{{ my_rank_list.show_code }}</span>
        </div>
        <div class="totalRankTime position-absolute position-column-center">{{ my_rank_list.clan_value }}繁荣度</div>
      </div>
      <ul class="rules-text-border">
        <li><span></span>榜单为活动期间玩家部落繁荣度排名，分服统计</li>
        <li><span></span>详细榜单规则和奖励<i>可查看【奖励详情】</i></li>
      </ul>
    </div>
    <!--奖励详情弹窗-->
    <AwardsDetailPopup v-if="showAwardsDetailPopup" @clickClose="showAwardsDetailPopup = false" />
  </div>
</template>

<script>
import { toUserMain, toMuseum, compareVersions } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'
import { getListApi } from '@/api/tribe'
const AwardsDetailPopup = () => import('@/popups/awardsDetailPopup.vue')
export default {
  name: 'tribeVue',
  components: { AwardsDetailPopup },
  data() {
    return {
      showAwardsDetailPopup: false, // 奖励详情弹窗
      lightAwards: Object.freeze([
        { icon: 'ts_ndjl.svga', text: '头饰+6天', type: 'mic' },
        { icon: 'ljs_120_120.png', text: '+666', type: 'tool' }
      ]), // 奇遇奖励
      rankAwards: Object.freeze([
        { icon: 'ts_yhzs_02.svga', text: '头饰', type: 'mic' },
        { icon: 'txqq_120_120.png', text: '主页特效', type: 'costume' }
      ]), // 排行榜奖励
      head: '', // 用户头像
      date_list: [
        { date: '', show_date: '' },
        { date: '', show_date: '' },
        { date: '', show_date: '' },
        { date: '', show_date: '' },
        { date: '', show_date: '' },
        { date: '', show_date: '' },
        { date: '', show_date: '' }
      ], // 日期列表
      rank_list: [
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 1 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 2 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 3 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 4 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 5 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 6 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 7 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 8 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 9 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 10 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 11 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 12 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 13 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 14 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 15 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 16 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 17 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 18 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 19 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 20 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 21 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 22 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 23 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 24 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 25 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 26 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 27 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 28 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 29 },
        { uid: '0', clan_value: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: 30 }
      ], // 排行榜
      today: '', // 当天日期
      currentDate: '', // 当前选中日期
      lightList: [
        { uid: 0, adventure_id: 0, name: '', created_time: '', desc: '', head: '', icon: 'mk2_5.png', username: '' },
        { uid: 0, adventure_id: 0, name: '', created_time: '', desc: '', head: '', icon: 'mk2_5.png', username: '' },
        { uid: 0, adventure_id: 0, name: '', created_time: '', desc: '', head: '', icon: 'mk2_5.png', username: '' },
        { uid: 0, adventure_id: 0, name: '', created_time: '', desc: '', head: '', icon: 'mk2_5.png', username: '' },
        { uid: 0, adventure_id: 0, name: '', created_time: '', desc: '', head: '', icon: 'mk2_5.png', username: '' },
        { uid: 0, adventure_id: 0, name: '', created_time: '', desc: '', head: '', icon: 'mk2_5.png', username: '' }
      ], // 点亮列表
      my_rank_list: { uid: '0', username: '虚位以待', head: '', show_code: '--', is_pretty: false, rank: '30+', clan_value: '0' } // 我的排名
    }
  },
  async created() {
    await this.getPageData()
    this.switchDate(this.today)
  },
  methods: {
    scrollCenter() {
      this.$nextTick(() => {
        if (!this.$refs.active) return
        const offset = this.$refs.active[0].offsetLeft // 计算元素相对于父容器的偏移量
        const centerPosition = this.$refs.dateList.offsetWidth / 2 // 计算父容器的中心位置
        const scrollPosition = offset - centerPosition + (this.$refs.active[0].offsetWidth / 2) // 计算滚动位置，使元素居中
        this.$refs.dateList.scrollTo({ left: scrollPosition, behavior: 'smooth' }) // 滚动父容器
      })
    },
    jumpMuseum() {
      if (compareVersions('5.9.4') < 0) return this.$toast('请更新至最新版本后重试') // 版本低于5.9.4不跳转
      toMuseum()
    },
    async switchDate(date) {
      const res = await getListApi(date)
      if (res.errno) return this.$toast(res.errmsg)
      this.currentDate = date
      this.scrollCenter()
      this.lightList = res.data
    },
    async getPageData() {
      const res = await getPageData('m2')
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
      this.$emit('postHead', this.head)
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style lang="scss" scoped>
.tribe {
  .firstAwards {
    margin-bottom: -15px;
    .awards {
      margin: -30px auto 0;
      width: 678px;
      height: 266px;
      background: url('@/assets/mk2_1.png') no-repeat left top/100% 100%;
      .desc {
        font-size: 26px;
        line-height: 32px;
        font-weight: 500;
        padding-top: 113px - (32 - 26) / 2;
        padding-left: 45px;
      }
      .list {
        padding-top: 60px;
        .box {
          margin-left: 33px;
          .icon {
            width: 128px;
            height: 128px;
            border: 4px solid #C4A4FF;
            background: linear-gradient(0deg, #B891FE, #6547AF);
            border-radius: 20px;
          }
          .name {
            margin: 15px 0 0;
            font-weight: 500;
            font-size: 24px;
            color: #3A1CA5;
          }
        }
      }
    }
    .dateList {
      margin: 0 50px 27px;
      //height: 341px;
      .dateItem {
        font-weight: 500;
        font-size: 22px;
        color: #926A2A;
        width: 147px;
        height: 146px;
        background: url('@/assets/mk2_3.png') no-repeat left top/100% 100%;
        margin-right: -33px;
        .clickBox {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
        }
        &.active {
          color: #fff;
          background: url('@/assets/mk2_2.png') no-repeat left top/100% 100%;
        }
        &:last-child {
          margin-right: 0;
        }
        &:nth-child(odd) {
          margin-top: 21px;
        }
        &:nth-child(even) {
          margin-top: 75px;
        }
      }
    }
    .lightList {
      .lightItem {
        width: 206px;
        height: 270px + 21;
        overflow: hidden;
        padding-top: 21px;
        &:nth-child(-n+3) {
          margin-bottom: 18px;
        }
        &:nth-child(2), &:nth-child(5) {
          margin-left: 14px;
          margin-right: 14px;
        }
        .bg {
          top: 21px;
          left: 0;
          z-index: 1;
          width: 206px;
          height: 270px;
        }
        .title {
          z-index: 2;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-weight: bold;
          font-size: 20px;
          color: #FFFFFF;
          background: url('@/assets/mk2_4.png') no-repeat left top/100% 100%;
          width: 174px;
          height: 39px;
        }
        .avatar {
          margin-top: 103px;
          z-index: 2;
          width: 64px;
          height: 64px;
          background: #DDC58B;
          padding: 2px;
          margin-bottom: 7px;
        }
        .username {
          z-index: 2;
          padding: 0 10px;
          margin-bottom: 14px;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
        }
        .desc {
          z-index: 2;
          font-weight: 500;
          font-size: 18px;
          color: #FFFFFF;
          margin-bottom: 10px;
        }
        .date {
          z-index: 2;
          font-weight: 500;
          font-size: 18px;
          color: #FFFFFF;
        }
      }
    }
    .tip {
      margin-top: 41px;
      margin-bottom: 37px;
      font-weight: 500;
      font-size: 26px;
      color: #3A1CA5;
    }
    .toMuseum {
      width: 506px;
      height: 94px;
    }
  }
  .rank {
    width: 750px;
    min-height: 932px;
    .topBg {
      z-index: 1;
      top: 0;
      left: 0;
      width: 750px;
      height: 932px;
    }
    .title {
      position: relative;
      z-index: 1;
      display: block;
      margin: 68px auto 38px;
      width: 539px;
      height: 104px;
    }
    .text_1 {
      position: relative;
      z-index: 1;
      margin: 0 auto 20px;
      width: 513px;
      height: 37px;
    }
    .awardsDetail {
      z-index: 2;
      top: 248px;
      right: 0;
      width: 151px;
      height: 52px;
    }
    .rankAwards {
      z-index: 1;
      width: 625px;
      height: 187px;
      background: url('@/assets/mk2_30.png') no-repeat left top/100% 100%;
      padding-top: 23px;
      .awardBox {
        width: 148px;
        height: 128px;
        background: linear-gradient(180deg, #FFF5C3, #FFFFFF);
        border-radius: 16px;
        border: 4px solid #976AF3;
        &:nth-child(2) {
          margin-left: 40px;
        }
        .imgCompo {
          width: 96px;
          height: 96px;
        }
        .awardName {
          bottom: -9px;
          width: 150px;
          height: 34px;
          background: #6643BA;
          border-radius: 17px;
          font-size: 24px;
          color: #FFFFFF;
        }
      }
    }
    .totalRankArea{
      z-index: 1;
      height: 1290px;
      padding-bottom: 100px;
      overscroll-behavior-y: none;
      .totalRankTop3{
        height: 580px;
        .totalRankTop3Item{
          &:nth-of-type(1) {
            width: 266px;
            height: 482px;
            background: url('@/assets/mk2_34.png') no-repeat left top/100% 100%;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            .tRIAvatar{
              width: 130px;
              height: 130px;
              left: 70px;
              top: -37px;
            }
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/assets/mk2_33.png') no-repeat left top/100% 100%;
              top: -100px;
            }
            .tRIName{
              top: 120px;
            }
            .tRICode{
              top: 155px;
            }
          }
          &:nth-of-type(2) {
            width: 266px;
            height: 482px;
            background: url('@/assets/mk2_36.png') no-repeat left top/100% 100%;
            left: 0;
            top: 250px;
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/assets/mk2_35.png') no-repeat left top/100% 100%;
              top: -110px;
            }
            .tRITime {
              top: 160px;
            }
          }
          &:nth-of-type(3) {
            width: 266px;
            height: 482px;
            background: url('@/assets/mk2_38.png') no-repeat left top/100% 100%;
            right: 0;
            top: 250px;
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/assets/mk2_37.png') no-repeat left top/100% 100%;
              top: -110px;
            }
            .tRITime {
              top: 160px;
            }
          }
          .tRIAvatar{
            width: 106px;
            height: 106px;
            border-radius: 50%;
            left: 82px;
            top: -39px;
          }
          .tRIBg{
            top: -20px;
          }
          .tRIName{
            max-width: 160px;
            font-size: 24px;
            color: #FFFFFF;
            top: 90px;
          }
          .tRICode{
            font-size: 22px;
            color: #7452D3;
            top: 125px;
            img{
              width: 37px;
              height: 31px;
              margin-right: 5px;
              //vertical-align: middle;
              //margin: 0 5px 0 0;
            }
          }
          .tRITime{
            font-size: 22px;
            color: #B07708;
            top: 188px;
            max-width: 120px;
          }
        }
      }
      .rankList {
        margin: 0 auto;
        background-color: rgba(63, 38, 123, 0.5);
        padding: 24px 29px;
        border-radius: 20px;
        .totalRankItem{
          width: 641px;
          height: 144px;
          background: url('@/assets/mk2_40.png') no-repeat left top/100% 100%;
          margin: 0 auto 10px;
          .totalRankItemIcon{
            width: 68px;
            height: 68px;
            font-weight: 500;
            font-size: 26px;
            color: #FFF2A9;
            left: 20px;
            background: url('@/assets/mk2_39.png') no-repeat left top/100% 100%;
          }
          .totalRankItemAvatar{
            width: 80px;
            height: 80px;
            border-radius: 50px;
            border: 3px solid #C7AFFF;
            left: 100px;
          }
          .totalRankItemName{
            width: 220px;
            font-size: 26px;
            left: 190px;
            top: 40px;
            color: #3A1CA5;
          }
          .totalRankItemCode{
            font-size: 22px;
            color: #B07708;
            left: 190px;
            bottom: 35px;
            img{
              width: 37px;
              height: 31px;
              margin-right: 5px;
            }
          }
          .totalRankItemTime{
            font-size: 24px;
            color: #6A37DF;
            line-height: 36px;
            text-align: right;
            right: 30px;
          }
        }
      }
    }
    .myTotalRankArea{
      position: relative;
      z-index: 1;
      width: 714px;
      height: 144px;
      background: url('@/assets/mk2_41.png') no-repeat left top/100% 100%;
      margin: -122px auto 10px;
      .totalRankIcon{
        width: 68px;
        height: 67px;
        font-weight: 500;
        font-size: 26px;
        color: #FFF2A9;
        left: 30px;
        background: url('@/assets/mk2_39.png') no-repeat left top/100% 100%;
      }
      .totalRankAvatar{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        border: 3px solid #C7AFFF;
        left: 110px;
      }
      .totalRankName{
        width: 220px;
        font-size: 26px;
        color: #3A1CA5;
        left: 200px;
        top: 40px;
      }
      .totalRankCode{
        font-size: 22px;
        color: #FFFFFF;
        left: 200px;
        bottom: 35px;
        img{
          width: 37px;
          height: 31px;
          margin-right: 5px;
        }
      }
      .totalRankTime{
        p{
          font-size: 22px;
          color: #8E45E9;
        }
        font-size: 24px;
        color: #FFFFFF;
        line-height: 36px;
        text-align: right;
        right: 50px;
      }
    }
  }
}
</style>
