<template>
  <PopupBox title="mk2_title_16.png" size="2" @clickClose="clickClose">
    <p class="line-height-100 flex justify-center">请许下你的心愿或者对蛋蛋部落的祝福吧</p>
    <p class="line-height-100 flex justify-center">（20字以内）</p>
    <div class="inputBox position-relative width-fit margin-row-center">
      <input v-model="content" class="flex align-center line-height-100" placeholder="输入祝福" maxlength="20" @keydown="handleKeyDown" @input="inputUid" />
      <img :src="IconPath('tk_48.png')" class="refreshBtn position-absolute position-column-center" />
    </div>
    <p class="errTipBox line-height-100 flex justify-center">{{ errTip }}</p>
    <PublicButton class="sendBtn margin-row-center" hasRight="1">立刻发送</PublicButton>
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      errTip: '包含敏感词，请重新输入'
    }
  },
  methods: {
    inputUid(e) {
      this.content = this.content.replace(/\s+/g, '') // 删除空格
      this.content = this.content.replace(/[\r\n]/g, '') // 删除回车换行符
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
