<template>
  <PopupBox title="mk2_title_16.png" size="2" @clickClose="clickClose">
    <p class="line-height-100 flex justify-center">请许下你的心愿或者对蛋蛋部落的祝福吧</p>
    <p class="line-height-100 flex justify-center">（20字以内）</p>
    <div class="inputBox position-relative width-fit margin-row-center">
      <input v-model="content" class="flex align-center line-height-100" placeholder="输入祝福" @input="onInput" @keydown="handleKeyDown" />
      <img :src="IconPath('tk_48.png')" class="refreshBtn position-absolute position-column-center" @click="refresh" />
    </div>
    <p class="errTipBox line-height-100 flex justify-center">{{ errTip }}</p>
    <PublicButton class="sendBtn margin-row-center" hasRight="1" @click="submit">立刻发送</PublicButton>
  </PopupBox>
</template>

<script>
// weekly/2024/src/pages/celebration/views/m2/views/fireWorks/popups/sendPopup.vue
// import { calculateContentLength } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  props: ['config'],
  data() {
    return {
      maxFontNum: Object.freeze(20), // 最大字数限制
      lastText: '', // 上一次输入的内容 用于替换超出字数限制后的内容
      content: '',
      errTip: ''
    }
  },
  created() {
    this.refresh()
  },
  computed: {
    // pointLength() {
      // return calculateContentLength({ content: this.content, emojiLength: 2 })
    // }
  },
  methods: {
    async submit() {
      if (!this.content) return (this.errTip = '请输入内容')
      const res = await getPageData({ type: 'seven_fire_send_wish', 'mark[type]': this.config.has_free_wish, 'mark[words]': this.content })
      this.$toast({ duration: res.errno ? 3000 : 2000, message: res.errmsg })
      if (res.errno) return (this.errTip = res.errmsg)
      this.clickClose()
      this.$emit('updateBarrage', this.content)
    },
    refresh() {
      this.content = this.config.wish_words[Math.floor(Math.random() * this.config.wish_words.length)]
      this.errTip = ''
    },
    onInput() {
      this.content = this.content.replace(/\s+/g, '') // 删除空格
      this.content = this.content.replace(/[\r\n]/g, '') // 删除回车换行符
      console.log('this.pointLength：', this.pointLength)
      // this.content = this.content.replace(/[^a-zA-Z0-9]/g, '') // 只能输入字母和数字
      this.content = this.content.replace(/[^0-9]/g, '') // 只能输入数字
      // 不限制输入内容 但是限制输入表情
      // if (this.pointLength > this.maxFontNum) {
      //   this.content = this.lastText // 如果表情数量超过最大字数，就将输入的内容设置为上一次的内容
      // } else {
      //   this.lastText = this.content // 如果表情数量没有超过maxFontNum个，就更新上一次的内容
      // }
      this.errTip = ''
    },
    handleKeyDown(e) {
      if (e.key === 'Enter' || e.keyCode == 13) e.preventDefault()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  height: 255px + 81 + 278 - 274;
}
p {
  margin-top: 13px;
  font-size: 28px;
  color: #FFFFFF;
}
.inputBox {
  margin-top: 26px;
  input {
    width: 558px;
    height: 82px;
    background: #FEFAEF;
    border-radius: 41px;
    border: 4px solid #826CF7;
    font-weight: 500;
    font-size: 30px;
    color: #7B6AE3;
    padding: 0 70px 0 27px;
    &::placeholder {
      font-weight: 500;
      font-size: 30px;
      color: #C4C2CE;
      text-align: center;
    }
  }
  .refreshBtn {
    right: 15px;
    width: 56px;
  }
}
.errTipBox {
  margin: 10px 0 19px;
  height: 26px;
  font-size: 26px;
  color: #DB2472;
}
.sendBtn {
  width: 324px;
  height: 76px;
}
</style>
