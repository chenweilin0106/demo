<template>
    <div class="box">
        <!-- 标题图片 -->
        <div class="ThemeBox_TitleImg" v-if="themeTitleImg">
            <img :src="IconPath(themeTitleImg)" alt="" />
        </div>
        <div class="top"></div>
        <div class="center">
            <div class="content">
                <slot></slot>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
export default {
    name: 'irregularityBox',
    props: ['themeTitleImg']
}
</script>

<style scoped lang="scss">
.box {
    width: 355px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-bottom: 38px;

    .ThemeBox_TitleImg {
        position: absolute;
        width: 258px;
        height: 96px;
        top: -54px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 100%;
        }
    }

    .top {
        width: 100%;
        height: 44px;
        background-image: url('../assets/mk1_2.png');
        background-size: 100% 100%;
    }

    .center {
        width: 100%;
        background-image: url('../assets/mk1_3.png');
        background-size: 100% 100%;
        // border: 1px solid red;

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -17px;
            margin-bottom: -16px;

            .ThemeBox_BottomText {
                margin-left: 10px;
                margin-right: 11px;
                // color: $theme_box_text_color;
                color: #6F59C3;
                line-height: 25px;
                // border: 1px solid red;

                li {
                    font-size: 14px;
                    position: relative;
                    list-style-type: none;
                    margin-left: 15px;
                    // border: 1px solid red;

                    img {
                        position: relative;
                        margin: 0;
                        margin-right: 0;
                        width: 22px;
                    }

                    span {
                        position: absolute;
                        top: 9px;
                        left: -15px;
                        display: block;
                        width: 6px;
                        height: 6px;
                        // background: $theme_box_circle_color;
                        background: #FB97CD;
                        border-radius: 50%;
                    }
                }
            }
        }
    }

    .bottom {
        width: 100%;
        height: 45px;
        background-image: url('../assets/mk1_4.png');
        background-size: 100% 100%;
    }
}
</style>
