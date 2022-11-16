<template>
  <div id="home">
    <v-dialog
      class="cart-modal"
      v-model="cartDialog"
      width="500"
    >
      <v-card class="cart-card">
        <h1 class="cart-title">Cart</h1>
        <p v-if="cart.length === 0">Your Cart is Empty</p>
        <div 
          v-else 
          v-for="(item,index) in cart"
          :key="index"
          class="cart-item row d-flex justify-space-around align-center">
          <hr />
          <img class="item-img" :src="item.src" :alt="item.alt" />
          <div class="column">
            <ul class="item-description">
              <li><strong>{{item.alt}}</strong></li>
              <li>{{item.cpu}}</li>
              <li>{{item.gpu}}</li>
            </ul>
          </div>
          <strong>${{item.cost}}</strong>
          <v-icon 
            class="d-flex justify-end align-center"
            color="#FF4040"
            dense
            @click="removeFromCart(index)">
            fa fa-times
          </v-icon>
        </div>
        <hr />
        <p><strong>Total Cost: ${{this.totalCost}}</strong></p>
        <v-btn
          class="web-button cart-button"
          @click="cartDialog=false"
        >Close</v-btn>
        <v-btn
          class="web-button cart-button"
        >Check Out</v-btn>
      </v-card>
    </v-dialog>
    <div
      class="navbar d-flex justify-space-between align-center"
    >
      <h3 class="logo d-flex justify-start align-center">CustomPCBuilder</h3>
      <ul class="d-flex nav-links justify-center align-center">
        <li><a href="#home" v-smooth-scroll>Home</a></li>
        <li><a href="#findParts" v-smooth-scroll>Find Parts</a></li>
        <li><a href="#buildPc" v-smooth-scroll>Build a PC</a></li>
        <li><a href="#getAdvice" v-smooth-scroll>Get Advice</a></li>
        <li><a href="#contactUs" v-smooth-scroll>Contact Us</a></li>
      </ul>
      <button 
        @click="cartDialog=true" 
        class="cart justify-center align-center"
      >
        <v-icon 
          color="#FFFFFF"
          class="cart-icon"
          dense
        >
          fa fa-cart-shopping
        </v-icon>
        <b-badge 
          v-if="cart.length > 0" 
          class="badge d-inline"
          variant="danger">{{cart.length}}
        </b-badge>
      </button>
      <v-icon 
        class="bars justify-end align-center"
        color="#FFFFFF"
        dense>
        fa fa-bars
      </v-icon>
    </div>
  </div>
</template>
<script>
import store from '@/store/index';
import { BBadge } from 'bootstrap-vue';

export default {
  name: 'NavBar',
  components: {
    BBadge
  },
  computed: {
    totalCost() {
      return store.getters.totalCost;
    },
    cart() {
      return store.getters.getCart;
    },
  },
  data: () => ({
    cartDialog: false
  }),
  methods: {
    removeFromCart(index) {
      store.commit('removeFromCart', index);
    }
  }
}
</script>
<style scoped>
.cart-card {
  padding: 15px 0;
}

.item-img {
  width: 75px;
  height: 60px;
}

.item-description {
  list-style: none;
}

.navbar {
  border-bottom: 1px solid #c4c4c4;
  background-image: linear-gradient(white, #363636);
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 10px;
  z-index: 175;
}

.nav-links {
  text-decoration: none;
  list-style: none;
  position: relative;
  left: -80px;
  margin-bottom: 0;
}

.nav-links li a {
  display: inline-flex;
  margin: 0 10px;
  color: #545454;
  font-weight: bold;
}

.nav-links li a:hover {
  color: #2f2f2f;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
}


.logo {
  font-family: 'Black Ops One', cursive;
  color: black;
  font-size: 24px;
  margin-bottom: 0;
}

.cart {
  display: flex;
  background-color: #6C757D;
  font-size: 24px;
  padding: 10px 12px;
  border-radius: 5px;
  margin-left: 15px;
}

.cart-icon {
  z-index: 5;
}

.badge {
  z-index: 6;
  font-size: 10px;
  position: absolute;
  bottom: 18px;
  right: 20px;
}

.bars {
  display: none !important;
  background-color: #6C757D;
  font-size: 24px;
  padding: 10px 12px;
  border-radius: 5px;
  margin-left: 15px;
}

.cart:hover, .bars:hover {
  background-color: #363636;
  cursor: pointer;
}

.cart-item {
  padding: 0 45px;
}

hr {
  margin: 10px 0;
  width: 100%;
}

.web-button {
  border: 2px solid white;
  font-weight: bold;
  border-radius: 25px;
  width: 125px;
  margin: 5px auto 10px 25px;
  padding: 4px 15px;
}

.web-button:hover {
  cursor: pointer;
  color: black;
  background-color: rgb(210, 210, 210);
  border: 2px solid black;
  transition: .3s ease-in-out;
}

@media screen and (max-width: 1000px) {
  .cart {
    display: none !important;
  }

  .bars {
    display: flex !important;
  }
}
</style>