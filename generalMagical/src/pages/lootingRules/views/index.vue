<template>
  <div class="lootingRules">
    <!-- 顶部图片 -->
    <div class="topBackImage"></div>
    <!-- 掠夺规则标题 -->
    <div class="ruleTitle">掠夺规则</div>
    <!-- 返回按钮 -->
    <div class="backBtn" @click="backBtn"></div>
    <!-- 掠夺标题图片 -->
    <div class="PlunderTitleImage"></div>
    <!-- 掠夺说明 -->
    <div class="PlunderContent">
      <div class="PlunderContentText">
        <ul class="PlunderContentTextUl">
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            掠夺系统将于探索副本挑战第五十关成功后开启，可通过部落页“掠夺”按钮进入掠夺玩法
          </li>
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            玩家在探索中挂机宝箱中的金币中有50%属于受保护金币，剩余50%不受保护，可以被其他玩家
            掠夺
          </li>
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            系统每天将随机指定三名英雄为今日对阵英雄，玩家将使用这三名英雄和他人进行英雄对决，若战斗胜利则可以依据比例夺取他人挂机宝箱内未领取中不受保护部分的金币，战力差距越大，夺取比例则越高
          </li>
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            每天有五次机会可以对他人的探索挂机宝箱发起掠夺
          </li>
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            无论掠夺成功或失败都将消耗一次机会
          </li>
        </ul>
      </div>
    </div>
    <!-- 仇敌标题图片 -->
    <div class="EnemiesTitleImage"></div>
    <!-- 仇敌说明 -->
    <div class="EnemiesContent">
      <div class="PlunderContentText">
        <ul class="PlunderContentTextUl">
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            当被其他玩家掠夺时，可以通过仇敌页签查看他人掠夺自己的记录，可直接在此界面进行复仇
          </li>
        </ul>
      </div>
    </div>
    <!-- 深仇标题图片 -->
    <div class="DeepHatredTitleImage"></div>
    <!-- 深仇说明 -->
    <div class="DeepHatredContent">
      <div class="PlunderContentText">
        <ul class="PlunderContentTextUl">
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            在掠夺记录中可直接将该玩家添加至深仇列表，掠夺深仇玩家不消耗掠夺次数
          </li>
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            掠夺同一深仇玩家冷却时间为为两小时
          </li>
          <li class="PlunderContentTextLi">
            <span class="PlunderContentTextIcon"></span>
            当深仇玩家挂机宝箱中不受保护部分的金币数量过少时则不可被再次掠夺
          </li>
        </ul>
      </div>
    </div>
    <!-- 本玩法最终解释权归蛋蛋部落所有 -->
    <div class="BottomText">本玩法最终解释权归蛋蛋部落所有</div>
  </div>
</template>

<script>
import { quitView } from '../utils/toApp.js'
export default {
  name: 'lootingRules',
  components: {},
  props: {},
  data() {
    return {
      uid: '',
      access_token: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    const arr = window.location.search.substring(1).split('&')
    const obj = {}
    arr.forEach((item) => {
      obj[item.split('=')[0]] = ''
      obj[item.split('=')[0]] = item.split('=')[1]
    })
    this.uid = obj.uid
    this.access_token = obj.access_token
  },
  mounted() {},
  methods: {
    backBtn() {
      quitView(this.uid, this.access_token)
    }
  }
}
</script>

<style scoped lang="scss">
.lootingRules {
  position: relative;
  width: 100%;
  height: 812px;
  background: linear-gradient(90deg, #362c70 0%, #383067 48%, #312058 100%);
  box-sizing: border-box;
  // 顶部图片
  .topBackImage {
    margin: 0 auto;
    width: 340px;
    height: 124px;
    background: url('../assets/sm_img_bg.png') no-repeat top/100% auto;
  }
  // 掠夺规则标题
  .ruleTitle {
    margin: -78px auto 0;
    width: 156px;
    height: 31px;
    font-size: 24px;
    font-weight: bold;
    color: #e9eaff;
    display: flex;
    justify-content: center;
    text-shadow: 3px 0 6px #4e32a2;
    background: url('../assets/img_title4bot.png') no-repeat center center/100%
      90%;
  }
  // 返回按钮
  .backBtn {
    position: absolute;
    top: 42px;
    left: 27px;
    width: 46px;
    height: 36px;
    background: url('../assets/btn_back.png') no-repeat center/100% auto;
  }
  // 掠夺标题图片
  .PlunderTitleImage,
  .EnemiesTitleImage,
  .DeepHatredTitleImage {
    margin: 22px auto 0;
    width: 302px;
    height: 32px;
    background: url('../assets/img_title12.png') no-repeat center/100% auto;
  }
  // 掠夺说明
  .PlunderContent,
  .EnemiesContent,
  .DeepHatredContent {
    margin: 10px auto 0;
    width: 340px;
    height: 281px;
    border: 35px solid transparent;
    box-sizing: border-box;
    border-image-source: url('../assets/img_textbot.png');
    border-image-repeat: repeat;
    border-image-slice: 33% 10% 33% 10% fill;
    .PlunderContentText {
      position: relative;
      .PlunderContentTextUl {
        position: absolute;
        top: -13px;
        left: 12px;
        width: 264px;
        // padding-left: 10px;
        .PlunderContentTextLi {
          width: 100%;
          position: relative;
          color: #c0adff;
          font-size: 12px;
          font-family: Source Han Sans CN;
          line-height: 18px;
          font-weight: 500;
          &:nth-child(3) {
            padding-right: 3px;
          }
          &:nth-child(4) {
            padding-right: 3px;
          }
          &:nth-child(5) {
            margin-top: 2px;
          }
          .PlunderContentTextIcon {
            top: 0;
            left: -23px;
            position: absolute;
            width: 20px;
            height: 20px;
            background: url('../assets/ico_star.png') no-repeat center/100% auto;
          }
        }
      }
    }
  }
  // 仇敌标题图片
  .EnemiesTitleImage {
    margin-top: 30px;
    background-image: url('../assets/img_title13.png');
  }
  // 仇敌说明
  .EnemiesContent {
    height: 79px;
    .PlunderContentTextUl {
      .PlunderContentTextLi {
        padding-right: 3px;
      }
    }
  }
  // 深仇标题图片
  .DeepHatredTitleImage {
    margin-top: 30px;
    background-image: url('../assets/img_title14.png');
  }
  // 深仇说明
  .DeepHatredContent {
    height: 131px;
    .PlunderContentTextLi {
      padding-right: 3px;
    }
  }
  // 本玩法最终解释权归蛋蛋部落所有
  .BottomText {
    margin-top: 8px;
    text-align: center;
    font-size: 11px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #7460a5;
  }
}
</style>
