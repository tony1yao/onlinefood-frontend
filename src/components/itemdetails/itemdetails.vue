<template>
    <div v-show="showFlag" class="itemdetails"></div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object
        }
    },
    method: {
        show() {
            this.showFlag = true;
        }
    },
    data() {
        return {
            showFlag: false
        }
    }
}
</script>
<style lang="stylus">
    .itemdetails
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 30
        width 100%
        background #ffffff

</style>
