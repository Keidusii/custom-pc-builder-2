import Vue from 'vue';
import VueSmoothScroll from 'vue2-smooth-scroll';

Vue.use(VueSmoothScroll, {
  duration: 600,
  offset: -60,
  easingFunction: 'easeInOutQuad',
});
