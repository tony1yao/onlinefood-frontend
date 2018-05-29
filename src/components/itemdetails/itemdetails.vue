<template>
    <div>
        <transition name="move">
            <div v-show="showFlag" class="item" ref="root">
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
                            <span class="sell-count">{{item.sellCount}} Sold      </span>
                            <span class="rating">Good ratings: {{item.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="currentprice">${{item.price}}</span>
                            <span v-show="item.oldPrice" class="oldprice">{{item.oldPrice}}</span>
                        </div>
                    </div>
                    <div class="cartcontroller-wrapper">
                        <cartcontroller :item="item"></cartcontroller>
                    </div>
                    <div @click="addFirstItem" class="buy" v-show="!item.count || item.count===0">
                        Add to cart
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontroller from 'components/cartcontroller/cartcontroller';
import Vue from 'vue';

export default {
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            this.$nextTick(()=>{
                if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.root,{
                        click: true
                    })
                }else {
                    this.scroll.refresh();
                }
            });
        },
        goBack() {
            this.showFlag = false;
        },
        addFirstItem(event) {
            if(!event._constructed) {
                return;
            }
            Vue.set(this.item, 'count', 1)   //set属性的值
        }
    },
    data() {
        return {
            showFlag: false
        }
    },
    components: {
        cartcontroller
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
        .content
            padding 18px
            .header
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
            .details
                margin-bottom 18px
                line-height 10px
                font-size 0
                height 10px
                .sell-count, .rating
                    font-size 10px
                    color rgb(147,153,159)
                .sell-count
                    margin-left 12px
            .price
                font-weight 700
                line-height 24px
                .currentprice
                    margin-right 8px
                    font-size 14px
                    color rgb(240, 20, 20)
                .oldprice
                    text-decoration line-through
                    font-size 10px
                    color rgb(147,153,159)
        .cartcontroller-wrapper
            position absolute
            right 12px
            bottom 12px
        .buy
            position absolute
            right 18px
            bottom 18px
            z-index 10
            height 24px
            line-height 24px
            padding 0 12px
            box-sizing border-box
            font-size 10px
            border-radius 12px
            color #ffffff
            background-color rgb(0,160,220)
</style>
