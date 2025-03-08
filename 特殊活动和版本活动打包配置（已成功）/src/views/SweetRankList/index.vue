<template>
  <div class="sweetRankList">
    <!-- 榜单奖励 -->
    <ThemeBox :themeTitleImg="'title_7.png'" class="rankRewards_container">
      <div class="rankRewards_bg">
        <div class="top_img"></div>
        <div class="container_bg">
          <div class="lover_icon">
            <div
              class="boy user_icon"
              @click="
                previewHeader(
                  cp_info.uid_gender == '0'
                    ? cp_info.uid_icon
                    : cp_info.tuid_gender == '0'
                    ? cp_info.tuid_icon
                    : IconPath('mk4_13.png'),
                  jsonlottie.aqwy_02,
                  'ts_aqwy_02'
                )
              "
            >
              <PublicJson
                :lottieJson_name="'ts_aqwy_02'"
                :lottieJson="jsonlottie.aqwy_02"
                :userAvatar="
                  cp_info.uid_gender == '0'
                    ? cp_info.uid_icon
                    : cp_info.tuid_gender == '0'
                    ? cp_info.tuid_icon
                    : IconPath('mk4_13.png')
                "
              />
            </div>
            <div
              class="girl user_icon"
              @click="
                previewHeader(
                  cp_info.tuid_gender == '1'
                    ? cp_info.tuid_icon
                    : cp_info.uid_gender == '1'
                    ? cp_info.uid_icon
                    : IconPath('mk4_12.png'),
                  jsonlottie.aqwy_01,
                  'ts_aqwy_01'
                )
              "
            >
              <PublicJson
                :lottieJson_name="'ts_aqwy_01'"
                :lottieJson="jsonlottie.aqwy_01"
                :userAvatar="
                  cp_info.tuid_gender == '1'
                    ? cp_info.tuid_icon
                    : cp_info.uid_gender == '1'
                    ? cp_info.uid_icon
                    : IconPath('mk4_12.png')
                "
              />
            </div>
          </div>
          <div class="top_ten_info">
            <div class="title">头饰【爱情物语】</div>
            <div class="rewards_list">
              <div class="item_rewards">
                <img :src="IconPath('mk4_2.png')" alt="" />
                <div>
                  第1名:
                  <div class="ljs">
                    <img :src="IconPath('ljs_60_60.png')" alt="" />
                  </div>
                  +1500，头饰+15天
                </div>
              </div>
              <div class="item_rewards">
                <img :src="IconPath('mk4_2.png')" alt="" />
                <div>
                  第2名:
                  <div class="ljs">
                    <img :src="IconPath('ljs_60_60.png')" alt="" />
                  </div>
                  +1000，头饰+7天
                </div>
              </div>
              <div class="item_rewards">
                <img :src="IconPath('mk4_2.png')" alt="" />
                <div>
                  第3名:
                  <div class="ljs">
                    <img :src="IconPath('ljs_60_60.png')" alt="" />
                  </div>
                  +600，头饰+5天
                </div>
              </div>
              <div class="item_rewards">
                <img :src="IconPath('mk4_2.png')" alt="" />
                <div>
                  第4~10名:
                  <div class="ljs">
                    <img :src="IconPath('ljs_60_60.png')" alt="" />
                  </div>
                  +300，头饰+3天
                </div>
              </div>
              <div class="item_rewards">
                <img :src="IconPath('mk4_2.png')" alt="" />
                <div>
                  第11~20名:
                  <div class="ljs">
                    <img :src="IconPath('ljs_60_60.png')" alt="" />
                  </div>
                  +200
                </div>
              </div>
            </div>
          </div>
          <div class="rank_list">
            <div
              class="list"
              :class="{ haveUserList: Object.keys(user_rank_list).length }"
            >
              <div
                class="item_info"
                :class="{ item_double: index % 2 !== 0 }"
                v-for="(item, index) in rankList"
                :key="item.rank"
              >
                <div class="left_rank">
                  <img
                    v-if="index == 0"
                    :src="index == 0 ? IconPath('mk4_3.png') : ''"
                    alt=""
                  />
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="center_icon">
                  <div class="left_icon icon">
                    <div class="user_icon">
                      <img
                        :src="item.profile_image"
                        alt=""
                        @click="toUserMain(item.uid)"
                      />
                    </div>
                    <div class="user_name">{{ item.username }}</div>
                  </div>
                  <div class="and">&</div>
                  <div class="right_icon icon">
                    <div class="user_icon">
                      <img
                        :src="item.tprofile_image"
                        @click="toUserMain(item.tuid)"
                        alt=""
                      />
                    </div>
                    <div class="user_name">{{ item.tusername }}</div>
                  </div>
                </div>
                <div class="right_num">获得{{ item.num }}甜蜜值</div>
              </div>
            </div>
            <!-- 20+ -->
            <div class="my_itemInfo" v-if="Object.keys(user_rank_list).length">
              <div class="left_rank">
                <span>{{
                  user_rank_list.rank ? user_rank_list.rank : '20+'
                }}</span>
              </div>
              <div class="center_icon">
                <div class="left_icon icon">
                  <div class="user_icon">
                    <img
                      :src="
                        user_rank_list.profile_image
                          ? user_rank_list.profile_image
                          : IconPath('mk4_13.png')
                      "
                      @click="toUserMain(user_rank_list.uid)"
                      alt=""
                    />
                  </div>
                  <div class="user_name">{{ user_rank_list.username }}</div>
                </div>
                <div class="and">&</div>
                <div class="right_icon icon">
                  <div class="user_icon">
                    <img
                      :src="
                        user_rank_list.tprofile_image
                          ? user_rank_list.tprofile_image
                          : IconPath('mk4_12.png')
                      "
                      @click="toUserMain(user_rank_list.tuid)"
                      alt=""
                    />
                  </div>
                  <div class="user_name">{{ user_rank_list.tusername }}</div>
                </div>
              </div>
              <div class="right_num">获得{{ user_rank_list.num }}甜蜜值</div>
            </div>
          </div>
          <div class="activity_explain">
            <div class="explain_text">
              <div class="circle"></div>
              <div class="text">
                活动期间，每日获得甜蜜值最高的前20对CP可获得排名奖励，上榜门槛为活动期间每日甜蜜值大于2000
              </div>
            </div>
            <div class="explain_text">
              <span class="circle"></span>
              <div class="text">榜单每日重置，奖励会在次日发放</div>
            </div>
            <div class="explain_text">
              <span class="circle"></span>
              <div class="text">每个ID可每天获得最多一次榜单的排名奖励</div>
            </div>
            <div class="explain_text">
              <div class="circle"></div>
              <div class="text">
                若在活动结算日当天离婚，当天排名无效，奖励发放顺延一名
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_img">
          <div class="explain_text">
            <div class="circle"></div>
            <div class="text">榜单分服统计活动期间获得的甜蜜值</div>
          </div>
        </div>
      </div>
      <div class="themeBox_decoration">
        <img :src="IconPath('back.png')" alt="" />
      </div>
    </ThemeBox>
    <!-- 全员奖励 -->
    <ThemeBox :themeTitleImg="'title_9.png'" class="all_rewards">
      <div class="all_rewards_bg">
        <div class="top_img"></div>
        <div class="container_bg">
          <div class="rewards_container">
            <div class="sweet_list">
              <div
                class="sweet_rewards_item"
                v-for="(item, index) in lover_rev_list"
                :key="index"
              >
                <div
                  class="item_rewards"
                  :class="{
                    gray: item.has_right === 2
                  }"
                  @click="previewHeader(null, null, null, item.goods_id)"
                >
                  <div class="item">
                    <div class="item_top">
                      <img
                        :src="
                          index == 0
                            ? IconPath('ljs_120_120.png')
                            : index == 1
                            ? IconPath('zjs_120_120.png')
                            : index == 2
                            ? IconPath('xdal_120_120.png')
                            : index == 3
                            ? IconPath('ly_120_120.png')
                            : index == 4
                            ? IconPath('zhs_120_120.png')
                            : index == 5
                            ? IconPath('yb_120_120.png')
                            : ''
                        "
                        alt=""
                      />
                    </div>
                    <div class="item_bottom">
                      +{{ item.nums != 200000 ? item.nums : '20万' }}
                    </div>
                  </div>
                </div>
                <div class="bar_box">
                  <div class="bar">
                    <img
                      class="love"
                      :src="
                        item.has_right == 2
                          ? IconPath('mk4_6.png')
                          : item.has_right == 1
                          ? IconPath('mk4_7.png')
                          : IconPath('mk4_8.png')
                      "
                      alt=""
                    />
                    <img
                      v-if="index !== 5"
                      class="line"
                      :src="
                        item.has_right == 2
                          ? IconPath('mk4_10.png')
                          : IconPath('mk4_9.png')
                      "
                      alt=""
                    />
                  </div>
                </div>
                <div class="sweet_item_bg">
                  <img
                    :src="
                      item.has_right == 2
                        ? IconPath('mk4_5.png')
                        : item.has_right == 1
                        ? IconPath('mk4_4.png')
                        : IconPath('mk4_5.png')
                    "
                    alt=""
                  />
                  <div
                    class="sweet_item"
                    :class="{
                      gray: item.has_right === 2
                    }"
                  >
                    <div class="sweet_left">
                      <div class="text">
                        全服总甜蜜值达到{{
                          item.max
                            .toString()
                            .substring(0, item.max.toString().length - 4)
                        }}万
                      </div>
                      <div class="number">
                        (<span
                          :class="{
                            done_num: item.finish_times >= item.max,
                            uncompleted_num: item.finish_times < item.max
                          }"
                          >{{ item.finish_times }}</span
                        >
                        / {{ item.max }})
                      </div>
                    </div>
                    <div class="sweet_right">
                      <div
                        class="sweet_btn"
                        :class="{
                          theme_botton_done: item.has_right === 2,
                          theme_botton_did: item.has_right === 1,
                          theme_botton_undid: item.has_right === 0,
                          disabled: item.has_right === 0 || item.has_right === 2
                        }"
                        @click="hangdleDrawDown(item)"
                      >
                        {{
                          item.has_right === 2
                            ? '已领取'
                            : item.has_right === 1
                            ? '领取'
                            : '未达到'
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_img">
          <div class="activity_explain">
            <div class="explain_text">
              <div class="circle"></div>
              <div class="text">甜蜜值达到对应节点，每位玩家可领取对应奖励</div>
            </div>
          </div>
        </div>
      </div>
    </ThemeBox>
    <!-- 恭喜获得 -->
    <ThemeDialog
      class="congratulations"
      :is-show="showDialog"
      dialogMark="congratulations"
      :titleIconObj="{ congratulations: 'title_8.png' }"
      :isSmall="false"
      @closeDialog="hangdleClose"
    >
      <DialogCongrats
        :awardData="awards"
        :awardName="congratsGet_goodsName"
        @onCongratsBtn="onCongratsBtn"
      >
      </DialogCongrats>
    </ThemeDialog>
    <!-- 预览头饰 -->
    <ThemeDialog
      class="previewHeadwear"
      :class="{
        previewxdal: previewMark === 2
      }"
      :is-show="showDialog1"
      :isSmall="false"
      @closeDialog="hangdleClose"
    >
      <!--爱情物语  -->
      <div class="headwear" v-if="previewMark === 1">
        <PublicJson
          :lottieJson_name="showJson.lottieJson_name"
          :lottieJson="showJson.aqwy"
          :userAvatar="showJson.icon"
        />
        <div class="jsonName">爱情物语·头饰</div>
      </div>
      <!--心动爱恋  -->
      <div class="headwear" v-if="previewMark === 2">
        <div class="zyp">
          <img :src="IconPath('tk_bg_2.png')" alt="" />
          <PublicJson
            :lottieJson_name="'zyp_xdal'"
            :lottieJson="jsonlottie.zyp_xdal"
          />
        </div>
        <div class="jsonName">心动爱恋·主页特效</div>
      </div>
      <div class="cancel" @click="onCongratsBtn">
        <img :src="IconPath('tk_1.png')" alt="" />
      </div>
    </ThemeDialog>
  </div>
</template>

<script>
// title组件
import ThemeBox from '../../components/ThemeBox'
// 恭喜获得
import DialogCongrats from '../../components/Dialog/DialogCongrats.vue'
import ThemeDialog from '../../components/Dialog/ThemeDialog.vue'
// json动画
import PublicJson from '../../components/PublicJson.vue'
import aqwy_01 from '../../assets/lottie/ts_aqwy_01/data.json'
import aqwy_02 from '../../assets/lottie/ts_aqwy_02/data.json'
import zyp_xdal from '../../assets/lottie/zyp_xdal/data.json'
// 跳app方法
import { toUserMain } from '../../utils/toApp'
// 默认数据
import { sweetList } from '../../utils/pageData'
// api主页数据
import { getPageData, drawDownRewards } from '../../api/index'
export default {
  // 组件名称
  name: 'sweetRankList',
  // props父组件参数
  props: {},
  components: {
    ThemeBox,
    DialogCongrats,
    ThemeDialog,
    PublicJson
  },
  data () {
    return {
      jsonlottie: {
        aqwy_01,
        aqwy_02,
        zyp_xdal
      }, // json对象
      awards: {}, // 弹框奖励数据
      showDialog: false, // 恭喜获得
      showDialog1: false, // 预览头饰
      rankList: [], // 排行榜数据
      lover_rev_list: [], // 全员奖励
      user_rank_list: {
        uid: '2011',
        tuid: '2011',
        username: '虚位以待',
        tusername: '虚位以待',
        profile_image: '',
        tprofile_image: '',
        rank: 1,
        num: '9999'
      }, // 用户当前在榜数据
      cp_info: {
        uid_gender: '1',
        tuid_gender: '0',
        uid_icon: ' https://imagevo.dandanvoice.com/app/head/9.png',
        tuid_icon: 'https://imagevo.dandanvoice.com/app/head/head_block_1.png '
      }, // cp信息
      previewMark: 1, // 预览标识 1:爱情物语 2:心动爱恋
      showJson: { // 预览头饰信息
        aqwy: null,
        icon: '',
        lottieJson_name: ''
      }

    }
  },
  // 计算属性
  computed: {
    myRank () {
      let rank = '20+'
      this.rankList.forEach((item, index) => {
        if (item.uid == this.uid) { rank = index + 1 }
      })
      return rank
    },
    congratsGet_goodsName () {
      const { nums } = this.awards
      return '+' + nums
    }

  },
  async created () {
    this.rankList = sweetList.rankList
    this.lover_rev_list = sweetList.lover_rev_list
    // 获取初始数据
    await this.getData()
  },
  // 侦听器
  watch: {},
  methods: {
    // 领取奖励
    async hangdleDrawDown (item) {
      const { goods_id } = item
      // 领取接口
      const res = await drawDownRewards({
        goods_id
      })
      if (res.errno !== 0) return this.$toast(res.errmsg)
      if (res.errno === 0) {
        this.awards = item
        this.awards['icon'] = this.goods_id_for_icon(goods_id)
        this.showDialog = true
      }
      // 刷新数据
      this.getData()
    },
    // 根据id给icon
    goods_id_for_icon (goods_id) {
      if (goods_id == 1) {
        return 'ljs_120_120.png'
      } else if (goods_id == 2) {
        return 'zjs_120_120.png'
      } else if (goods_id == 3) {
        return 'xdal_120_120.png'
      } else if (goods_id == 4) {
        return 'ly_120_120.png'
      } else if (goods_id == 5) {
        return 'zhs_120_120.png'
      } else if (goods_id == 6) {
        return 'yb_120_120.png'
      }
      return ''
    },
    // 主页数据
    async getData () {
      const { data, errmsg, errno } = await getPageData({
        mark: 3
      })

      if (errno !== 0) return this.$toast(errmsg)
      if (errno === 0) {
        this.user_icon = data.user_icon
        this.cp_info = data.cp_info
        this.rankList = data.rank_list
        this.user_rank_list = data.user_rank_list
        this.lover_rev_list = data.lover_rev_list
        return data
      }
    },
    // 预览
    previewHeader (icon, aqwy, jsonName, goods_id) {
      // 心动爱恋预览
      if (goods_id === 3) {
        this.previewMark = 2
        this.showDialog1 = true
      } else if (!goods_id) { // 爱情物语预览
        this.previewMark = 1
        this.showJson.icon = icon
        this.showJson.aqwy = aqwy
        this.showJson.lottieJson_name = jsonName
        this.showDialog1 = true
      }
    },
    // 恭喜获得弹框关闭触发
    hangdleClose () {
      this.showDialog = false
      this.showDialog1 = false
    },
    // 我知道了按钮
    onCongratsBtn () {
      this.showDialog = false
      this.showDialog1 = false
    },
    toUserMain (uid) {
      toUserMain(uid)
    }
  },
  mounted () {
  }

}
</script>

<style lang="scss" scoped>
.sweetRankList {
  width: 100%;
  margin-top: 47px;
  // 小圆点
  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fb97cd;
    float: left;
  }

  // 榜单奖励
  .rankRewards_container {
    position: relative;
    width: 355px;
    background: none;
    padding: 0;

    ::v-deep .white_border {
      border: 0;
      background: none;
    }

    ::v-deep .ThemeBox_TitleImg {
      top: -55px;

      img {
        width: 258px;
        height: auto;
      }
    }

    .rankRewards_bg {
      width: 100%;

      .top_img {
        width: 100%;
        height: 44px;
        background: url('../../assets/mk1_2.png') no-repeat;
        background-size: 100% 100%;
        background-position: 0 0px;
      }

      .container_bg {
        width: 100%;
        background: url('../../assets/mk1_3.png') no-repeat;
        background-size: 100% 100%;
        font-size: 14px;
        color: #fff;
        margin-top: -1px;

        .lover_icon {
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('../../assets/mk4_1.png') no-repeat;
          background-size: 90% 100%;
          background-position: center 0px;
          .user_icon {
            width: 88.5px;
            height: 87px;
            border-radius: 50%;
            margin-bottom: 15px;

            ::v-deep .micAvatar_img {
              width: 88.5px;
              height: 87px;

              img {
                width: 82%;
                border-radius: 50%;
              }
            }
          }

          .boy {
            margin-right: 3.3px;
          }

          .girl {
            margin-left: 3.2px;
          }
        }

        .top_ten_info {
          position: relative;
          width: 311px;
          height: 115.5px;
          border: 2px solid #f6cdff;
          background: linear-gradient(90deg, #a270ff, #a2bcff);
          border-radius: 60px 60px 15px 15px;
          margin: 0 auto;

          .title {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 108.5px;
            height: 20px;
            line-height: 20px;
            background: linear-gradient(90deg, #f591fe, #7a57ef);
            border-radius: 10px;
            border: 1px solid #fff;
            text-align: center;
            font-size: 12px;
          }

          .rewards_list {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding-top: 14px;
            font-size: 13px;

            .item_rewards {
              width: 100%;
              height: 18px;
              line-height: 22px;
              display: flex;
              align-items: center;
              padding-left: 52px;
              padding-top: 2px;
              > div {
                display: flex;
              }

              img {
                width: 11px;
                height: 9px;
                margin-right: 7.5px;
              }

              .ljs {
                width: 24px;
                height: 24px;

                img {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                }
              }
            }
          }
        }

        .rank_list {
          position: relative;
          width: 334.5px;
          height: 385.5px;
          margin: 6.5px 10px 0;
          background-color: #9884f3;
          border-radius: 10px;
          font-size: 12px;

          .list {
            border-radius: 10px;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: scroll;

            .item_double {
              background-color: #7b65dc;
            }
          }

          .haveUserList {
            padding-bottom: 67px;
          }

          // 榜单奖励每一项
          .item_info,
          .my_itemInfo {
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 67px;

            .left_rank {
              width: 20px;
              margin-left: 14.5px;
              padding-bottom: 15px;
              img {
                width: 25.5px;
                height: 19.5px;
              }
            }

            .center_icon {
              margin-right: 20px;
              margin-top: 10px;
              padding-bottom: 8px;
              width: 157px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: space-around;

              .icon {
                display: flex;
                flex-direction: column;
                align-items: center;

                .user_icon {
                  width: 30px;
                  height: 30px;

                  img {
                    width: 100%;
                    border-radius: 50%;
                  }
                }

                .user_name {
                  width: 72px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  color: #fffaa6;
                  margin-top: 5px;
                  white-space: nowrap;
                  text-align: center;
                }
              }

              .and {
                margin-bottom: 15px;
              }
            }

            .right_num {
              width: 90px;
              margin-right: 20px;
              white-space: nowrap;
              padding-bottom: 15px;
            }
          }

          .item_info:first-child {
            .left_rank {
              margin: 0;
              margin-left: 6px;
              padding-bottom: 20px;
            }

            .center_icon {
              margin-left: 10px;
            }
          }
          .item_info:last-child {
            border-radius: 0 0 10px 10px;
          }
          .my_itemInfo {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(90deg, #f79bff, #8bb1ff);
            border-radius: 0 0 10px 10px;

            .center_icon {
              .icon {
                width: 50px;

                .user_icon {
                  border-radius: 50%;

                  img {
                    border-radius: 50%;
                  }
                }
              }
            }
          }
        }
      }

      .bottom_img {
        width: 100%;
        height: 45px;
        background: url('../../assets/mk1_4.png') no-repeat;
        background-size: 100% 100%;
        background-position: 0 0;
        margin-top: -1px;

        .explain_text {
          padding-left: 10px;
          color: #6f59c3;
          padding-left: 15px;

          .circle {
            width: 6px;
            height: 6px;
            margin-top: 5px;
            margin-right: 5px;
          }

          .text {
            line-height: 18px;
            padding-left: 15px;
            font-size: 14px;
            line-height: 20px;

            > .special {
              color: #d8e6b2;
            }
          }
        }
      }
    }

    .themeBox_decoration {
      position: absolute;
      bottom: -52px;
      left: -8px;
      width: 375px;
      z-index: -1;
      img {
        width: 100%;
        height: auto;
      }
    }
  }

  // 文本加圆点
  .activity_explain {
    margin-top: 15px;
    color: #6f59c3;
    padding: 0 5px;

    .explain_text {
      padding-left: 10px;
      margin-top: 5px;

      .circle {
        width: 6px;
        height: 6px;
        margin-top: 5px;
        margin-right: 5px;
      }

      .text {
        line-height: 18px;
        padding-left: 15px;
        font-size: 14px;
        line-height: 20px;

        > .special {
          color: #d8e6b2;
        }
      }
    }
  }

  // 全员奖励
  .all_rewards {
    background: none;
    padding: 0;
    width: 355px;
    margin-top: 60px;
    ::v-deep .white_border {
      border: 0;
      background: none;
    }

    ::v-deep .ThemeBox_TitleImg {
      top: -45px;

      img {
        width: 258px;
        height: auto;
      }
    }

    .all_rewards_bg {
      margin-top: 10px;
      .top_img {
        width: 100%;
        height: 44px;
        background: url('../../assets/mk1_2.png') no-repeat;
        background-size: 100% 100%;
        background-position: 0 0px;
      }

      .container_bg {
        width: 100%;
        background: url('../../assets/mk1_3.png') no-repeat;
        background-size: 100% 100%;
        padding-bottom: 15px;
        margin-top: -2px;

        .rewards_container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 329px;
          height: 423.5px;
          margin: 0 auto;
          font-size: 12px;
          color: #fff;

          .sweet_list {
            width: 100%;
            height: 423.5px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .sweet_rewards_item {
              position: relative;
              width: 100%;
              display: flex;
              justify-content: space-between;

              .item_rewards {
                position: relative;
                border-radius: 6px;
                border: 2px solid #a294fb;
                width: 48px;
                height: 48px;
                box-sizing: border-box;
                margin-top: 10px;

                .item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  text-align: center;

                  .item_top {
                    border-radius: 5px 5px 0 0;
                    width: 100%;
                    background: linear-gradient(180deg, #ffcffa, #f3edff);

                    img {
                      width: 80%;
                    }
                  }

                  .item_bottom {
                    position: absolute;
                    bottom: -1px;
                    width: 46px;
                    height: 14.5px;
                    line-height: 14.5px;
                    background-color: #8d64da;
                    border-radius: 0 0 6px 6px;
                  }
                }
              }

              .sweet_item_bg {
                margin-left: 20px;
                position: relative;
                width: 241px;

                img {
                  width: 100%;
                }

                .sweet_item {
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;

                  .sweet_left {
                    margin-left: 10px;
                    margin-top: 10px;

                    .text {
                      font-size: 13px;
                    }

                    .number {
                      margin-top: 3px;
                      font-size: 12px;
                      color: #fffaa6;

                      .uncompleted_num {
                        color: #d7417d;
                      }

                      .done_num {
                        color: #fffaa6;
                      }
                    }
                  }

                  .sweet_right {
                    margin-top: 10px;

                    .sweet_btn {
                      width: 60px;
                      height: 30px;
                      line-height: 30px;
                      text-align: center;
                      border-radius: 15px;
                    }

                    .disabled {
                      pointer-events: none;
                    }
                  }
                }
              }

              .gray {
                opacity: 0.5;
              }

              // 进度条
              .bar_box {
                width: 19px;
                height: 75px;
                position: absolute;
                top: 40px;
                left: 65px;

                .bar {
                  width: 19px;
                  height: 75px;
                  position: relative;

                  .love {
                    position: absolute;
                    top: -11px;
                    left: -12px;
                    width: 31px;
                    height: 28px;
                    z-index: 10;
                  }

                  .line {
                    position: absolute;
                    top: 0px;
                    width: 8px;
                    height: 68px;
                  }
                }
              }

              .bar_box:nth-child(n + 2) {
                .love {
                  top: -18px;
                }

                .line {
                  top: -7px;
                }
              }

              .bar_box:nth-child(4) {
                .love {
                  top: -18px;
                }

                .line {
                  top: -10px;
                  height: 62px;
                }
              }

              .bar_box:nth-child(5) {
                .love {
                  top: -27px;
                }

                .line {
                  top: -16px;
                  height: 63px;
                }

                .love:last-child {
                  top: 43px;
                }
              }
            }
          }
        }
      }

      .bottom_img {
        width: 100%;
        height: 45px;
        background: url('../../assets/mk1_4.png') no-repeat;
        background-size: 100% 100%;
        background-position: 0 0;
        margin-top: -1px;

        .activity_explain {
          margin: 0;
          height: 100%;

          .explain_text {
            margin: 0;
          }
        }
      }
    }
  }

  // 恭喜获得
  .congratulations {
    width: 240px;
    height: 220px;
    ::v-deep .OnlyAward_Icon {
      img {
        background-color: #fff;
      }
    }
  }

  //预览头饰
  .previewHeadwear {
    width: 300px;
    height: 156px;
    ::v-deep .van-dialog__content {
      overflow: visible !important;
    }

    ::v-deep .ThemeDialog_bgc {
      position: relative;
      height: 100%;
      overflow: visible;
      padding-top: 15px;
      .headwear {
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .jsonName {
          padding-top: 10px;
          font-size: 14px;
        }
      }
      .PublicJson {
        margin: 0 auto;
        width: 93px;
        height: 93px;
      }

      .micAvatar_img {
        width: 85%;

        img {
          border-radius: 50%;
        }
      }

      .cancel {
        position: absolute;
        right: -22px;
        top: -20px;
        width: 50.5px;
        height: 46.5px;
        z-index: 99;

        img {
          width: 100%;
        }
      }
    }
  }
  .previewxdal {
    height: 444.5px;
    .headwear {
      position: relative;
      img {
        width: 213.5px;
        height: 370px;
      }
      .PublicJson {
        width: 213px !important;
        height: auto !important;
        position: absolute;
        top: 0;
      }
    }

    .jsonName {
      padding-top: 10px;
    }
  }
}
</style>
