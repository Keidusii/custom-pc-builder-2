<template>
  <div id="getAdvice">
    <div class="d-flex flex-column">
      <h1 class="d-flex justify-center">Get Advice</h1>
      <h4 class="d-flex justify-center">Whether it's by phone, or video call, I can help!</h4>
      <p class="d-flex justify-center">Click the button to set up a time to talk!</p>
      <button 
        class="d-flex justify-center web-button"
        @click="dialog = true"
        >Get Advice</button>
    </div>

    <v-dialog
      v-model="dialog"
      width="500"
    >
    <v-card>
      <h1 class="advice-title">Get Advice</h1>
      <hr />
      <p class="text-center">
        Fill out the form below and you 
        will receive an email to confirm an appointment:
      </p>
      <v-form
        ref="form"
        class="form mx-auto"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="[v => !!v || 'Name is required']"
          label="Full Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[v => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="[v => !!v || 'Phone number is required']"
          label="Phone"
          required
        ></v-text-field>

        <v-select
          v-model="callType"
          :items="['phone', 'email', 'video call']"
          :rules="[v => !!v || 'Form of contact is required']"
          label="Best form of contact"
          required
        ></v-select>

        <h4>Days Available:</h4>
        <v-row>
          <v-col cols="5" class="daysCol1">
            <v-checkbox
              v-model="daysAvail"
              label="Monday"
              value="Monday"
            ></v-checkbox>
            <v-checkbox
              v-model="daysAvail"
              label="Tuesday"
              value="Tuesday"
            ></v-checkbox>
            <v-checkbox
              v-model="daysAvail"
              label="Wednesday"
              value="Wednesday"
            ></v-checkbox>
          </v-col>
          <v-col cols="5" class="daysCol2">
            <v-checkbox
              v-model="daysAvail"
              label="Thursday"
              value="Thursday"
            ></v-checkbox>
            <v-checkbox
              v-model="daysAvail"
              label="Friday"
              value="Friday"
            ></v-checkbox>
            <v-checkbox
              v-model="daysAvail"
              label="Saturday"
              value="Saturday"
            ></v-checkbox>
          </v-col>
        </v-row>
        
        <v-select
          v-model="timeAvail"
          :items="['9am-10am EST', '10am-11am EST', '11am-12pm EST', '1pm-2pm EST', '2pm-3pm EST', '3pm-4pm EST', '4pm-5pm EST', '5pm-6pm EST']"
          :rules="[v => !!v || 'Time available is required']"
          label="Best time to talk"
          required
        ></v-select>

        <v-text-field
          v-model="additionalComments"
          label="Additional Comments"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          @click="submitForm"
        >
          submit
        </v-btn>
      </v-form>
      <hr />
      <v-btn
        class="web-button advice-button"
        @click="dialog = false"
      >Close</v-btn>
    </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'GetAdvice',
  data() {
    return {
      dialog: false,
      name: '',
      phone: '',
      email: '',
      callType: '',
      daysAvail: [],
      timeAvail: '',
      additionalComments: '',
      valid: false,
    }
  },
  methods: {
    submitForm() {

    },
  }
}
</script>
<style scoped>
.form {
  width: 80%;
}

.daysCol1 {
  width: max-content;
  margin-right: 20px;
}

.web-button {
  border: 2px solid white;
  font-weight: bold;
  border-radius: 25px;
  width: 125px;
  margin: 5px auto 10px auto;
  padding: 4px 15px;
}

.web-button:hover {
  cursor: pointer;
  color: black;
  background-color: rgb(210, 210, 210);
  border: 2px solid black;
  transition: .3s ease-in-out;
}

.advice-button {
  margin-left: 25px;
}
</style>