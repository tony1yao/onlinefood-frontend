<template>
    <div>
        <transition name="move">
            <div v-show="showFlag" class="item">
                <div class="item-content">
                    <div class="image-header">
                        <img :src="item.image" alt="The picture of the food">
                        <div class="back-button" @click="goBack">
                            <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="content">
                        <h1 class="header">{{item.name}}</h1>
                        <div class="details">
                            <span class="sell-count">{{item.sellCount}} Sold</span>
                            <span class="rating">Good ratings: {{item.rating}}%</span>
                        </div>
                    </div>
                    <div class="price">
                        <span class="currentprice">${{item.price}}</span>
                        <span v-show="item.oldPrice" class="oldprice">{{item.oldPrice}}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        goBack() {
            this.showFlag = false;
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
    .item
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 30
        width 100%
        background #ffffff
        transition all 0.4s linear
        transform translate3d(0,0,0)
        &.move-enter, &.move-leave-active
            transform translate3d(100%,0,0)
        .image-header
            position relative
            width 100%
            height 0
            padding-top 100%   //此处设置100%，意味着上下的padding的值和width相等，这样就达到了上下宽高相等的效果了。
            img  //通过下面的设置，确保图片可以撑满image-header的空间
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back-button
                position absolute
                top 10px
                left 0
                .icon-arrow_lift
                    display block
                    padding 10px //这里的padding是为了增加按钮的响应区域面积
                    font-size 20
                    color #ffffff
</style>
