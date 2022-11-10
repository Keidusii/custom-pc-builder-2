<template>
  <div class="d-flex flex-column">
    <h1 class="d-flex justify-center">Build a PC</h1>
    <v-row class="d-flex mx-auto justify-center">
      <v-card
        v-for="pc in PcBuilds"
        :key="pc.id"
        class="d-flex-inline mx-2 my-4"
        max-width="400"
      >
      <v-card-title>{{pc.alt}}</v-card-title>
        <v-img class="white--text pc-pics align-end" height="200px" :src="pc.src" />

        <v-card-subtitle class="pb-0">From ${{pc.cost}} </v-card-subtitle>

        <v-card-text class="text--primary">
          <ul>
            <li>CPU: {{pc.cpu}}</li>
            <li>GPU: {{pc.gpu}}</li>
            <li>Motherboard: {{pc.motherboard}}</li>
            <li>RAM: {{pc.ram}}</li>
            <li>SSD: {{pc.ssd}}</li>
            <li>CPU Cooler: {{pc.cpuCooler}}</li>
            <li>PSU: {{pc.psu}}</li>
            <li>Case: {{pc.case}}</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn> Customize </v-btn>

          <v-btn 
            @click="addToCart(pc)"
          > 
            Buy Now 
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import { PCBUILDS } from "@/shared/PcBuilds";
import store from "@/store/index";

export default {
  name: "BuildPc",
  data() {
    return {
      PcBuilds: PCBUILDS,
    }
  },
  methods: {
    addToCart(pc) {
      store.dispatch('addToCart', pc);
    }
  }
};
</script>
<style scoped>
.v-card {
  width: 350px;
  height: 575px;
}
.v-image {
  width: 200px;
  margin: 0 auto;
}

ul {
  height: 190px;
}

li {
  display: block;
}

button {
  border: 2px solid white;
  font-weight: bold;
  border-radius: 25px;
  width: 125px;
  margin: 5px auto 10px auto;
  padding: 4px 15px;
}

button:hover {
  cursor: pointer;
  color: black;
  background-color: rgb(210, 210, 210);
  border: 2px solid black;
  transition: 0.3s ease-in-out;
}
</style>
