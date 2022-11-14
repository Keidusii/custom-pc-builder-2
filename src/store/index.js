import Vue from "vue";
import Vuex from "vuex";
import { CART as cart } from "../shared/Cart";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  state() {
    return {
      cart: cart,
    };
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    totalCost(state) {
      return state.cart.reduce((acc, pc) => acc + pc.cost, 0)
    }
  },
  actions: {
    addToCart(context, item) {
      context.commit('addToCart', item);
    }
  },
  mutations: {
    addToCart(state, item) {
      state.cart = [...state.cart, item];
    },
  },
});

export default store;
