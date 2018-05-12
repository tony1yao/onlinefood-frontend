import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import items from 'components/items/items';
import comments from 'components/comments/comments';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: items
    }, {
      path: '/items',
      component: items
    }, {
      path: '/comments',
      component: comments
    }, {
      path: '/seller',
      component: seller
    }
  ]
});
