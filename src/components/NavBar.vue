<template>
  <div id="home">
    <!-- cart -->
    <v-dialog
      class="cart-modal"
      v-model="cartDialog"
      width="500"
    >
      <v-card class="cart-card">
        <h1 class="cart-title">Cart</h1>
        <p v-if="cart.length === 0" class="cart-empty">Your Cart is Empty</p>
        <div
          v-else 
          v-for="(pc) in cart"
          :key="pc.id"
          class="cart-item row d-flex justify-space-around align-center">
          <hr />
          <img class="item-img" :src="getImage(pc.src)" :alt="pc.alt" />
          <div class="column">
            <ul class="item-description">
              <li><strong>{{pc.alt}}</strong></li>
              <li>{{pc.cpu}}</li>
              <li>{{pc.gpu}}</li>
            </ul>
          </div>
          <strong>${{pc.cost}}</strong>
          <v-icon 
            class="d-flex justify-end align-center remove-button"
            color="#FF4040"
            dense
            @click="removeFromCart(pc.id)">
            fa fa-times
          </v-icon>
        </div>
        <hr />
        <p><strong>Total Cost: ${{this.totalCost}}</strong></p>
        <v-btn
          class="web-button cart-button close-cart"
          @click="cartDialog=false"
        >Close</v-btn>
        <v-btn
          class="web-button cart-button"
        >Check Out</v-btn>
      </v-card>
    </v-dialog>

    <!-- login -->
    <v-dialog
      class="login-modal"
      v-model="loginDialog"
      width="500"
      @click:outside="closeLoginModal()"
    >
      <v-card class="login-card">
        <h1>{{ registerView ? 'Register' : 'Login' }}</h1>
        <hr />
        <v-form class="login-form">
          <v-text-field
            v-model="email"
            :rules="[ v => !!v || 'Required' ]"
            label="E-mail"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[ v => !!v || 'Required' ]"
            label="Password"
          ></v-text-field>
          <v-text-field
            v-if="registerView"
            v-model="confirmPassword"
            :rules="[ v => v === password || 'Passwords do not match' ]"
            label="Confirm Password"
          ></v-text-field>
          <small
            v-if="authErrorMessage"
            class="text-danger">
            {{ authErrorMessage }}
          </small>
          <p
            v-if="!registerView"
            class="login-view-switch"
            @click="switchLoginView()"
          >Don't Have an account? Register</p>
          <p
            v-else
            class="login-view-switch"
            @click="switchLoginView()"
          >Already have an account? Login</p>
        </v-form>
        <v-btn
          class="web-button cart-button close-cart"
          @click="closeLoginModal()"
        >Close</v-btn>
        <v-btn
          class="web-button cart-button primary"
          :disabled="!email
            || !password
            || (registerView && password !== confirmPassword)"
          @click="login()"
        >
          {{ registerView ? 'Sign Up' : 'Login' }}
        </v-btn>
      </v-card>
    </v-dialog>

    <!-- navbar -->
    <div
      class="navbar d-flex align-center"
    >
      <h3 class="logo d-flex align-center">CustomPCBuilder</h3>
      <ul class="d-flex nav-links justify-center align-center">
        <li><a href="#home" v-smooth-scroll>Home</a></li>
        <li><a href="#findParts" v-smooth-scroll>Find Parts</a></li>
        <li><a href="#buildPc" v-smooth-scroll>Build a PC</a></li>
        <li><a href="#getAdvice" v-smooth-scroll>Get Advice</a></li>
        <li><a href="#contactUs" v-smooth-scroll>Contact Us</a></li>
      </ul>
      <button 
        @click="cartDialog=true" 
        class="cart justify-center align-center open-cart"
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
      <v-btn
        v-if="!loggedIn"
        class="login align-center"
        @click="loginDialog = true"
      >
        Login
      </v-btn>
      <v-btn 
        v-else
        class="login align-center"
        @click="loggedIn = false"
      >
        Log out
      </v-btn>
    </div>
  </div>
</template>
<script>
import store from '../store/index';
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
    cartDialog: false,
    loginDialog: false,
    registerView: false,
    email: '',
    password: '',
    confirmPassword: '',
    authErrorMessage: '',
    loggedIn: false
  }),
  methods: {
    async removeFromCart(id) {
      await store.dispatch('removeFromCart', id);
    },
    getImage(src) {
      return new URL(`../assets/images/${src}`, import.meta.url).href;
    },
    switchLoginView() {
      this.registerView = !this.registerView;
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.authErrorMessage = '';
    },
    closeLoginModal() {
      this.registerView = false;
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.authErrorMessage = '';
      this.loginDialog = false;
      this.loggedIn = false;
    },
    async login() {
      const loginCreds = {
        email: this.email,
        password: this.password
      };
      try {
        let loggedIn = false;
        if (this.registerView) {
          loggedIn = await store.dispatch('register', loginCreds);
        } else {
          loggedIn = await store.dispatch('login', loginCreds);
        }
        if (loggedIn) {
          this.loggedIn = true;
          this.loginDialog = false;
        } else {
          throw new Error();
        }
      } catch (error) {
        if (!this.registerView) {
          this.authErrorMessage = error?.response?.data
            || 'An error occurred. Please try again later';
        } else {
          this.authErrorMessage = 'An error occurred. Please try again later'
        }
      }
    }
  },
  created() {
    store.dispatch('fetchCart');
  }
}
</script>
<style scoped>
.cart-card {
  padding: 15px 0;
}

.login-card {
  padding: 15px 30px;
}

.login-form {
  padding: 20px 30px;
}

.login-view-switch {
  color:#5162ff;
  width: fit-content;
}

.login-view-switch:hover {
  cursor: pointer;
  text-decoration: underline;
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
  flex-grow: 1;
  text-decoration: none;
  list-style: none;
  position: relative;
  left: -40px;
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
  padding-left: 25px;
  height: 36px !important;
  width: 50px;
}

.cart-icon {
  z-index: 5;
}

.badge {
  z-index: 6;
  font-size: 10px;
  position: relative;
  top: 8px;
  right: 7px;
}

.login {
  display: flex;
  color: #fff;
  font-weight: bold;
  background-color: #6C757D !important;
  margin-left: 16px;
}

.cart:hover, .bars:hover {
  background-color: #363636;
  cursor: pointer;
}

.cart-item {
  padding: 0 45px;
}

.remove-button:hover {
  cursor: pointer;
  color: #2f2f2f;
  transition: 0.2s ease-in-out;
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
  .nav-links {
    display: none !important;
  }
}
</style>