<template>
  <div class="d-flex flex-column" id="contactUs">
    <h2 class="d-flex justify-center">Contact Us</h2>
    <h4 class="d-flex justify-center">Have a question? Click the button for my email and phone number</h4>
    <button 
      class="d-flex justify-center web-button" 
      @click="dialog=true"
    >Contact Us</button>
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <v-card>
      <h1 class="contact-title">Contact Us</h1>
      <hr />
    <div class="contact-info">
      <p class="contact-email">Email: <a href="mailto:support@custompcbuilder.com">support@custompcbuilder.com</a></p>
      <p class="contact-phone">Phone: <a href="tel:+1123456789">(123)456-789</a></p>
    </div>
    <hr />
      <v-btn
        class="contact-button"
        @click="dialog = false"
      >Close</v-btn>
    </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
<style scoped>
.contact-title {
  text-align: left;
  padding: 10px 15px;
  font-weight: 500;
}
.contact-info {
  margin: 15px 10px;
}

.contact-button {
  margin: 10px 15px;
}
</style>