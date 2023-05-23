import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import { CART as cart } from "../shared/Cart";

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  state() {
    return {
      cart: [],
    };
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    totalCost(state) {
      return state.cart.reduce((acc, { pc }) => acc + pc.cost, 0).toFixed(2);
    }
  },
  actions: {
    async fetchCart(context) {
      const response = await axios.get('http://localhost:5002/cart');
      let items = response.data;
      items.forEach(item => {
        item.pc.id = item.id
      });
      context.commit('setCart', items);
    },
    async addToCart(context, item) {
      await axios.post('http://localhost:5002/cart', {pc: item});
      context.dispatch('fetchCart');
    },
    async removeFromCart(context, item) {
      await axios.delete('http://localhost:5002/cart', {data: {id: item}});
    },
  },
  mutations: {
    setCart(state, items) {
      state.cart = items;
    },
    async addToCart(state, item) {
      await axios.post('http://localhost:5002/cart', {pc: item});
    },
    async removeFromCart(state, item) {
      await axios.delete('http://localhost:5002/cart', {data: {id: item}});
    },
  },
});

export default store;
