import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import { CART as cart } from "../shared'/cart'";

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
        const response = await axios.get('/cart');
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
        await axios.post('/cart', {pc: item});
        context.dispatch('fetchCart');
      } catch(err) {
        console.log(err);
      }
    },
    async removeFromCart(context, item) {
      try {
        await axios.delete('/cart', {data: {id: item}});
        await context.dispatch('fetchCart');
      } catch(err) {
        console.log(err);
      }
    },
    async login(context, item) {
      try {
        const response = await axios.post('/login', item );
        context.dispatch('fetchCart');
        return response?.data?.loggedIn;
      } catch(err) {
        throw err;
      }
    },
    async register(context, item) {
      try {
        const response = await axios.post('/register', item);
        context.dispatch('fetchCart');
        return response?.data?.loggedIn;
      } catch(err) {
        throw err;
      }
    }
  },
  mutations: {
    setCart(state, items) {
      state.cart = items;
    },
    async addToCart(state, item) {
      await axios.post('/cart', {pc: item});
    },
    async removeFromCart(state, item) {
      await axios.delete('/cart', {data: {id: item}});
    },
  },
});

export default store;
