<template>
  <div class="d-flex flex-column">
    <h1 class="d-flex justify-center">Get Advice</h1>
    <h4 class="d-flex justify-center">Whether it's by phone, or video call, I can help!</h4>
    <p class="d-flex justify-center">Click the button to set up a time to talk!</p>
    <button class="d-flex justify-center web-button">Get Advice</button>
  </div>
</template>
<script>
export default {
  name: 'GetAdvice',
  data() {
    return {
      
    }
  },
}
</script>
<style scoped>
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
  transition: .3s ease-in-out;
}
</style>