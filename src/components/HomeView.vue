<template>
  <v-container class="jumbotron" id="home">
    <h1 class="text-center header">Need Help Building A PC?</h1>
    <h4 class="text-center subheader">I'm here to help!</h4>
    <v-carousel 
      dark
      cycle
      :interval="4500"
      :height="750"
      class="carousel mx-auto"
    >
    <v-carousel-item class="mx-auto">
      <img src="../assets/images/pc-pic1.jpg" alt="PC Pic 1" />
    </v-carousel-item>
    <v-carousel-item class="mx-auto">
      <img src="../assets/images/pc-pic2.jpg" alt="PC Pic 2" />
    </v-carousel-item>
  </v-carousel>
  </v-container>
</template>

<script>
  export default {
    name: 'HomeView',
    data() {
      return {
        
      }
    },
  }
</script>


<style scoped>
  .jumbotron {
    margin-top:65px;
    background-color: #E9ECEF;
    max-width: 1000px;
  }

  .header {
    font-size: 48px;
    font-weight: 400;
    color: black;
  }

  .subheader {
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 15px;
    color: black;
  }
  .carousel {
    max-width: 600px;
    min-width: 300px;
  }
</style>