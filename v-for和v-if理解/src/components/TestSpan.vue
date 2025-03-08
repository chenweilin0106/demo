<template>
    <div class="TestSpan">
        {{ 'TestSpan' + index }}
    </div>
</template>

<script>
export default {
    name: 'TestSpan',
    props: {
        index: Number
    },
    created() {
        console.log('TestSpan created')
    },
    mounted() {
        console.log('TestSpan mounted')
    }
}
</script>

<style lang="scss">
.TestSpan {}
</style>