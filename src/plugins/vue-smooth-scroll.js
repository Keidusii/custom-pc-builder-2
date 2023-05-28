import Vue from 'vue';
import VueSmoothScroll from 'vue2-smooth-scroll';

export default Vue.use(VueSmoothScroll, {
  duration: 600,
  offset: -60,
  easingFunction: 'easeInOutQuad',
});
