<template>
    <div class="cartcontroller">
        <div class="cart-decrease icon-remove_circle_outline" v-show="item.count>0" @click="removeItem"></div>
        <div class="cart-count" v-show="item.count>0">{{item.count}}</div>
        <div class="cart-increase icon-add_circle" @click="addItem"></div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        item: {
            type: Object
        }
    },
    created() {
        console.log(this.item);
    },
    methods: {
        addItem() {
            console.log("click");
            if (!this.item.count) {
                Vue.set(this.item, 'count', 1); // 添加属性的时候需要用Vue.set，而不能直接用this.item.count = 1 , 这样，这个dom变化才会被观测到。
            } else {
                this.item.count++;
            }
        },
        removeItem() {
            if (this.item.count && this.item.count > 0) {
                this.item.count--;
            }
        }
    }
};
</script>

<style lang="stylus">
    .cartcontroller
        font-size 0
        .cart-decrease, .cart-increase
            padding 6px  //为了增加按钮的点击区域
            display inline-block
            font-size 24px
            line-height 24px
            color rgb(0,160,220)
        .cart-count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
</style>
