<template>
    <!-- 管理后台公告页面 -->
    <div class="container" @click="test">
        <!-- <div class="banner">
            <div class="inner">{{ tit }}</div>
        </div>
        <div class="backgroud">
            <div class="top">
            </div>
            <div class="center">
                <div class="template" v-html="content">

                </div>
            </div>
            <div class="bottom"></div>
            <div class="zhanwei"></div>
        </div> -->
    </div>
</template>
<script>
function* show() {
    yield 'Hello';
    yield 'World';
    yield 'Es6';
    return 'well';
}

var res = show();
console.log(res.next()); //{value:'Hello', done:false}
console.log(res.next()); //{value:'World', done:false}
console.log(res.next()); //{value:'Es5', done:false}
console.log(res.next()); //{value:'well', done:true}
export default {
    name: 'index',
    props: {
        msg: String
    },
    data() {
        return {
            tit: '标题内容',
            content: ''
        }
    },
    mounted() {
        // this.tit = localStorage.getItem('tit')
        // this.content = localStorage.getItem('content')
    },
    methods: {
        test() {

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@font-face {
    font-family: "YouSheBiaoTiHei";
    src: url("../font/YouSheBiaoTiHei-2.ttf");
}

.container {
    height: 100%;

    .banner {
        width: 375px;
        height: 350px;
        background-image: url('../assets/banner@2x.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;

        .inner {
            margin-top: 103px;
            min-width: 222px;
            height: 50px;
            text-align: center;
            font-size: 60px;
            font-family: YouSheBiaoTiHei;
            color: #FFFFFF;
            line-height: 50px;
            vertical-align: center;
            white-space: nowrap;
        }
    }

    .backgroud {
        position: absolute;
        top: 232px;

        .top {
            width: 375px;
            height: 150px;
            background-image: url('../assets/txt_1@2x.png');
            background-size: 100% 100%;
        }

        .center {
            width: 375px;
            background-image: url('../assets/txt_2@2x.png');
            background-size: 100% 100%;
            display: flex;
            justify-content: center;


            .template {
                width: 305px;
                margin-top: -112px;
                margin-bottom: -122px;

            }

        }

        .bottom {
            width: 375px;
            height: 180px;
            background-image: url('../assets/txt_3@2x.png');
            background-size: 100% 100%;
        }

        .zhanwei {
            width: 375px;
            height: 25px;
        }


    }
}
</style>
