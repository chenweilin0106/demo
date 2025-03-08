<template>
    <div class="ListItem">
        {{ index }}<TestSpan :index="index" v-if="index % 2 == 0"></TestSpan>
    </div>
</template>

<script>
import TestSpan from './TestSpan.vue'
export default {
    name: 'ListItem',
    props: {
        index: Number
    },
    components: {
        TestSpan
    }
}
</script>

<style lang="scss">
.ListItem {
    display: flex;
}
</style>