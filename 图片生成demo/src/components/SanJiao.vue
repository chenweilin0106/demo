<template>
  <div class="SanJiao">
    <div>
      <p></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SanJiao',
    components: {},
    props: [],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style scoped lang="scss">
  .SanJiao {
    div {
      margin-left: 30px;
      position: relative;
      overflow: hidden;
      background: linear-gradient(
        90deg,
        #000004,
        #160b39,
        #420a68,
        #6a176e,
        #932667,
        #ba3655,
        #dd513a,
        #f3761b,
        #fca50a,
        #f6d746,
        #f6d746
      );
      > p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%);
        width: 100px;
        height: 100px;
        background: #000;
      }
    }
    div:before,
    div:after {
      content: '';
      position: absolute;
      background-color: inherit;
    }
    div,
    div:before,
    div:after {
      width: 50px;
      height: 50px;
      border-top-right-radius: 30%;
    }
    div {
      transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
    }
    div:before {
      border-top-right-radius: 0;
      transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
        translate(0, -50%);
    }
    div:after {
      border-top-right-radius: 0;
      transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
    }
  }
</style>
