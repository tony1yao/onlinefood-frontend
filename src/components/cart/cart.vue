<template>
  <div class="cart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo">
                      <i class="icon-shopping_cart"></i>
                  </div>
              </div>
              <div class="price">$200</div>
              <div class="desc">Plus ${{deliveryFee}} delivery fee</div>
          </div>
          <div class="content-right">

          </div>
      </div>
  </div>
</template>
<script>
export default {
    props: {
        deliveryFee: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    }
};
</script>
<style lang="stylus">
    .cart
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        .content
            display flex
            background #141d27
            font-size 0       //font size is 0 since inline-block may have 间隙 issue.
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block    //因为是横向排列，所以用inline block
                    vertical-align top
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%    //圆角的常用技巧
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        .icon-shopping_cart
                            font-size 24px
                            color #80858a
                            line-height 44px
                .price
                    display inline-block
                    vertical-align top
                    margin-top 12px
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    border-right 1px solid rgba(255,255,255,0.1)
                    font-size 16px
                    font-weight 700
                    color rgba(255,255,255,0.4)
                .desc
                    display inline-block
                    vertical-align top
                    margin 12px 0 0 12px
                    line-height 24px
                    color rgba(255,255,255,0.4)
                    font-size 10px
            .content-right
                flex 0 0 105px
                width 105px
</style>