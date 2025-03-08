<template>
  <out-box class="intimateRank position-relative" title="tt_05.png">
    <!--奖励详情-->
    <img :src="IconPath('btn_jl.png')" class="rewardDetail position-absolute" @click="openPrompt('AwardDetail')" />

    <div class="top-rank">
      <div class="top top-1 position-relative">
        <img :src="IconPath('icon_nmb_1.png')" class="rank-icon" />
        <div class="user-info flex align-center justify-center">
          <div class="info">
            <lazy-component class="preload-height">
              <public-svga
                svgaName="ts_yhzl"
                class="avatar"
                :userAvatar="rankData.pair_rank[0].profile_image || 'mk7_22.png'"
                @click="toUserMain(rankData.pair_rank[0].uid)"
              />
            </lazy-component>
            <div class="text-box flex-column align-center justify-center">
              <div class="nick-name ellipsis line-height-100 text-center">{{ rankData.pair_rank[0].username }}</div>
              <div class="uid flex align-center justify-center">
                <img v-if="rankData.pair_rank[0].is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
                <span>ID:{{ rankData.pair_rank[0].is_pretty ? rankData.pair_rank[0].code : rankData.pair_rank[0].uid }}</span>
              </div>
            </div>
          </div>
          <div class="info">
            <lazy-component class="preload-height">
              <public-svga
                svgaName="ts_yhzl"
                class="avatar"
                :userAvatar="rankData.pair_rank[0].tprofile_image || 'mk7_22.png'"
                @click="toUserMain(rankData.pair_rank[0].tuid)"
              />
            </lazy-component>
            <div class="text-box flex-column align-center justify-center">
              <div class="nick-name ellipsis line-height-100 text-center">{{ rankData.pair_rank[0].tusername }}</div>
              <div class="uid flex align-center justify-center line-height-100">
                <img v-if="rankData.pair_rank[0].tuid_is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
                <span>ID:{{ rankData.pair_rank[0].tuid_is_pretty ? rankData.pair_rank[0].tuid_code : rankData.pair_rank[0].tuid }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="nickNameBg position-absolute pointer-none"></div>
        <div class="num-box flex align-center justify-center line-height-100">
          <p>新增亲密度:{{ rankData.pair_rank[0].num }}</p>
        </div>
      </div>
      <div class="row flex align-center justify-center">
        <div class="top top-2">
          <img :src="IconPath('icon_nmb_2.png')" class="rank-icon" />
          <div class="nickNameBg position-absolute"></div>
          <div class="user-info flex align-center justify-center">
            <div class="info">
              <lazy-component class="preload-height">
                <public-svga
                  svgaName="ts_yhzl"
                  class="avatar"
                  :userAvatar="rankData.pair_rank[1].profile_image || 'mk7_22.png'"
                  @click="toUserMain(rankData.pair_rank[1].uid)"
                />
              </lazy-component>
              <div class="text-box flex-column align-center justify-center">
                <div class="nick-name ellipsis line-height-100 text-center">{{ rankData.pair_rank[1].username }}</div>
                <div class="uid flex align-center justify-center">
                  <img v-if="rankData.pair_rank[1].is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
                  <span>ID:{{ rankData.pair_rank[1].is_pretty ? rankData.pair_rank[1].code : rankData.pair_rank[1].uid }}</span>
                </div>
              </div>
            </div>
            <div class="info">
              <lazy-component class="preload-height">
                <public-svga
                  svgaName="ts_yhzl"
                  class="avatar"
                  :userAvatar="rankData.pair_rank[1].tprofile_image || 'mk7_22.png'"
                  @click="toUserMain(rankData.pair_rank[1].tuid)"
                />
              </lazy-component>
              <div class="text-box flex-column align-center justify-center">
                <div class="nick-name ellipsis line-height-100 text-center">{{ rankData.pair_rank[1].tusername }}</div>
                <div class="uid flex align-center justify-center">
                  <img v-if="rankData.pair_rank[1].tuid_is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
                  <span>ID:{{ rankData.pair_rank[1].tuid_is_pretty ? rankData.pair_rank[1].tuid_code : rankData.pair_rank[1].tuid }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="num-box flex align-center justify-center">
            <p>新增亲密度:{{ rankData.pair_rank[1].num }}</p>
          </div>
        </div>
        <div class="top top-3">
          <img :src="IconPath('icon_nmb_3.png')" class="rank-icon" />
          <div class="nickNameBg position-absolute"></div>
          <div class="user-info flex align-center justify-center">
            <div class="info">
              <lazy-component class="preload-height">
                <public-svga
                  svgaName="ts_yhzl"
                  class="avatar"
                  :userAvatar="rankData.pair_rank[2].profile_image || 'mk7_22.png'"
                  @click="toUserMain(rankData.pair_rank[2].uid)"
                />
              </lazy-component>
              <div class="text-box flex-column align-center justify-center">
                <div class="nick-name ellipsis line-height-100 text-center">{{ rankData.pair_rank[2].username }}</div>
                <div class="uid flex align-center justify-center">
                  <img v-if="rankData.pair_rank[2].is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
                  <span>ID:{{ rankData.pair_rank[2].is_pretty ? rankData.pair_rank[2].code : rankData.pair_rank[2].uid }}</span>
                </div>
              </div>
            </div>
            <div class="info">
              <lazy-component class="preload-height">
                <public-svga
                  svgaName="ts_yhzl"
                  class="avatar"
                  :userAvatar="rankData.pair_rank[2].tprofile_image || 'mk7_22.png'"
                  @click="toUserMain(rankData.pair_rank[2].tuid)"
                />
              </lazy-component>
              <div class="text-box flex-column align-center justify-center">
                <div class="nick-name ellipsis line-height-100 text-center">{{ rankData.pair_rank[2].tusername }}</div>
                <div class="uid flex align-center justify-center">
                  <img v-if="rankData.pair_rank[2].tuid_is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
                  <span>ID:{{ rankData.pair_rank[2].tuid_is_pretty ? rankData.pair_rank[2].tuid_code : rankData.pair_rank[2].tuid }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="num-box flex align-center justify-center">
            <p>新增亲密度:{{ rankData.pair_rank[2].num }}</p>
          </div>
        </div>
      </div>
    </div>

    <!--3-17-->
    <div class="normal-rank">
      <div v-for="item in rankData.pair_rank.slice(3)" :key="item.rank" class="rank-item">
        <div class="rank-num flex align-center justify-center">{{ item.rank }}</div>
        <div class="rank-user-info flex align-center justify-center">
          <lazy-component class="preloadHeightNormal">
            <img :src="IconPath(item.profile_image || 'mk7_22.png')" class="avatar" @click="toUserMain(item.uid)" />
          </lazy-component>
          <div class="nick-name ellipsis">{{ item.username }}</div>
          <div class="uid">
            <img v-if="item.is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
            ID:{{ item.is_pretty ? item.code : item.uid }}
          </div>
        </div>
        <div class="rank-info flex align-center justify-center">
          <img :src="IconPath('icon_qmd.png')" class="love-icon" />
          <div class="num flex align-center justify-center text-nowrap line-height-100">{{ item.num }}</div>
        </div>
        <div class="rank-user-info flex align-center justify-center">
          <lazy-component class="preloadHeightNormal">
            <img :src="IconPath(item.tprofile_image || 'mk7_22.png')" class="avatar" @click="toUserMain(item.tuid)" />
          </lazy-component>
          <div class="nick-name ellipsis">{{ item.tusername }}</div>
          <div class="uid flex align-center justify-center">
            <img v-if="item.tuid_is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
            ID:{{ item.tuid_is_pretty ? item.tuid_code : item.tuid }}
          </div>
        </div>
      </div>
    </div>

    <!--我的排名-->
    <div class="my-rank flex align-center justify-center">
      <template v-if="myRank">
        <div class="rank-num flex align-center justify-center">{{ myRankNum }}</div>
        <div class="rank-user-info flex align-center justify-center">
          <img v-if="myRank.profile_image" :src="IconPath(myRank.profile_image)" class="avatar" @click="toUserMain(myRank.uid)" />
          <img v-else :src="IconPath('mk7_22.png')" class="avatar" @click="toUserMain(myRank.uid)" />
          <div class="nick-name ellipsis">{{ myRank.username }}</div>
          <div class="uid flex align-center justify-center">
            <img v-if="myRank.is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
            ID:{{ myRank.is_pretty ? myRank.code : myRank.uid }}
          </div>
        </div>
        <div class="rank-info flex align-center justify-center">
          <img :src="IconPath('icon_qmd.png')" class="love-icon" />
          <div class="num flex align-center justify-center text-nowrap line-height-100">{{ myRank.num }}</div>
        </div>
        <div class="rank-user-info flex align-center justify-center">
          <img v-if="myRank.tprofile_image" :src="IconPath(myRank.tprofile_image)" class="avatar" @click="toUserMain(myRank.tuid)" />
          <img v-else :src="IconPath('mk7_22.png')" class="avatar" @click="toUserMain(myRank.tuid)" />
          <div class="nick-name ellipsis">{{ myRank.tusername }}</div>
          <div class="uid flex align-center justify-center">
            <img v-if="myRank.tuid_is_pretty" :src="IconPath('mk7_21.png')" class="uid-icon" />
            ID:{{ myRank.tuid_is_pretty ? myRank.tuid_code : myRank.tuid }}
          </div>
        </div>
      </template>
      <div v-else class="toBind flex align-center justify-center flex-no-wrap margin-row-center">
        <p class="text-nowrap flex-shrink-0">当前暂无绑定挚友</p>
        <img :src="IconPath('btn_bd.png')" class="toBindBtn flex-shrink-0" @click="scrollToBind" />
      </div>
    </div>
    <!--规则说明-->
    <div class="rule-text">
      <ul>
        <li><span></span>榜单为活动绑定用户双方每日新增亲密度排行，日</li>
        <li>榜前10名双方皆可获得奖励</li>
        <li><span></span>同服绑定的用户进入本服榜单，跨服绑定的用户进</li>
        <li>入跨服榜单</li>
        <li><span></span><i class="focus-color">详细榜单规则和奖励可查看页面【奖励详情】</i></li>
        <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
        <li>基础魅力值，魅力值上限提高50%</li>
      </ul>
    </div>
    <AwardDetailPopup ref="AwardDetail" />
  </out-box>
</template>

<script>
import AwardDetailPopup from './awardDetailPopup.vue' // 奖励详情弹框
import PublicSvga from '@/pages/whiteValentine/components/PublicSvga.vue'
import { toUserMain } from '../../../utils/toApp'

export default {
  props: ['rankData'],
  components: { PublicSvga, AwardDetailPopup },
  data() {
    return {}
  },
  computed: {
    myRankNum() {
      const { uid, tuid } = this.myRank
      const allId = +uid > +tuid ? `${tuid}${uid}` : `${uid}${tuid}`
      const res = this.rankData.pair_rank.find((item) => item.uid === this.myRank.uid || item.uid === this.myRank.tuid)
      if (!res) return '20+' // 没有在榜单里
      return allId == res.uid + res.tuid ? res.rank : '20+' // 精准匹配
    },
    myRank() {
      return Object.keys(this.rankData.self_rank).length > 0 ? this.rankData.self_rank : false
    }
  },
  created() {},
  methods: {
    scrollToBind() {
      const toDiv = document.querySelector('.bindFriend')
      window.scrollTo({
        top: toDiv.offsetTop,
        behavior: 'smooth'
      })
    },
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.intimateRank {
  padding-top: 186px;
  margin-bottom: 170px;
  height: 2028px;
  .rewardDetail {
    top: 195px;
    right: 0;
    width: 62px;
    height: 164px;
  }
  .top-rank {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    .nickNameBg {
      z-index: 1;
    }
    .rank-icon {
      position: absolute;
      z-index: 2;
      width: 136px;
      height: 84px;
    }
    .user-info {
      .info {
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
        }
        .text-box {
          .nick-name {
            position: relative;
            z-index: 2;
            max-width: 170px;
            min-width: 170px;
            font-size: 26px;
            color: #b1404d;
            text-align: center;
          }
          .uid {
            margin-top: 3px;
            position: relative;
            z-index: 2;
            font-size: 20px;
            color: #c76074;
            //height: 31px;

            .uid-icon {
              width: 37px;
              height: 31px;
            }
          }
        }

        &:nth-child(1) {
          margin-right: 36px;
        }
      }
    }

    .num-box {
      margin: 9px auto 0;
      height: 46px;
      background: linear-gradient(0deg, #fed9d9, #fbe9e9);
      border-radius: 23px;
      border: 2px solid rgba(255, 255, 255, 0.3);

      p {
        white-space: nowrap;
        font-weight: bold;
        font-size: 22px;
        color: #c76074;
      }
    }

    .top-1 {
      margin: 0 0 11px 69px;
      width: 598px;
      height: 306px;
      background: url('@/pages/whiteValentine/assets/bg_nmb_01.png') no-repeat left top/100% 100%;
      //padding-top: 104px;
      .preload-height {
        margin-top: -36px;
        width: 144px;
        height: 144px;
      }
      .num-box {
        width: 406px;
      }

      .rank-icon {
        top: 22px;
        left: 237px;
      }

      .avatar {
        //margin-top: -36px;
        width: 144px;
        height: 144px;
        ::v-deep .micAvatar_img {
          top: 25px;
          left: 17px;
          width: 106px;
          height: 106px;
          background: #ffffff;
          border-radius: 50%;
          border: 3px solid #f7d0ce;
        }
      }

      .text-box {
        margin-top: -4px;
        height: 71px;
        .nick-name {
          max-width: 170px;
          min-width: 170px;
        }
      }

      .nickNameBg {
        top: 104px;
        left: 88px;
        width: 437px;
        height: 71px;
        background: url('@/pages/whiteValentine/assets/nch_bg_l.png') no-repeat left top/100% 100%;
      }
    }

    .row {
      margin: 0 auto 17px;
      flex-wrap: nowrap;
    }

    .top-2,
    .top-3 {
      position: relative;
      flex-shrink: 0;
      width: 354px;
      height: 254px;
      background: url('@/pages/whiteValentine/assets/bg_nmb_02.png') no-repeat left top/100% 100%;
      //padding-top: 85px;
      .preload-height {
        margin-top: -30px;
        width: 129px;
        height: 129px;
      }
      .nickNameBg {
        top: 94px;
        left: 3px;
        width: 347px;
        height: 66px;
        background: url('@/pages/whiteValentine/assets/nch_bg_s.png') no-repeat left top/100% 100%;
      }
      .rank-icon {
        top: 22px;
        left: 107px;
      }
      .user-info {
        position: relative;
        left: -5px;
        .info {
          .avatar {
            //margin-top: -30px;
            width: 129px;
            height: 129px;

            ::v-deep .micAvatar_img {
              top: 25px;
              left: 18px;
              width: 96px;
              height: 96px;
              background: #ffffff;
              border-radius: 50%;
              border: 3px solid #f7d0ce;
            }
          }
          .text-box {
            margin-top: -3px;
            height: 66px;
            .nick-name {
              position: relative;
              z-index: 2;
              max-width: 130px;
              min-width: 130px;
              font-size: 26px;
              color: #b1404d;
              text-align: center;
            }
            .uid {
              margin-top: 3px;
              position: relative;
              z-index: 2;
              font-size: 20px;
              color: #c76074;

              .uid-icon {
                width: 37px;
                height: 31px;
              }
            }
          }

          &:nth-child(1) {
            margin-right: 55px;
          }
        }
      }
      .num-box {
        width: 326px;
      }
    }

    .top-2 {
    }

    .top-3 {
      margin-right: 3px;
    }
  }

  .normal-rank {
    margin-top: -10px;
    width: 100%;
    height: 780px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 100px;

    .preloadHeightNormal {
      width: 86px;
      height: 86px;
      margin-bottom: 5px;
    }

    .rank-item {
      display: flex;
      align-items: center;
      margin: 0 auto 15px;
      width: 679px;
      height: 178px;
      background: url('@/pages/whiteValentine/assets/bg_nmb_04.png') no-repeat left top/100% 100%;

      .rank-num {
        margin-left: 31px;
        margin-right: 32px;
        width: 74px;
        height: 63px;
        background: url('@/pages/whiteValentine/assets/nmb_bg.png') no-repeat left top/100% 100%;
        font-weight: bold;
        font-size: 26px;
        color: #c55c70;
        white-space: nowrap;
      }

      .rank-user-info {
        flex-direction: column;
        height: 100%;
        .avatar {
          width: 86px;
          height: 86px;
          background: rgba(0, 0, 0, 0.2);
          border: 3px solid #f7d0ce;
          border-radius: 50%;
          object-fit: cover;
        }

        .nick-name {
          text-align: center;
          max-width: 160px;
          min-width: 160px;
          font-size: 24px;
          color: #b1404d;
          font-weight: 500;
          white-space: nowrap;
        }

        .uid {
          font-size: 20px;
          font-weight: 500;
          color: #c76074;
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
        padding-top: 13px;

        .love-icon {
          width: 167px;
          height: 131px;
        }

        .num {
          margin-top: -29px;
          width: 151px;
          height: 33px;
          background: linear-gradient(0deg, #fed9d9, #fbe9e9) padding-box;
          border-radius: 15px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-weight: bold;
          font-size: 24px;
          color: #c76074;
        }
      }
    }
  }

  .my-rank {
    position: relative;
    z-index: 2;
    margin-top: -100px;
    margin-left: 2px;
    width: 744px;
    height: 196px;
    background: url('@/pages/whiteValentine/assets/bg_nmb_i.png') no-repeat left top/100% 100%;
    justify-content: flex-start;

    .rank-num {
      margin-left: 51px;
      margin-right: 45px;
      width: 74px;
      height: 63px;
      background: url('@/pages/whiteValentine/assets/nmb_bg.png') no-repeat left top/100% 100%;
      font-weight: bold;
      font-size: 26px;
      color: #c55c70;
      white-space: nowrap;
    }

    .rank-user-info {
      flex-direction: column;
      height: 100%;
      .avatar {
        margin-bottom: 9px;
        width: 86px;
        height: 86px;
        background: rgba(0, 0, 0, 0.2);
        border: 3px solid #f7d0ce;
        border-radius: 50%;
        object-fit: cover;
      }

      .nick-name {
        text-align: center;
        max-width: 160px;
        min-width: 160px;
        font-size: 24px;
        color: #ffffff;
        font-weight: 500;
        white-space: nowrap;
      }

      .uid {
        font-size: 20px;
        font-weight: 500;
        color: #fff79a;
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
        width: 167px;
        height: 131px;
      }

      .num {
        margin-top: -29px;
        width: 151px;
        height: 33px;
        background: linear-gradient(0deg, #fed9d9, #fbe9e9) padding-box;
        border-radius: 15px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        font-weight: bold;
        font-size: 24px;
        color: #c76074;
      }
    }

    .toBind {
      width: fit-content;
      height: 70px;
      font-weight: 500;
      font-size: 30px;
      color: #ffffff;
      > p {
        margin-right: 110px;
      }
      .toBindBtn {
        width: 180px;
        height: 70px;
      }
    }
  }

  .rule-text {
    margin-top: 20px;
    width: 611px;
    margin-left: 82px;

    li {
      color: #c16d6f;
      line-height: 44px;
    }

    .focus-color {
      color: #8994d9;
    }
  }
}
</style>
