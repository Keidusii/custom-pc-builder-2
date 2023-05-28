<template>
  <div class="d-flex flex-column" id="buildPc">
    <h1 class="d-flex justify-center">Build a PC</h1>
    <v-row class="d-flex mx-auto justify-center">
      <v-card
        v-for="pc in PcBuilds"
        :key="pc.id"
        class="d-flex-inline mx-2 my-4"
        max-width="400"
      >
        <v-card-title>{{ pc.alt }}</v-card-title>
        <v-img
          class="white--text pc-pics align-end"
          height="200px"
          :src="require(`../assets/images/${pc.src}`)"
        />

        <v-card-subtitle class="pb-0 text--primary"
          >From ${{ pc.cost }}
        </v-card-subtitle>

        <v-card-text class="list">
          <ul>
            <li>CPU: {{ pc.cpu }}</li>
            <li>GPU: {{ pc.gpu }}</li>
            <li>Motherboard: {{ pc.motherboard }}</li>
            <li>RAM: {{ pc.ram }}</li>
            <li>SSD: {{ pc.ssd }}</li>
            <li>CPU Cooler: {{ pc.cpuCooler }}</li>
            <li>PSU: {{ pc.psu }}</li>
            <li>Case: {{ pc.case }}</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn class="customize-btn" @click="openCloseDialog(pc.id)"> Customize </v-btn>

          <v-btn class="buy-now-btn" @click="addToCart(pc)"> Buy Now </v-btn>
        </v-card-actions>

      </v-card>
      <!-- customization dialog -->
      <customizeDialog
        :pc="PcBuilds[0]"
        :dialog="dialog0"
        @closeDialog="id => openCloseDialog(id)"
        @addCustomToCart="newPc => addToCart(newPc)"
      />
      <customizeDialog
        :pc="PcBuilds[1]"
        :dialog="dialog1"
        @closeDialog="id => openCloseDialog(id)"
        @addCustomToCart="newPc => addToCart(newPc)"
      />
      <customizeDialog
        :pc="PcBuilds[2]"
        :dialog="dialog2"
        @closeDialog="id => openCloseDialog(id)"
        @addCustomToCart="newPc => addToCart(newPc)"
      />
    </v-row>
  </div>
</template>
<script>
import { PCBUILDS } from "@/shared/PcBuilds";
import store from "@/store/index";
import customizeDialog from "./customizeDialog.vue";

export default {
  name: "BuildPc",
  components: {
    customizeDialog,
  },
  data() {
    return {
      PcBuilds: PCBUILDS,
      dialog0: false,
      dialog1: false,
      dialog2: false,
      cpu: '',
      gpu: '',
    };
  },
  methods: {
    addToCart(newPc) {
      store.dispatch("addToCart", newPc);
    },
    openCloseDialog(id) {
      switch (id) {
        case 0: 
          this.dialog0 = !this.dialog0;
          break;
        case 1:
          this.dialog1 = !this.dialog1;
          break;
        case 2:
          this.dialog2 = !this.dialog2;
          break;
        default:
          this.dialog0 = !this.dialog0;
      }
    }
  },
};
</script>
<style scoped>
.v-card {
  width: 100%;
  height: 560px;
}
.v-image {
  width: 200px;
  margin: 0 auto;
}

.list {
  padding-bottom: 0;
}

ul {
  height: 190px;
  margin-bottom: 0;
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
