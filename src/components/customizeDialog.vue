<template>
  <v-dialog :value="dialog" width="500" @click:outside="closeDialog()">
    <v-card class="customize-dialog">
      <h1 class="customize-title">Customize</h1>
      <hr />
      <img
        :src="pc.src"
        :alt="pc.alt"
        class="customize-img d-flex mx-auto align-center"
      />
      <!-- customization -->
      <div class="accordion mx-auto" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h4 block v-b-toggle.accordion-1 variant="info">CPU</h4>
          </b-card-header>
          <b-collapse
            id="accordion-1"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body class="d-flex justify-center">
              <b-card-text class="text-left">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="altCpuId"
                    :aria-describedby="ariaDescribedby"
                    name="cpu"
                    :value="0"
                    >{{ pc.altCpus[0] }}</b-form-radio
                  >
                  <b-form-radio
                    v-model="altCpuId"
                    :aria-describedby="ariaDescribedby"
                    name="cpu"
                    :value="1"
                    >{{ pc.altCpus[1] }}
                    <span class="alt-cost"
                      >+${{ pc.altCpuCost[1] }}</span
                    ></b-form-radio
                  >
                  <b-form-radio
                    v-model="altCpuId"
                    :aria-describedby="ariaDescribedby"
                    name="cpu"
                    :value="2"
                    >{{ pc.altCpus[2] }}
                    <span class="alt-cost"
                      >+${{ pc.altCpuCost[2] }}</span
                    ></b-form-radio
                  >
                </b-form-group>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <h4 block v-b-toggle.accordion-2 variant="info">GPU</h4>
          </b-card-header>
          <b-collapse
            id="accordion-2"
            accordion="my-accordion2"
            visible
            role="tabpanel"
          >
            <b-card-body class="d-flex justify-center">
              <b-card-text class="text-left">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="altGpuId"
                    :aria-describedby="ariaDescribedby"
                    name="gpu"
                    :value="0"
                    >{{ pc.altGpus[0] }}</b-form-radio
                  >
                  <b-form-radio
                    v-model="altGpuId"
                    :aria-describedby="ariaDescribedby"
                    name="gpu"
                    :value="1"
                    >{{ pc.altGpus[1] }}
                    <span class="alt-cost"
                      >+${{ pc.altGpuCost[1] }}</span
                    ></b-form-radio
                  >
                  <b-form-radio
                    v-model="altGpuId"
                    :aria-describedby="ariaDescribedby"
                    name="gpu"
                    :value="2"
                    >{{ pc.altGpus[2] }}
                    <span class="alt-cost"
                      >+${{ pc.altGpuCost[2] }}</span
                    ></b-form-radio
                  >
                </b-form-group>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <hr />
      <div class="footer d-flex mx-auto justify-end align-center">
        <span class="alt-cost totalCost">Total Cost: ${{totalCost}} </span>
        <v-btn class="customize-button web-button" @click="closeDialog(pc.id)">Close</v-btn>
        <v-btn class="customize-button web-button" @click="addCustomToCart(pc)"
          >Add to Cart</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "customizeDialog",
  props: {
    pc: {
      required: true,
      type: Object,
    },
    dialog: {
      required: true,
      type: Boolean,
    }
  },
  computed: {
    totalCost() {
      let totalCost = this.pc.cost + this.pc.altCpuCost[this.altCpuId] + this.pc.altGpuCost[this.altGpuId];
      return totalCost.toFixed(2);
    }
  },
  data() {
    return {
      modal: this.dialog,
      altCpuId: 0,
      altGpuId: 0,
    };
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog', this.pc.id);
    },
    addCustomToCart(pc) {
      // create copy of pc object to prevent ruining entire website!!!
      let newPc = {...pc};

      newPc.cpu = pc.altCpus[this.altCpuId];
      newPc.gpu = pc.altGpus[this.altGpuId];
      newPc.cost = Number(this.totalCost);
      
      this.$emit('addCustomToCart', newPc);
      this.closeDialog(this.pc.id);
    }
  }
};
</script>
<style scoped>
.customize-dialog {
  height: auto;
}

.customize-img {
  max-width: 400px;
  width: 80%;
  height: 30%;
  padding-bottom: 10px;
}

.accordion {
  width:90%;
}
.alt-cost {
  font-weight: bold;  
}

.footer {
  padding-bottom: 10px;
  width: 90%;
}

.customize-button {
  margin-left: 10px;
}

.web-button {
  border: 2px solid white;
  font-weight: bold;
  border-radius: 25px;
  width: 125px;
}

.web-button:hover {
  cursor: pointer;
  color: black;
  background-color: rgb(210, 210, 210);
  border: 2px solid black;
  transition: .3s ease-in-out;
}
</style>
