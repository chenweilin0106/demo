<template>
  <theme-box
    id="discount_gift"
    theme-title-img="title_11.png"
    class="DistcountGift"
  >
    <div class="rule_btn" @click="$emit('showRule')"></div>
    <div class="tip_text_1">
      <p>双十一礼包限时折扣火热进行中！</p>
      <p>每日购买任意礼包还可参与许愿赢免单~</p>
    </div>
    <div class="gift_list">
      <div v-for="item1 in gifts_list" :key="item1.name" class="gift_item">
        <div class="gift_title">
          <img :src="IconPath(item1.icon)" />
        </div>
        <div class="gift_main flex_across">
          <div
            v-for="(item2, index) in item1.list"
            :key="index"
            class="gift_main_el flex_vertical"
            :class="{
              gift_main_el_special1: item1.name == '琳琅玉石' && index == 0,
              gift_main_el_special2: item1.name == '琳琅玉石' && index == 1
            }"
          >
            <div class="gift_main_title flex_across">
              <img
                v-if="item2.gift_name === '礼包一'"
                :src="IconPath('mk5_3.png')"
              />
              <img v-else :src="IconPath('mk5_4.png')" />
            </div>
            <div class="gift_content_top">
              <div v-if="item2.max_times" class="limit_num">
                每日限购{{ item2.max_times }}次({{
                  numLimit(item2.exchange_times, item2.max_times)
                }}/{{ item2.max_times }})
              </div>
              <div v-else class="limit_num">每日不限次数</div>
              <div
                :class="{ icon_list_special: item2.awards.length == 3 }"
                class="icon_list flex_across"
              >
                <div
                  v-for="item3 in item2.awards"
                  :key="item3.id"
                  class="icon_item flex_vertical"
                >
                  <div class="icon_box">
                    <img :src="IconPath(item3.icon)" />
                  </div>
                  <div class="icon_text">{{ item3.text }}</div>
                </div>
              </div>
            </div>
            <div class="gift_content_bottom">
              <div class="discount_price flex_across">
                <img :src="IconPath(discountIcon[item2.discount])" />
              </div>
              <div class="old_price">
                原价：
                <img :src="IconPath('zs_60_60.png')" />{{ item2.org_price }}
              </div>
              <div
                class="theme_botton_did buy_btn"
                :class="{ theme_botton_done: item2.has_right == 2 }"
                @click="onClick(item2, item1.name)"
              >
                <template v-if="item2.has_right == 1"
                  >{{ item2.price }}<img :src="IconPath('zs_60_60.png')" />购买
                </template>
                <template v-else>已售空</template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </theme-box>
</template>

<script>
export default {
  name: 'DistcountGift',
  components: {},
  props: ['gifts_list'],
  data() {
    return {
      discountIcon: Object.freeze({
        2.1: 'mk5_7.png',
        2.6: 'mk5_8.png',
        1.6: 'mk5_9.png',
        '2.0': 'mk5_10.png',
        6.7: 'mk5_11.png',
        7.5: 'mk5_12.png'
      })
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClick(data, name) {
      if (data.has_right == 1) {
        const obj = { ...data }
        obj.gift_name = name + obj.gift_name
        this.$emit('buy', obj)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.DistcountGift {
  position: relative;
  width: 360px;
  //height: 870px;

  ::v-deep .ThemeBox_main {
    display: block !important;
    padding-bottom: 17px;
  }
  .rule_btn {
    position: absolute;
    top: 16px;
    right: 15px;
    width: 30px;
    height: 30px;
    background: url('../../../assets/mk5_1.png') no-repeat left top/100% 100%;
  }

  .tip_text_1 {
    margin-top: 30px;

    p {
      text-align: center;
      font-size: 15px;
      color: #ffffff;
      line-height: 24px;
    }
  }

  .gift_item {
    width: 348px;

    .gift_title {
      width: 248px;
      margin: 0 auto 10px;

      > img {
        width: 100%;
      }
    }

    .gift_main {
      justify-content: space-evenly;

      .gift_main_el {
        position: relative;
        min-width: 148px;
        //width: fit-content;
        width: 165px;
        height: 202px;
        border: 3px solid #c5eaeb;
        background-color: #fff;
        padding: 1px;
        border-radius: 9px;

        .gift_content_top {
          padding-top: 20px;
          //min-width: 140px;
          width: 100%;
          height: 119px;
          background-color: #272783;
          border-radius: 5px 5px 0 0;
          overflow: hidden;

          .limit_num {
            margin-bottom: 8px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
          }

          .icon_list {
            width: 100%;
            justify-content: space-evenly;

            .icon_item {
              .icon_box {
                width: 50px;
                height: 50px;
                background: #1f1b76;

                > img {
                  width: 100%;
                }
              }

              .icon_text {
                margin-top: 5px;
                font-size: 12px;
                font-weight: 500;
                color: #ffffff;
                white-space: nowrap;
              }
            }
          }

          .icon_list_special {
            width: 174px;
          }
        }

        .gift_content_bottom {
          position: relative;
          flex: 1;
          width: 100%;
          background-color: #3248b6;
          border-radius: 0 0 5px 5px;

          .discount_price {
            position: absolute;
            top: 0;
            right: 0;
            width: 42px;
            height: 31px;

            > img {
              width: 100%;
            }
          }

          .old_price {
            position: absolute;
            left: 50%;
            top: 5px;
            transform: translateX(-50%) scale(0.91);
            font-size: 12px;
            color: #ffffff;
            white-space: nowrap;

            > img {
              margin: 0 -2px 0 -12px;
              height: 30px;
            }

            &::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -1.5px);
              width: 80px;
              height: 1px;
              background: #ffffff;
            }
          }

          .buy_btn {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 122px;
            height: 32px;
            border-radius: 16px;
            font-size: 14px;
            color: #ffffff;

            img {
              height: 30px;
            }
          }
        }

        .gift_main_title {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          width: 122px;
          height: 26px;

          > img {
            width: 100%;
          }
        }
      }

      .gift_main_el_special1 {
        width: 148px !important;
      }

      .gift_main_el_special2 {
        width: 182px !important;
      }
    }
  }
}
</style>
