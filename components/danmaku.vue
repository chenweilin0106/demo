<template>
  <transition-group class="danmakuPage" name="danmakuTr" tag="ul">
    <div v-for="item in messageMoveList" :key="item.guid" class="messageItem" v-html="formatMessage(item.desc)"></div>
  </transition-group>
</template>

<script>
import { formatMessage } from '@/utils/tool'

export default {
  name: 'danmakuPageVue',
  props: ['mes_list'],
  components: {},
  data() {
    return {
      playMessageTimer: null,
      removeMessageTimer: null,
      messageMoveList: []
    }
  },
  mounted() {
    this.playMessage()
  },
  watch: {
    mes_list(newVal) {
      this.clearPlayMessageTimer()
      this.clearRemoveMessageTimer()
      this.playMessage()
    }
  },
  beforeDestroy() {
    this.clearPlayMessageTimer()
    this.clearRemoveMessageTimer()
  },
  computed: {
  },
  methods: {
    playMessage() {
      if (!this.mes_list.length) return
      this.$nextTick(() => {
        let index = 0
        this.playMessageTimer = setInterval(() => {
          if (this.messageMoveList.length >= 1 && this.removeMessageTimer == null) {
            this.removeMessageTimer = setInterval(() => {
              if (this.messageMoveList.length <= 0) return this.clearRemoveMessageTimer()
              this.messageMoveList.pop()
            }, 1500)
          }
          if (index >= this.mes_list.length) return this.clearPlayMessageTimer()
          this.messageMoveList.unshift(this.mes_list[index])
          index++
        }, 1500)
      })
    },
    clearPlayMessageTimer() {
      clearInterval(this.playMessageTimer)
      this.playMessageTimer = null
    },
    clearRemoveMessageTimer() {
      clearInterval(this.removeMessageTimer)
      this.removeMessageTimer = null
    },
    formatMessage
  }
}
</script>

<style lang="scss" scoped>
::v-deep .light{
  color: #FFFA70;
}
.danmakuPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
  .danmakuTr-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  .danmakuTr-leave-to {
    opacity: 0;
  }
  .messageItem {
    margin-bottom: 5px;
    padding: 13px 30px;
    width: 343px;
    background: rgba(36, 23, 6, 0.6);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    white-space: normal;
    transition: all 1s;
    border-radius: 999999999px;
    color: #fff;
  }
}
</style>
