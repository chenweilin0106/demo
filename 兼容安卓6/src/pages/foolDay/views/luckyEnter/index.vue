<template>
  <div class="container4">
    <!--幸运闯关-->
    <div class="outComm">
      <div class="inComm luckyBreak">
        <!-- 空闲界面 -->
        <div class="notOpen" v-if="!gamer_status">
          <!-- 头部消费钻石 以及闯关币余额 -->
          <div class="piece_currency changeTran">
            <div class="left">
              <span>已消费</span>
              <img src="../../assets/mk4_1.png" />
              <span>：{{ this.package.consume }}</span>
            </div>
            <div class="right">
              <span>闯关币</span>
              <img src="../../assets/mk4_2.png" />
              <span>：{{ this.package.currency }}</span>
            </div>
          </div>
          <!-- 提示文字 -->
          <p class="currencyText">
            集齐幸运碎片，合成限定奖励<span class="special">（我的
              <img src="../../assets/mk4_5.png" />
              ：<span class="pieceSpan">{{ this.package.piece }}</span>）</span>
          </p>
          <!--卡片  -->
          <div class="piece_card">
            <div class="pieceExchanges">
              <div class="pieceExchange" v-for="(item, index) in toSpecialAwards" :key="index">
                <div class="tips"
                  v-if="!(item.type == 'voice_ticket' && item.status == 1) && (package.piece >= item.cond)">
                </div>
                <!-- 头像或者lottie动画 -->
                <img :src="require('../../assets/' + item.icon)" @click="mix(item, item.type, index)"
                  v-if="item.type != 'mic'" alt="" class="synthesisImg" />
                <div class="lottie lottieCard mic" v-if="item.type == 'mic'" @click="mix(item, item.type, index)"></div>
                <div class="pieceCard">
                  <p>{{ item.text }}</p>
                </div>
                <p class="exchangePi" v-if="item.type == 'voice_ticket' && item.status == 1">
                  已拥有
                </p>
                <p class="exchangePi" v-else>
                  <img src="../../assets/mk4_5.png" />
                  : {{ package.piece }} /{{ item.cond }}
                </p>
              </div>
            </div>
            <div class="pieceCards">
              <div class="pieceCardS">
                <img src="../../assets/mk4_dj_1_12.png" />
                <p>元宝</p>
              </div>
              <div class="pieceCardS">
                <img src="../../assets/mk4_dj_1_9.png" />
                <p>绿晶石</p>
              </div>
              <div class="pieceCardS">
                <img src="../../assets/mk4_dj_2_10.png" />
                <p>紫晶石</p>
              </div>
              <div class="pieceCardS">
                <img src="../../assets/mk4_dj_2_11.png" />
                <p>防爆石</p>
              </div>
              <div class="pieceCardS">
                <img src="../../assets/mk4_dj_2_2.png" />
                <p>礼物道具</p>
              </div>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="outFreeOpen">
            <div class="freeOpen lingqu" _type="devil_open" v-if="!this.package.yet_played" @click="chuangguan">
              免费开启闯关
            </div>
            <div class="freeOpen lingqu" _type="devil_open" v-else @click="chuangguan">
              <img class="lefticon" src="../../assets/mk1_2_1.png" alt="" />
              20 开启闯关
            </div>
          </div>
        </div>
        <div class="breakOpen" v-if="gamer_status">
          <p class="breakOpenTop" v-if="starDistance">
            距星星关卡仅剩<span class="remainingLevels" v-if="delaystarDistance > 0">{{ delaystarDistance }}</span>关，星星关没有大魔王哦~
          </p>
          <p class="emptyOpenTop" v-else></p>
          <!-- 关卡等级 -->
          <div class="breakLevel">
            <!-- 左边 -->
            <div class="breakLevelLeft">
              <img src="../../assets/mk4_22.png" class="levelImg" />
              <div class="levelNote">
                <p class="firstCom"></p>
                <p class="spots"><span></span><span></span></p>
                <p class="spots"><span></span><span></span></p>
                <p class="spots"><span></span><span></span></p>
                <p class="centerNumber">1</p>
                <p class="spots"><span></span><span></span></p>
                <p class="otherNumber">2</p>
                <p class="spots"><span></span><span></span></p>
                <p class="otherNumber">3</p>
              </div>
            </div>
            <!-- 右边 -->
            <div class="breakLevelRight">
              <!-- 常规四张卡片 -->
              <div class="flipCards animated" v-if="transCardList.length > 0"
                :class="[{ fadeOutUpBig: isturning }, { bounceInUp: isturned }]">
                <div class="flipCard flipC" @click="throttleTurnOver(index + 1, $event, item.award_id)"
                  v-for="(item, index) in transCardList" :key="index">
                  <!-- 未翻开 -->
                  <div class="face front" :class="'flipCard' + (index + 1)"
                    v-if="item.award_id == 0 && turnOverIndex != index"></div>
                  <!-- 已经翻开  有未消灭大魔王-->
                  <div class="face back alreadyFlip"
                    v-if="(item.award_id == '-1' && package.devil_time) || (package.is_devil && turnOverIndex == index && package.devil_time)">
                    <div class="breakDown">{{ transDevilTime }}</div>
                    <img src="../../assets/mk4_18.png" class="devil" />
                    <p>点击消灭大魔王</p>
                  </div>
                  <!-- 已经翻开  有已经消灭大魔王-->
                  <div class="face back alreadyFlip" v-if="item.award_id == '-1' && !package.devil_time">
                    <img src="../../assets/mk4_18_1.png" class="devil" />
                    <p>大魔王已消灭</p>
                  </div>
                  <!-- 已经翻开  普通奖励-->
                  <div class="face back alreadyFlip"
                    v-if="item.award_id != '-1' && turnOverIndex == index && !package.is_devil">
                    <img :src="require('../../assets/' + package.award.icon_s)" class="normalImg1" />
                    <img :src="require('../../assets/' + package.award.icon)" class="normalImg" />
                    <p>{{ package.award.text }}+{{ package.award.nums }}</p>
                  </div>
                </div>
              </div>
              <!-- 单张大魔王 -->
              <div class="devilShow" v-else>
                <p class="breakDown">
                  <span class="special fiveTime">{{ transDevilTime }}</span>内可消灭大魔王，<span class="special">完成闯关！</span>
                </p>
                <div class="devilCard" @click="oneKeyPage">
                  <p class="devilNums">X{{ package.devil_nums }}</p>
                  <img src="../../assets/mk4_18.png" />
                  <p>点击消灭大魔王</p>
                </div>
                <p class="killDevil">
                  糟糕！遇见<span class="special"><span class="devilNumsS">{{ package.devil_nums
                  }}</span>个</span>大魔王，必须消灭他们<span class="special">才能拿到奖励</span>！
                </p>
              </div>
            </div>
          </div>
          <!-- 当前奖励 -->
          <div class="currentAward">
            <div class="currentAwardT">
              <p>当</p>
              <p>前</p>
              <p>奖</p>
              <p>励</p>
            </div>
            <div class="flipAwards">
              <div class="toawardsPoolItem" v-for="(item, index) in toawardsPool" :key="index">
                <div class="flipP"><span>+{{ item.nums }}</span></div>
                <div class="flipI">
                  <img :src="require('../../assets/' + item.icon_s)">
                </div>
                <div class="flipT">{{ item.text }}</div>
              </div>
              <p class="noAwards" v-if="toawardsPool.length == 0">暂无奖励</p>
            </div>
            <div class="currentB"></div>
          </div>
          <!-- 按钮 -->
          <div class="breakBtns" v-if="transCardList.length > 0">
            <p class="leftStop" @click="toastQuitEarly">见好就收</p>
            <p class="rightStop" @click="onkeyPass">一键通关</p>
          </div>
          <div class="breakBtns" v-else>
            <p class="leftStop" @click="show4 = true">放弃奖励并退出</p>
            <p class="rightStop" @click="killDevil"><img src="../../assets/mk4_1.png" alt=""> {{ package.kill_spend }}
              消灭大魔王</p>
          </div>
        </div>
        <!-- 规则说明 -->
        <div class="breakRule">
          <div class="rechargeDivTTitle">
            <div class="line"></div>
            <div class="centertit">规则说明</div>
            <div class="line"></div>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>
              活动期间，<span class="special">每消费100钻石</span>可获得1闯关币，完成<span
                class="special">气球兑奖任务</span>也可获得闯关币，消耗20闯关币可开启闯关，翻卡赢奖
            </p>
          </div>
          <div class="breakRuleDivs">
            <div class="breakRuleDiv">
              <img src="../../assets/mk4_11.png" />
              <p>翻开卡片</p>
              <p class="special">获得对应奖励</p>
            </div>
            <div class="breakRuleDiv">
              <img src="../../assets/mk4_12.png" />
              <p>翻到大魔王</p>
              <p class="special">失去所有奖励</p>
            </div>
            <div class="breakRuleDiv">
              <img src="../../assets/mk4_13.png" />
              <p>消灭大魔王</p>
              <p class="special">保留奖励,继续闯关</p>
            </div>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>闯关过程中随时可以见好就收，将当前奖励领取到账，并结束闯关</p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>
              翻到大魔王后，在<span class="special">5分钟</span>内使用钻石消灭大魔王，可保留奖励，继续闯关，若未及时消灭，将失去所有奖励
            </p>
          </div>
          <div class="ruleKText">
            <p class="circle"></p>
            <p>
              翻卡闯关有几率获得幸运碎片，集齐指定数量的<span class="special">幸运碎片可合成限定奖励</span>，集齐七彩声波可获得神秘<span class="special">限定声波</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 合成神秘声波 -->
    <div class="outComm commImg">
      <div class="inComm">
        <img src="../../assets/title_4.png" class="header" />
        <p class="voiceTicketP">
          声波自选券
          <img src="../../assets/mk4_27.png" />
          ：<span>{{ voice_tickets }}</span>
        </p>
        <!-- 转盘 -->
        <div class="synthesisMysterious">
          <div class="voice" :class="'voice' + (index + 1)" v-for="(item, index) in 7" :key="index">
            <div class="voiceLottieC lottie" :class="'lottie' + (index + 1)"></div>
            <div class="voiceP">
              <!-- 可兑换 -->
              <!-- 赤 青 橙 紫 蓝 金 粉 -->
              <img src="../../assets/mk4_28.png" v-if="
                (index == 0 && color_sonic.owned_ids.indexOf('64') != -1) ||
                (index == 1 && color_sonic.owned_ids.indexOf('66') != -1) ||
                (index == 2 && color_sonic.owned_ids.indexOf('61') != -1) ||
                (index == 3 && color_sonic.owned_ids.indexOf('60') != -1) ||
                (index == 4 && color_sonic.owned_ids.indexOf('70') != -1) ||
                (index == 5 && color_sonic.owned_ids.indexOf('71') != -1) ||
                (index == 6 && color_sonic.owned_ids.indexOf('69') != -1)
              " alt="" />
              <!-- 锁定 -->
              <img src="../../assets/mk4_29.png" v-else alt="" />
              {{ word(index) }}
            </div>
            <p class="voiceExchangeBtn" _mark="64" @click="handleExchangeSound(index)" v-if="
              (index == 0 && color_sonic.owned_ids.indexOf('64') == -1) ||
              (index == 1 && color_sonic.owned_ids.indexOf('66') == -1) ||
              (index == 2 && color_sonic.owned_ids.indexOf('61') == -1) ||
              (index == 3 && color_sonic.owned_ids.indexOf('60') == -1) ||
              (index == 4 && color_sonic.owned_ids.indexOf('70') == -1) ||
              (index == 5 && color_sonic.owned_ids.indexOf('71') == -1) ||
              (index == 6 && color_sonic.owned_ids.indexOf('69') == -1)
            ">
              兑换
            </p>
          </div>
          <div class="centerVoice">
            <div class="voiceLottieS lottie"></div>
            <p class="voiceP">神秘星空</p>
          </div>
          <div class="smP">
            <p class="msP1">集齐七彩声波可合成</p>
            <p class="msP2">永久声波</p>
          </div>
        </div>
        <!-- 合成按钮 -->
        <div v-if="color_sonic.secret_status !== 2" class="synthesisMysteriousB" _type="devil_merge"
          @click="handleCompositeSound">
          <p>
            (已收集七彩声波<span>{{ color_sonic.owned_ids.length }}</span>/7)
          </p>
        </div>
        <!-- 底部文字 -->
        <div class="textComm mysterText">
          <div class="circle"></div>
          <div class="tit11">集齐七彩系列永久声波可兑换永久声波神秘星空</div>
        </div>
      </div>
    </div>
    <!--消灭大魔王遮罩层-->
    <van-popup v-model:show="show1" z-index="2"
      :style="{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)' }" :lock-scroll="true"
      class="commToast killDevilToast">
      <div class="whiteborder">
        <!-- 弹窗block -->
        <div class="inKillDevilToast">
          <!-- 弹框标题 -->
          <img class="header" src="../../assets/tk_3.png" />
          <div class="killDevilH">
            <!-- 魔王头像 -->
            <img src="../../assets/pop_3.png" />
            <!-- 右边文字 -->
            <!-- 一键通关遇见多个大魔王 -->
            <div class="devilText" v-if="this.package.is_one_touch">
              糟糕！遇见<span class="special">{{ this.package.devil_nums }} 个</span>大魔王，必须消灭他们<span
                class="special">才能拿到奖励</span>！
            </div>
            <!-- 当前挂卡遇见的大魔王 -->
            <div class="devilText" v-else>
              糟糕！遇见大魔王，你将失去<span class="special">所有奖励</span>！
            </div>
            <p class="devil_nums" v-if="this.package.is_one_touch">
              X{{ this.package.devil_nums }}
            </p>
          </div>
          <!-- 倒计时 -->
          <div class="breakDown">
            <span class="special fiveTime">{{ transDevilTime }}</span>内可消灭大魔王，<span class="special">完成闯关</span>！
          </div>
          <!-- 奖励列表 -->
          <div class="oDevilAwardBox">
            <div class="devilAwardBox" v-for="(item, index) in toawardsPool" :key="index">
              <div class="devilAward">
                <p class="devilP"><span>+{{ item.nums }}</span></p>
                <div class="toastB">
                  <img :src="require('../../assets/' + item.icon)" />
                  <div class="gifttit">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="oneClearanceO" style="margin-bottom: 0;" @click="killDevil">
            <div class="oneClearance lingqu">
              <img src="../../assets/mk4_1.png" />{{ this.package.kill_spend }}
              消灭大魔王
            </div>
          </div>
          <!-- 放弃并退出 -->
          <a href="javascript:void(0);" class="give_exit" @click="show4 = true">放弃奖励并退出</a>
        </div>
      </div>
    </van-popup>
    <!--合成成功-->
    <van-overlay z-index="2023" class="commToast synthesisToast" :show="show2" @click="close(2)">
      <div class="whiteborder">
        <div class="inCommToast" @click.stop>
          <img src="../../assets/tk_7.png" class="header" />
          <div class="synthesisG">
            <!-- 合成的图片 -->
            <div class="car" v-if="package.special_awards[selectId].type == 'car'">
              <img :src="require('../../assets/' + package.special_awards[selectId].icon)" alt="">
            </div>
            <!-- <div class="voice_ticket">
              <img src="../../assets/mk4_20.png" alt="">
            </div> -->
            <div class="voice_ticket" v-if="package.special_awards[selectId].type == 'voice_ticket'">
              <img :src="require('../../assets/' + package.special_awards[selectId].icon)" alt="">
            </div>
            <!-- 头饰 -->
            <div class="inSynthesisG lottieCard2father" v-if="package.special_awards[selectId].type === 'mic'">
              <div class="lottieCard2"></div>
            </div>
          </div>
          <p class="synthesisT" v-if="package.special_awards[selectId].type == 'voice_ticket'">声波自选券</p>
          <p class="synthesisT" v-else>{{ package.special_awards[selectId].text }}</p>
          <div class="dressBtnO">
            <div class="dressBtn" @click="equip(package.special_awards[selectId])"
              v-if="package.special_awards[selectId].type == 'car'">立即装备</div>
            <div class="dressBtn" @click="equip(package.special_awards[selectId])"
              v-if="package.special_awards[selectId].type == 'mic'">
              立即装扮</div>
            <div class="dressBtn" @click="close(2)" v-if="package.special_awards[selectId].type == 'voice_ticket'">
              我知道了</div>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 兑换声波---弹框 -->
    <van-overlay z-index="2023" class="commToast exchangeVoiceToast" :show="show3" @click="close(3)">
      <div class="whiteborder">
        <div class="inCommToast">
          <!-- 兑换声波 -->
          <img v-if="sound_tk_type === 'unExcharge'" src="../../assets/tk_2.png" class="header" />
          <!-- 恭喜获得 -->
          <img v-if="sound_tk_type === 'excharged' || sound_tk_type === 'composite'" src="../../assets/tk_1.png"
            class="header" />
          <div class="synthesisG">
            <div class="inSynthesisG">
              <div class="lottie lottieOverlay"></div>
            </div>
          </div>
          <p class="synthesisT">
            {{ sound_tk_type === "composite" ? "永久声波神秘星空" : "永久声波" }}
          </p>
          <div class="rechargeBtn">
            <p v-if="sound_tk_type === 'unExcharge'" class="iThink toastLeftB" @click="close(3)">
              取消
            </p>
            <p class="confirmExchange" _type="devil_exchange" @click="handleExcharge">
              {{ sound_tk_type === "unExcharge" ? "确认兑换" : "立即装扮" }}
            </p>
          </div>
        </div>
      </div>

    </van-overlay>
    <!--放弃消灭大魔王-->
    <van-overlay z-index="2024" class="failSkill failToast1" :show="show4" @click="close(4)">
      <div class="whiteborder">
        <div class="inFailSkill" @click.stop>
          <p class="rechargeText">放弃会失去当前累计的所有奖励，你想好了吗？</p>
          <div class="rechargeBtn">
            <p class="confirmFail toastLeftB" _type="devil_give_up" @click="devil_give_up">
              确认放弃
            </p>
            <p class="iThink toastRightB" @click="close(4)">我再想想</p>
          </div>
        </div>
      </div>
    </van-overlay>
    <!--消耗碎片合成-->
    <van-overlay z-index="2023" class="failSkill failToast2" @click="close(5)" :show="show5">
      <div class="inFailSkill" @click.stop>
        <p class="rechargeText" v-if="package.special_awards[selectId].type == 'car'">
          是否消耗{{ package.special_awards[selectId].cond }}幸运碎片合成{{ package.special_awards[selectId].name }}座驾？</p>
        <p class="rechargeText" v-if="package.special_awards[selectId].type == 'mic'">
          是否消耗{{ package.special_awards[selectId].cond }}幸运碎片合成{{ package.special_awards[selectId].name }}头饰？</p>
        <p class="rechargeText" v-if="package.special_awards[selectId].type == 'voice_ticket'">
          是否消耗{{ package.special_awards[selectId].cond }}幸运碎片合成{{ package.special_awards[selectId].name }}？</p>
        <div class="rechargeBtn">
          <p class="iThink toastLeftB" @click="close(5)">我再想想</p>
          <p class="immediateSynthesis toastRightB" @click="mixNow">立即合成</p>
        </div>
      </div>
    </van-overlay>
    <!--退出闯关-->
    <van-overlay z-index="2024" class="failSkill failToast3" @click="close(6)" :show="show6">
      <div class="inFailSkill" @click.stop>
        <p class="rechargeText">继续闯关可解锁更多奖励，确定现在就退出吗？</p>
        <div class="rechargeBtn">
          <p class="immediateExit toastLeftB" _type="devil_quit_early" @click="devil_quit_early">
            立即退出
          </p>
          <p class="iThink toastRightB" @click="close(6)">我再想想</p>
        </div>
      </div>
    </van-overlay>
    <!--闯关币不足-->
    <van-overlay z-index="2023" class="failSkill failToast4" @click="close(7)" :show="show7">
      <div class="inFailSkill" @click.stop>
        <p class="rechargeText">
          闯关币不足，消费或完成气球兑奖任务可获赠更多闯关币
        </p>
        <p class="iKnowBtnS" @click="close(7)">我知道了</p>
      </div>
    </van-overlay>
    <!--闯关失败 --倒计时结束-->
    <van-overlay z-index="2024" class="killDevilToast commToast timeover" :show="show8">
      <div class="whiteborder">
        <div class="inKillDevilToast">
          <img src="../../assets/tk_4.png" class="header" />
          <p class="rechargeText">大魔王未及时消灭，已失去本次闯关的所有奖励</p>
          <p class="oneClearanceO successBtn" @click="iKnow">我知道了</p>
        </div>
      </div>
    </van-overlay>
    <!-- 闯关成功 -->
    <van-overlay z-index="2023" :show="show9" @click="close(9)" class="commToast killDevilToast">
      <div class="whiteborder">
        <!-- 弹窗block -->
        <div class="inKillDevilToast" @click.stop>
          <!-- 弹框标题 -->
          <img class="header" src="../../assets/tk_5.png" />
          <p class="rechargeText1">恭喜获得</p>
          <!-- 奖励列表 -->
          <div class="oDevilAwardBox success">
            <div class="devilAwardBox" v-for="(item, index) in toawardsPool" :key="index">
              <div class="devilAward">
                <p class="devilP"><span>+{{ item.nums }}</span></p>
                <div class="toastB">
                  <img :src="require('../../assets/' + item.icon)" />
                  <div class="gifttit">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="oneClearanceO successBtn" @click="close(9)">
            我知道了
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 恭喜获得 -->
    <van-overlay z-index="2023" :show="show10" @click="close(10)" class="commToast killDevilToast">
      <div class="whiteborder">
        <!-- 弹窗block -->
        <div class="inKillDevilToast" @click.stop>
          <!-- 弹框标题 -->
          <img class="header" src="../../assets/tk_1.png" />
          <!-- 奖励列表 -->
          <div class="oDevilAwardBox success">
            <div class="devilAwardBox" v-for="(item, index) in toawardsPool" :key="index">
              <div class="devilAward">
                <p class="devilP"><span>+{{ item.nums }}</span></p>
                <div class="toastB">
                  <img :src="require('../../assets/' + item.icon)" />
                  <div class="gifttit">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 按钮 -->
          <div class="oneClearanceO successBtn" @click="close(10)">
            我知道了
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import $ from "../../js/jquery-vendor";
// 引入lottie
import lottie from "lottie-web";
import blue from "../../assets/lottie/blue/data.json";
import gold from "../../assets/lottie/gold/data.json";
import orange from "../../assets/lottie/orange/data.json";
import pink from "../../assets/lottie/pink/data.json";
import purple from "../../assets/lottie/purple/data.json";
import red from "../../assets/lottie/red/data.json";
import syan from "../../assets/lottie/syan/data.json";
import smxk from "../../assets/lottie/smxk/data.json";
import dfw from "../../assets/lottie/dfw/data.json";

// 引入api
import { mix } from "../../api/mix";
import { exchangeSound, compositeSound, nowEquip } from "../../api/exchange";
import { equip } from "../../api/equip";
import { getDepositRebateData } from "../../api/depositRebate";
import { play } from "../../api/play";

// 引入vant组件
import { Toast } from "vant";
export default {
  name: "luckyEnter",
  components: {},
  props: {},
  data() {
    return {
      // 弹窗隐藏标识
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false,
      // 用户是否首次闯关
      is_first: false,
      // 页面闯关状态
      gamer_status: false,
      // 声波---弹框类型
      sound_tk_type: "",
      // 声波---弹框数据
      tk_Sound_id: "",
      recharge_nums: 0,
      // 声波数据
      color_sonic: {
        secret_status: 2,
        owned_ids: ["60"],
      },
      //用户声波兑换券数量
      voice_tickets: 0,
      package: {
        // 关卡
        step: 1,
        // 一键通关状态
        is_one_touch: false,
        is_devil: false, // 当前关卡是否有大魔王
        // 魔王剩余时间
        devil_time: false,
        // 大魔王数量
        devil_nums: 0,
        //消灭魔王所需钻石数量
        kill_spend: 0,
        // 当前关卡卡牌状态
        card_list: {
          1: {
            id: 1,
            award_id: 0,
          },
          2: {
            id: 2,
            award_id: 0,
          },
          3: {
            id: 3,
            award_id: 0,
          },
          4: {
            id: 4,
            award_id: 0,
          },
        },
        // 当前奖池状态
        awards_pool: {
          3: {
            type: "tool",
            id: 2,
            text: "绿晶石",
            icon: "mk4_dj_1_9.png",
            icon_s: "mk4_dj_3_9.png",
            icon_b: "mk4_dj_2_9.png",
            nums: "2",
          },
        },
        // 限定奖励状态
        special_awards: {
          // 限定奖励key
          1: {
            type: "car",
            id: 57,
            name: "如虎添翼",
            nums: 15,
            cond: 150,
            text: "座驾+15天",
            icon: "mk4_6.png",
            limit: false,
            // 合成状态（1-已合成 0-未合成）
            status: 0,
          },
          2: {
            type: "mic",
            id: 47,
            name: "大魔王",
            nums: 15,
            cond: 150,
            text: "头饰+15天",
            icon: "mk4_5.png",
            limit: false,
            status: 0,
          },
          6: {
            type: "voice_ticket",
            id: 0,
            name: "",
            nums: 1,
            cond: 300,
            text: '声波自选券+1',
            icon: 'mk4_20.png',
            limit: false,
            status: 0,
          },
        },
        // 当前翻开的奖励
        award: {
          type: "property",
          id: "gamegold",
          text: "元宝",
          icon: "mk4_dj_1_12.png",
          icon_s: "mk4_dj_3_12.png",
          icon_b: "mk4_dj_2_12.png",
          key: 2,
          nums: 2000,
        },
        // 一键通关总奖励
        awards: {
          1: {
            type: "piece",
            id: 1,
            text: "幸运碎片",
            icon: "mk4_dj_1_1.png",
            icon_s: "mk4_dj_3_1.png",
            icon_b: "mk4_dj_2_1.png",
            nums: 20,
          },
          2: {
            type: "property",
            id: "gamegold",
            text: "元宝",
            icon: "mk4_dj_1_12.png",
            icon_s: "mk4_dj_3_12.png",
            icon_b: "mk4_dj_2_12.png",
            nums: 7000,
          },
          3: {
            type: "tool",
            id: 2,
            text: "绿晶石",
            icon: "mk4_dj_1_9.png",
            icon_s: "mk4_dj_3_9.png",
            icon_b: "mk4_dj_2_9.png",
            nums: 28,
          },
          6: {
            type: "tool",
            id: 19,
            text: "礼物道具",
            icon: "mk4_dj_1_6.png",
            icon_s: "mk4_dj_3_6.png",
            icon_b: "mk4_dj_2_6.png",
            nums: 1,
          },
          8: {
            type: "tool",
            id: 44,
            text: "礼物道具",
            icon: "mk4_dj_1_4.png",
            icon_s: "mk4_dj_3_4.png",
            icon_b: "mk4_dj_2_4.png",
            nums: 1,
          },
          12: {
            type: "tool",
            id: 23,
            text: "礼物道具",
            icon: "mk4_dj_1_2.png",
            icon_s: "mk4_dj_3_2.png",
            icon_b: "mk4_dj_2_2.png",
            nums: 2,
          },
        },
        // 闯关币数量
        currency: 0,
        // 幸运碎片数量
        piece: 0,
        // 闯关次数（true-已经闯关过 false-未闯关）
        yet_played: false,
        //抽奖次数
        lottery_ticket: 0,
        //通关次数（每10次重置）
        pass_times: 0,
        //已消费钻石数
        consume: 0,
      },
      isturning: false, // 翻牌中状态
      isturned: false, // 翻牌结束状态
      turnOverIndex: null, // 翻开的牌下标值
      devilTimer: null, //魔王倒计时id
      delaystarDistance: 5,
      selectId: 1, //当前选择的合成限定奖励的id
      toastlottieObj: null, //限定奖励弹窗的动画对象
      overlaylottieObj: null, //兑换声波弹窗的动画对象
      previous: 0,
      uid: null
    };
  },
  computed: {
    // 限定奖励数组
    toSpecialAwards() {
      return Object.values(this.package.special_awards);
    },
    //奖池奖励数组
    toawardsPool() {
      return Object.values(this.package.awards_pool);
    },
    // 星星关卡距离
    starDistance() {
      if (this.package.step < 6) {
        return 6 - this.package.step;
      } else if (this.package.step > 6 && this.package.step < 12) {
        return 12 - this.package.step;
      } else if (this.package.step > 12 && this.package.step < 18) {
        return 18 - this.package.step;
      } else {
        return 0;
      }
    },
    // 转换后的魔王剩余时间
    transDevilTime() {
      return (
        Math.floor(this.package.devil_time / 60) +
        ":" +
        (this.package.devil_time % 60 >= 10 ? this.package.devil_time % 60 : ('0' + this.package.devil_time % 60))
      );
    },
    // 索引号转换成声波id
    indexToSoundId() {
      return (index) => {
        switch (index) {
          case 0:
            return "64";
          case 1:
            return "66";
          case 2:
            return "61";
          case 3:
            return "60";
          case 4:
            return "70";
          case 5:
            return "71";
          case 6:
            return "69";
          case 75:
            return "75";
        }
      };
    },
    // 索引号转成声波对应lottie-json文件和文件名
    indexToJsonName() {
      return (index) => {
        switch (index) {
          case 0:
            return { animationData: red, type: "red" };
          case 1:
            return { animationData: syan, type: "syan" };
          case 2:
            return { animationData: orange, type: "orange" };
          case 3:
            return { animationData: purple, type: "purple" };
          case 4:
            return { animationData: blue, type: "blue" };
          case 5:
            return { animationData: gold, type: "gold" };
          case 6:
            return { animationData: pink, type: "pink" };
          default:
            return "";
        }
      };
    },
    // 转换后的卡牌列表
    transCardList() {
      return Object.values(this.package.card_list);
    },
    //转换后的一键通关总奖励
    transAwards() {
      if (this.package.awards) {
        return Object.values(this.package.awards);
      } else {
        return [];
      }
    },
  },
  watch: {
    //正常写法
    package: {
      // immediate:true, //初始化时让handler调用一下
      deep: true,//深度监视
      handler(newValue) {
        if (newValue.devil_time === 0) {
          console.log('倒计时结束，魔王未消灭', newValue.devil_time)
          this.show1 = false
          this.show8 = true
        }
      }
    }
  },
  created() { },
  mounted() {
    // 初始化数据
    this.init().then((res) => {
      console.log(res);
      this.stepF(this.package.step);
      // 如果是有大魔王开始计时
      if (this.package.devil_time) {
        this.devilTimer = setInterval(() => {
          if (this.package.devil_time > 0) {
            this.package.devil_time--;
          }
        }, 1000);
      }
    });
    // 加载动画
    this.svgFun("lottieCard", dfw, "dfw");
    this.svgFun("lottie1", red, "red");
    this.svgFun("lottie2", syan, "syan");
    this.svgFun("lottie3", orange, "orange");
    this.svgFun("lottie4", purple, "purple");
    this.svgFun("lottie5", blue, "blue");
    this.svgFun("lottie6", gold, "gold");
    this.svgFun("lottie7", pink, "pink");
    this.svgFun("voiceLottieS", smxk, "smxk");
    // 初始化翻牌状态
    this.isturned = false
    this.isturning = false
  },
  beforeDestroy() {
    clearInterval(this.devilTimer);
  },
  methods: {
    throttle(fn, delay) {
      return () => {
        let args = arguments;//注意如果要传参的话 这句不能省略
        if (this.timeout) {
          this.timeout = setTimeout(() => {
            this.timeout = null;
            fn.apply(this, args)
          }, delay)
        }
      }
    },
    //倒计时结束，关闭弹窗
    iKnow() {
      this.package.devil_time = false
      this.show8 = false
      this.init().then(res => {
        if (res.errno == 0) {
          this.svgFun('lottieCard', dfw, 'dfw')
        }
      })
    },
    // 放弃奖励
    devil_give_up() {
      getDepositRebateData({
        type: "devil_give_up",
      }).then((res) => {
        // 成功
        if (res.errno == 0) {
          this.show1 = false
          this.show4 = false
          this.turnOverIndex = null
          // 停止魔王倒计时
          clearInterval(this.devilTimer)
          this.init().then(res => {
            this.svgFun('lottieCard', dfw, 'dfw')
          })
        }
      });
    },
    // 见好就收弹窗
    toastQuitEarly() {
      // 如果有大魔王
      if (this.package.devil_time) {
        Toast("必须先消灭大魔王才能见好就收哦");
      } else {
        // 如果没有大魔王
        this.show6 = true;
      }
    },
    // 见好就收退出
    devil_quit_early() {
      getDepositRebateData({
        type: "devil_quit_early",
      }).then((res) => {
        // 成功
        if (res.errno == 0) {
          this.show6 = false
          console.log(res)
          this.package.awards_pool = res.data
          if (this.toawardsPool.length > 0) {
            this.show10 = true;
          } else {
            this.init().then(res => {
              this.svgFun('lottieCard', dfw, 'dfw')
            })
          }
        }
      });
    },
    // 消灭大魔王
    killDevil() {
      let vars = window.location.search.substring(1).split('&');
      let commonData = {};
      for (let i = 0; i < vars.length; i++) {
        let arr1 = vars[i].split('=');
        var key = arr1[0];
        var val = arr1[1];
        let str = "commonData." + key + "='" + val + "'";
        eval(str);
      }
      this.uid = commonData.uid
      console.log(this.uid)
      console.log(this.package.is_one_touch)
      if (this.package.is_one_touch) {
        console.log(this.package.kill_spend)
        //一键通关消灭大魔王
        getDepositRebateData({
          type: "devil_kill_all",
        }).then((res) => {
          console.log(res)
          // 成功消灭
          if (res.errno == 0) {
            // 魔王状态消失
            this.package.devil_time = false;
            // 关闭消灭魔王弹窗
            this.show1 = false;
            // 闯关成功弹窗展示
            this.show9 = true;
            clearInterval(this.devilTimer)
          } else if (res.errno == 3) {
            console.log(res.errmsg)
            this.callAppF(this.package.kill_spend)
          }
        });
      } else {
        console.log(this.package.kill_spend)
        //消灭大魔王单个
        getDepositRebateData({
          type: "devil_kill",
        }).then((res) => {
          console.log(res, "成功消灭单个大魔王结果");
          if (res.errno == 0) {
            console.log("成功消灭单个大魔王");
            this.package.card_list = res.data;
            this.package.devil_time = false;
            // 关闭弹窗
            this.show1 = false;
            this.turnOverIndex = null
            clearInterval(this.devilTimer)
          } else if (res.errno == 3) {
            console.log(res.errmsg)
            this.callAppF(this.package.kill_spend)
          }
        });
      }
    },
    callAppF(carat) {
      var params = { 'uid': this.uid, 'carat': carat };
      if (this.isIOS() || navigator.userAgent.indexOf('Safari') == -1) {
        window.webkit.messageHandlers.DDRechargeAlert.postMessage(params);
        return;
      }
      window.external.action('/shortDiamond?tuid=' + this.uid + '&carat=' + carat + '');
    },
    // 判断ios
    isIOS() {
      var u = navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    // 一键通关
    onkeyPass() {
      if (this.package.devil_time) {
        Toast("当前有大魔王未消灭，无法一键通关");
      } else {
        getDepositRebateData({
          type: "devil_one_touch",
        }).then((res) => {
          console.log(res, "一键通关结果");
          if (res.errno == 0) {
            this.package.awards_pool = res.data.awards
            this.package.devil_nums = res.data.devil_nums
            this.package.devil_time = res.data.devil_time
            this.package.kill_spend = res.data.kill_spend
            this.package.step = res.data.step
            getDepositRebateData({
              mark: "m4",
              type: "tab",
            }).then((res1) => {
              console.log(res1)
              this.package.is_one_touch = res1.data.package.is_one_touch
              //没有大魔王闯关成功
              if (res.data.devil_nums == 0) {
                Toast("闯关成功");
                console.log(this.package.awards_pool, 2222)
                this.show9 = true;
              } else {
                clearInterval(this.devilTimer)
                // 有大魔王弹窗
                this.devilTimer = setInterval(() => {
                  if (this.package.devil_time > 0) {
                    this.package.devil_time--;
                  }
                }, 1000);
                // 展示弹框
                this.show1 = true;
              }
            });
          } else {
            Toast(res.errmsg);
          }
        });
      }
    },
    // 进入下一关
    stepF(step) {
      var stepNHtml = "";
      if (step == 1) {
        stepNHtml =
          '<p class="firstCom"></p>\n' +
          '         <p class="spots"><span></span><span></span></p>\n' +
          '         <p class="spots"><span></span><span></span></p>\n' +
          '         <p class="spots"><span></span><span></span></p>\n' +
          '         <p class="centerNumber">1</p>\n' +
          '         <p class="spots"><span></span><span></span></p>\n' +
          '         <p class="otherNumber">2</p>\n' +
          '         <p class="spots"><span></span><span></span></p>\n' +
          '         <p class="otherNumber">3</p>';
      }
      if (step == 2) {
        stepNHtml =
          '<p class="spots"><span></span><span></span></p>\n' +
          '      <p class="otherNumber">1</p>\n' +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="centerNumber">2</p>\n' +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="otherNumber">3</p>\n' +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="otherNumber">4</p>';
      }
      // <img src="../../assets/mk4_24.png" alt="">
      var imgurl = require('../../assets/mk4_24.png')
      var starHtml = "<img src=\"" + imgurl + "\">";
      if (step >= 3 && step <= 18) {
        var step_2 = step - 2;
        var step_1 = step - 1;
        var step_d = step;
        var step_1_ = step + 1;
        var step_2_ = step + 2;

        $(".centerNumber").css("paddingTop", "0");

        if (step_2 == 6 || step_2 == 12 || step_2 == 18) {
          step_2 = starHtml;
        }
        if (step_1 == 6 || step_1 == 12 || step_1 == 18) {
          step_1 = starHtml;
        }
        if (step == 6 || step == 12 || step == 18) {
          step_d = starHtml;
        }

        if (step_1_ == 6 || step_1_ == 12 || step_1_ == 18) {
          step_1_ = starHtml;
        }
        if (step_2_ == 6 || step_2_ == 12 || step_2_ == 18) {
          step_2_ = starHtml;
        }
        stepNHtml =
          '<p class="otherNumber">' +
          step_2 +
          "</p>\n" +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="otherNumber">' +
          step_1 +
          "</p>\n" +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="centerNumber">' +
          step_d +
          "</p>\n" +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="otherNumber">' +
          step_1_ +
          "</p>\n" +
          '      <p class="spots"><span></span><span></span></p>\n' +
          '      <p class="otherNumber">' +
          step_2_ +
          "</p>";
      }
      if (step == 19) {
        stepNHtml = "<p class=\"otherNumber\">17</p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"otherNumber\"><img src=\"" + imgurl + "\"></p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"centerNumber\">19</p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"otherNumber\">20</p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>";
      }

      if (step == 20) {
        stepNHtml = "<p class=\"otherNumber\"><img src=\"" + imgurl + "\"></p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"otherNumber\">19</p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"centerNumber\">20</p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>\n" +
          "      <p class=\"spots\"><span></span><span></span></p>";
      }
      $(".levelNote").html(stepNHtml);

      if ($(".centerNumber img").length > 0) {
        $(".centerNumber").css("paddingTop", "5px")
      }

      $(".otherNumber").each(function () {
        if ($(this).find("img").length > 0) {
          $(this).css("background", "transparent");
        }
      });
      var stepC = 0;
      if (step < 6 || (step > 6 && step < 12) || (step > 12 && step < 18)) {
        if (step > 12) {
          stepC = Number(18 - step);
        } else if (step > 6) {
          stepC = Number(12 - step);
        } else {
          stepC = Number(6 - step);
        }
      }
      this.delaystarDistance = this.starDistance
    },
    // jQuery的飞动画效果方法
    flyF(event) {
      $(".flipCards .flipC").removeClass("flipC");
      // 当前奖励
      var offset = $(".currentAward").offset();
      var scrollTop = $(document).scrollTop();
      var flyer = $(".normalImg1");
      flyer.fly({
        speed: 0.9,
        start: {
          left: event.pageX, //抛物体起点横坐标
          top: event.pageY - scrollTop, //抛物体起点纵坐标
        },
        end: {
          left: offset.left, //抛物体终点横坐标
          top: offset.top - scrollTop, //抛物体终点纵坐标
        },
        onEnd: () => {
          flyer.remove();
          // 初始化卡牌状态
          this.isturned = false;
          this.isturning = false;
          this.turnOverIndex = null;
          // 赋值data操作
          this.init();
        },
      });
    },
    throttleTurnOver(i, event, id) {
      if ((new Date() - this.previous) > 1500) {
        this.turnOver(i, event, id)
        this.previous = new Date()
      } else {
        return
      }
    },
    // 翻牌方法
    turnOver(i, event, id) {
      console.log(i, Date.parse(new Date()));
      // 如果点击的是大魔王牌面
      if (id == -1) {
        // 大魔王未消灭
        if (this.package.devil_time) {
          this.devil_page();
          return;
        } else {
          // 大魔王已经消灭
          return;
        }
      }
      getDepositRebateData({
        mark: i,
        type: "devil_turnover",
      }).then((res) => {
        console.log(res, "翻牌成功");
        if (res.errno == 0) {
          this.package.is_devil = res.data.is_devil; //是否大魔王
          this.package.step = res.data.step; //关卡信息
          this.package.is_pass = res.data.is_pass; // 是否通关
          if (res.data.kill_spend) {
            this.package.kill_spend = res.data.kill_spend; //消灭大魔王钻石数
          }
          if (res.data.devil_time) {
            this.package.devil_time = res.data.devil_time; //消灭大魔王钻石数
          }
          if (res.data.award) {
            this.package.award = res.data.award; //消灭大魔王钻石数
          }
          if (res.data.card_list) {
            this.package.card_list = res.data.card_list; //卡牌列表
          }
          if (res.data.awards_pool) {
            this.package.awards_pool = res.data.awards_pool; //卡牌列表
          }

          // 翻开的牌给予下标值标记
          this.turnOverIndex = i - 1;
          if (this.package.is_devil) {
            this.devil_page();
          }
          // 翻牌中
          setTimeout(() => {
            // 如果非大魔王关卡
            if (this.package.is_devil == false) {
              this.isturning = true;
            }
          }, 1200);
          // 翻牌结束
          setTimeout(() => {
            // 如果非大魔王关卡
            if (this.package.is_devil == false) {
              this.isturning = false;
              this.isturned = true;
              // 礼物飞入动画
              this.flyF(event);
            }
            // 通关
            if (this.package.is_pass === true) {
              // 闯关成功弹窗展示
              this.show9 = true
            } else {
              // 进入下一关
              this.stepF(this.package.step);
            }
          }, 1500);
        }
      });
    },
    // 展示单张魔王弹窗
    devil_page() {
      getDepositRebateData({
        type: "devil_page",
      }).then((res) => {
        console.log(res);
        Object.assign(this.package, res.data);
      });
      // 进入大魔王关卡
      // devilPage(data, mark);
      clearInterval(this.devilTimer)
      this.devilTimer = setInterval(() => {
        if (this.package.devil_time > 0) {
          this.package.devil_time--;
        }
      }, 1000);
      // 展示弹框
      this.show1 = true;
    },
    // 展示一键通关魔王弹窗
    oneKeyPage() {
      this.show1 = true;
    },
    // 初始化数据方法
    init() {
      return new Promise((resolve, reject) => {
        getDepositRebateData({
          mark: "m4",
          type: "tab",
        }).then((res) => {
          if (res.errno != 0) {
            return this.$toast(res.errmsg)
          }
          if (res.errno == 0) {
            // 请求成功
            this.is_first = res.data.is_first
            this.gamer_status = res.data.gamer_status
            this.recharge_nums = res.data.recharge_nums
            this.voice_tickets = res.data.voice_tickets
            this.color_sonic = res.data.color_sonic
            Object.assign(this.package, res.data.package)
          }
          resolve(res);
        });
      });
    },
    // 开启闯关
    chuangguan() {
      console.log("开启闯关");
      play({
        type: "devil_open",
      }).then((res) => {
        console.log(res);
        if (res.errno === 0) {
          this.package.step = 1
          this.delaystarDistance = this.starDistance
          this.init();
        } else if (res.errno == 3) {
          // 闯关币不足
          console.log(res.errmsg);
          this.show7 = true;
        }
      });
    },
    // 立即装扮
    equip(item) {
      console.log(item)
      equip({
        type: 'comm_equip',
        mark: {
          tool_id: item.id,
          type: item.type
        }
      }).then((res) => {
        console.log(res)
        if (res.errno == 0) {
          // car mic voice_ticket
          if (item.type == 'car') {
            Toast('装备成功')
          } else {
            Toast('装扮成功')
          }
        } else {
          Toast(res.errmsg)
        }
        this.show2 = false
      })
    },
    // 立即合成限定奖励
    mixNow() {
      console.log(Number(this.selectId))
      mix({
        type: 'devil_complex',
        mark: Number(this.selectId)
      }).then((res) => {
        if (res.errno === 0) {
          this.package.piece = res.data.piece
          this.package.special_awards = res.data.special_awards
          this.voice_tickets = res.data.voice_tickets
          this.show5 = false
          this.show2 = true
          if (this.toastlottieObj) {
            this.toastlottieObj.destroy()
          }
          // 如果是头饰选项 加载头饰动画 
          if (this.package.special_awards[this.selectId].type == 'mic') {
            this.toastlottieObj = this.svgFun('lottieCard2', dfw, 'dfw')
            console.log(this.toastlottieObj)
          }
        } else {
          Toast(res.errmsg);
          this.show5 = false
        }
      });
    },
    // 关闭弹窗
    close(i) {
      this["show" + i] = false;
      if (i == 9 || i == 10) {
        // 闯关成功
        this.init().then(res => {
          console.log('回到主页')
          this.svgFun('lottieCard', dfw, 'dfw')
        })
      }
      if (i === 3) {
        setTimeout(() => {
          this.sound_tk_type = "";
        }, 400);
      }
    },
    // 立即装扮接口
    async nowEquip(type, id) {
      const res = await nowEquip({
        type,
        id,
      });
      return res;
    },
    // 声波---弹框内确认兑换按钮---立即装扮
    async handleExcharge() {
      if (
        this.sound_tk_type === "excharged" ||
        this.sound_tk_type === "composite"
      ) {
        this.tk_Sound_id = this.indexToSoundId(this.tk_Sound_id);
        // 发送立即装扮接口请求
        const res = await this.nowEquip("voice", this.tk_Sound_id);
        console.log(res);
        this.close(3);
        if (res.errno == 0) {
          if (this.tk_Sound_id == 75) {
            this.$toast("成功装扮");
          } else {
            this.$toast("兑换成功并完成装扮");
          }
        }
      } else {
        // 发送确认兑换接口
        const res = await this.exchangeSound(
          this.indexToSoundId(this.tk_Sound_id)
        );
        if (res.errno === -1) {
          this.close(3);
          this.$toast(res.errmsg);
          return;
        } else {
          this.close(3);
          setTimeout(() => {
            this.sound_tk_type = "excharged";
            const obj = this.indexToJsonName(this.tk_Sound_id);
            // 清除动画
            if (this.overlaylottieObj) {
              this.overlaylottieObj.destroy()
            }
            this.overlaylottieObj = this.svgFun("lottieOverlay", obj.animationData, obj.type);
            this.show3 = true;
          }, 500);
        }
      }
      await this.init();
    },
    // 声波---兑换按钮点击事件
    async handleExchangeSound(index) {
      await this.init();
      if (this.voice_tickets >= 1) {
        const obj = this.indexToJsonName(index);
        if (this.overlaylottieObj) {
          this.overlaylottieObj.destroy()
        }
        this.overlaylottieObj = this.svgFun("lottieOverlay", obj.animationData, obj.type);
        this.tk_Sound_id = index;
        this.sound_tk_type = "unExcharge";
        this.show3 = true;
      } else {
        this.$toast("当前没有声波自选券");
      }
    },
    // 兑换声波道具接口
    async exchangeSound(mark) {
      const res = await exchangeSound({
        type: "devil_exchange",
        mark,
      });
      return res;
    },
    // 合成神秘声波接口
    async compositeSound() {
      const res = await compositeSound();
      return res;
    },
    // 声波---立即合成按钮点击事件
    async handleCompositeSound() {
      const res = await this.compositeSound();
      if (res.errno === -1) {
        this.$toast(res.errmsg);
      } else {
        this.sound_tk_type = "composite";
        this.tk_Sound_id = 75;
        if (this.overlaylottieObj) {
          this.overlaylottieObj.destroy()
        }
        this.overlaylottieObj = this.svgFun("lottieOverlay", smxk, "smxk");
        this.show3 = true;
      }
    },
    // 合成限定奖励弹窗
    mix(item, type, i) {
      this.selectId = Object.keys(this.package.special_awards)[i]
      if (this.package.special_awards[this.selectId].type == 'voice_ticket' && this.package.special_awards[this.selectId].status == 1) {
        return
      }
      // if(this.toSpecialAwards)
      if (this.package.piece >= item.cond) {
        this.show5 = true;
      }
    },
    // 赤 青 橙 紫 蓝 金 粉
    word(i) {
      switch (i) {
        case 0:
          return "赤之声";
        case 1:
          return "青之声";
        case 2:
          return "橙之声";
        case 3:
          return "紫之声";
        case 4:
          return "蓝之声";
        case 5:
          return "金之声";
        case 6:
          return "粉之声";
        default:
          return "";
      }
    },
    // 展示lottie动画
    svgFun(location, animationData, type) {
      const params = {
        container: document.querySelectorAll("." + location)[0],
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
        assets: animationData.assets.forEach((item) => {
          item.u = "";
          if (item.w && item.h && !item.p.includes("/")) {
            item.p = `https://cdn-image.dandan818.com/activity/weekly/json/foolDay/${type}/images/${item.p}`
          }
        })
      }
      return lottie.loadAnimation(params)
    }
  }
}
</script>
<style  lang="scss">
@keyframes jump {
  0% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(0px, -5px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

@import url("../../assets/css/public/css/animate.min.css");

// @import url('../../assets/css/layui/css/layui.mobile.css');
// @import url('../../assets/css/public/css/swiper.min.css');
.container4 {
  display: flex;
  flex-direction: column;
  align-items: center;

  .outComm {
    width: 360px;
    background: #937bef;
    display: flex;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 30px;

    .inComm {
      width: 350px;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      border: 1px solid #ffffff;

      .notOpen {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .piece_currency {
          width: 100%;
          margin-top: 14px;
          display: flex;
          justify-content: space-between;

          .left,
          .right {
            height: 24px;
            background: #603fc8;
            border-radius: 0px 12px 12px 0px;
            display: flex;
            align-items: center;
            padding-left: 12px;
            padding-right: 21px;

            img {
              width: 21px;
              height: 16px;
              display: block;
              margin: 0 2px;
            }

            span {
              font-size: 12px;
              color: #ffffff;
              display: block;
            }
          }

          .right {
            border-radius: 12px 0px 0px 12px;
            padding-left: 10px;
            padding-right: 5px;

            img {
              width: 16px;
              height: 16px;
            }
          }
        }

        .currencyText {
          margin-top: 16px;
          white-space: nowrap;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          white-space: nowrap;
          display: flex;
          align-items: center;

          .special {
            color: #FFF99E;
            display: flex;
            align-items: center;

            img {
              width: 16px;
              height: 16px;
              margin-top: 1px;
              margin-left: 2px;
            }
          }
        }

        .piece_card {
          width: calc(100% - 24px);
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .pieceExchanges {
            // border: 1px solid red;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .pieceExchange {
              width: 100px;
              height: 130px;
              border-radius: 6px;
              background-image: url("../../assets/mk4_9.png");
              background-size: 100% 100%;
              position: relative;

              .tips {
                width: 60px;
                height: 25px;
                background-image: url("../../assets/mk4_3.png");
                background-size: 100% 100%;
                position: absolute;
                left: 20px;
                top: -13px;
                // display: none;
                animation: jump 1s infinite;
                -webkit-animation: jump 1s infinite;
              }

              .synthesisImg {
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80px;
                height: 80px;
              }

              .mic {
                position: absolute;
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 66px;
                height: 66px;
              }

              .pieceCard {
                position: absolute;
                top: 100px;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 18px;
                background: #b375ff;
                border-radius: 9px;
                display: flex;
                align-items: center;
                justify-content: center;

                p {
                  font-size: 12px;
                  color: #ffffff;
                  display: block;
                  white-space: nowrap;
                  margin: 0 6px;
                }
              }

              .exchangePi {
                position: absolute;
                top: 140px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 12px;
                color: #7959c3;
                white-space: nowrap;
                display: flex;
                align-items: center;

                img {
                  width: 13px;
                  height: 13px;
                  display: inline-block;
                  margin-right: 6px;
                }
              }
            }
          }

          .pieceCards {
            margin-top: 35px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .pieceCardS {
              width: 60px;
              height: 78px;
              background-image: url("../../assets/mk4_10.png");
              background-size: 100% 100%;
              position: relative;
              text-align: center;

              img {
                position: absolute;
                top: 15px;
                left: 50%;
                transform: translateX(-50%);
                width: 34px;
                height: 30px;
              }

              p {
                margin-top: 53px;
                font-size: 10px;
                transform: scale(0.83);
                color: #fb5faa;
                white-space: nowrap;
              }
            }
          }
        }

        .outFreeOpen {
          margin-top: 21px;
          width: 240px;
          height: 48px;
          background: linear-gradient(0deg, #7d8ff8, #b5eeff);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;

          .freeOpen {
            font-size: 16px;

            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;

            .lefticon {
              width: 16px;
              height: 16px;
              margin-right: 4px;
            }
          }
        }
      }

      .breakOpen {
        padding-top: 8px;

        .breakOpenTop {
          width: 252px;
          height: 27px;
          background: linear-gradient(0deg, #7d8ff8, #b5d3ff);
          background-image: url('../../assets/mk4_7.png');
          background-size: 100% 100%;
          margin-left: 18px;
          padding: 5px 10px 9px 14px;
          box-sizing: border-box;
          white-space: nowrap;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }

        .emptyOpenTop {
          width: 252px;
          height: 27px;
          margin-left: 18px;
        }

        .breakLevel {
          margin-top: 3px;
          margin-left: 23px;
          margin-right: 29px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          .breakLevelLeft {
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .levelImg {
              width: 29px;
              height: 15px;
            }

            .levelNote {
              width: 20px;
              height: 265px;
              padding-top: 21px;
              box-sizing: border-box;
              background: linear-gradient(0deg,
                  rgba(92, 39, 211, 0) 0%,
                  #ffe29e 50%,
                  rgba(92, 39, 211, 0) 100%);

              .centerNumber {
                width: 27px;
                height: 27px;
                background: #ffffff;
                border-radius: 50%;
                background-image: url("../../assets/mk4_23.png");
                background-size: 100% 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 500;
                color: #711274;
                margin-left: -4px;
              }

              .otherNumber {
                width: 16px;
                height: 16px;
                background: #5b30a2;
                opacity: 0.5;
                border-radius: 50%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 500;
                color: #ffffff;
                margin-left: 2px;
              }

              .firstCom {
                height: 10px;
              }

              .spots {
                margin: 10px 8px;

                span {
                  width: 4px;
                  height: 4px;
                  border-radius: 50%;
                  display: block;
                  margin-bottom: 6px;
                  background: rgba($color: #fff, $alpha: 0.3);
                }
              }

              .otherNumber img,
              .centerNumber img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 19px;
                height: 19px;
                display: block;

              }

              .centerNumber img {
                margin: 0 auto;
              }
            }
          }

          .breakLevelRight {
            .flipCards {
              width: 230px;
              height: 275px;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;

              .flipCard {
                .face {
                  width: 105px;
                  height: 130px;
                }

                // .front {}

                // .back {}

                .flipCard1 {
                  background-image: url("../../assets/mk4_14.png");
                  background-size: 100% 100%;
                }

                .flipCard2 {
                  background-image: url("../../assets/mk4_15.png");
                  background-size: 100% 100%;
                }

                .flipCard3 {
                  background-image: url("../../assets/mk4_16.png");
                  background-size: 100% 100%;
                }

                .flipCard4 {
                  background-image: url("../../assets/mk4_17.png");
                  background-size: 100% 100%;
                }

                .alreadyFlip {
                  background-image: url("../../assets/mk4_19.png");
                  background-size: 100% 100%;
                  position: relative;

                  .normalImg,
                  .normalImg1 {
                    position: absolute;
                    width: 55px;
                    height: 62px;
                    top: 28px;
                    left: 50%;
                    transform: translateX(-50%);
                  }

                  .normalImg1 {
                    width: 0;
                    height: 0;
                  }

                  .breakDown {
                    width: 48px;
                    height: 20px;
                    background: linear-gradient(0deg, #7d8ff8, #b5eeff);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #ffffff;
                    position: absolute;
                    top: -7px;
                    left: 50%;
                    transform: translateX(-50%);
                  }

                  .devil {
                    width: 61px;
                    height: 86px;
                    position: absolute;
                    top: 13px;
                    left: 50%;
                    transform: translateX(-50%);
                  }

                  p {
                    position: absolute;
                    top: 105px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 12px;
                    color: #fb2505;
                    white-space: nowrap;
                  }
                }

                // img {}

                // p {}
              }
            }

            .devilShow {
              display: flex;
              flex-direction: column;
              align-items: center;

              .breakDown {
                color: #ffffff;

                .special {
                  color: #fff99e;
                }
              }

              .devilCard {
                width: 145px;
                height: 180px;
                background-image: url("../../assets/mk4_19.png");
                background-size: 100% 100%;
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 19px;
                position: relative;

                p {
                  font-size: 12px;

                  color: #fb2505;
                  margin-top: 17px;
                }

                .devilNums {
                  position: absolute;
                  width: 48px;
                  height: 20px;
                  background: linear-gradient(0deg, #7d8ff8, #b5eeff);
                  border: 1px solid #ffffff;
                  border-radius: 10px;
                  top: -8px;
                  left: 106px;
                  margin-top: 0;
                  font-size: 16px;

                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

                img {
                  margin-top: 29px;
                  width: 73px;
                  height: 103px;
                }
              }

              .killDevil {
                margin-top: 20px;
                width: 237px;
                height: 38px;
                line-height: 19px;

                color: #7959c3;

                .special {
                  color: #f67baf;
                }
              }
            }
          }
        }

        .currentAward {
          width: 350px;
          height: 55px;
          // background: #8061e5;
          display: flex;
          align-items: center;
          position: relative;

          .currentAwardT {
            width: 20px;
            height: 55px;
            background: linear-gradient(0deg, #a675ff, #ff7cd5);
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 1px;

            p {
              font-size: 10px;
              transform: scale(0.83333);
              text-align: center;
              line-height: 11px;
            }
          }

          .flipAwards {
            height: 100%;
            background: #8061e5;
            flex: 1;
            display: flex;
            align-items: flex-start;
            overflow-x: scroll;
            overflow-y: hidden;
            box-sizing: border-box;
            padding-left: 8px;

            .toawardsPoolItem {
              margin-top: 8px;
              width: 30px;
              height: 43px;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: relative;
              margin-right: 16px;

              .flipP {
                position: absolute;
                right: 0;
                transform: translateX(13px);
                top: -4px;
                height: 14px;
                background: linear-gradient(45deg, #F76CB7, #AE75FF);
                border: 1px solid #FFFFFF;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding-right: 2px;

                span {
                  font-size: 10px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #FFFFFF;
                  line-height: 11px;
                  word-wrap: none;
                  transform: scale(0.83333);
                }
              }

              .flipI {
                width: 30px;
                height: 30px;
                background: #FFFFFF;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                  width: 20px;
                  height: 20px;
                }
              }

              .flipT {
                white-space: nowrap;
                margin-top: 3px;
                font-size: 10px;
                transform: scale(0.83333);
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 11px;
              }
            }

            .noAwards {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 11px;
              margin-left: 124px;
              margin-top: 22px;
            }
          }

          .currentB {
            position: absolute;
            right: 0;
            top: 0;
            width: 35px;
            height: 53px;
            background: linear-gradient(-90deg,
                #2f1977 0%,
                rgba(47, 25, 119, 0) 100%);
          }
        }

        .breakBtns {
          margin-top: 17px;
          display: flex;
          align-items: center;
          justify-content: center;

          .leftStop {
            width: 140px;
            height: 36px;
            background: linear-gradient(0deg, #7d8ff8, #b5eeff);
            border: 1px solid #ffffff;
            border-radius: 18px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #fffefe;
            margin-right: 19px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .rightStop {
            width: 140px;
            height: 36px;
            background: linear-gradient(0deg, #9069fe, #f9b3ff);
            border: 1px solid #ffffff;
            border-radius: 18px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          img {
            width: 18px;
            height: 14px;
            margin-right: 3px;
          }
        }
      }

      .breakRule {
        margin-top: 17px;
        margin-left: 50%;
        margin-bottom: 20px;
        transform: translateX(-50%);
        width: 330px;
        background: linear-gradient(180deg, #caa7ff, #8c8ef9);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .rechargeDivTTitle {
          height: 16px;

          display: flex;
          align-items: center;
          margin-top: 12px;

          .centertit {
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            margin: 0 5px;
          }

          .line {
            width: 30px;
            height: 2px;
            background: #ffffff;
            border-radius: 1px;
          }
        }

        .ruleKText {
          display: flex;
          align-items: flex-start;
          margin-top: 11px;

          P {
            margin-right: 14px;

            color: #ffffff;
            line-height: 20px;
          }

          .special {
            color: #FFF99E;
          }

          .circle {
            flex-shrink: 0;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-top: 8px;
            margin-left: 9px;
            margin-right: 8px;
            background-color: #fff99e;
          }
        }

        .ruleKText:first-child {
          margin-top: 17px;
        }

        .ruleKText:last-child {
          margin-bottom: 14px;
        }

        .breakRuleDivs {
          width: calc(100% - 46px);
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .breakRuleDiv {
            width: 84px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
              width: 84px;
              height: 105px;
            }

            p {
              margin-top: 11px;
              font-size: 10px;
              transform: scale(0.83);
              color: #ffffff;
              line-height: 14px;
              white-space: nowrap;
            }

            .special {
              margin-top: 2px;
              color: #fff99e;
            }
          }
        }
      }
    }

    .luckyBreak {
      background: linear-gradient(180deg, #FFF5FA, #F8EEFF);

      .notOpen,
      .breakOpen {
        background: linear-gradient(180deg, #7D5CE8, #FBF1FD);
      }
    }
  }

  .commImg {

    // margin-top: 39px;
    .inComm {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      overflow: visible;
    }

    .header {
      width: 285px;
      height: 70px;
      margin-top: -39px;

      // position: absolute;
      // top: -40px;
      // left: 32px;
      img {
        width: 100%;
      }
    }

    .voiceTicketP {
      width: 175px;
      height: 24px;
      background: #7e57d3;
      border-radius: 12px;

      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 7px;

      img {
        width: 32px;
        height: 16px;
        margin: 0 5px;
      }
    }

    .synthesisMysterious {
      margin-top: 16px;
      width: 340px;
      height: 340px;
      background: linear-gradient(45deg, #fff3ca, #ffeb7d);
      border-radius: 50%;
      background-image: url("../../assets/mk4_30.png");
      background-size: 100% 100%;
      position: relative;

      .voice {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;

        .voiceLottieC {
          position: relative;
          z-index: 10;
          width: 80px;
          height: 80px;
        }

        .voiceP {
          position: relative;
          z-index: 11;
          margin-top: -15px;
          width: 60px;
          height: 16px;
          background: linear-gradient(-90deg, #f591fe, #6243cc);
          border: 1px solid #6243cc;
          border-radius: 8px;
          display: flex;
          align-items: center;
          font-size: 12px;

          color: #ffffff;

          img {
            width: 12px;
            height: 12px;
            background: #fffac4;
            border-radius: 50%;
            margin-left: 3px;
            margin-right: 4px;
          }
        }

        .voiceExchangeBtn {
          position: relative;
          z-index: 20;
          margin-top: 2px;
          width: 60px;
          height: 21px;
          background: linear-gradient(0deg, #cae7ff, #ffffff);
          border: 2px solid #6243cc;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4d7ddd;
        }
      }

      .voice1 {
        position: absolute;
        top: -5px;
        left: 133px;
      }

      .voice2 {
        position: absolute;
        top: 38px;
        left: 235px;
      }

      .voice3 {
        position: absolute;
        top: 38px;
        left: 28px;
      }

      .voice4 {
        position: absolute;
        top: 152px;
        left: 4px;
      }

      .voice5 {
        position: absolute;
        top: 235px;
        left: 197px;
      }

      .voice6 {
        position: absolute;
        top: 152px;
        left: 258px;
      }

      .voice7 {
        position: absolute;
        top: 235px;
        left: 62px;
      }

      .smP {
        margin-top: 200px;
        margin-left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #ffffff;

        p:nth-child(1) {
          font-weight: 600;
        }
      }
    }

    .centerVoice {
      position: absolute;
      top: 98px;
      left: 122px;
      width: 100px;
      // height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .voiceLottieS {
        width: 100%;
      }

      .voiceP {
        position: relative;
        z-index: 11;
        top: -22px;
        width: 60px;
        height: 16px;
        background: linear-gradient(-90deg, #f591fe, #6243cc);
        border: 1px solid #6243cc;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #ffffff;
      }
    }

    .synthesisMysteriousB {
      margin-top: 10px;
      width: 214px;
      border-radius: 28px;
      background: url("../../assets/mk4_32.png") no-repeat;
      background-size: 100%;
      display: flex;
      justify-content: center;

      p {
        height: 12px;
        font-size: 12px;
        color: #ffffff;
        margin-top: 32px;
        margin-bottom: 15px;
      }
    }

    .textComm {
      margin-top: 12px;
      margin-bottom: 15px;
      width: 330px;
      height: 30px;
      background: #6243cc;
      border-radius: 15px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;

      .tit11 {
        color: #ffffff;
      }

      .circle {
        flex-shrink: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-left: 9px;
        margin-right: 8px;
        background-color: #fff99e;
      }
    }
  }

  .commToast {
    .whiteborder {
      width: 300px;
      border: 4px solid #ffbaf4;
      border-radius: 15px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .inCommToast {
      width: 298px;
      height: 248px;
      box-sizing: content-box;
      border: 1px solid #ffffff;
      box-shadow: 0px 0px 1px 1px #ffbaf4;
      border-radius: 12px;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      // position: fixed;
      // top: 217px;
      // left: 50%;
      // transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        width: 285px;
        height: 70px;
        margin-top: -39px;
      }

      .synthesisG {
        width: 90px;
        height: 90px;
        background: #fffee9;
        border: 3px solid #ffbffb;
        border-radius: 6px;
        margin-top: 22px;
        position: relative;

        .inSynthesisG,
        .car,
        .voice_ticket {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90px;
          height: 90px;
          display: flex;
          justify-content: center;
          align-items: center;

          .lottie {
            width: 100%;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }

        .car {
          width: 84px;
          height: 64px;
        }

        .voice_ticket {
          width: 100%;
          height: 100%;
        }

        .lottieCard2father {
          width: 72px;
          height: 71px;

          .lottieCard2 {
            width: 100%;
            height: 100%;
          }
        }
      }

      .synthesisT {
        font-size: 12px;

        color: #ffffff;
        margin-top: 15px;
      }

      .dressBtnO {
        width: 180px;
        height: 36px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border-radius: 18px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        .dressBtn {
          width: 55px;
          height: 13px;
          color: #a9792c;
          white-space: nowrap;
        }
      }

      .rechargeBtn {
        margin-top: 21px;
        display: flex;
        align-items: center;

        .toastLeftB {
          margin-right: 12px;
          width: 120px;
          height: 36px;
          background: linear-gradient(0deg, #cae7ff, #ffffff);
          border-radius: 18px;
          font-size: 16px;

          color: #4d7ddd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .confirmExchange {
          width: 120px;
          height: 36px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border-radius: 18px;
          font-size: 16px;

          color: #a9792c;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .killDevilToast {
    .inKillDevilToast {
      width: 300px;
      border-radius: 12px;
      border: 1px solid #ffffff;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      display: flex;
      flex-direction: column;
      align-items: center;

      .header {
        width: 285px;
        height: 70px;
        margin-top: -39px;
      }

      .rechargeText,
      .rechargeText1 {
        width: 223px;
        height: 45px;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 23px;
      }

      .rechargeText1 {
        width: auto;
        height: auto;
        margin-top: 5px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }

      .killDevilH {
        margin-top: 5px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: relative;

        img {
          width: 80px;
          height: 80px;
          background: #ffffff;
          border-radius: 50%;
          margin-right: 19px;
        }

        .devilText {
          width: 154px;
          height: 60px;
          margin-top: 13px;
          font-size: 12px;

          color: #ffffff;
          line-height: 16px;
          background-image: url("../../assets/pop_4.png");
          background-size: 100% 100%;
          padding: 9px 8px 8px 23px;
          box-sizing: border-box;

          .special {
            color: #f7f26a;
          }
        }

        .devil_nums {
          width: 30px;
          height: 16px;
          background: linear-gradient(0deg, #7d8ff8, #b5eeff);
          border: 1px solid #ffffff;
          border-radius: 8px;
          position: absolute;
          top: 2px;
          left: 58px;
          font-size: 12px;

          color: #ffffff;
          line-height: 16px;
          display: flex;
          align-content: center;
          justify-content: center;
        }
      }

      .breakDown {
        margin-top: 10px;
        width: 206px;
        height: 14px;

        color: #ffffff;
        white-space: nowrap;

        .special {
          color: #f7f26a;
        }
      }

      .oDevilAwardBox {
        margin-top: 10px;
        width: 280px;
        height: 140px;
        background: #7c5fe2;
        border-radius: 6px;
        flex-shrink: 0;
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 0 8px;
        padding-top: 10px;

        .devilAwardBox {
          width: 60px;
          height: 78px;
          background-image: url(../../assets/mk4_10.png);
          background-size: 100% 100%;
          margin-bottom: 12px;
          margin-right: 7px;

          .devilAward {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;

            .devilP {
              position: absolute;
              top: -3px;
              right: -1px;
              width: 36px;
              height: 12px;
              background: linear-gradient(0deg, #7d8ff8, #b5eeff);
              border: 1px solid #ffffff;
              border-radius: 6px;
              color: #ffffff;
              line-height: 11px;
              display: flex;
              align-items: center;
              justify-content: center;

              span {
                font-size: 10px;
                transform: scale(0.83);
              }
            }

            .toastB {
              margin-top: 16px;
              display: flex;
              flex-direction: column;
              align-items: center;

              .gifttit {
                margin-top: 10px;
                font-size: 10px;
                transform: scale(0.83);
                color: #fb2505;
              }

              img {
                width: 27px;
                height: 27px;
              }
            }
          }
        }

        .devilAwardBox:nth-child(4n) {
          margin-right: 0;
        }
      }

      .success {
        width: auto;
        max-width: 280px;
        height: auto;
        background: none;
      }

      .oneClearanceO {
        width: 180px;
        height: 36px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;
        border-radius: 18px;
        margin-top: 19px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;

        .oneClearance {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a9792c;

          img {
            width: 18px;
            height: 13px;
            margin-right: 5px;
          }
        }
      }

      .successBtn {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #A9792C;
      }

      .give_exit {
        margin-top: 10px;
        margin-bottom: 13px;
        width: 85px;
        height: 13px;
        font-size: 12px;
        text-decoration: underline;
        color: #ffffff;
      }
    }
  }

  .failSkill {
    .inFailSkill {
      width: 250px;
      height: 150px;
      background: linear-gradient(180deg, #caa7ff, #8c8ef9);
      border: 4px solid #ffbaf4;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .rechargeText {
        width: 223px;
        height: 45px;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 32px;
      }

      .rechargeBtn {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        .toastLeftB {
          margin-right: 18px;
          width: 100px;
          height: 36px;
          background: linear-gradient(0deg, #cae7ff, #ffffff);
          border-radius: 18px;
          font-size: 16px;

          color: #4d7ddd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toastRightB {
          width: 100px;
          height: 36px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border-radius: 18px;
          font-size: 16px;

          color: #a9792c;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .iKnowBtnS {
        margin-top: 25px;
        width: 180px;
        height: 36px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 1px solid #ffffff;
        border-radius: 18px;
        font-size: 16px;

        color: #a9792c;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  // .timeover {
  //   .inFailSkill {
  //     width: 300px;
  //     height: 190px;
  //     background: linear-gradient(180deg, #caa7ff, #8c8ef9);
  //     border: 4px solid #ffbaf4;
  //     border-radius: 12px;

  //     .header {
  //       width: 285px;
  //       height: 70px;
  //       margin-top: -39px;
  //     }
  //   }
  // }
}
</style>
