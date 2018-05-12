<template>
    <div class="items">
        <div class="menu-wrapper">

        </div>
        <div class="item-wrapper">

        </div>
    </div>
</template>

<script>
const ERR_OK = 0;
export default {
    data() {
        return {
            goods: []
        };
    },
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    console.log(this.goods);
                }
            }
        );
    }
};
</script>

<style lang="stylus" scoped>
    .items
        display flex
        position absolute
        top 174px
        width 100%
        bottom 46px
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background-color #f3f5f7
        .item-wrapper
            flex 1
</style>
