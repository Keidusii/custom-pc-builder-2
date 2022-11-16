<template>
  <v-app>
    <v-main>
      <nav-bar />
      <home-view />
      <find-parts />
      <hr />
      <build-pc />
      <hr />
      <get-advice />
      <hr />
      <contact-us />
    </v-main>
  </v-app>
</template>

<script>
import HomeView from './components/HomeView.vue';
import NavBar from './components/NavBar.vue'
import FindParts from './components/FindParts.vue';
import BuildPc from './components/buildPc.vue';
import getAdvice from './components/getAdvice.vue';
import ContactUs from './components/contactUs.vue';

export default {
  name: 'App',

  components: {
    HomeView,
    NavBar,
    FindParts,
    BuildPc,
    getAdvice,
    ContactUs,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
.v-main__wrap {
  background-color: #333338;
  color: white;
}

h1, h3, h4, p {
  text-align: center;
}

a {
  text-decoration: none;
}

hr {
  background-color: #adadad;
  border: none;
  height: 1px;
  width: 90%;
  margin: 10px auto;
}
</style>