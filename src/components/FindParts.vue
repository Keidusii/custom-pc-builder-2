<template>
  <div class="d-flex flex-column">
    <h1 class="d-flex justify-center">Find Parts</h1>
    <h4  class="d-flex justify-center">Pc Part picker is the way to go!</h4>
    <p  class="">Go to <a href="https://pcpartpicker.com/" target="blank">PCPartPicker.com</a>
    to find compatible parts for you're build If you need help, you can contact us.
    </p>
    <a href="https://pcpartpicker.com/" target="blank"><button class="d-flex justify-center web-button">Find Parts</button></a>
  </div>
</template>
<script>
export default {
  name: 'FindParts',
  data() {
    return {
      
    }
  },
}
</script>
<style scoped>
button {
  border: 2px solid white;
  color: white;
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
  transition: .3s ease-in-out;
}
</style>