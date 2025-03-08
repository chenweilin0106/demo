<template>
    <!-- 小球抛物线案例 -->
    <div class="anime">
        <div class="wCen">
            <div class="blue">
                <div class="ball"></div>
            </div>
            <div class="green">
                <div class="ball"></div>
            </div>
        </div>
    </div>
</template>
    
<script>
import anime from 'animejs/lib/anime.es.js';
export default {
    data() {
        return {

        }
    },
    mounted() {
        var myAnimation = anime({
            targets: ['.blue', '.green'],
            translateX: '300px',
            rotate: 360,
            borderRadius: 100,
            duration: 2000 * 2,
            // loop: true,
            easing: 'linear'
        });
    }
}
</script>
    
<style lang="scss" scoped>
.anime {
    padding: 100px 0;

    .blue,
    .green {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        padding: 10px 0 0 10px;

        .ball {
            width: 30px;
            height: 30px;
            border-radius: 20px;
            background-color: #fff;
        }
    }

    .blue {
        background-color: blue;
    }

    .green {
        background-color: limegreen;
    }
}
</style>
    
    
    