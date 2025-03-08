<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content" @touchmove.prevent.stop>
        <div class="content-inner w-100 h-100 flex-column">
          <p v-if="type == 1">每充值30元可获得1扭蛋券</p>
          <p v-else-if="type == 2">扭蛋次数不足，请前往充值</p>
          <div class="buttons">
            <div class="cancel" @click="clickClose">取消</div>
            <div class="confirm" @click="$emit('recharge')">充值</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['type'],
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.popup-content {
  width: 440px;
  height: 260px;
  background: rgba(255, 255, 255, 0.3);
  padding: 6px;
  border-radius: 34px;
}
.content-inner {
  padding-top: 60px;
  border: 4px solid #fff;
  border-radius: 28px;
  background: linear-gradient(0deg, #ffbed6, #b3acfa, #8fa4f4);
}
p {
  margin: 0 auto 43px;
  width: fit-content;
  font-size: 32px;
  color: #ffffff;
  white-space: nowrap;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 178px;
    height: 78px;
    background: linear-gradient(0deg, #cae7ff, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #4d7ddd;
  }

  .confirm {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 178px;
    height: 78px;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border: 3px solid #ffffff;
    border-radius: 39px;
    font-size: 32px;
    color: #a9792c;
  }
}
</style>
