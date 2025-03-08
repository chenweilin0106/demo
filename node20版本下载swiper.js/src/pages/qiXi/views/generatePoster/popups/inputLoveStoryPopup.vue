<template>
  <PopupBox title="title_19.png" @clickClose="clickClose">
    <div class="loveStoryTip flex align-center justify-center line-height-100 text-nowrap">确定后不支持修改，请谨慎输入<span>（15字以内）</span></div>
    <!-- 输入框 -->
    <div class="loveStoryInput">
      <textarea v-model="loveStory" maxlength="15" @input="inputLoveStory"></textarea>
      <!-- 输入框刷新按钮 -->
      <div class="refresh flex align-center justify-center" @click="randomLoveStory">
        <img :src="IconPath('tk_16.png')" />
      </div>
    </div>
    <div class="errTip flex align-center justify-center line-height-100">{{ errTip }}</div>
    <!-- 底部按钮 -->
    <div class="loveStoryButtons flex align-center justify-center">
      <div class="cancel flex align-center justify-center" @click="clickClose">我再想想</div>
      <div class="confirm flex align-center justify-center" @click="submitLoveStory">确认提交</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'
export default {
  props: ['loveWords'],
  data() {
    return {
      errTip: '',
      loveStory: ''
    }
  },
  created() {
    this.randomLoveStory()
  },
  methods: {
    // 自定义情话提交 mark[goods_id]：奖励goods_id；mark[action_type]：1-领取，2-添加，3-卸下；mark[id]：奖励id；mark[love_words]：情话
    async submitLoveStory() {
      if (!this.loveStory) return (this.errTip = '请输入内容')
      const res = await getPageData({
        type: 'lovename_award_rev',
        'mark[goods_id]': 4,
        'mark[action_type]': 1,
        'mark[id]': 0,
        'mark[love_words]': this.loveStory
      })
      this.$toast(res.errmsg)
      if (res.errno) return (this.errTip = res.errmsg)
      this.clickClose()
      this.$emit('update')
    },
    // 输入自定义情话
    inputLoveStory(e) {
      if (e.target.value.indexOf(' ') >= 0) this.uid = e.target.value.replace(/\s+/g, '') // 删除空格
      this.errTip = '' // 清除错误提示
    },
    clickClose() {
      this.$emit('clickClose')
    },
    // 随机抽取情话
    randomLoveStory() {
      this.loveStory = this.loveWords[Math.floor(Math.random() * this.loveWords.length)]
      this.errTip = '' // 清除错误提示
    }
  }
}
</script>

<style lang="scss" scoped>
.loveStoryTip {
  margin-bottom: 33px;
  font-size: 28px;
  color: #ffffff;
  > span {
    margin: 0 -0.5em;
  }
}
// 输入框
.loveStoryInput {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin: 0 auto;
  width: 558px;
  height: 138px;
  background: #fefaef;
  border: 4px solid #A7DFFF; /*todo 输入框边框背景色*/
  border-radius: 41px;
  > textarea {
    width: 478px;
    height: 100%;
    padding: 20px 14px;
    line-height: 50px;
    font-size: 32px;
    font-weight: 500;
    color: #486CEA; /*todo 输入内容字体颜色*/
    border-radius: 38px 0 0 38px;
    background: transparent;
    border: none;
    resize: none;
  }

  .refresh {
    flex: 1;
    height: 100%;
    background: #C7DCFF; /*todo 刷新按钮背景色*/
    border-radius: 0 38px 38px 0;

    > img {
      width: 56px;
      height: auto;
    }
  }
}
.errTip {
  width: 100%;
  height: 62px;
  font-size: 26px;
  color: #EA1C60; /*todo 错误信息字体颜色*/
  padding-top: 6px;
}
// 底部两个按钮
.loveStoryButtons {
  .cancel,
  .confirm {
    width: 244px;
    height: 76px;
    border-radius: 40px;
    font-size: 32px;
  }
  .cancel {
    border: 2px solid #ffffff;
    color: #4d7ddd;
    background: linear-gradient(0deg, #cae7ff, #ffffff);
  }
  .confirm {
    margin-left: 18px;
    border: 2px solid #ffffff;
    color: #a9792c;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
  }
}
</style>
