<template>
  <!-- 概率说明 -->
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_10.png')" />
      <div v-if="list.length" class="scroll_list">
        <div class="record_header">
          <div class="left_tit">消耗</div>
          <div class="right_tit">获得奖励</div>
        </div>
        <div class="record_list" ref="scrollList" @scroll="handleScroll">
          <div class="record_item" v-for="(item, index) in list" :key="index">
            <div class="left_part" :class="index % 2 === 0 ? 'bgc-1' : 'bgc-2'">
              <div class="dumpling_list">
                <div
                  class="dumpling_item"
                  v-for="(spend, index1) in item.spends"
                  :key="index1"
                >
                  <div class="dumpling_item-icon flex-center">
                    <img :src="IconPath(spend.icon)" />
                  </div>
                  <div class="item_bottom flex-center">
                    <span class="x-icon">x</span>{{ spend.nums }}
                  </div>
                </div>
              </div>
              <div class="date">{{ item.create_time }}</div>
            </div>
            <div
              class="right_part"
              :class="index % 2 === 0 ? 'bgc-2' : 'bgc-1'"
            >
              <lazy-component class="icon">
                <img
                  v-if="item.award.award_icon"
                  :src="IconPath(item.award.award_icon)"
                  alt=""
                />
                <public-json
                  v-else-if="item.award.award_type === 'voice'"
                  jsonName="sb_klsg"
                  :userAvatar="$store.state.user_icon"
                />
                <public-svga
                  v-else-if="item.award.award_type === 'mic'"
                  svgaName="ts_yhcl"
                  :userAvatar="$store.state.user_icon"
                />
                <div v-if="labelObj[item.award.award_type]" class="tips">
                  <div class="inner flex-center">
                    {{ labelObj[item.award.award_type] }}
                  </div>
                </div>
              </lazy-component>
              <div class="tit">{{ item.award.award_text }}</div>
            </div>
          </div>
          <div v-if="!hasMore && list.length" class="no_more">
            没有更多记录了
          </div>
        </div>
      </div>
      <div v-else class="no-data">当前暂无记录</div>
      <!--<div v-if="!hasMore && list.length" class="no_more">-->
      <!--  没有更多记录了-->
      <!--</div>-->
    </div>
  </van-popup>
</template>

<script>
import PublicJson from '@/pages/lanternFestival/components/PublicJson.vue'
import PublicSvga from '@/pages/lanternFestival/components/PublicSvga.vue'
import { getPageData } from '../../../api/index'

export default {
  components: {
    PublicJson,
    PublicSvga
  },
  data() {
    return {
      page: 1,
      isLoading: false,
      list: [],
      hasMore: true,
      showPopup: false,
      labelObj: Object.freeze({
        car: '座驾',
        chat_bubble: '气泡',
        costume: '主页特效',
        ring: '戒指',
        voice: '声波',
        mic: '头饰'
      })
    }
  },
  methods: {
    resetData() {
      this.page = 1
      this.isLoading = false
      this.list = []
      this.hasMore = true
    },
    handleScroll(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target
      const threshold = 20 // 设置阈值为10px
      if (scrollHeight - scrollTop <= clientHeight + threshold) {
        this.recordListApi()
      }
    },
    clickClose() {
      this.$emit('close')
      this.resetData()
      document.querySelector('html').style.overflow = 'auto'
    },
    openPrompt() {
      this.recordListApi()
    },
    // 请求成功 弹框关闭情况下：打开弹框，锁定背景，弹框内滚动列表回滚到顶部
    requestSuccess() {
      this.showPopup = true
      document.querySelector('html').style.overflow = 'hidden'
      this.$nextTick(() => {
        if (this.$refs.scrollList) {
          this.$refs.scrollList.scrollTop = 0
        }
      })
    },
    // 我的记录 page 页码
    async recordListApi() {
      if (this.isLoading || this.hasMore == false) return
      this.isLoading = true
      const res = await getPageData({
        type: 'lantern_day_record',
        mark: this.page
      })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.list =
          this.page == 1 ? res.data.list : this.list.concat(res.data.list)
        this.hasMore = res.data.hasMore
        this.page++
        if (!this.showPopup) this.requestSuccess()
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 616px;
    min-height: 496px;
    max-height: 856px;
    background: linear-gradient(0deg, #5e243a, #7e2725);
    border: 8px solid #f9c66c;
    border-radius: 26px;
    pointer-events: auto;
    padding-top: 34px;

    .title-image {
      width: 642px;
      height: 126px;
      position: absolute;
      z-index: 3;
      top: -82px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
  }

  .scroll_list {
    width: 560px;
    background: #e58f53;
    border: 2px solid #e6a233;
    border-radius: 24px;
    margin: 0 auto 30px;
    overflow: hidden;

    .record_header {
      width: 100%;
      display: flex;
      align-items: center;

      .left_tit {
        width: 360px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
      }

      .right_tit {
        width: 200px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
      }
    }

    .record_list {
      width: 100%;
      max-height: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;
      overflow-x: hidden;

      .record_item {
        width: 100%;
        height: 140px;
        display: flex;
        align-items: center;

        .left_part {
          width: 360px;
          height: 140px;
          //background: #fbce99;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .dumpling_list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: nowrap;
            width: 100%;
            padding: 0 18px;
            margin-top: 11px;

            .dumpling_item {
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 76px;
              height: 84px;
              background: #ff9563;
              padding: 2px;
              border-radius: 14px;
              margin-left: 8px;

              .dumpling_item-icon {
                width: 100%;
                height: 56px;
                background-color: #fefaef;
                border-radius: 12px 12px 0 0;

                > img {
                  width: 100%;
                }
              }

              .item_bottom {
                flex: 1;
                width: 100%;
                background: #8e1e21;
                border-radius: 0 0 12px 12px;
                font-size: 20px;
                color: #ffffff;
                white-space: nowrap;

                .x-icon {
                  margin-right: 7px;
                }
              }

              &:nth-child(1) {
                margin-left: 0;
              }
            }
          }

          .date {
            font-size: 24px;
            color: #8e1e21;
            margin-top: 12px;
            margin-left: 21px;
            white-space: nowrap;
          }
        }

        .right_part {
          width: 200px;
          height: 140px;
          //background: #ffd6a5;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            width: 84px;
            height: 84px;
            background: #601917;
            border: 2px solid #601917;
            border-radius: 14px;
            position: relative;
            margin-top: 11px;
            //overflow: hidden;

            img {
              width: 100%;
              //height: 100%;
            }

            .PublicSvga {
              ::v-deep .micAvatar_img {
                width: 80%;
                height: 80%;
              }

              ::v-deep .svga_box {
                width: 100%;
              }
            }

            .PublicJson {
              ::v-deep .micAvatar_img {
                //top: 50%;
                //left: 50%;
                //transform: translate(-50%, -50%);
                width: 70%;
                height: 70%;
              }

              ::v-deep .json_box {
                width: 100%;
              }
            }

            .tips {
              position: absolute;
              top: -8px;
              right: 0;
              width: fit-content;
              height: 26px;
              background: linear-gradient(0deg, #66151a, #ef794c);
              border-radius: 14px;
              padding: 1px;
              transform: translateX(50%);

              .inner {
                width: fit-content;
                height: 100%;
                background: linear-gradient(0deg, #e44a28, #feb278);
                font-size: 18px;
                color: #ffffff;
                padding: 0 7px;
                white-space: nowrap;
                border-radius: 12px;
              }
            }
          }

          .tit {
            height: 23px;
            font-size: 24px;
            color: #8e1e21;
            margin-top: 8px;
            white-space: nowrap;
          }
        }
      }

      .bgc-1 {
        background-color: #fbce99;
      }

      .bgc-2 {
        background-color: #ffd6a5;
      }
    }
  }

  .no-data {
    width: 600px;
    height: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
    padding-top: 130px;
  }

  .no_more {
    width: fit-content;
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
    margin: 15px auto;
  }
}
</style>
