<template>
  <PopupBox title="title_9.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>【衣橱冒险】玩家完成每日任务获得冒险次数，</li>
        <li>每次冒险可随机获得道具、装扮及形象配件，</li>
        <li>并额外获得5~10魔力值</li>
        <li>*每次冒险只能获得与自己账号性别一致的形</li>
        <li>象部件，形象部件为不放回式抽奖，不会抽到</li>
        <li>重复的形象部件</li>
        <li class="empty"></li>
        <li><span></span>【魔力进度】玩家单人或组队的累计魔力值达</li>
        <li>到进度即可领取进度奖励</li>
        <li class="empty"></li>
        <li><span></span>【我的形象】玩家可根据在【衣橱冒险】中获</li>
        <li>得的形象部件进行个性化搭配</li>
        <li class="empty"></li>
        <li><span></span>【开启合拍】玩家可与组队的好友进行合拍，</li>
        <li>开启合拍需双方均已保存形象。合拍背景及部</li>
        <li>件为玩家本人的效果</li>
      </ul>
    </div>
    <table v-once class="publicTable">
      <thead class="tableHead">
        <tr class="tableTr">
          <th class="tableCell tableTh">衣橱冒险奖励</th>
          <th class="tableCell tableTh">概率</th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr class="tableTr">
          <td class="tableCell tableTd">【碳酸汽水】声波+1天</td>
          <td class="tableCell tableTd deep">13%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd flex align-center justify-center">【蝶恋花】礼物赠送权+1天<div class="diamondLabel flex align-center radius-999 pointer-none line-height-1">328<img :src="IconPath('zs_42_32.png')" /></div></td>
          <td class="tableCell tableTd deep">12%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd flex align-center justify-center"><img :src="IconPath('tk_12.png')" class="tableIcon1" />【星河幻境】公屏气泡+1天</td>
          <td class="tableCell tableTd deep">9%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd flex align-center justify-center"><img :src="IconPath('tk_12.png')" class="tableIcon1" />【花影叠梦】戒指+1<div class="diamondLabel flex align-center radius-999 pointer-none line-height-1">888<img :src="IconPath('zs_42_32.png')" /></div></td>
          <td class="tableCell tableTd deep">3%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">绿晶石+15</td>
          <td class="tableCell tableTd deep">16%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">水晶玫瑰+1</td>
          <td class="tableCell tableTd deep">10%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">藏宝图+1</td>
          <td class="tableCell tableTd deep">9%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">符石精粹+100</td>
          <td class="tableCell tableTd deep">14%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">珍品面容素材+1</td>
          <td class="tableCell tableTd deep">2%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">珍品服装素材+1</td>
          <td class="tableCell tableTd deep">2%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">珍品鞋袜素材+1</td>
          <td class="tableCell tableTd deep">2%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">珍品场景素材+1</td>
          <td class="tableCell tableTd deep">2%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">珍品配饰素材+1</td>
          <td class="tableCell tableTd deep">5%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd flex-column align-center justify-center">卓越素材+1<i class="tableI text-nowrap">（包含随机：面容、服装、鞋袜、场景、配饰）</i></td>
          <td class="tableCell tableTd deep">1%</td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="rules-text-popup">
      <ul>
        <li><span></span>活动返场礼物：</li>
      </ul>
    </div>
    <div class="list">
      <div v-for="(item,index) in array" :key="index" class="award flex-column align-center">
        <div class="icon position-relative">
          <div class="rewardMark">{{item.mark}}<img :src="IconPath('zs_27_20.png')" /></div>
          <PublicImg :imgName="item.icon" />
        </div>
        <div class="text w-100 flex align-center justify-center line-height-1 text-nowrap">{{item.text}}</div>
      </div>
    </div> -->
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  data() {
    return {
      array: Object.freeze([
        { id: 1, icon: 'larj_120_120.png', text: '恋爱日记', name: '恋爱日记', nums: '1', type: 'tool', unit: '', has_right: 0, mark: 328 },
        { id: 2, icon: 'mghs_120_120.png', text: '玫瑰花束', name: '玫瑰花束', nums: '1', type: 'tool', unit: '', has_right: 0, mark: 520 },
        { id: 2, icon: 'gift_azsh_120_120.png', text: '爱之守护', name: '爱之守护', nums: '1', type: 'tool', unit: '', has_right: 0, mark: 3344 }
      ])
    }
  },
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.rules-text-popup{
  li{
    font-size: 26px;
  }
}
.tableIcon1{
  width: 45px;
  height: 44px;
}
.tableI{
  color: #58AC9F;
  font-size: 20px;
}
.tableHead{
  font-size: 24px;
}
.tableBody{
  font-size: 24px;
}
.deep{
  padding: 20px 40px;
}
.diamondLabel{
  top: auto;
  bottom: auto;
  left: auto;
  right: auto;
  transform: none;
}
.rewardMark{
  z-index: 1;
  background: linear-gradient(-90deg, #75B9FF, #FF84F8);
  border-radius: 17px;
  font-size: 20px;
  color: #FFFFFF;
  padding: 4px 5px 4px 10px;
  position: absolute;
  right: -20px;
  top: 0;
  transform: translateY(-50%);
  img{
    width: 27px;
    height: 20px;
    margin: 0 0 0 2px;
  }
}
// .list {
//   $listWidth: 100%; /*列表宽度*/
//   $itemIconSize: 128px; /*图标大小*/
//   $colNum: 3; /*列数*/
//   $gapNum: calc($colNum * 2 + 2); /*间隔数*/
//   $gap: calc(($listWidth - $itemIconSize * $colNum) / $gapNum);
//   $textHeight: 2 * 12 + 23px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
//   $itemWidth: calc($itemIconSize + 2 * $gap); /*每个item的宽度*/
//   //$listPadding: 15px $gap calc(15px - ($textHeight - 25px - 15px)) $gap; /*顶部：距离顶部的距离 底部间距：顶部间距-(顶部间距-文字高度-文字距离图标距离)*/
//   $listPadding: $gap 0 0; // 距离顶部的距离确保label展示完整
//   width: $listWidth;
//   height: fit-content;
//   min-height: calc($itemIconSize + $textHeight); /*最小展示一行： 图标高度 + 文字高度*/
//   max-height: calc(($itemIconSize + $textHeight) * 3 + (($itemIconSize + $textHeight) / 6)); /*最多展示三行： 图标高度 + 文字高度 +  1/6（图标高度 + 文字高度）*/
//   overflow-y: scroll;
//   overflow-x: hidden;
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   align-content: start;
//   padding: $listPadding;
//   margin: 0 auto;
//   .award {
//     $borderWidth: 4px; /*边框粗细*/
//     $radius: 12px; /*圆角*/
//     $borderColor: #FFC8DD;
//     $bgc: linear-gradient(180deg, #FFDFEA, #FFFFFF);
//     $fontSize: 24px; /*文本字体大小*/
//     $color: #fff;
//     width: $itemWidth;
//     .icon {
//       width: $itemIconSize;
//       height: $itemIconSize;
//       border-radius: $radius + $borderWidth;
//       border: $borderWidth solid $borderColor;
//       background:$bgc;
//     }
//     .text {
//       width: $itemIconSize;
//       height: $textHeight;
//       font-size: $fontSize;
//       color: $color;
//     }
//   }
// }
</style>
