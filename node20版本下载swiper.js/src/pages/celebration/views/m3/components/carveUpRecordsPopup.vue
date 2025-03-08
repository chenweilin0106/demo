<template>
  <PopupBox :title="'mk8_title_6.png'" @clickClose="clickClose">
    <div :class="['tagChosenBg',`status${tagChosen}`]">
      <div @click="tagChosen = 1"></div>
      <div @click="tagChosen = 2"></div>
    </div>
    <template v-if="tagChosen == 1">
      <div class="noAllRecords" v-if="allRecords.length == 0">暂无记录</div>
      <div class="allRecordItem" v-for="(item,index) in allRecords" :key="index">
        <div class="itemTitle">第{{item[0].round == 1?'一':item[0].round == 2?'二':item[0].round == 3?'三':null}}轮开奖</div>
        <div class="itemPeopleNum">本轮共<i>{{item[0].peopleNum}}</i>人获得瓜分元宝奖励</div>
        <div class="itemList">
          <div class="listIt" v-for="it in item" :key="it.uid">
            <img class="avatarDiv" :src="IconPath(item.head||avatarDefault)" @click="toUserMain(it.uid)" />
            <div class="nameDiv">{{it.username}}</div>
            <div class="timeDiv">{{it.amount}}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="tagChosen == 2">
      <div class="noAllRecords" v-if="myRecords.length == 0">暂无记录</div>
      <div class="myRecordsTitle"  v-else>
        <div>开奖时间</div>
        <div>瓜分数量</div>
      </div>
      <div class="myRecordsItem" v-for="(item, index) in myRecords" :key="index">
        <div class="text1">{{item.create_time}}</div>
        <div class="text2">{{item.amount}}</div>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api/index'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'carveUpRecordsPopup',
  props: [],
  components: {},
  data() {
    return {
      avatarDefault: 'avatarDefault.png',
      tagChosen: 1, // 1:每轮前五 2:我的记录
      allRecords: [],
      myRecords: [
        // { id: 1, create_time: '11月24日12:13', amount: 0 },
        // { id: 2, create_time: '11月24日12:13', amount: 6500 },
        // { id: 3, create_time: '11月24日12:13', amount: 0 }
      ]
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    toUserMain,
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    getData() {
      getPageData({ type: 'ps_pool_record', mark: 1 }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.allRecords = res.data
        } else {
          this.$toast(res.errmsg)
        }
      })
      getPageData({ type: 'ps_pool_record', mark: 2 }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.myRecords = res.data
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.tagChosenBg{
  width: 432px;
  height: 65px;
  margin: 0px auto 20px auto;
  display: flex;
  &.status1{
    background: url('@/pages/celebration/assets/tk_36.png') no-repeat left top/100% 100%;
  }
  &.status2{
    background: url('@/pages/celebration/assets/tk_37.png') no-repeat left top/100% 100%;
  }
  :nth-child(n){
    width: 50%;
    height: 100%;
  }
}
.noAllRecords{
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 25px;
  color: #FFFFFF;
}
.allRecordItem{
  width: 563px;
  height: 303px;
  background: url('@/pages/celebration/assets/tk_38.png') no-repeat left top/100% 100%;
  margin: 0px auto 20px auto;
  padding-top: 16px;
  position: relative;
  .itemTitle{
    width: fit-content;
    font-weight: 600;
    font-size: 25px;
    color: #8E6CFD;
    background: linear-gradient(-90deg, #C663FF 2.1484375%, #9B5EFF 80.1513671875%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    margin: 0px auto 0 auto;
  }
  .itemPeopleNum{
    font-weight: 500;
    font-size: 22px;
    color: #FFFFFF;
    text-align: center;
    margin: 30px auto 0 auto;
    i{
      color: #A0ECFF;
    }
  }
  .itemList{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .listIt{
      margin: 0 8px;
      position: relative;
      .avatarDiv{
        width: 92px;
        height: 92px;
        background: #FFFFFF;
        border-radius: 50%;
        border: 4px solid #B09EFF;
      }
      .nameDiv{
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(255,255,255,0.5);
        border-radius: 15px;
        padding: 4px 8px;
        font-weight: 500;
        font-size: 20px;
        color: #7B53FF;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -40px;
      }
      .timeDiv{
        font-weight: 500;
        font-size: 20px;
        color: #FFF113;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -70px;
      }
    }
  }
}
.myRecordsTitle{
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  :nth-child(1){
    width: 50%;
  }
  :nth-child(2){
    width: 50%;
  }
}
.myRecordsItem{
  width: 600px;
  height: 70px;
  display: flex;
  text-align: center;
  margin: 0 auto;
  .text1{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 24px;
    color: #FFFFFF;
  }
  .text2{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 24px;
    color: #FFFFFF;
  }
  &:nth-child(odd) {
    background: rgba(102, 51, 219, 0.3);
  }
}
</style>
