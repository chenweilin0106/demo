<template>
  <div class="love-rank" :class="{ bg1: rankMark === 1, bg2: rankMark === 2 }">
    <img :src="IconPath('top_1.png')" class="left-flower" />
    <img :src="IconPath('top_2.png')" class="right-flower" />
    <img :src="IconPath('mk7_1.png')" class="title-1" />
    <!--奖励列表-->
    <div class="reward-list flex-center">
      <div
        v-for="(item, index) in rewardList"
        :key="index"
        class="reward-item flex-center"
      >
        <div v-if="item.price" class="price-label flex-center">
          价值{{ item.price }}<img :src="IconPath('zs_27_20.png')" />
        </div>
        <img
          v-if="item.isAudio"
          :src="IconPath('mk7_23.png')"
          class="audio-icon"
        />
        <img v-if="item.icon" :src="IconPath(item.icon)" class="icon" />
        <public-json v-else-if="item.text === '铭牌'" jsonName="mp_wycpnmy" />
        <div class="label flex-center">{{ item.text }}</div>
        <img
          v-if="item.is_click"
          :src="IconPath('mk7_2.png')"
          class="click-preview"
          @click="handleReward(item)"
        />
      </div>
    </div>
    <!--奖励详情弹框按钮-->
    <div
      class="reward-prompt-button flex-center"
      @click="openPrompt('rewardDetail')"
    >
      奖励详情
    </div>
    <!--tab-->
    <div class="rank-tab">
      <div v-if="rankMark === 1" class="daily-rank">
        <div class="click-content" @click="rankMark = 2"></div>
      </div>
      <div v-else class="total-rank">
        <div class="click-content" @click="rankMark = 1"></div>
      </div>
    </div>
    <!--日期列表-->
    <div v-if="rankMark === 1" class="date-list flex-center">
      <div
        v-for="(item, key) in pageData.day_list"
        :key="key"
        class="date-item flex-center"
        :class="{
          'current-date-bg': pageData.select_date == key
        }"
      >
        {{ item }}
        <div class="click-content" @click="changeDate(key)"></div>
      </div>
    </div>
    <img :src="IconPath('mk7_8.png')" class="title-2" />
    <div class="top-rank" :key="topRankKey">
      <div class="top top-1">
        <div class="user-info flex-center">
          <div class="info">
            <img
              v-if="rankData[0].profile_image"
              :src="IconPath(rankData[0].profile_image)"
              class="avatar"
              @click="toUserMain(rankData[0].uid)"
            />
            <img
              v-else
              :src="IconPath('mk7_22.png')"
              class="avatar"
              @click="toUserMain(rankData[0].uid)"
            />
            <div class="nick-name text-hidden">{{ rankData[0].username }}</div>
            <div class="uid flex-center">
              <img
                v-if="rankData[0].is_pretty"
                :src="IconPath('mk7_21.png')"
                class="uid-icon"
              />
              <span
                >ID:{{
                  rankData[0].is_pretty ? rankData[0].code : rankData[0].uid
                }}</span
              >
            </div>
          </div>
          <div class="info">
            <img
              v-if="rankData[0].tprofile_image"
              :src="IconPath(rankData[0].tprofile_image)"
              class="avatar"
              @click="toUserMain(rankData[0].tuid)"
            />
            <img
              v-else
              :src="IconPath('mk7_22.png')"
              class="avatar"
              @click="toUserMain(rankData[0].tuid)"
            />
            <div class="nick-name text-hidden">{{ rankData[0].tusername }}</div>
            <div class="uid flex-center">
              <img
                v-if="rankData[0].tuid_is_pretty"
                :src="IconPath('mk7_21.png')"
                class="uid-icon"
              />
              <span
                >ID:{{
                  rankData[0].tuid_is_pretty
                    ? rankData[0].tuid_code
                    : rankData[0].tuid
                }}</span
              >
            </div>
          </div>
        </div>
        <div class="num-box flex-center">
          <p>爱情能量</p>
          <p>{{ rankData[0].num }}</p>
        </div>
      </div>
      <div class="row flex-center">
        <div class="top top-2">
          <img :src="IconPath('mk7_11.png')" class="rank-icon" />
          <div class="user-info flex-center">
            <div class="info">
              <img
                v-if="rankData[1].profile_image"
                :src="IconPath(rankData[1].profile_image)"
                class="avatar"
                @click="toUserMain(rankData[1].uid)"
              />
              <img
                v-else
                :src="IconPath('mk7_22.png')"
                class="avatar"
                @click="toUserMain(rankData[1].uid)"
              />
              <div class="nick-name text-hidden">
                {{ rankData[1].username }}
              </div>
              <div class="uid flex-center">
                <img
                  v-if="rankData[1].is_pretty"
                  :src="IconPath('mk7_21.png')"
                  class="uid-icon"
                />
                <span class="text-hidden"
                  >ID:{{
                    rankData[1].is_pretty ? rankData[1].code : rankData[1].uid
                  }}</span
                >
              </div>
            </div>
            <div class="info">
              <img
                v-if="rankData[1].tprofile_image"
                :src="IconPath(rankData[1].tprofile_image)"
                class="avatar"
                @click="toUserMain(rankData[1].tuid)"
              />
              <img
                v-else
                :src="IconPath('mk7_22.png')"
                class="avatar"
                @click="toUserMain(rankData[1].tuid)"
              />
              <div class="nick-name text-hidden">
                {{ rankData[1].tusername }}
              </div>
              <div class="uid flex-center">
                <img
                  v-if="rankData[1].tuid_is_pretty"
                  :src="IconPath('mk7_21.png')"
                  class="uid-icon"
                />
                <span class="text-hidden"
                  >ID:{{
                    rankData[1].tuid_is_pretty
                      ? rankData[1].tuid_code
                      : rankData[1].tuid
                  }}</span
                >
              </div>
            </div>
          </div>
          <div class="num-box flex-center">
            <p>爱情能量</p>
            <p>{{ rankData[1].num }}</p>
          </div>
        </div>
        <div class="top top-3">
          <img :src="IconPath('mk7_12.png')" class="rank-icon" />
          <div class="user-info flex-center">
            <div class="info">
              <img
                v-if="rankData[2].profile_image"
                :src="IconPath(rankData[2].profile_image)"
                class="avatar"
                @click="toUserMain(rankData[2].uid)"
              />
              <img
                v-else
                :src="IconPath('mk7_22.png')"
                class="avatar"
                @click="toUserMain(rankData[2].uid)"
              />
              <div class="nick-name text-hidden">
                {{ rankData[2].username }}
              </div>
              <div class="uid flex-center">
                <img
                  v-if="rankData[2].is_pretty"
                  :src="IconPath('mk7_21.png')"
                  class="uid-icon"
                />
                <span class="text-hidden"
                  >ID:{{
                    rankData[2].is_pretty ? rankData[2].code : rankData[2].uid
                  }}</span
                >
              </div>
            </div>
            <div class="info">
              <img
                v-if="rankData[2].tprofile_image"
                :src="IconPath(rankData[2].tprofile_image)"
                class="avatar"
                @click="toUserMain(rankData[2].tuid)"
              />
              <img
                v-else
                :src="IconPath('mk7_22.png')"
                class="avatar"
                @click="toUserMain(rankData[2].tuid)"
              />
              <div class="nick-name text-hidden">
                {{ rankData[2].tusername }}
              </div>
              <div class="uid flex-center">
                <img
                  v-if="rankData[2].tuid_is_pretty"
                  :src="IconPath('mk7_21.png')"
                  class="uid-icon"
                />
                <span class="text-hidden"
                  >ID:{{
                    rankData[2].tuid_is_pretty
                      ? rankData[2].tuid_code
                      : rankData[2].tuid
                  }}</span
                >
              </div>
            </div>
          </div>
          <div class="num-box flex-center">
            <p>爱情能量</p>
            <p>{{ rankData[2].num }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--3-17-->
    <div class="normal-rank" :key="normalRankKey">
      <div v-for="item in rankData.slice(3)" :key="item.rank" class="rank-item">
        <div class="rank-num flex-center">{{ item.rank }}</div>
        <div class="rank-user-info flex-center">
          <img
            v-if="item.profile_image"
            :src="IconPath(item.profile_image)"
            class="avatar"
            @click="toUserMain(item.uid)"
          />
          <img
            v-else
            :src="IconPath('mk7_22.png')"
            class="avatar"
            @click="toUserMain(item.uid)"
          />
          <div class="nick-name text-hidden">{{ item.username }}</div>
          <div class="uid">
            <img
              v-if="item.is_pretty"
              :src="IconPath('mk7_21.png')"
              class="uid-icon"
            />
            ID:{{ item.is_pretty ? item.code : item.uid }}
          </div>
        </div>
        <div class="rank-info flex-center">
          <img :src="IconPath('aqnl_120_120.png')" class="love-icon" />
          <div class="text">爱情能量</div>
          <div class="num">{{ item.num }}</div>
        </div>
        <div class="rank-user-info flex-center">
          <img
            v-if="item.tprofile_image"
            :src="IconPath(item.tprofile_image)"
            class="avatar"
            @click="toUserMain(item.tuid)"
          />
          <img
            v-else
            :src="IconPath('mk7_22.png')"
            class="avatar"
            @click="toUserMain(item.tuid)"
          />
          <div class="nick-name text-hidden">{{ item.tusername }}</div>
          <div class="uid flex-center">
            <img
              v-if="item.tuid_is_pretty"
              :src="IconPath('mk7_21.png')"
              class="uid-icon"
            />
            ID:{{ item.tuid_is_pretty ? item.tuid_code : item.tuid }}
          </div>
        </div>
      </div>
    </div>
    <!--我的排名-->
    <div v-if="myRank" class="my-rank flex-center">
      <div class="rank-num flex-center">{{ myRankNum }}</div>
      <div class="rank-user-info flex-center">
        <img
          v-if="myRank.profile_image"
          :src="IconPath(myRank.profile_image)"
          class="avatar"
          @click="toUserMain(myRank.uid)"
        />
        <img
          v-else
          :src="IconPath('mk7_22.png')"
          class="avatar"
          @click="toUserMain(myRank.uid)"
        />
        <div class="nick-name text-hidden">{{ myRank.username }}</div>
        <div class="uid flex-center">
          <img
            v-if="myRank.is_pretty"
            :src="IconPath('mk7_21.png')"
            class="uid-icon"
          />
          ID:{{ myRank.is_pretty ? myRank.code : myRank.uid }}
        </div>
      </div>
      <div class="rank-info flex-center">
        <img :src="IconPath('aqnl_120_120.png')" class="love-icon" />
        <div class="text">爱情能量</div>
        <div class="num">{{ myRank.num }}</div>
      </div>
      <div class="rank-user-info flex-center">
        <img
          v-if="myRank.tprofile_image"
          :src="IconPath(myRank.tprofile_image)"
          class="avatar"
          @click="toUserMain(myRank.tuid)"
        />
        <img
          v-else
          :src="IconPath('mk7_22.png')"
          class="avatar"
          @click="toUserMain(myRank.tuid)"
        />
        <div class="nick-name text-hidden">{{ myRank.tusername }}</div>
        <div class="uid flex-center">
          <img
            v-if="myRank.tuid_is_pretty"
            :src="IconPath('mk7_21.png')"
            class="uid-icon"
          />
          ID:{{ myRank.tuid_is_pretty ? myRank.tuid_code : myRank.tuid }}
        </div>
      </div>
    </div>
    <!--规则说明-->
    <div class="rule-text">
      <ul>
        <li>
          <span></span>榜单为<i class="focus-color">活动绑定用户</i>双方互送<i
            class="focus-color"
            >钻石礼物和表白</i
          >累计
        </li>
        <li>【爱情能量】，1钻石=1爱情能量</li>
        <li>同服绑定的用户进入本服榜单，跨服绑定的用户进</li>
        <li>入异地恋榜单</li>
        <li>
          <span></span
          ><i class="focus-color">详细榜单规则和奖励可查看页面【奖励详情】</i>
        </li>
        <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
        <li>基础魅力值，魅力值上限提高50%</li>
      </ul>
    </div>
    <reward-detail-prompt ref="rewardDetail" />
    <costume-preview-prompt ref="costumePreview" />
    <card-preview-prompt ref="cardPreview" />
  </div>
</template>

<script>
import axios from 'axios'
import PublicJson from '@/pages/valentineDay/components/PublicJson.vue'
import { toUserMain } from '../../utils/toApp'
import { moduleSeven } from '../../api/index'
import { loveRank } from '../../utils/pageData'
import CardPreviewPrompt from './components/card-preview-prompt.vue'
import CostumePreviewPrompt from './components/costume-preview-prompt.vue'
import RewardDetailPrompt from './components/reward-detail-prompt.vue'

export default {
  name: 'love-rank',
  components: {
    PublicJson,
    CardPreviewPrompt,
    RewardDetailPrompt,
    CostumePreviewPrompt
  },
  data() {
    return {
      rewardList: Object.freeze([
        {
          is_click: true,
          icon: 'azsh_120_120.png',
          text: '礼物赠送权',
          isAudio: true,
          price: '3344'
        },
        {
          is_click: false,
          icon: '',
          text: '铭牌'
        },
        {
          is_click: false,
          icon: 'tk_12.png',
          text: '靓号'
        },
        {
          is_click: true,
          icon: 'lmby_120_120.png',
          text: '资料卡'
        },
        {
          is_click: false,
          icon: 'cbt_120_120.png',
          text: '藏宝图'
        },
        {
          is_click: false,
          icon: 'ljs_120_120.png',
          text: '绿晶石'
        }
      ]),
      rankMark: 1,
      topRankKey: this.guid(),
      normalRankKey: this.guid()
    }
  },
  watch: {
    async rankMark(val) {
      await this.getPageData({ mark: 'm7', type: 'tab' })
      this.topRankKey = this.guid()
      this.normalRankKey = this.guid()
    }
  },
  computed: {
    myRankNum() {
      if (this.rankMark == 1) {
        const res = this.pageData.daily_rank.find(
          (item) => item.uidStr === this.myRank.uidStr
        )
        return res?.rank ? res.rank : '20+'
      } else {
        const res = this.pageData.total_rank.find(
          (item) => item.uidStr === this.myRank.uidStr
        )
        return res?.rank ? res.rank : '20+'
      }
    },
    myRank() {
      if (this.rankMark == 1) {
        return this.pageData.self_daily_rank
      } else {
        return this.pageData.self_total_rank
      }
    },
    rankData() {
      if (this.rankMark == 1) {
        return this.pageData.daily_rank
      } else {
        return this.pageData.total_rank
      }
    }
  },
  created() {
    this.pageData = loveRank
    this.getPageData({ mark: 'm7', type: 'tab' })
  },
  mounted() {
    // 预加载合成动画
    axios({
      url: 'https://imagevo.dandanvoice.com/activity/weekly/svga/gift_azsh.svga',
      method: 'get',
      responseType: 'arraybuffer'
    })
      .then((response) => {
        console.log('加载完成')
        // 在这里可以将文件内容缓存起来或执行后续操作
      })
      .catch((error) => {
        // 处理请求错误
        console.error('SVGA文件加载失败:', error)
      })
    axios({
      url: 'https://imagevo.dandanvoice.com/activity/weekly/svga/lmby_bg_big.svga',
      method: 'get',
      responseType: 'arraybuffer'
    })
      .then((response) => {
        console.log('加载完成')
        // 在这里可以将文件内容缓存起来或执行后续操作
      })
      .catch((error) => {
        // 处理请求错误
        console.error('SVGA文件加载失败:', error)
      })
    axios({
      url: 'https://imagevo.dandanvoice.com/activity/weekly/svga/lmby_bg_big_dz.svga',
      method: 'get',
      responseType: 'arraybuffer'
    })
      .then((response) => {
        console.log('加载完成')
        // 在这里可以将文件内容缓存起来或执行后续操作
      })
      .catch((error) => {
        // 处理请求错误
        console.error('SVGA文件加载失败:', error)
      })
  },
  methods: {
    // 自定义id
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const string = (Math.random() * 16) | 0
          const v = c == 'x' ? string : (string & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    async changeDate(date) {
      const res = await moduleSeven({ type: 'day_top', mark: date })
      if (res.errno) return this.$toast(res.errmsg)
      // const { self_daily_rank, day_list, select_date, belong_server, daily_rank } = res.data
      this.pageData = { ...this.pageData, ...res.data }
    },
    handleReward({ is_click, text }) {
      if (is_click) {
        if (text === '礼物赠送权') {
          this.openPrompt('costumePreview')
        } else if (text === '资料卡') {
          this.openPrompt('cardPreview')
        }
      }
    },
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.love-rank {
  position: relative;
  z-index: 10;
  width: 734px;
  margin: -19px auto 0;
  padding-top: 84px;

  .title-1 {
    display: block;
    margin: 0 auto;
    width: 513px;
    height: 37px;
  }

  .reward-list {
    margin: 10px auto 30px;
    width: 625px;
    height: 341px;
    background: url('@/pages/valentineDay/assets/mk7_3.png') no-repeat left
      top/100% 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: 24px;

    .price-label {
      position: absolute;
      //z-index: 2;
      top: -26px;
      right: -19px;
      width: 125px;
      height: 34px;
      background: linear-gradient(-90deg, #75b9ff, #ff84f8);
      border-radius: 17px;
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
      flex-wrap: nowrap;

      > img {
        width: 27px;
        height: 20px;
      }
    }

    .reward-item {
      position: relative;
      flex-shrink: 0;
      width: 148px;
      height: 128px;
      background: linear-gradient(0deg, #ffffff, #fcdaff);
      border: 4px solid #9a66e8;
      border-radius: 16px;
      padding-bottom: 17px;

      .icon {
        width: 80%;
        //height: 100%;
      }

      .audio-icon {
        position: absolute;
        top: 4px;
        right: -31px;
        width: 82px;
        height: 56px;
      }

      .click-preview {
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 26px;
      }

      .label {
        position: absolute;
        bottom: -9px;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 34px;
        background: #7547cb;
        border-radius: 17px;
        font-size: 24px;
        color: #ffffff;
        white-space: nowrap;
        line-height: 100%;
      }

      /* 选择第2，5，8等元素 */
      &:nth-child(3n + 2) {
        /* 样式规则 */
        margin-left: 40px;
      }

      /* 选择第3，6，9等元素 */
      &:nth-child(3n) {
        /* 样式规则 */
        margin-left: 40px;
      }

      &:nth-child(1) {
        /* 样式规则 */
        margin-left: 0;
      }

      &:nth-child(-n + 3) {
        /* 样式规则 */
        margin-bottom: 25px;
      }
    }
  }

  .reward-prompt-button {
    position: absolute;
    top: 93px;
    right: 5px;
    width: 153px;
    height: 52px;
    background: linear-gradient(-90deg, #6b42df, #dc73ff);
    border: 4px solid #d7c6ff;
    border-radius: 26px 0px 0px 26px;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
    line-height: 100%;
    white-space: nowrap;
  }

  .rank-tab {
    margin: 0 auto 39px;
    width: 526px;
    height: 58px;

    .click-content {
      width: 240px;
      height: 100%;
      //background-color: pink;
      pointer-events: auto;
    }

    .daily-rank {
      width: 100%;
      height: 100%;
      background: url('@/pages/valentineDay/assets/mk7_4.png') no-repeat left
        top/100% 100%;
      pointer-events: none;

      .click-content {
        margin-left: auto;
      }
    }

    .total-rank {
      width: 100%;
      height: 100%;
      background: url('@/pages/valentineDay/assets/mk7_5.png') no-repeat left
        top/100% 100%;
      pointer-events: none;

      .click-content {
        margin-right: auto;
      }
    }
  }

  .date-list {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 206px;
    //background-color: pink;
    flex-wrap: nowrap;
    align-items: flex-start;

    .date-item {
      position: relative;
      width: 160px;
      height: 161px;
      flex-shrink: 0;
      background: url('@/pages/valentineDay/assets/mk7_7.png') no-repeat left
        top/100% 100%;
      font-size: 22px;
      font-weight: 500;
      color: #ffffff;
      align-items: flex-start;
      padding-top: 58px;

      .click-content {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 140px;
        //background-color: rgba(0, 0, 0, 0.5);
      }

      &:nth-child(odd) {
        margin-top: 0;
        margin-left: -33px;
      }

      &:nth-child(even) {
        margin-top: 54px;
        margin-left: -33px;
      }

      &:nth-child(1) {
        margin-top: 0;
        margin-left: 0;
      }
    }

    .current-date-bg {
      background: url('@/pages/valentineDay/assets/mk7_6.png') no-repeat left
        top/100% 100%;
    }
  }

  .title-2 {
    position: relative;
    z-index: 1;
    margin-top: -57px;
    margin-left: -8px;
    width: 750px;
    height: 233px;
  }

  .top-rank {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    .user-info {
      .info {
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
          width: 98px;
          height: 98px;
          background: #ffffff;
          border: 4px solid #d0bbff;
          border-radius: 50%;
          object-fit: cover;
        }

        .nick-name {
          margin-top: 7px;
          margin-bottom: 2px;
          max-width: 170px;
          min-width: 170px;
          font-size: 26px;
          color: #ffffff;
          text-align: center;
        }

        .uid {
          font-size: 20px;
          color: #6e2dbe;

          .uid-icon {
            width: 37px;
            height: 31px;
          }
        }
      }
    }

    .num-box {
      margin: 15px auto 0;
      flex-direction: column;
      width: 239px;
      height: 63px;
      background: url('@/pages/valentineDay/assets/mk7_13.png') no-repeat left
        top/100% 100%;

      p {
        white-space: nowrap;

        &:nth-child(1) {
          font-size: 20px;
          color: #ffffff;
        }

        &:nth-child(2) {
          margin-top: 5px;
          font-size: 22px;
          font-weight: 500;
          color: #ffef85;
        }
      }
    }

    .top-1 {
      margin: -79px 62px -100px;
      width: 609px;
      height: 468px;
      background: url('@/pages/valentineDay/assets/mk7_9.png') no-repeat left
        top/100% 100%;
      padding-top: 120px;
    }

    .row {
      margin: 0 auto;
      flex-wrap: nowrap;
    }

    .top-2,
    .top-3 {
      position: relative;
      flex-shrink: 0;
      width: 375px;
      height: 356px;
      background: url('@/pages/valentineDay/assets/mk7_10.png') no-repeat left
        top/100% 100%;
      padding-top: 85px;

      .rank-icon {
        position: absolute;
        top: 48px;
        left: 151px;
        width: 62px;
        height: 54px;
      }

      .user-info {
        position: relative;
        left: -5px;

        .info {
          .avatar {
            width: 88px;
            height: 88px;
          }

          .nick-name {
            margin-top: 7px;
            margin-bottom: 2px;
            max-width: 140px;
            min-width: 140px;
            font-size: 22px;
            color: #ffffff;
            text-align: center;
          }

          .uid {
            font-size: 18px;
            color: #6e2dbe;

            .uid-icon {
              width: 37px;
              height: 31px;
            }
          }
        }
      }

      .num-box {
        margin: 10px auto 0;
      }
    }

    .top-2 {
      margin-left: 10px;
      //margin-right: -6px;
      //margin-right: -24px;
    }

    .top-3 {
      margin-left: -25px;
    }
  }

  .normal-rank {
    margin-top: -10px;
    width: 100%;
    height: 734px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 100px;

    .rank-item {
      display: flex;
      align-items: center;
      margin: 0 auto 10px;
      width: 668px;
      height: 176px;
      background: url('@/pages/valentineDay/assets/mk7_14.png') no-repeat left
        top/100% 100%;

      .rank-num {
        margin-left: 19px;
        margin-right: 30px;
        width: 68px;
        height: 68px;
        background: url('@/pages/valentineDay/assets/mk7_16.png') no-repeat left
          top/100% 100%;
        font-size: 26px;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
      }

      .rank-user-info {
        flex-direction: column;
        height: 100%;

        .avatar {
          width: 88px;
          height: 88px;
          background: #ffffff;
          border: 4px solid #d0bbff;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 5px;
        }

        .nick-name {
          text-align: center;
          max-width: 160px;
          min-width: 160px;
          font-size: 24px;
          color: #ffffff;
          white-space: nowrap;
        }

        .uid {
          font-size: 20px;
          color: #6e2dbe;
          white-space: nowrap;

          .uid-icon {
            width: 37px;
            height: 31px;
          }
        }
      }

      .rank-info {
        white-space: nowrap;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        padding-top: 24px;

        .love-icon {
          width: 40px;
          height: 40px;
        }

        .text {
          font-size: 18px;
          color: #ffffff;
        }

        .num {
          margin-top: 5px;
          font-size: 22px;
          font-weight: 500;
          color: #ffef85;
        }
      }
    }
  }

  .my-rank {
    position: relative;
    z-index: 2;
    margin-top: -100px;
    margin-left: 2px;
    width: 732px;
    height: 176px;
    background: url('@/pages/valentineDay/assets/mk7_15.png') no-repeat left
      top/100% 100%;
    justify-content: flex-start;

    .rank-num {
      margin-left: 53px;
      margin-right: 28px;
      width: 68px;
      height: 68px;
      background: url('@/pages/valentineDay/assets/mk7_17.png') no-repeat left
        top/100% 100%;
      font-size: 26px;
      font-weight: 500;
      color: #ffffff;
    }

    .rank-user-info {
      flex-direction: column;
      height: 100%;

      .avatar {
        width: 88px;
        height: 88px;
        background: #ffffff;
        border: 4px solid #d0bbff;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 5px;
      }

      .nick-name {
        text-align: center;
        max-width: 160px;
        min-width: 160px;
        font-size: 24px;
        color: #ffffff;
        white-space: nowrap;
      }

      .uid {
        font-size: 20px;
        color: #6e2dbe;
        white-space: nowrap;

        .uid-icon {
          width: 37px;
          height: 31px;
        }
      }
    }

    .rank-info {
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      white-space: nowrap;
      padding-top: 24px;

      .love-icon {
        width: 40px;
        height: 40px;
      }

      .text {
        font-size: 18px;
        color: #ffffff;
      }

      .num {
        margin-top: 5px;
        font-size: 22px;
        font-weight: 500;
        color: #ffef85;
      }
    }
  }

  .rule-text {
    margin-top: 20px;
    width: 614px;
    margin-left: 66px;

    li {
      color: #fff;
      line-height: 44px;
    }

    .focus-color {
      color: #ffec80;
    }
  }
}

.left-flower {
  position: absolute;
  z-index: 2;
  left: -8px;
  width: 99px;
  height: 444px;
}

.right-flower {
  position: absolute;
  z-index: 2;
  right: -8px;
  width: 96px;
  height: 444px;
}

.bg1 {
  //height: 2862px;
  padding-bottom: 80px;
  background: url('@/pages/valentineDay/assets/mk7_19.png') no-repeat left
    top/100% 100%;

  .left-flower {
    top: 759px;
  }

  .right-flower {
    top: 759px;
  }
}

.bg2 {
  //height: 2670px;
  padding-bottom: 80px;
  background: url('@/pages/valentineDay/assets/mk7_20.png') no-repeat left
    top/100% 100%;

  .left-flower {
    top: 575px;
  }

  .right-flower {
    top: 575px;
  }
}
</style>
