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
      return state.cart.reduce((acc, pc ) => acc + pc.cost, 0).toFixed(2);
    }
  },
  actions: {
    async fetchCart(context) {
      try {
      const response = await axios.get('http://localhost:5002/cart');
      const items = response?.data || [];
      let pcs = [];
      if (items) {
        for (let i = 0; i < items.length; i++) {
          pcs.push(items[i].pc);
          pcs[i].id = items[i].id
        }
      }
      context.commit('setCart', pcs);
      } catch (err) {
        console.log(err)
      }
    },
    async addToCart(context, item) {
      try {
        await axios.post('http://localhost:5002/cart', {pc: item});
        context.dispatch('fetchCart');
      } catch(err) {
        console.log(err);
      }
    },
    async removeFromCart(context, item) {
      try {
        await axios.delete('http://localhost:5002/cart', {data: {id: item}});
        await context.dispatch('fetchCart');
      } catch(err) {
        console.log(err);
      }
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
