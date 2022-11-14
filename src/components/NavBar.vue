<template>
  <div>
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
          class="cart-item row d-flex space-between align-center">
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
            @click="cartDialog=true">
            fa fa-times
          </v-icon>
        </div>
        <hr />
        <p><strong>Total Cost: ${{this.totalCost}}</strong></p>
        <v-btn
          class="cart-button"
          @click="cartDialog=false"
        >Close</v-btn>
        <v-btn
          class="cart-button"
        >Check Out</v-btn>
      </v-card>
    </v-dialog>
    <div
      class="navbar d-flex justify-space-between"
    >
      <h3 class="logo d-flex justify-start align-center">CustomPCBuilder</h3>
      <ul class="d-flex nav-links justify-center align-center">
        <li>Home</li>
        <li>Find Parts</li>
        <li>Build a PC</li>
        <li>Get Advice</li>
        <li>Contact Us</li>
      </ul>
      <v-icon 
        class="cart justify-end align-center"
        color="#FFFFFF"
        dense
        @click="cartDialog=true">
        fa fa-cart-shopping
      </v-icon>
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

export default {
  name: 'NavBar',
  computed: {
    totalCost() {
      return store.getters.totalCost;
    },
    cart() {
      return store.getters.getCart;
    } 
  },
  data: () => ({
    cartDialog: false
  }),
  methods: {
    removeFromCart() {
      
    }
  }
}
</script>
<style>
.cart-modal {
  z-index: 99999;
}

.cart-card {
  padding: 50px 40px;
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
  z-index: 999;
}

.nav-links {
  text-decoration: none;
  position: relative;
  left: -80px;
}

.nav-links li {
  display: inline-flex;
  margin: 0 10px;
  color: #545454;
  font-weight: bold;
}

.nav-links li:hover {
  color: #2f2f2f;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  font-size: 18px;
}


.logo {
  font-family: 'Black Ops One', cursive;
  color: black;
  font-size: 24px;
}

.cart {
  display: flex;
  background-color: #6C757D;
  font-size: 24px;
  padding: 10px 12px;
  border-radius: 5px;
  margin-left: 15px;
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

@media screen and (max-width: 1000px) {
  .cart {
    display: none !important;
  }

  .bars {
    display: flex !important;
  }
}
</style>