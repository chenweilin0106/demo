<template>
  <div class="WuLin">
    <div class="container">
      <FlipItem
        v-for="item in array"
        :key="item.id"
        :awardData="item"
        @handleFlip="handleFlip"
      />
    </div>
    <div class="allFlip" @click="allFlip">一键翻牌</div>
    <!-- <MyGsap />
    <MyLottery /> -->
  </div>
</template>

<script>
// import MyGsap from './components/MyGsap'
import FlipItem from './components/FlipItem'
// import MyLottery from './components/MyLottery'
// 节流函数
// import { throttle } from '../../utils/tool'
export default {
  name: 'WuLin',
  data() {
    return {
      locaFlipData: [
        {
          id: 1,
          icon: ''
        },
        {
          id: 2,
          icon: ''
        },
        {
          id: 3,
          icon: ''
        },
        {
          id: 4,
          icon: ''
        },
        {
          id: 5,
          icon: ''
        },
        {
          id: 6,
          icon: ''
        },
        {
          id: 7,
          icon: ''
        },
        {
          id: 8,
          icon: ''
        },
        {
          id: 9,
          icon: ''
        }
      ]
    }
  },
  created() {
    this.updateData([
      {
        id: 1,
        icon: 'ljs_120_120.png'
      },
      {
        id: 5,
        icon: 'ljs_120_120.png'
      }
    ])
  },
  components: {
    FlipItem
    // MyGsap,
    // MyLottery
  },
  computed: {
    // 是否翻牌6次
    isFlipSix() {
      const count = this.locaFlipData.reduce((acc, cur) => {
        if (cur.icon) {
          return acc + 1
        }
        return acc
      }, 0)
      return count < 6
    }
    // 判断是否符合翻牌要求
    // canFlip() {
    //   // 判断是否有翻牌门票
    //   // if () {
    //   //   this.$toast('请先购买礼包获得翻牌门票')
    //   //   return false
    //   // }
    //   // 根据次数能否继续翻牌
    //   // if (!this.isFlipSix) return false
    //   // 判断翻牌币是否为0
    //   // if () {
    //   //   this.$toast('翻牌币不足，请先去消费')
    //   //   return false
    //   // }
    //   // return true
    // }
  },
  methods: {
    // 购买礼包
    async buyGift() {
      // if ('不存在未结束的轮次') {
      //   if ('每日首次免费') {
      //     const res = await this.buyGiftApi({})
      //     this.dialogData = res.data
      //     this.dialogType = 'congratsGetDialog'
      //     this.showDialog = true
      //   } else if ('已使用首次免费') {
      //     const res = await this.buyGiftApi({})
      //     // 钻石不足 res.errno的值
      //     if ('钻石不够') {
      //       // return // 'APP充值弹框'
      //     } else if (!res.errno) {
      //       // '钻石足够，购买成功'
      //       this.dialogData = res.data
      //       this.dialogType = 'congratsGetDialog'
      //       this.showDialog = true
      //     } else {
      //       // '购买失败'
      //       return this.$toast(res.errmsg)
      //     }
      //   }
      // } else if ('存在未结束的轮次') {
      //   // 具体查看接口返回的数据，判断是前端判断还是后端判断
      //   this.$toast('请先完成本轮次')
      // }
    },
    // 用于更新翻牌数据
    async updateFlipData(data) {
      // const { '门票','翻牌币','翻牌数据' } = data
      // 更新翻牌门票，翻牌币数量
      // 如果是空，也就是没有翻牌，就不用更新(award是翻牌数据，只是占位)
      // if (!'翻牌数据'.length) return
      // 如果有数据，就根据位置标识进行更新
      // console.log('开始更新数据')
      // '翻牌数据'.forEach((element) => { locaFlipData
      //   this.locaFlipData.find((item) => item.id === element.id).icon = element.icon
      // })
    },
    // 手动翻牌
    async handleFlip(id) {
      // if (!this.canFlip) return
      // const res = await this.handleFlipApi({})
      // if (res.errno) return this.$toast(res.errmsg)
      // 更新翻牌数据，门票，翻牌币数量（以下只更新翻牌数据，未更新门票和翻牌币）
      // this.updateFlipData(res.data)
      // 以下demo草稿（忽略）
      // if (this.flipTimes < 6) {
      //   // 找到点击的牌
      //   const res = this.locaFlipData.find((item) => item.id === id)
      //   // 发送请求
      //   // const res = await this.handleFlipApi({})
      //   // if (res.errno) return this.$toast(res.errmsg)
      //   // this.updateData([res.award])
      //   setTimeout(() => {
      //     this.updateData([{ ...res, icon: 'ljs_120_120.png' }])
      //     console.log('成功翻牌，第' + id + '个')
      //   }, 1000)
      // } else {
      //   console.log('已经翻过6次了')
      // }
    },
    // 一键翻牌
    async allFlip() {
      if (this.canFlip) {
        const res = await this.allFlipApi()
        if (res.errno) return this.$toast(res.errmsg)
        this.updateFlipData(res.data)
      } else {
        await this.getPoint()
      }
      // 以下为demo草稿（忽略）
      // this.locaFlipData.forEach((item) => {
      //   item.icon = 'ljs_120_120.png'
      // })
    },
    // 领取积分
    async getPoint() {
      // const res = await this.getPointApi({})
      // this.$toast(res.errmsg)
      // 更新页面积分显示(下方仅占位，具体根据接口返回的数据进行更新)
      // this.pageData.bead_nums = res.data.bead_nums
    },
    // 领取积分请求
    async getPointApi() {
      // return await this.getPageData({
      //   'mark[act]': 'flip_card',
      //   'mark[page]': 'flip_card'
      // })
    },
    // 一键翻牌请求
    async allFlipApi() {
      // return await this.getPageData({
      //   'mark[act]': 'flip_card',
      //   'mark[page]': 'flip_card'
      // })
    },
    // 手动翻牌请求
    async handleFlipApi() {
      // return await this.getPageData({
      //   'mark[act]': 'flip_card',
      //   'mark[page]': 'flip_card'
      // })
    },
    // 购买礼包请求
    async buyGiftApi() {
      // return await this.getPageData({
      //   'mark[act]': 'flip_card',
      //   'mark[page]': 'flip_card'
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 400px;
  position: relative;
  transform-style: preserve-3d; // 开启3D透视
  transition: transform 1s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.allFlip {
  width: 100px;
  height: 30px;
  background: #ccc;
  margin: 10px auto;
  border-radius: 30px;
  background: pink;
  color: orangered;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
